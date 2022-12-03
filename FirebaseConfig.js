// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD7lODFabzBcqeCyOC0VVUG-XP1sJdfhBo',
  authDomain: 'mobiledevfinal-8f0ee.firebaseapp.com',
  projectId: 'mobiledevfinal-8f0ee',
  storageBucket: 'mobiledevfinal-8f0ee.appspot.com',
  messagingSenderId: '613073185383',
  appId: '1:613073185383:web:4c03ed3b9d302ced51c2c2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// import * as firebase from 'firebase';
// import '@firebase/firestore';

// // need to run: npm install --save firebase
// // We will use the JS SDK with React Native

// var firebaseConfig = {
//   apiKey: 'AIzaSyCllc6-qDffq_PbKnVX2gzBV9vCWlt5_ZU',
//   authDomain: 'info3141proj.firebaseapp.com',
//   databaseURL: 'https://info3141proj-default-rtdb.firebaseio.com',
//   projectId: 'info3141proj',
//   storageBucket: 'info3141proj.appspot.com',
//   messagingSenderId: '396367652667',
//   appId: '1:396367652667:web:5dc0afb7c6f9328ab7b91e',
// };

// var app;
// if (!firebase.apps.length) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app(); // if already initialized, use that one
// }

// export const db = app.database();
// export const firestore = firebase.firestore(app);
// export const auth = app.auth();
