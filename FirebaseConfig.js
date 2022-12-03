import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

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
