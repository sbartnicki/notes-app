import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import Note from '../components/SingleNote';
import { database } from '../FirebaseConfig';
import { child, ref, get } from 'firebase/database';
import { AntDesign } from "@expo/vector-icons";

const NotesListScreen = ({ route, navigation }) => {
  const [notes, setNotes] = useState([]);

  const fetchUserNotes = (userId) => {
    get(child(ref(database), 'users/' + userId))
      .then((snapshot) => {
        if (snapshot.exists()) {
            console.log('snapshot.val(): ', snapshot.val());
          setNotes(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // fetchUserNotes(1);
    fetchUserNotes(route.params.userId);
  }, []);

  const onItemPressHandler = () => {
    navigation.navigate('Log In Page');
  };

  return (
    <ScrollView style={styles.wrapper}>
      {notes
        ? notes.map((note) => {
            return (
              <Note
                key={note.title}
                title={note.title}
                content={note.content}
                isAudio={note.audioURI ? true : false}
                isImage={note.imageURI ? true : false}
                note={note}
                onItemPress={onItemPressHandler}
              />
            );
          })
        : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // height: '100%',
    backgroundColor: '#606C38',
    padding: 15,
    color: '#FEFAE0',
  },
});

export default NotesListScreen;
