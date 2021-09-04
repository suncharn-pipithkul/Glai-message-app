import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, Card, MiddleTextWrapper, UserImg
    , UserImgWrapper, UserInfo, UserName, MessageText
    , EndTextWrapper, SendAtText, MainTextWrapper, TopTextWrapper, BottomTextWrapper } from '../components/MessagesStyles';

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
        sendAt: '1:20 pm'
    },
    {
        id: '2',
        userImg: require('../assets/profileImg/user-1.jpg'),
        user: 'Thomas',
        recentMessage: 'By default, the list looks for a key prop on each item and uses that for the React key. Alternatively, you can provide a custom keyExtractor prop.',
        sendAt: '12:25 pm'
    },
    {
        id: '3',
        userImg: require('../assets/profileImg/user-2.jpg'),
        user: 'Boo',
        recentMessage: 'Takes an item from data and renders it into the list.',
        sendAt: '7:20 am'
    },
    {
        id: '4',
        userImg: require('../assets/profileImg/user-3.jpg'),
        user: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '5',
        userImg: require('../assets/profileImg/user-4.jpg'),
        user: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '6',
        userImg: require('../assets/profileImg/user-5.jpg'),
        user: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '7',
        userImg: require('../assets/profileImg/user-6.jpg'),
        user: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '8',
        userImg: require('../assets/profileImg/user-7.jpg'),
        user: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '9',
        userImg: require('../assets/profileImg/user-8.jpg'),
        user: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
];

// a function that cut off the text longer than MAX_LENGTH and put ...
const textDisplayFormat = (text) => {
    const MAX_LENGTH = 30;
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
                // showsVerticalScrollIndicator={true}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <Card activeOpacity={0.5} onPress={() => alert(item.user)}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.userImg}/>
                            </UserImgWrapper>

                            <MainTextWrapper>
                                <TopTextWrapper>
                                    <UserName>{textDisplayFormat(item.user)}</UserName>
                                    <SendAtText>{item.sendAt}</SendAtText>
                                </TopTextWrapper>

                                <BottomTextWrapper>
                                    <MessageText>{textDisplayFormat(item.recentMessage)}</MessageText>
                                </BottomTextWrapper>
                            </MainTextWrapper>
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
