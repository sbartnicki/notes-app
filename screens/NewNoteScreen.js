import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert, Image,
} from 'react-native';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


import Styles from '../styles';
import { RecordingOptionsPresets } from 'expo-av/build/Audio/RecordingConstants';
import { writeNoteToDB } from '../FirebaseConfig';

const NewNoteScreen = ({ route, navigation }) => {

  // storing the new note info
  const [note, setNote] = useState({
    title: '',
    content: '',
    imgURI: '',
    audioURI: '',
  });

  // getting data from the router params for new note
  const { userId, noteId } = route.params;

  // defining a variable for storing an audio record
  let recording = null;

  /**
   * Function name: titleHandler
   * Purpose: setting the title to state
   * @param title: title
   * */
  const titleHandler = (title) => {
    setNote((note) => ({
      ...note,
      title,
    }));
  };

  /**
   * Function name: contentHandler
   * Purpose: setting the content to state
   * @param content: content
   * */
  const contentHandler = (content) => {
    setNote((note) => ({
      ...note,
      content,
    }));
  };

  /**
   * Function: imageSelectedHandler
   * Purpose: setting the image URI to state
   * @param imgURI: image URI
   * */
  const imageSelectedHandler = (imgURI) => {
    setNote((note) => ({
      ...note,
      imgURI,
    }));
  };

  /**
   * Function: audioRecordedHandler
   * Purpose: setting the audio URI to state
   * @param audioURI: image URI
   * */
  const audioRecordedHandler = (audioURI) => {
    setNote((note) => ({
      ...note,
      audioURI,
    }));
  };

  /**
   * Function: verifyPermission
   * Purpose: Verifying permissions to access to camera and library
   * */
  const verifyPermission = async () => {
    const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
    const libraryResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraResult.status !== 'granted' &&
      libraryResult.status !== 'granted'
    ) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  /**
   * Function name: verifyAudioPermission
   * Purpose: Checks permissions for audio
   * */
  const verifyAudioPermission = async () => {
    const result = await Audio.requestPermissionsAsync();
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant audio recording permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  /**
   * Function name: takeImageHandler
   * Purpose: Takes a picture via camera
   * */
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return false;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!image.cancelled) {
      await saveFileLocally(image.uri, 'photo');
    }
  };

  /**
   * Function name: retrieveImageHandler
   * Purpose: Using a picture from library
   * */
  const retrieveImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return false;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!image.cancelled) {
      imageSelectedHandler(image.uri);
    }
  };

  /**
   * Function name: startRecordingAudio
   * Purpose: Starts audio recording
   * */
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
        await recording.prepareToRecordAsync(
          RecordingOptionsPresets.HIGH_QUALITY
        );
        await recording.startAsync();
        console.log('We are now recording!');
      } catch (error) {
        console.log('An error occurred on starting record:');
        console.log(error);
      }
    }
  };

  /**
   * Function name: stopRecordingAudio
   * Purpose: Stops audio recording
   * */
  const stopRecordingAudio = async () => {
    try {
      await recording.stopAndUnloadAsync();
      await saveFileLocally(recording.getURI(), 'audio');
      console.log('recording stopped!');
    } catch (error) {
      console.log('An error occurred on stopping record:');
      console.log(error);
    }
  };

  /**
   * Function name: saveFileLocally
   * Purpose: Saves file to the device's local storage
   * */
  const saveFileLocally = async (URI, fileType) => {
    let file = URI;
    let fileName = file.split('/').pop();
    let destinationUri = FileSystem.documentDirectory + fileName;

    await FileSystem.moveAsync({ from: file, to: destinationUri })
      .then((result) => {
        if (fileType === 'photo') {
          imageSelectedHandler(destinationUri);
        }

        if (fileType === 'audio') {
          audioRecordedHandler(destinationUri);
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  /**
   * Function name: saveNote
   * Purpose: Saves a newly created note
   * */
  const saveNote = () => {

    writeNoteToDB(
      userId,
      noteId,
      note.title,
      note.content,
      note.audioURI,
      note.imgURI
    ).then((res) => {
      navigation.navigate('Notes List', {
        userId: userId,
        shouldRerender: true,
      });
    });
  };

  return (
    <View style={Styles.wrapper}>
      <View style={styles.navBar}>
        <Pressable
          onPress={() =>
            navigation.navigate('Notes List', {
              userId: route.params.userId,
            })
          }
          style={styles.navButton}
        >
          <Ionicons name="chevron-back" size={32} color="#283618" />
          <Text style={styles.navText}>BACK</Text>
        </Pressable>
        <Pressable onPress={() => saveNote()} style={styles.navButton}>
          <Text style={styles.navText}>SAVE</Text>
          <Ionicons name="chevron-forward" size={32} color="#283618" />
        </Pressable>
      </View>
      <View style={styles.innerWrapper}>
        <SafeAreaView style={styles.inputWrapper}>
          <TextInput
            style={styles.titleInput}
            placeholder={'Put title here'}
            onChangeText={(text) => titleHandler(text)}
          ></TextInput>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={styles.contentInput}
            placeholder={'Start typing note here...'}
            placeholderTextColor={'#e6bb8b'}
            onChangeText={(text) => contentHandler(text)}
          ></TextInput>
        </SafeAreaView>
        <View style={styles.controlsWrapper}>
          {
            note.imgURI &&
              <Image style={styles.image} source={{ width: '100%', height:200, uri: note.imgURI }}></Image>
          }
          <Pressable
            style={[styles.button, { marginBottom: 10 }]}
            onPress={takeImageHandler}
          >
            <Text style={styles.buttonText}>Take a photo to add</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={retrieveImageHandler}>
            <Text style={styles.buttonText}>Add a photo from library</Text>
          </Pressable>
          <View style={styles.audioButtonsWrapper}>
            <Pressable
              style={styles.recordButton}
              onPress={startRecordingAudio}
            >
              <FontAwesome name="microphone" size={24} color="black" />
              <Text>Record</Text>
            </Pressable>
            <Pressable style={styles.recordButton} onPress={stopRecordingAudio}>
              <FontAwesome5 name="stop" size={24} color="black" />
              <Text>Stop</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: '#dda15e',
    borderRadius: 4,
  },
  inputWrapper: {
    flexGrow: 1,
    padding: 6,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#283618',
    marginBottom: 20
  },
  contentInput: {
    color: '#fff',
    textAlignVertical: 'top',
    flexGrow: 1,
  },
  controlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  audioButtonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 2,
    padding: 6,
    borderColor: '#000',
    backgroundColor: '#fefae0',
    color: '#000',
  },
  recordButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonText: {
    textAlign: 'center',
  },
  navBar: {
    marginLeft: -15,
    marginRight: -15,
    marginTop: 50,
    marginBottom: 15,
    padding: 8,
    backgroundColor: '#FEFAE0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  navText: {
    color: '#283618',
    fontWeight: '900',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginVertical: 20,
    borderRadius: 10
  }
});

export default NewNoteScreen;
