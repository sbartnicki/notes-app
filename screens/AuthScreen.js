import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { auth, database } from '../FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
// import { ref, set } from 'firebase/database';
import { writeNoteToDB, fetchUserNotes } from '../FirebaseConfig';

const AuthScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const registerPressed = () => {
    if (email.length < 4) {
      Alert.alert('Please enter an email address.');
      return;
    }

    if (password.length < 4) {
      Alert.alert('Please enter a password.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert('user registered!');
        setRegistered(true);
        const user = userCredential.user;
        setEmail('');
        setPassword('');
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          Alert.alert('The password is too weak.');
        } else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      });
  };

  const loginPressed = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in');
        const user = userCredential.user;
        writeNoteToDB(0, 0, 'Title2', 'Content2', 'testURI', 'testimgageURI');
        fetchUserNotes(22);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.banner}>
        <Text style={[styles.text, { fontSize: 28 }]}>Notes App</Text>
        <Text style={[styles.text, { fontSize: 20 }]}>
          Mobile Development Final Project
        </Text>
        <Text style={[styles.text, { fontSize: 14 }]}>
          Pavlo Nahorniuk, Sylwester Bartnicki
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, { marginBottom: 20 }]}
          onChangeText={(value) => setEmail(value)}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="email"
          keyboardType="email-address"
          placeholder="Insert email..."
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => setPassword(value)}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="password"
          keyboardType="visible-password"
          placeholder="Insert password..."
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: '#283618' }]}
          onPress={registerPressed}
        >
          <Text style={{ color: '#FEFAE0' }}>Register</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: '#FEFAE0' }]}
          onPress={loginPressed}
        >
          <Text style={{ color: '#283618' }}>Login</Text>
        </Pressable>
      </View>
      {registered && (
        <View style={styles.alert}>
          <Text style={{ color: '#9F4F48', fontWeight: '700' }}>
            Registration Successful!
          </Text>
          <Text style={{ color: '#9F4F48', marginTop: 10 }}>
            You may login now.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  alert: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#EFDFDF',
    borderColor: '#E7CECD',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default AuthScreen;
