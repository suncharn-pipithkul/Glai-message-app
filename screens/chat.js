import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, useWindowDimensions, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import Ionicons from 'react-native-vector-icons/Ionicons';

// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';


export default function ChatScreen({ navigation }) {
    const window = useWindowDimensions();

    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        setMessages(m);
        // setMessages([
        //   {
        //     _id: 1,
        //     text: 'Hello developer',
        //     createdAt: new Date(),
        //     user: {
        //       _id: 2,
        //       name: 'React Native',
        //       avatar: 'https://placeimg.com/140/140/any',
        //     },
        //   },
        // ])
      }, []);
    
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);

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
              _id: 1,
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