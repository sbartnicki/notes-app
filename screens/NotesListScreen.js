import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import Note from '../components/SingleNote';
import { database } from '../FirebaseConfig';
import { child, ref, get } from 'firebase/database';
import Ionicons from '@expo/vector-icons/Ionicons';

const NotesListScreen = ({ route, navigation }) => {
  const [notes, setNotes] = useState();

  const fetchUserNotes = (userId) => {
    get(child(ref(database), 'users/' + userId))
      .then((snapshot) => {
        if (snapshot.exists()) {
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
    fetchUserNotes(route.params.user);
  }, []);

  const onItemPressHandler = () => {
    navigation.navigate('Log In Page');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.navBar}>
        <Pressable
          onPress={navigation.navigate('New Note')}
          style={styles.navButton}
        >
          <Ionicons name="chevron-back" size={32} color="#283618" />
          <Text style={styles.navText}>LOG OUT</Text>
        </Pressable>
        <Pressable
          onPress={navigation.navigate('New Note')}
          style={styles.navButton}
        >
          <Text style={styles.navText}>NEW NOTE</Text>
          <Ionicons name="chevron-forward" size={32} color="#283618" />
        </Pressable>
      </View>
      <ScrollView style={styles.scrollView}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // height: '100%',
    backgroundColor: '#606C38',
  },
  scrollView: {
    padding: 15,
  },
  navBar: {
    marginTop: 50,
    padding: 8,
    backgroundColor: '#FEFAE0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
});

export default NotesListScreen;
