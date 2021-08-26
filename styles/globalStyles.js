import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    background: {
        backgroundColor: 'dodgerblue',
        flex:1, 
    },
    container: {
        margin: 32,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 0.5,
        textAlignVertical: 'center',
        // backgroundColor: 'red',
    },
    button: {
        width: '100%',
        borderRadius: 30,
    },
  });