import { View, Text, Pressable, StyleSheet, SafeAreaView, TextInput, Alert } from "react-native";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import Styles from "../styles";
import { RecordingOptionsPresets } from "expo-av/build/Audio/RecordingConstants";
import { writeNoteToDB } from "../FirebaseConfig";

const NewNoteScreen = ({route, navigation}) => {

    const [note, setNote] = useState({
        title: '',
        content: '',
        imgURI: '',
        audioURI: ''
    });
    const [soundRecorded, setSoundRecorded] = useState(false);

    const { userId, noteId } = route.params;

    let recording = null;

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <AntDesign name="left" size={ 24 } color="black"
    //                        onPress={ () => navigation.navigate('Notes List', { user: userId }) }/>
    //         ),
    //         headerRight: () => (
    //             <Pressable onPress={ saveNote }>
    //                 <Text>Save</Text>
    //             </Pressable>
    //         )
    //     });
    // }, []);

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

    const imageSelectedHandler = (imgURI) => {
        setNote(note => ({
                ...note,
                imgURI
            })
        );

        console.log('note: ', note);
    }

    const audioRecordedHandler = (audioURI) => {
        setNote(note => ({
                ...note,
                audioURI
            })
        );

        console.log('note: ', note);
    }

    const verifyPermission = async () => {
        const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
        const libraryResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(cameraResult.status !== 'granted' && libraryResult.status !== 'granted') {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.', [{ text: 'Okay' }]);
            return false;
        }
        return true;
    }

    const verifyAudioPermission = async () => {
        const result = await Audio.requestPermissionsAsync();
        if (result.status !== 'granted') {
            Alert.alert('Insufficient Permissions!',
                'You need to grant audio recording permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermission();
        if(!hasPermission) {
            return false;
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });

        if (!image.cancelled) {
            await saveFileLocally(image.uri, 'photo');
        }
    }

    const retrieveImageHandler = async () => {
        const hasPermission = await verifyPermission();
        if(!hasPermission) {
            return false;
        }

        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });

        if (!image.cancelled) {
            imageSelectedHandler(image.uri);
        }
    }

    const startRecordingAudio = async () => {
        const hasPermission = await verifyAudioPermission();
        if (!hasPermission) {
            return false;
        } else {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                playThroughEarpieceAndroid: false,
                staysActiveInBackground: true,
            });

            recording = new Audio.Recording();

            try {
                await recording.prepareToRecordAsync(RecordingOptionsPresets.HIGH_QUALITY);
                await recording.startAsync();
                console.log('We are now recording!');
            } catch (error) {
                console.log('An error occurred on starting record:');
                console.log(error);
            }
        }
    };

    const stopRecordingAudio = async () => {
        try {
            await recording.stopAndUnloadAsync();
            await saveFileLocally(recording.getURI(), 'audio');
            setSoundRecorded(true);
            console.log('recording stopped!');
        } catch (error) {
            setSoundRecorded(false);
            console.log('An error occurred on stopping record:');
            console.log(error);
        }
    };

    const saveFileLocally = async (URI, fileType) => {
        console.log('imgURI: ', URI);
        let file = URI;
        let fileName = file.split('/').pop();
        let destinationUri = FileSystem.documentDirectory + fileName;

        await FileSystem.moveAsync({ from: file, to: destinationUri })
            .then( result => {

                if (fileType === 'photo') {
                    imageSelectedHandler(destinationUri);
                }

                if (fileType === 'audio') {
                    audioRecordedHandler(destinationUri);
                }
            } )
            .catch( error => {
                console.log('error: ', error);
            } )
    }

    const saveNote = () => {
        console.log('data is saved');
        console.log('data: ', note);
        console.log('userId: ', userId);

        writeNoteToDB(
            userId,
            noteId,
            note.title,
            note.content,
            note.audioURI,
            note.imgURI
        )
            .then(res => {
                navigation.navigate('Notes List', { userId: userId });
            })
    }

    return (
        <View style={ Styles.wrapper }>
            <Pressable onPress={ saveNote }>
                <Text>SAVE</Text>
            </Pressable>
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
                        onPress={ takeImageHandler }
                    >
                        <Text style={ styles.buttonText }>Take a photo to add</Text>
                    </Pressable>
                    <Pressable
                        style={ styles.button }
                        onPress={ retrieveImageHandler }
                    >
                        <Text style={ styles.buttonText }>Add a photo from library</Text>
                    </Pressable>
                    <View style={ styles.audioButtonsWrapper }>
                        <Pressable style={ styles.recordButton } onPress={ startRecordingAudio }>
                            <FontAwesome name="microphone" size={ 24 } color="black"/>
                            <Text>Record</Text>
                        </Pressable>
                        <Pressable style={ styles.recordButton } onPress={ stopRecordingAudio }>
                            <FontAwesome5 name="stop" size={ 24 } color="black" />
                            <Text>Stop</Text>
                        </Pressable>
                    </View>
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
    audioButtonsWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    buttonText: {
        textAlign: 'center'
    }
});

export default NewNoteScreen;
