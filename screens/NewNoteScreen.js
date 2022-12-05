import { View, Text, Pressable, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";

import Styles from "../styles";

const NewNoteScreen = (props) => {

    const [note, setNote] = useState({
        title: '',
        content: '',
        imgURI: '',
        audioURI: '',
        userID: 0
    });

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerLeft: () => (
                <AntDesign name="left" size={ 24 } color="black"
                           onPress={ () => props.navigation.navigate('Home Screen') }/>
            ),
            headerRight: () => (
                <Pressable onPress={ () => console.log('Save') }>
                    <Text>Save</Text>
                </Pressable>
            )
        });
    }, []);

    const titleHandler = (title) => {
        setNote(note => ({
            ...note,
            title
        }));

        console.log('note: ', note);
    };

    const contentHandler = (content) => {
        setNote(note => ({
                ...note,
                content
            })
        );

        console.log('note: ', note);
    };

    return (
        <View style={ Styles.wrapper }>
            <View style={ styles.innerWrapper }>
                <SafeAreaView style={ styles.inputWrapper }>
                    <TextInput
                        style={ styles.titleInput }
                        placeholder={ 'Put title here' }
                        onChangeText={ text => titleHandler(text) }
                    ></TextInput>
                    <TextInput
                        multiline={ true }
                        numberOfLines={ 10 }
                        style={ styles.contentInput }
                        placeholder={ 'Start typing note here...' }
                        placeholderTextColor={ '#fff' }
                        onChangeText={ text => contentHandler(text) }
                    ></TextInput>
                </SafeAreaView>
                <View style={ styles.controlsWrapper }>
                    <Pressable
                        style={ [styles.button, { marginBottom: 10 }] }
                        onPress={ () => console.log('Take a photo') }
                    >
                        <Text style={ styles.buttonText }>Take a photo to add</Text>
                    </Pressable>
                    <Pressable
                        style={ styles.button }
                        onPress={ () => console.log('Photo from library') }
                    >
                        <Text style={ styles.buttonText }>Add a photo from library</Text>
                    </Pressable>
                    <Pressable
                        style={ styles.recordButton }
                        onPress={ () => console.log('Record an Audio') }
                    >
                        <FontAwesome name="microphone" size={ 24 } color="black"/>
                    </Pressable>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    innerWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        backgroundColor: '#dda15e',
        borderRadius: 4
    },
    inputWrapper: {
        flexGrow: 1,
        padding: 6,
    },
    titleInput: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#856d3d'
    },
    contentInput: {
        color: '#fff',
        textAlignVertical: 'top',
        flexGrow: 1
    },
    controlsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 20
    },
    button: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 2,
        padding: 6,
        borderColor: '#000',
        backgroundColor: '#fefae0',
        color: '#000'
    },
    recordButton: {
        marginTop: 20,
        marginBottom: 20
    },
    buttonText: {
        textAlign: 'center'
    }
});

export default NewNoteScreen;
