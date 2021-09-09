import React, { useState, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

// styles
import { globalStyles } from '../styles/globalStyles';

// Context
import { AuthContext } from '../context/AuthContext';


export default function ProfileScreen() {
    const { user, onSignout } = useContext(AuthContext);

    const [profileImgUrl, setProfileImgUrl] = useState(user?.photoURL || undefined);

    const UserAvatar = () => {
        return (
            // <TouchableHighlight style={{height:100, width:100, borderRadius:50, marginLeft:8,}} onPress={() => navigation.navigate('Profile')}>
                <Image style={{height:100, width:100, borderRadius:50}} source={profileImgUrl ? 
                    {uri:profileImgUrl} 
                    : require('../assets/profileImg/blank-profile-picture.png')}/>
            // </TouchableHighlight>
        );
    }

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <UserAvatar/>
            <Text>{user.displayName}</Text>
            <Text>{user.email}</Text>
            <Text>Profile Screen1</Text>
            <Text>Profile Screen2</Text>
            <Text>Profile Screen3</Text>
            <Text>Profile Screen4</Text>
            <Text>Profile Screen5</Text>
            <Text>Profile Screen6</Text>
            <Text>Profile Screen7</Text>
            <Text>Profile Screen8</Text>
            <Button 
                title='SIGN OUT'
                containerStyle={globalStyles.button} 
                buttonStyle={globalStyles.button}
                raised
                onPress={() => onSignout()}
            />
        </View>
    );
}