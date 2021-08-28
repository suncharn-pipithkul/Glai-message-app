import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    background: {
        // backgroundColor: 'dodgerblue',
        flex:1, 
    },
    container: {
        // backgroundColor: 'dodgerblue',
        margin: 32,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        color: 'black',
        // color: 'white',
        // backgroundColor: 'red',
    },
    button: {
        width: '100%',
        borderRadius: 30,
    },
  });