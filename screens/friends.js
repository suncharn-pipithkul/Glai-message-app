import React, { useState, useEffect, useContext, useCallback } from 'react';

// Components import(s)
import { 
    ActivityIndicator, 
    View, 
    Text, 
    Image, 
    SectionList, 
    TouchableHighlight, 
    TouchableOpacity, 
    StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from '../components/Searchbar';
import { 
    Container, 
    Card, 
    UserImg, 
    UserImgWrapper, 
    UserInfo, 
    UserName, 
    MainTextWrapper, 
    TopTextWrapper, 
    FriendText,
    CheckIcon,
    RightTagWrapper,
    TextAlignWrapper,
    SectionHeaderWrapper,
    SectionHeader} from '../styleComponents/MessagesStyles';

// Storage import(s)
import firestore from '@react-native-firebase/firestore';

// Context import(s)
import { AuthContext } from '../context/AuthContext';
import { FriendStackContext } from '../context/FriendStackContext';

// Styles import(s)
import { globalStyles } from '../styles/globalStyles';

// Utilities import(s)
import _ from 'lodash';

const LoadingScreen = () => {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size='large'/>
      </View>
    );
  };

// -------------------------------- Main Component -------------------------------- //
export default function FriendsScreen({ navigation }) {
    // Context
    const { user } = useContext(AuthContext);

    // Load All users Data from firestore
    useEffect(() => {
        try {
            const subscriber = firestore()
                                .collection('Users')
                                .onSnapshot(querySnapshot => {
                                    let users = [];
                                    let friendsList = [];

                                    querySnapshot.forEach(docSnapshot => {
                                        if (docSnapshot.data()['uid'] === user.uid) {
                                            friendsList = docSnapshot.data()['friends'];
                                        } else {  // don't add the current user into his/her own searchable users.
                                            users.push({
                                                ...docSnapshot.data(),
                                                key: docSnapshot.id,
                                            });
                                        }
                                    });

                                    // add property boolean isFriend? to each object in the list
                                    for(const element of users)
                                        element.isFriend = friendsList.includes(element.uid);

                                    // Initial data (all users)
                                    setDataOriginal(users);
                                    setDataFiltered(users);
                                });
            return () => subscriber();
        } catch(err) {
            alert(err);
            console.log('@onLoadData', err);
        } finally {
            setLoading(false);
        }

        return () => subscriber();
    }, []);

    // States
    const [loading, setLoading] = useState(true); // loading to fetch initial data
    const [refreshing, setRefeshing] = useState(false); // loading for refreshing data
    const [searchText, setSearchText] = useState('');
    const [dataOriginal, setDataOriginal] = useState(undefined); // array of unfiltered data
    const [dataFiltered, setDataFiltered] = useState(dataOriginal || undefined); // array of filtered data for displaying cards on SectionList
    const [profileImgUrl, setProfileImgUrl] = useState(user?.photoURL || undefined);
    const [isShowNonFriend, setIsShowNonFriend] = useState(false);

    // ********************************** DEBUG ********************************** //
    // console.log('================================== BREAK ==================================');
    // console.log(`dataOriginal:`);
    // dataOriginal?.forEach(item => {
    //     console.log(item.photoURL);
    // });


    // Function when user pull down the SectionList to refresh data
    const onRefresh = useCallback( async () => {
        setRefeshing(true);
        setRefeshing(false);
    }, [refreshing])

    // Function that created an array of data that match the search text 
    // and set it as the new data state 
    const filterSearch = (text) => {
        // Create a new data that filtered out userName that doesn't match search text
        const newData = dataOriginal.filter(item => {
            const itemData = `${item.displayName.toUpperCase()}`;
            return itemData.indexOf(text.toUpperCase()) > -1;
        });

        setDataFiltered(newData);
    };

    const handleCardPress = async (otherUser) => {
        try {
            let roomExistId = undefined;

            // If current user has a roomchat with this user, get info of that roomchat
            const usersCollection = firestore().collection('Users');
            const roomsCollection = firestore().collection('Rooms');
            const currentUserDoc = usersCollection.doc(user.uid);

            const rooms = (await currentUserDoc.get()).get('rooms'); // all rooms current user is in
            for (const rid of rooms) {
                let curRoomDoc = roomsCollection.doc(rid);
                let members = (await curRoomDoc.get()).get('members'); // all members for this room
                if (_.isEqual(new Set(members), new Set([user.uid, otherUser.uid]))) {
                    roomExistId = rid;
                    break;
                }
            }

            let roomDoc = undefined;
            if (roomExistId) {
                roomDoc = roomsCollection.doc(roomExistId); // get the existing room
            } else {  // Else create a new room
                // Set up Rooms collection
                roomDoc = roomsCollection.doc();
                await roomDoc.set({
                    rid: roomDoc.id,
                    createdBy: user.uid,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    modifiedAt: null,
                    type: 1, // 1-1 chat
                    name: null,
                    roomPhotoUrl: null,
                    members: [user.uid, otherUser.uid],
                    recentMessage: {
                        mid: null,
                        sender: null,
                        text: null,
                        createdAt: null,
                        modifiedAt: null,
                        readBy: [],
                    },
                    // messages: [],
                });
    
                // Update current user's rooms
                await currentUserDoc.update({
                    rooms: firestore.FieldValue.arrayUnion(roomDoc.id),
                });
    
                // Update other user's rooms
                const otherUserDoc = usersCollection.doc(otherUser.uid);
                await otherUserDoc.update({
                    rooms: firestore.FieldValue.arrayUnion(roomDoc.id),
                });
            }

            // navigate to chat screen
            navigation.navigate('Chat', {members: otherUser.members, rid: roomDoc.id, type: 1, roomName: otherUser.displayName, roomPhotoUrl: otherUser.photoURL});
        } catch(err) {
            alert(err);
            console.log('@handleCardPress', err);
        }
    };

    // Components
    const UserAvatar = () => {
        return (
            <TouchableHighlight style={{height:50, width:50, borderRadius:40, marginLeft:8,}} onPress={() => navigation.navigate('Profile')}>
                <Image style={{height:50, width:50, borderRadius:30}} source={profileImgUrl ? {uri:profileImgUrl} : require('../assets/profileImg/blank-profile-picture.png')}/>
            </TouchableHighlight>
        );
    }

    const AddButton = ({ item }) => {
        const [loadAdding, setLoadAdding] = useState(false);

        return (
            <TouchableOpacity 
                hitSlop={{top:4, left:4, bottom:4, right:4}} 
                activeOpacity={0.4} 
                style={styles.addButton} 
                onPress={() => {
                    setLoadAdding(true);

                    // Update data array state
                    let updatedOriginalList = dataOriginal.map(i => {
                        if (i.uid === item.uid)
                            return {...i, friend: true};
                        return i;
                    });
                    let updatedFilteredList = dataFiltered.map(i => {
                        if (i.uid === item.uid)
                            return {...i, friend: true};
                        return i;
                    });
                    setDataFiltered(updatedFilteredList);
                    setDataOriginal(updatedOriginalList);
                    
                    // Update firestore Users collection
                    try {
                        const usersCollection = firestore().collection('Users');
                        const userDoc = usersCollection.doc(user.uid);
                        userDoc.update({
                            friends: firestore.FieldValue.arrayUnion(item.uid),
                        });
                    } catch(err) {
                        alert(err);
                        console.log('@AddButton', err);
                    }
            
                    setLoadAdding(false);
                }}>
                {!loadAdding ? <Text style={{fontSize:18, color:'white'}}>+ add</Text> : <ActivityIndicator color='white'/>}
            </TouchableOpacity>
        );
    };

    if (loading)
        return <LoadingScreen />;
    
    return (
        <Container>
            <Header
                statusBarProps={{
                    animated: true,
                    backgroundColor: '#2089DC'
                }}
                placement='left'
                leftComponent={UserAvatar()}
                centerComponent={{text:'Friends', style:{fontSize:24, fontWeight:'bold', color:'#fff'}}}
                centerContainerStyle={{alignSelf:'center'}}
                rightContainerStyle={{alignSelf:'center'}}
                containerStyle={{
                    borderBottomWidth:0, 
                    shadowOpacity: 0, // This is for ios
                }}
            />
            {!refreshing ? 
            <SectionList
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListHeaderComponent={
                    <SearchBar
                        onChangeText={text => {
                            filterSearch(text);
                            setSearchText(text);
                            setIsShowNonFriend(text !== '');
                        }} 
                        onClear={() => {
                            setRefeshing(true);
                            setSearchText('');
                            setIsShowNonFriend(false);
                            setDataFiltered(dataOriginal);
                            setRefeshing(false);
                        }} />
                }
                sections={[
                    {title: 'Friends', data:  dataFiltered ? dataFiltered.filter(item => item.isFriend) : []},
                    {title: 'NonFriends', data: isShowNonFriend ? dataFiltered?.filter(item => !item.isFriend) : []},
                ]}
                keyExtractor={item => item.uid}
                renderSectionHeader={({ section }) => (
                    <SectionHeaderWrapper>
                        <SectionHeader />
                    </SectionHeaderWrapper>
                )}
                renderItem={({ item }) => (
                    <Card activeOpacity={0.5} onPress={() => handleCardPress(item)}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.photoURL ? 
                                                    {uri:item.photoURL} 
                                                    : require('../assets/profileImg/blank-profile-picture.png')} // default user image
                                /> 
                            </UserImgWrapper>
    
                            <MainTextWrapper>
                                <TextAlignWrapper>
                                    <TopTextWrapper>
                                        <UserName numberOfLines={1}>{item.displayName}</UserName>
                                        {
                                            !item.isFriend ? <AddButton item={item}/> :
                                                <RightTagWrapper>
                                                    <FriendText>friend</FriendText>
                                                    <CheckIcon name='checkmark-circle' size={24} color='#2089DC'/>
                                                </RightTagWrapper>
                                        }
                                            
                                    </TopTextWrapper>
                                </TextAlignWrapper>
                            </MainTextWrapper>
                        </UserInfo>
                    </Card>
                )}
            /> : <LoadingScreen />}
        </Container>
    );
}

const styles = StyleSheet.create({
    addButton: {
        height: 30,
        width: 60,
        borderRadius: 10,
        marginRight: 8,
        backgroundColor: '#EA830B',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

let example = [
    {
        id: '3',
        userImg: require('../assets/profileImg/user-2.jpg'),
        userName: 'Boo',
        friend: true
    },
    {
        id: '1',
        userImg: require('../assets/profileImg/user-0.jpg'),
        userName: 'Bill',
        friend: true
    },
    {
        id: '2',
        userImg: require('../assets/profileImg/user-1.jpg'),
        userName: 'Thomas',
        friend: false
    },
    {
        id: '4',
        userImg: require('../assets/profileImg/user-3.jpg'),
        userName: 'Hammy',
        friend: true
    },
    {
        id: '5',
        userImg: require('../assets/profileImg/user-4.jpg'),
        userName: 'Mad lad',
        friend: false
    },
    {
        id: '6',
        userImg: require('../assets/profileImg/user-5.jpg'),
        userName: 'Internal state is not preserved when content scrolls out of the render window',
        friend: false
    },
    {
        id: '7',
        userImg: require('../assets/profileImg/user-6.jpg'),
        userName: 'Hammy1',
        friend: true
    },
    {
        id: '8',
        userImg: require('../assets/profileImg/user-7.jpg'),
        userName: 'Hammy2',
        friend: false
    },
    {
        id: '9',
        userImg: require('../assets/profileImg/user-8.jpg'),
        userName: 'Hammy3',
        friend: false
    },
    {
        id: '10',
        userImg: require('../assets/profileImg/user-10.jpg'),
        userName: 'Hammy4',
        friend: false
    },
    {
        id: '11',
        userImg: require('../assets/profileImg/user-11.jpg'),
        userName: 'Hammy5',
        friend: true
    },
    {
        id: '12',
        userImg: require('../assets/profileImg/user-12.jpg'),
        userName: 'Hammy6',
        friend: false
    },
];

example.sort((a, b) => a.userName > b.userName);