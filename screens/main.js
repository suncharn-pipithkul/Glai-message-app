import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, Card, TextWrapper, UserImg, UserImgWrapper, UserInfo, UserName, MessageText } from '../components/MessagesStyles';

// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';

const example = [
    {
        id: '1',
        userImg: require('../assets/profileImg/user-0.jpg'),
        user: 'Bill',
        recentMessage: 'Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.',
        sendAt: '1:20 PM'
    },
    {
        id: '2',
        userImg: require('../assets/profileImg/user-1.jpg'),
        user: 'Thomas',
        recentMessage: 'By default, the list looks for a key prop on each item and uses that for the React key. Alternatively, you can provide a custom keyExtractor prop.',
        sendAt: '12:25 PM'
    },
    {
        id: '3',
        userImg: require('../assets/profileImg/user-2.jpg'),
        user: 'Boogi',
        recentMessage: 'Takes an item from data and renders it into the list.',
        sendAt: '7:20 AM'
    },
    {
        id: '4',
        userImg: require('../assets/profileImg/user-3.jpg'),
        user: 'Jugi',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 AM'
    },
    {
        id: '5',
        userImg: require('../assets/profileImg/user-4.jpg'),
        user: 'Jugi',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 AM'
    },
    {
        id: '6',
        userImg: require('../assets/profileImg/user-5.jpg'),
        user: 'Jugi',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 AM'
    },
    {
        id: '7',
        userImg: require('../assets/profileImg/user-6.jpg'),
        user: 'Jugi',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 AM'
    },
    {
        id: '8',
        userImg: require('../assets/profileImg/user-7.jpg'),
        user: 'Jugi',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 AM'
    },
    {
        id: '9',
        userImg: require('../assets/profileImg/user-8.jpg'),
        user: 'Jugi',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 AM'
    },
];

// a function that cut off the text longer than MAX_LENGTH and put ...
const textDisplayFormat = (text) => {
    const MAX_LENGTH = 35;
    if (text.trim().length < MAX_LENGTH)
        return text.trim()
    return `${text.trim().substr(0, MAX_LENGTH)}...`
};

export default function MainScreen({ navigation }) {
    const { user, onSignout } = useContext(AuthContext);
    const [refreshing, setRefeshing] = useState(false);

    const onRefresh = useCallback( async () => {
        setRefeshing(true);
        setRefeshing(false);
    }, [refreshing])

    return (
        <Container>
            <FlatList
                style={{width:'100%'}}
                data={example}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <Card activeOpacity={0.5}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.userImg}/>
                            </UserImgWrapper>
                            <TextWrapper>
                                <UserName>{textDisplayFormat(item.user)}</UserName>
                                <MessageText>{textDisplayFormat(item.recentMessage)}</MessageText>
                            </TextWrapper>
                        </UserInfo>
                    </Card>
                )}
            />
            <Button 
                title='Chat Room'
                containerStyle={[globalStyles.button, {marginBottom:10}]} 
                buttonStyle={globalStyles.button}
                raised
                onPress={() => navigation.navigate('Chat')}
            />
            <Button 
                title='SIGN OUT'
                containerStyle={globalStyles.button} 
                buttonStyle={globalStyles.button}
                raised
                onPress={() => onSignout()}
            />
        </Container>
    );
}



const styles = StyleSheet.create({});
