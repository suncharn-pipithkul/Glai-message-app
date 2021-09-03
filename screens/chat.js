import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

// Context
import { AuthContext } from '../context/AuthContext';

// styles
import { globalStyles } from '../styles/globalStyles';


export default function ChatScreen({ navigation }) {
    const { user, onSignout } = useContext(AuthContext);

    return (
        <View>
            <Text>Chat Screen</Text>
            <Button 
                title='Return'
                containerStyle={globalStyles.button} 
                buttonStyle={globalStyles.button}
                raised
                onPress={() => navigation.navigate('Main')}
            />
        </View>
    );
}



const styles = StyleSheet.create({});
