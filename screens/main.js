import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableHighlight, Image, Alert, ActivityIndicator } from 'react-native';
import { Button, Header } from 'react-native-elements';
import { SearchBar } from '../components/Searchbar';
import { Container, Card, UserImg
    , UserImgWrapper, UserInfo, UserName, MessageText
    , SendAtText, MainTextWrapper, TopTextWrapper
    , BottomTextWrapper } 
from '../styleComponents/MessagesStyles';

import { useHeaderHeight } from '@react-navigation/elements';

// Storage import(s)
import firestore from '@react-native-firebase/firestore';

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
    const { user } = useContext(AuthContext);
    const dataHolder = example;

    // states
    const [refreshing, setRefeshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState(dataHolder);
    const [dataOriginal, setDataOriginal] = useState(undefined);
    const [dataFiltered, setDataFiltered] = useState(dataOriginal || undefined);
    const [profileImgUrl, setProfileImgUrl] = useState(user?.photoURL || undefined);

    const onRefresh = useCallback( async () => {
        setRefeshing(true);
        setRefeshing(false);
    }, [refreshing])

    const filterSearch = (text) => {
        const newData = dataOriginal.filter(item => {
            const itemData = `${item.userName.toUpperCase()}`;
            return itemData.indexOf(text.toUpperCase()) > -1;
        });

        dataFiltered(newData);
    };

    const formatDisplayMessage = (type, sender_id, sender_name, text) => {
        if (sender_id === user.uid)
            return `You: ${text}`;
        else {
            if (type === 1) {  // 1 on 1 chat room
                return text;
            } else { // group chats
                return `${sender_name}: ${text}`;
            }
        }
    }

    const getRoomPhotoUrl = async (type, members) => {
        try {
            if (type === 1) { // 1 on 1 chat room
                for (const uid of members) {
                    if (user.uid !== uid) { // found the user image for the room
                        // return {uri: (await firestore().collection('Users').doc(uid).get()).get('photoURL')};

                        const result = (await firestore().collection('Users')
                                                        .doc(uid)
                                                        .get()).get('photoURL');
                        // console.log(result);
                        return result;
                    }
                }
            } else {
                const images = [];
                for (const uid of members) {
                    if (user.uid !== uid) { // found the user image for the room
                        
                    }
                }
            }
            
            // return default photo if nothing found
            return null;

        } catch(err) {
            alert(err);
            console.log('@getRoomPhotoUrl', err);
        }
    };

    useEffect(() => {
        setRefeshing(true);

        const unsubscribe = firestore().collection('Rooms')
                                        .orderBy('recentMessage.createdAt', 'desc') // sort room by most recentMessage
                                        .onSnapshot(querySnapshot => {
                                            let dataCards = querySnapshot.docs.map(docSnapshot => {
                                                return ({
                                                    rid: docSnapshot.id,
                                                    ...docSnapshot.data(),
                                                    createdAt: docSnapshot.data().createdAt?.toDate(),
                                                    modifiedAt: docSnapshot.data().modifiedAt?.toDate(),
                                                    recentMessage: {
                                                        ...docSnapshot.data().recentMessage,
                                                        createdAt: docSnapshot.data().recentMessage.createdAt?.toDate(),
                                                        modifiedAt: docSnapshot.data().recentMessage.modifiedAt?.toDate(),
                                                    }
                                                }); 
                                            });

                                            // remove card that doesn't have recentMessage
                                            dataCards = dataCards.filter(card => card.recentMessage.createdAt);

                                            for (const element of dataCards) {
                                                try {
                                                    if (element.type === 1) { // 1 on 1 chat room
                                                        for (const uid of element.members) {
                                                            if (user.uid !== uid) { // found the user image for the room
                                                                firestore().collection('Users')
                                                                            .doc(uid)
                                                                            .get()
                                                                            .then(doc => {
                                                                                // console.log('logging: ', doc.data().photoURL);
                                                                                element.roomPhotoUrl = doc.data().photoURL;
                                                                            });
                                                            }
                                                        }
                                                    } else if (element.type === 2){
                                                        const images = [];
                                                        for (const uid of members) {
                                                            if (user.uid !== uid) { // found the user image for the room
                                                                
                                                            }
                                                        }
                                                    } else {
                                                        // return default photo if nothing found
                                                        element.roomPhotoUrl = null;
                                                    }
                                                    
                                        
                                                } catch(err) {
                                                    alert(err);
                                                    console.log('@getRoomPhotoUrl', err);
                                                }
                                            }

                                            console.log('dataCards => ', dataCards);

                                            setDataOriginal(dataCards);
                                            setDataFiltered(dataCards);
                                        });

        setRefeshing(false);

        return () => unsubscribe();
    }, []);

    const UserAvatar = () => {
        return (
            <TouchableHighlight style={{height:50, width:50, borderRadius:40, marginLeft:8,}} onPress={() => navigation.navigate('Profile')}>
                <Image 
                    style={{height:50, width:50, borderRadius:30}} 
                    source={profileImgUrl ? {uri:profileImgUrl} : require('../assets/profileImg/blank-profile-picture.png')}/>
            </TouchableHighlight>
        );
    }

    if (refreshing) {
        return (
            <Container>
                <Header
                    statusBarProps={{
                        animated: true,
                         backgroundColor: '#2089DC'
                    }}
                    placement='left'
                    leftComponent={UserAvatar()}
                    centerComponent={{text:'Chats', style:{fontSize:24, fontWeight:'bold', color:'#fff'}}}
                    centerContainerStyle={{alignSelf:'center'}}
                    containerStyle={{
                        borderBottomWidth:0, 
                        shadowOpacity: 0, // This is for ios
                    }}
                />
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size='large'/>
                </View>
            </Container>
        );
    }

    return (
        <Container>
            <Header
                statusBarProps={{
                    animated: true,
                    backgroundColor: '#2089DC'
                }}
                placement='left'
                leftComponent={UserAvatar()}
                centerComponent={{text:'Chats', style:{fontSize:24, fontWeight:'bold', color:'#fff'}}}
                centerContainerStyle={{alignSelf:'center'}}
                containerStyle={{
                    borderBottomWidth:0, 
                    shadowOpacity: 0, // This is for ios
                }}
            />
            <FlatList
                keyboardShouldPersistTaps='handled'
                data={dataFiltered}
                keyExtractor={item => item.rid}
                ListHeaderComponent={
                    <SearchBar 
                        onChangeText={text => {
                            filterSearch(text);
                            setSearchText(text);
                        }} 
                        onClear={() => {
                            setSearchText('');
                            setDataFiltered(dataOriginal);
                        }} />
                }

                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <Card activeOpacity={0.5} onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                        <UserInfo>
                            <UserImgWrapper>
                                {/* <UserImg source={item.roomPhotoUrl ?
                                                    {uri:item.roomPhotoUrl}
                                                    : require('../assets/profileImg/blank-profile-picture.png')} // default user image
                                /> */}
                                <UserImg source={item.roomPhotoUrl ?
                                                    {uri: item.roomPhotoUrl}
                                                    : require('../assets/profileImg/blank-profile-picture.png')} // default user image
                                />
                            </UserImgWrapper>

                            <MainTextWrapper>
                                <TopTextWrapper>
                                    <UserName numberOfLines={1}>{user.displayName}</UserName>
                                    <SendAtText numberOfLines={1}>{item.recentMessage.createdAt?.toString()}</SendAtText>
                                </TopTextWrapper>

                                <BottomTextWrapper>
                                    <MessageText numberOfLines={1}>{ formatDisplayMessage(item.type, 
                                                                                        item.recentMessage?.sender._id,
                                                                                        item.recentMessage?.sender.name,
                                                                                        item.recentMessage?.text)}
                                    </MessageText>
                                    {/* <MessageText numberOfLines={1}>{item.recentMessage ? 'recent' : ''}</MessageText> */}
                                </BottomTextWrapper>
                            </MainTextWrapper>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    );
}



const styles = StyleSheet.create({});

const example = [
    {
        id: '3',
        userImg: require('../assets/profileImg/user-2.jpg'),
        userName: 'Boo',
        recentMessage: 'Takes an item from data and renders it into the list.',
        sendAt: '7:20 am'
    },
    {
        id: '1',
        userImg: require('../assets/profileImg/user-0.jpg'),
        userName: 'Bill',
        recentMessage: 'Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.',
        sendAt: '1:20 pm'
    },
    {
        id: '2',
        userImg: require('../assets/profileImg/user-1.jpg'),
        userName: 'Thomas',
        recentMessage: 'By default, the list looks for a key prop on each item and uses that for the React key. Alternatively, you can provide a custom keyExtractor prop.',
        sendAt: '12:25 pm'
    },
    {
        id: '4',
        userImg: require('../assets/profileImg/user-3.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '5',
        userImg: require('../assets/profileImg/user-4.jpg'),
        userName: 'Mad lad',
        recentMessage: 'I̶̙̺̳̞̩̒͆͆̽ͅ ̵̫̮̠̂̀̾̅̉̓̾̐̀̈́͘n̶͋͛̈́̓͑̓̎͌̊̑ͅę̵̛̲̘͌́̇̈́͛̂̓̓͘͠ȇ̵̗̬̺̗̬͕̠̗̓̄̋ͅͅd̶̡͙̦̤͖͈̱̪̙̞̿͒ͅ ̴̭̠̟̞̫̟̺̓̌̓͌̂͂̽͊͘͠ç̵̥̳͇͙͍̑̀̊͑̐́̌͂͗͘͜͝͝a̸̡̡̠͍͙̭̟̣͇̦̬͉̠͛̓͐̿̽̏̌̂͌̿̚͜͠ţ̴͍̯̠̦͌̔̑̐̆s̷̢͕̪͉͑͒̀͌̓̎̅͝ͅ',
        sendAt: '1:20 am'
    },
    {
        id: '6',
        userImg: require('../assets/profileImg/user-5.jpg'),
        userName: 'Internal state is not preserved when content scrolls out of the render window',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '7',
        userImg: require('../assets/profileImg/user-6.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '8',
        userImg: require('../assets/profileImg/user-7.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '9',
        userImg: require('../assets/profileImg/user-8.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '10',
        userImg: require('../assets/profileImg/user-10.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '11',
        userImg: require('../assets/profileImg/user-11.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
    {
        id: '12',
        userImg: require('../assets/profileImg/user-12.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am'
    },
];
