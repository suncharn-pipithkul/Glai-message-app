import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'

// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';


export default function ChatScreen({ navigation }) {
    const { user, onSignout } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])
    
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

    return (
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: 1,
        }}
        />
        // <View>
        //     <Text>Chat Screen</Text>
        //     <Button 
        //         title='Return'
        //         containerStyle={globalStyles.button} 
        //         buttonStyle={globalStyles.button}
        //         raised
        //         onPress={() => navigation.navigate('Main')}
        //     />
        // </View>
    );
}



const styles = StyleSheet.create({});
