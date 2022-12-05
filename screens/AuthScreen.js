import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { app } from '../FirebaseConfig';

const AuthScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.wrapper}>
      <Pressable
          onPress={() => props.navigation.navigate('New Note')}
      >
        <Text>Go to New Note screen</Text>
      </Pressable>
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
          onPress={() => props.navigation.navigate('Note Details')}
        >
          <Text style={{ color: '#FEFAE0' }}>Register</Text>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: '#FEFAE0' }]}
          onPress={() => props.navigation.navigate('Notes List')}
        >
          <Text style={{ color: '#283618' }}>Login</Text>
        </Pressable>
      </View>
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
  }
});

export default AuthScreen;
