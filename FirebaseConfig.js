import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD7lODFabzBcqeCyOC0VVUG-XP1sJdfhBo',
  authDomain: 'mobiledevfinal-8f0ee.firebaseapp.com',
  projectId: 'mobiledevfinal-8f0ee',
  storageBucket: 'mobiledevfinal-8f0ee.appspot.com',
  databaseURL: 'https://mobiledevfinal-8f0ee-default-rtdb.firebaseio.com/',
  messagingSenderId: '613073185383',
  appId: '1:613073185383:web:4c03ed3b9d302ced51c2c2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const writeNoteToDB = (
  userId,
  noteId,
  title,
  content,
  audioURI,
  imageURI
) => {

  console.log('userId: ', userId);
  console.log('noteId: ', noteId);
  console.log('title: ', title);
  console.log('content: ', content);
  console.log('audioURI: ', audioURI);
  console.log('imageURI: ', imageURI);

  return set(ref(database, `users/${userId}/${noteId}`), {
    title: title,
    content: content,
    audioURI: audioURI,
    imageURI: imageURI,
  });
};
