import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD2oQTZeNIVgpwLpqQB2sAUNCT5QB4VF5w',
  authDomain: 'ig-clone-3f905.firebaseapp.com',
  projectId: 'ig-clone-3f905',
  storageBucket: 'ig-clone-3f905.appspot.com',
  messagingSenderId: '784354499463',
  appId: '1:784354499463:web:bda89d4ad8bf3872fc9122',
  measurementId: 'G-RFVNN3WDVV',
});

const db = firebaseApp.firestore();

export { db };
