import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableHighlight} from 'react-native';
import { Header } from 'react-native-elements';
import { Container } from '../styleComponents/MessagesStyles';

// Context
import { AuthContext } from '../context/AuthContext';

export default function FriendsScreen() {
    const { user, onSignout } = useContext(AuthContext);

    const [profileImgUrl, setProfileImgUrl] = useState(user?.photoURL || undefined);

    const UserAvatar = () => {
        return (
            <TouchableHighlight style={{height:50, width:50, borderRadius:40, marginLeft:8,}} onPress={() => navigation.navigate('Profile')}>
                <Image style={{height:50, width:50, borderRadius:30}} source={profileImgUrl ? {uri:profileImgUrl} : require('../assets/profileImg/blank-profile-picture.png')}/>
            </TouchableHighlight>
        );
    }

    return (
        // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Container>
            <Header
                placement='left'
                leftComponent={UserAvatar()}
                centerComponent={{text:'Chats', style:{fontSize:24, fontWeight:'bold', color:'#fff'}}}
                centerContainerStyle={{alignSelf:'center'}}
                containerStyle={{
                    borderBottomWidth:0, 
                    shadowOpacity: 0, // This is for ios
                }}
            />
            <Text>friends</Text>
        </Container>
    );
}