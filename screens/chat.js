import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, useWindowDimensions, Text, View, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat'
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Storage import(s)
import firestore from '@react-native-firebase/firestore';

// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';
import { TextInput } from 'react-native-gesture-handler';


export default function ChatScreen({ navigation, route }) {
    const window = useWindowDimensions();
    const { rid } = route.params;

    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    // Load messages for this room from firestore
    useEffect(() => {
      const messagesListener = firestore().collection('Rooms')
                                          .doc(rid)
                                          .collection('messages')
                                          .orderBy('createdAt', 'desc')
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
    const onSend = useCallback( async (messages = []) => {
      try {
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
          }
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
      } catch(err) {
        alert(err);
        console.log('@onSend', err);
      }
      
    }, []);

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
            await messagesCollection.doc(message._id).update({
              text: 'good',
              modifiedAt: firestore.FieldValue.serverTimestamp(),
            });
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
    const renderInputToolbar = ( props ) => {
      return (
        <InputToolbar 
          {...props}
          containerStyle={{borderRadius:30, marginLeft:5, marginRight:5}}
          renderComposer={renderComposer}
        />
      );
    };

    const renderComposer = ( props ) => {
      return (
        <Composer 
          {...props}
          // textInputStyle={}
        />
      );
    };

    const scrollToBottomComponent = () => {
      return (
        <View>
          <Ionicons name='md-arrow-down' size={24} color='#2089dc'/>
        </View>
      );
    };

    const renderSend = ( props ) => {
      return (
        <Send {...props}>
          {/* <View style={{backgroundColor:'yellowgreen'}}>
            <Ionicons name='md-send' size={24} color='#2089dc'/>
          </View> */}
        </Send>
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
          alwaysShowSend
          scrollToBottom
          onLongPress={onLongPress} // long press message bubble
          renderBubble={renderBubble}
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          scrollToBottomComponent={scrollToBottomComponent}
          scrollToBottomStyle={{
            position: 'absolute',
            left: window.width/2 - 20, // 20 is from default button width in giftedchat is 40 divide by 2
          }}
        />
    );
}


const styles = StyleSheet.create({});
