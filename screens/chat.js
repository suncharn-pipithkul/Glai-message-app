import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, useWindowDimensions, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import Ionicons from 'react-native-vector-icons/Ionicons';

// Storage import(s)
import firestore from '@react-native-firebase/firestore';

// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';


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
      const text = messages[0].text; // get the newest text

      // Stored new message in firestore
      await firestore().collection('Rooms').doc(rid).collection('messages').add({
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
    }, []);

    // Render Components
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
          renderBubble={renderBubble}
          renderSend={renderSend}
          scrollToBottomComponent={scrollToBottomComponent}
          scrollToBottomStyle={{
            position: 'absolute',
            left: window.width/2 - 20, // 20 is from default button width in giftedchat is 40 divide by 2
          }}
        />
    );
}



const styles = StyleSheet.create({});




const m = [
  {
    _id: 1,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 2,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 3,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 4,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 5,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 6,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 7,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 8,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 9,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 10,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 11,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 12,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 13,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 14,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 15,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 16,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 17,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 18,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 19,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 20,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
  {
    _id: 21,
    text:'h',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Mammy',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },
]