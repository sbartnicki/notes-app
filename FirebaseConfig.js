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
const database = getDatabase(app);
export const writeTest = (userId, email) => {
  set(ref(database, 'users/' + userId), {
    email: email,
  });
};
export const readTest = () => {
  get(child(ref(database), 'users/'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
