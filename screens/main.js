import React, { useState, useEffect, useContext, useCallback } from 'react';

// Components import(s)
import { 
    View, 
    FlatList, 
    TouchableHighlight, 
    Image, 
    ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from '../components/Searchbar';
import { 
    Container, 
    Card, 
    UserImg, 
    UserImgWrapper, 
    UserInfo, 
    UserName, 
    MessageText, 
    SendAtText, 
    MainTextWrapper, 
    TopTextWrapper, 
    BottomTextWrapper } from '../styleComponents/MessagesStyles';

// Utility import(s)
import moment from 'moment';

// Storage import(s)
import firestore from '@react-native-firebase/firestore';

// Context
import { AuthContext } from '../context/AuthContext';


export default function MainScreen({ navigation }) {
    const { user } = useContext(AuthContext);

    // states
    const [refreshing, setRefeshing] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [users, setUsers] = useState(undefined);
    const [rooms, setRooms] = useState(undefined);
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

    // Function to format how recent message is displayed in each card
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
    };

    // Function to format how recent message time is displayed in each card
    const formatDisplayTime = (dateTime) => {
        const now = moment();
        const msgTime = moment(dateTime);
        
        if (now.isSame(msgTime, 'day')) { // same day
            return msgTime.format('h:mm A');
        } else if (now.isoWeek() == msgTime.isoWeek()) { // same week
            return msgTime.format('ddd');
        } else if (now.isSame(msgTime, 'year')) { // same year
            return msgTime.format('D MMM');
        } else {
            return msgTime.format('D MMM yyyy');
        }
    };

    // attach listener for any changes in firestore Rooms (new messages, create/delete rooms)
    useEffect(() => {
        setRefeshing(true);

        const roomsCollectionSorted = firestore().collection('Rooms')
                                            .orderBy('recentMessage.createdAt', 'desc'); // sort room by most recent messages
        const unsub = roomsCollectionSorted
                        .onSnapshot(querySnapshot => {
                            let roomsData = querySnapshot.docs.map(docSnapshot => {
                                return {
                                    rid: docSnapshot.id,
                                    ...docSnapshot.data(),
                                    createdAt: docSnapshot.data().createdAt?.toDate(),
                                    modifiedAt: docSnapshot.data().modifiedAt?.toDate(),
                                    recentMessage: {
                                        ...docSnapshot.data().recentMessage,
                                        createdAt: docSnapshot.data().recentMessage.createdAt?.toDate(),
                                        modifiedAt: docSnapshot.data().recentMessage.modifiedAt?.toDate(),
                                    }
                                };
                            });

                            // remove card that doesn't have recentMessage
                            roomsData = roomsData.filter(card => card.recentMessage.createdAt);

                            setRooms(roomsData);
                        });

        setRefeshing(false);

        return () => unsub();
    }, []);

    // attach listener for any changes in firestore Users (for avatar photo changes)
    useEffect(() => {
        setRefeshing(true);

        const usersCollection = firestore().collection('Users');
        const unsub = usersCollection
                        .onSnapshot(querySnapshot => {
                            let usersData = [];

                            querySnapshot.forEach(docSnapshot => {
                                usersData.push({
                                    uid: docSnapshot.data().uid,
                                    displayName: docSnapshot.data().displayName,
                                    photoURL: docSnapshot.data().photoURL,
                                });
                            });

                            setUsers(usersData);
                        });

        setRefeshing(false);
        return () => unsub();
    }, []);

    //  join 2 async states retrieve from firestore into 1 object for Flatlist
    useEffect(() => {
        let newData = {};

        if (rooms && rooms.length > 0 && users && users.length > 0) {
            newData = rooms.map(room => {return {...room}}); // copy rooms array
            newData.forEach(room => { // add property roomPhotoUrl
                if (room.type === 1) { // 1-1 chat room, get 1 other user photo
                    const selectedMemberUid = room.members.find(member_uid => member_uid !== user.uid);
                    room.roomPhotoUrl = users.find(obj => obj.uid === selectedMemberUid).photoURL;
                    if (!room.name)
                        room.name = users.find(obj => obj.uid === selectedMemberUid).displayName;
                        
                } else if (room.type === 2) { // group room, get 2 users photos
                    room.roomPhotoUrl = undefined; // TODO add multiphotos
                    if (!room.name)
                        room.name = 'default';
                } else { // else no room photo
                    room.roomPhotoUrl = undefined;
                    if (!room.name)
                        room.name = 'error';
                }
            });

            setDataOriginal(newData);
            setDataFiltered(newData);
        }

    }, [rooms, users])

    const handleCardPress = async (room) => {
        try {
            // Get the room user clicked from firestore
            const roomsCollection = firestore().collection('Rooms');
            const roomDoc = roomsCollection.doc(room.rid);

            navigation.navigate('Chat', {members: room.members, rid: roomDoc.id, type: 1, roomName: room.name, roomPhotoUrl: room.roomPhotoUrl});
        } catch(err) {
            alert(err);
            console.log('@handleCardPress', err);
        }
    };

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
                    <Card activeOpacity={0.5} onPress={() => handleCardPress(item)}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.roomPhotoUrl ?
                                                    {uri: item.roomPhotoUrl}
                                                    : require('../assets/profileImg/blank-profile-picture.png')} // default user image
                                />
                            </UserImgWrapper>

                            <MainTextWrapper>
                                <TopTextWrapper>
                                    <UserName numberOfLines={1}>{item.name}</UserName>
                                    <SendAtText numberOfLines={1}>{formatDisplayTime(item.recentMessage.createdAt)}</SendAtText>
                                </TopTextWrapper>

                                <BottomTextWrapper>
                                    <MessageText numberOfLines={1}>{ formatDisplayMessage(item.type, 
                                                                                        item.recentMessage?.sender._id,
                                                                                        item.recentMessage?.sender.name,
                                                                                        item.recentMessage?.text)}
                                    </MessageText>
                                </BottomTextWrapper>
                            </MainTextWrapper>
                        </UserInfo>
                    </Card>
                )}
            />
        </Container>
    );
}
