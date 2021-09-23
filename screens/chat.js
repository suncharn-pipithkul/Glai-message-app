import React, { useState, useEffect, useCallback, useContext } from 'react';
import { 
  Platform,
  StyleSheet, 
  Keyboard, 
  useWindowDimensions, 
  TouchableOpacity, 
  View, 
  Text,
  Alert } from 'react-native';
import { 
  GiftedChat, 
  Bubble, 
  Send, 
  Actions,
  InputToolbar, 
  Composer } from 'react-native-gifted-chat'
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons'; 
import { 
  FooterContainer,
  FooterText,
  LeftFooterIcon, } from '../styleComponents/ChatStyles';

// Storage import(s)
import firestore from '@react-native-firebase/firestore';

// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';


export default function ChatScreen({ navigation, route }) {
  
  const window = useWindowDimensions();
  const { rid, members } = route.params;
  
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessage, setEditingMessage] = useState({text:'', _id:''});
  
    // Load messages for this room from firestore
    useEffect(() => {
      const messagesCollectionSorted = firestore().collection('Rooms')
                                                  .doc(rid)
                                                  .collection('messages')
                                                  .orderBy('createdAt', 'desc');
      const messagesListener = messagesCollectionSorted
                                  .onSnapshot(querySnapshot => {
                                    const newMessages = querySnapshot.docs.map(doc => {
                                      const firebaseData = doc.data();

                                      const data = {
                                        _id: doc.id, // message id for Gifted chat
                                        text: '',
                                        ...firebaseData,
                                        createdAt: firebaseData.createdAt?.toDate(),
                                      };

                                      if (!firebaseData.system) {
                                        data.user = { // Gifted chat stored sender as user
                                          ...firebaseData.sender,
                                          name: firebaseData.sender.name
                                        };
                                      }

                                      return data;
                                    });

                                    setMessages(newMessages);
                                  });
      
      return () => messagesListener(); // cleanup listener
    }, []);
    
    // Save new message to firestore on send button clicked
    const onSend = async (messages = []) => {
      try {
        if (!isEditing) {
          const text = messages[0].text; // get the newest text

          // Stored new message in firestore
          let recentMessageDoc = await firestore().collection('Rooms').doc(rid).collection('messages').doc();
          recentMessageDoc.set({
            mid: recentMessageDoc.id,
            text,
            createdAt: firestore.FieldValue.serverTimestamp(),
            modifiedAt: null,
            readBy: [],
            sender: {
              _id: user.uid,
              name: user.displayName, 
              avatar: user.photoURL
            },
          });
    
          // Stored recent message in firestore
          await firestore().collection('Rooms').doc(rid).set({
            recentMessage: {
              mid: recentMessageDoc.id,
              text,
              createdAt: firestore.FieldValue.serverTimestamp(),
              modifiedAt: null,
              readBy: [],
              sender: {
                _id: user.uid,
                name: user.displayName, 
                avatar: user.photoURL
              }
            }
          }, {merge: true});
        } else {
          // edit message
          const messagesCollection = firestore().collection('Rooms').doc(rid).collection('messages');
          await messagesCollection.doc(editingMessage._id).update({
            text: messages[0].text,
            modifiedAt: firestore.FieldValue.serverTimestamp(),
          });

          // update recentMessage field
          const recentMessage = await getRecentMessage();
          await firestore().collection('Rooms').doc(rid).set({
            recentMessage: {
              ...recentMessage,
            }
          }, {merge: true});

          setIsEditing(false);
        }
        
      } catch(err) {
        alert(err);
        console.log('@onSend', err);
      }
      
    };

    // Function to get recentMessage object
    const getRecentMessage = async () => {
      const querySnapshot = await firestore().collection('Rooms')
                        .doc(rid)
                        .collection('messages')
                        .orderBy('createdAt', 'desc')
                        .limit(1)
                        .get();
      
      return querySnapshot.docs[0].data();
    };

    // Function longPress message
    const onLongPress = (context, message) => {
      Keyboard.dismiss();
      let messagesCollection = firestore().collection('Rooms').doc(rid).collection('messages');
      let options = ['Copy Text', 'Cancel'];
      let cancelButtonIndex = 1;

      // long press on current user's message
      if (user.uid === message.sender._id) {
        options = ['Edit', 'Copy Text', 'Delete', 'Cancel'];
        cancelButtonIndex = 3;
      }
      context.actionSheet().showActionSheetWithOptions({
        options: options,
        cancelButtonIndex: cancelButtonIndex,

      }, async (buttonIndex) => {
        switch (buttonIndex) {
          case 0: // edit
            setIsEditing(true);
            setEditingMessage({text:message.text, _id:message._id});
            break;
          case 1: // copy text
            Clipboard.setString(message.text);
            break;
          case 2: // delete text
            Alert.alert('Delete Message', 'Are you sure you want to delete this message?', [
              { text: 'Cancel', style: 'cancel'}, // cancel button
              { // delete button
                text: 'Delete',
                onPress: async () => {
                  messagesCollection.doc(message._id).delete();

                  // update recentMessage field
                  try {
                    const recentMessage = await getRecentMessage();

                    await firestore().collection('Rooms').doc(rid).set({
                      recentMessage: {
                        ...recentMessage,
                      }
                    }, {merge: true});
                  } catch(err) {
                    alert(err);
                    console.log('@OnDeleted', err);
                  }
                }
              },
            ])
            break;
        }
      });
    };

    // Render Components
    const renderActions = ( props ) => {
      return (
        <Actions
          {...props}
          options={{
            ['Send Image']: handlePickImage,
          }}
        />
      );
    };

    const handlePickImage = () => {};

    const renderInputToolbar = ( props ) => {
      return (
        <InputToolbar 
          {...props}
          // containerStyle={{borderRadius:30, marginLeft:5, marginRight:5}}
          // containerStyle={{backgroundColor:'red'}}
          renderComposer={renderComposer}
        />
      );
    };

    const renderComposer = ( props ) => {
      return (
        <Composer 
          {...props}
          text={editingMessage.text}
          onTextChanged={text => setEditingMessage({...editingMessage, text:text})}
          textInputProps={{style:styles.textInput}}
        />
      );
    };

    const renderSend = ( props ) => {
      return (
        <Send 
          {...props} 
          containerStyle={{justifyContent:'center', marginLeft:6, marginRight:16}}
          text={editingMessage.text}
        >
          {isEditing ? 
            <MaterialCommunityIcons name='pencil-circle' size={32} color='#2089dc'/>
            : <Ionicons name='md-send' size={24} color='#2089dc'/>}
        </Send>
      );
    };

    const renderFooter = () => {
      if (isEditing) {
        return (
          <View style={{flexDirection:'row', alignItems:'center', backgroundColor:'#002089dc'}}>
            <TouchableOpacity onPress={() => {
                setIsEditing(false);
                setEditingMessage({text:'', _id:''});
              }}>
              <LeftFooterIcon name='cancel' size={24} color='white'/>
            </TouchableOpacity>
            <FooterText>Editing Message...</FooterText>
          </View>
        );
      }
      return null;
    };

    const scrollToBottomComponent = () => {
      return (
        <View>
          <Ionicons name='md-arrow-down' size={24} color='#2089dc'/>
        </View>
      );
    };

    const renderBubble = ( props ) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#2089dc'
            }
          }}
          textStyle={{
            right: {
              color: 'white'
            }
          }}
        />
      );
    };

    return (
        <GiftedChat
          messages={messages}
          onSend={message => onSend(message)}
          user={{
              _id: user.uid,
              name: user.displayName,
              avatar: user.photoURL,
          }}
          // isTyping={isTyping}
          // alwaysShowSend
          scrollToBottom
          onLongPress={onLongPress} // long press message bubble
          renderBubble={renderBubble}
          renderActions={renderActions}
          renderInputToolbar={renderInputToolbar}
          renderFooter={renderFooter}
          renderSend={renderSend}
          scrollToBottomComponent={scrollToBottomComponent}
          scrollToBottomStyle={{
            position: 'absolute',
            left: window.width/2 - 20, // 20 is from default button width in giftedchat is 40 divide by 2
          }}
        />
    );
}


const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderRadius: 24,
    fontSize: 16,
    backgroundColor: '#eee',
    marginVertical: 6,
    marginHorizontal: 10,
    paddingVertical: 4,
    paddingHorizontal: 16,
  }
});
