import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Image, FlatList, SectionList, TouchableHighlight, TouchableOpacity, StyleSheet} from 'react-native';
import { Header } from 'react-native-elements';
import { SearchBar } from '../components/Searchbar';
// import { Container } from '../styleComponents/MessagesStyles';
import { Container, Card, UserImg
    , UserImgWrapper, UserInfo, UserName
    , SendAtText, MainTextWrapper, TopTextWrapper
    , BottomTextWrapper, 
    FriendText,
    CheckIcon,
    RightTagWrapper,
    TextAlignWrapper} 
from '../styleComponents/MessagesStyles';

// Context
import { AuthContext } from '../context/AuthContext';

export default function FriendsScreen({ navigation }) {
    const { user, onSignout } = useContext(AuthContext);

    // states
    const [refreshing, setRefeshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [profileImgUrl, setProfileImgUrl] = useState(user?.photoURL || undefined);

    const onRefresh = useCallback( async () => {
        setRefeshing(true);
        setRefeshing(false);
    }, [refreshing])


    const UserAvatar = () => {
        return (
            <TouchableHighlight style={{height:50, width:50, borderRadius:40, marginLeft:8,}} onPress={() => navigation.navigate('Profile')}>
                <Image style={{height:50, width:50, borderRadius:30}} source={profileImgUrl ? {uri:profileImgUrl} : require('../assets/profileImg/blank-profile-picture.png')}/>
            </TouchableHighlight>
        );
    }

    const AddButton = () => {
        return (
            <TouchableOpacity activeOpacity={0.4} style={styles.addButton} onPress={() => navigation.navigate('Add Friend')}>
                <Text style={{fontSize:18, color:isPressed ? 'white':'#0073CE'}}>+ add</Text>
            </TouchableOpacity>
            // <TouchableHighlight 
            //     onPressIn={() => setIsPressed(true)}
            //     onPressOut={() => setIsPressed(false)}
            //     underlayColor='#0073CE'
            //     style={styles.addButton}>
            //     <Text style={{fontSize:18, color:isPressed ? 'white':'#0073CE'}}>+ add</Text>
            // </TouchableHighlight>
        );
    };

    return (
        <Container>
            <Header
                placement='left'
                leftComponent={UserAvatar()}
                centerComponent={{text:'Friends', style:{fontSize:24, fontWeight:'bold', color:'#fff'}}}
                // rightComponent={AddButton()}
                centerContainerStyle={{alignSelf:'center'}}
                rightContainerStyle={{alignSelf:'center'}}
                containerStyle={{
                    borderBottomWidth:0, 
                    shadowOpacity: 0, // This is for ios
                }}
            />
            <SectionList
                keyboardShouldPersistTaps='handled'
                ListHeaderComponent={() => <SearchBar/>}
                sections={[
                    {title: 'Friends', data: example.filter(item => item.friend)},
                    {title: '', data: example.filter(item => !item.friend)},
                ]}
                keyExtractor={item => item.id}
                renderSectionHeader={({ section }) => (
                    <Text>{section.title}</Text>
                )}
                renderItem={({ item }) => (
                    <Card activeOpacity={0.5} onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.userImg}/>
                            </UserImgWrapper>

                            <MainTextWrapper>
                                <TextAlignWrapper>
                                    <TopTextWrapper>
                                        <UserName numberOfLines={1}>{item.userName}</UserName>
                                        {
                                            !item.friend ? null :
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
            />
            {/* <FlatList
                keyboardShouldPersistTaps='handled'
                data={example}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => <SearchBar/>}

                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <Card activeOpacity={0.5} onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={item.userImg}/>
                            </UserImgWrapper>

                            <MainTextWrapper>
                                <TextAlignWrapper>
                                    <TopTextWrapper>
                                        <UserName numberOfLines={1}>{item.userName}</UserName>
                                        {
                                            !item.friend ? null :
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
            /> */}
        </Container>
    );
}

const styles = StyleSheet.create({
    addButton: {
        height: 30,
        width: 60,
        borderRadius: 10,
        marginRight: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const example = [
    {
        id: '3',
        userImg: require('../assets/profileImg/user-2.jpg'),
        userName: 'Boo',
        recentMessage: 'Takes an item from data and renders it into the list.',
        sendAt: '7:20 am',
        friend: true
    },
    {
        id: '1',
        userImg: require('../assets/profileImg/user-0.jpg'),
        userName: 'Bill',
        recentMessage: 'Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.',
        sendAt: '1:20 pm',
        friend: true
    },
    {
        id: '2',
        userImg: require('../assets/profileImg/user-1.jpg'),
        userName: 'Thomas',
        recentMessage: 'By default, the list looks for a key prop on each item and uses that for the React key. Alternatively, you can provide a custom keyExtractor prop.',
        sendAt: '12:25 pm',
        friend: false
    },
    {
        id: '4',
        userImg: require('../assets/profileImg/user-3.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am',
        friend: true
    },
    {
        id: '5',
        userImg: require('../assets/profileImg/user-4.jpg'),
        userName: 'Mad lad',
        recentMessage: 'I̶̙̺̳̞̩̒͆͆̽ͅ ̵̫̮̠̂̀̾̅̉̓̾̐̀̈́͘n̶͋͛̈́̓͑̓̎͌̊̑ͅę̵̛̲̘͌́̇̈́͛̂̓̓͘͠ȇ̵̗̬̺̗̬͕̠̗̓̄̋ͅͅd̶̡͙̦̤͖͈̱̪̙̞̿͒ͅ ̴̭̠̟̞̫̟̺̓̌̓͌̂͂̽͊͘͠ç̵̥̳͇͙͍̑̀̊͑̐́̌͂͗͘͜͝͝a̸̡̡̠͍͙̭̟̣͇̦̬͉̠͛̓͐̿̽̏̌̂͌̿̚͜͠ţ̴͍̯̠̦͌̔̑̐̆s̷̢͕̪͉͑͒̀͌̓̎̅͝ͅ',
        sendAt: '1:20 am',
        friend: false
    },
    {
        id: '6',
        userImg: require('../assets/profileImg/user-5.jpg'),
        userName: 'Internal state is not preserved when content scrolls out of the render window',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am',
        friend: false
    },
    {
        id: '7',
        userImg: require('../assets/profileImg/user-6.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am',
        friend: true
    },
    {
        id: '8',
        userImg: require('../assets/profileImg/user-7.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am',
        friend: false
    },
    {
        id: '9',
        userImg: require('../assets/profileImg/user-8.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am',
        friend: false
    },
    {
        id: '10',
        userImg: require('../assets/profileImg/user-10.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am',
        friend: false
    },
    {
        id: '11',
        userImg: require('../assets/profileImg/user-11.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am',
        friend: true
    },
    {
        id: '12',
        userImg: require('../assets/profileImg/user-12.jpg'),
        userName: 'Hammy',
        recentMessage: 'Meow meow.',
        sendAt: '1:20 am',
        friend: false
    },
];

example.sort((a, b) => (a.userName > b.userName) ? 1 : -1);