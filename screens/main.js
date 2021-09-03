import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';


export default function MainScreen() {
    const { user, onSignout } = useContext(AuthContext);

    return (
        <View>
            <Text>MainScreen</Text>
            <Text>{user.displayName}</Text>
            <Text>{user.email}</Text>
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



const styles = StyleSheet.create({});
