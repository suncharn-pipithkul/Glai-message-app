import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, FlatList, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { SearchBar2 } from '../components/Searchbar';
import { SearchBar } from 'react-native-elements';
import { Container, Card, UserImg
    , UserImgWrapper, UserInfo, UserName, MessageText
    , SendAtText, MainTextWrapper, TopTextWrapper
    , BottomTextWrapper } from '../styleComponents/MessagesStyles';

// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';

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
    const [searchText, setSearchText] = useState('');

    const onRefresh = useCallback( async () => {
        setRefeshing(true);
        setRefeshing(false);
    }, [refreshing])

    return (
        <Container>
            <SearchBar/>
            <FlatList
                data={example}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => <SearchBar2></SearchBar2>}

                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <Card activeOpacity={0.5} onPress={() => navigation.navigate('Chat')}>
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
