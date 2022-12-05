'use strict';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#606C38',
        padding: 15,
        color: '#FEFAE0',
    },
    banner: {
        marginTop: 100,
        backgroundColor: '#FEFAE0',
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        fontWeight: '700',
        lineHeight: 40,
        color: '#283618',
    },
    inputContainer: {
        marginTop: 100,
    },
    textInput: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        color: 'black',
    },
    buttonContainer: {
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 15,
        borderRadius: 5,
    }
});
