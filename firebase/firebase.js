import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA00FDnSdxhmGsCQ1Ej0VaqHXACc40IoRU',
  authDomain: 'chattingrandompeople.firebaseapp.com',
  // databaseURL: 'https://chattingrandompeople-default-rtdb.firebaseio.com',
  projectId: 'chattingrandompeople',
  storageBucket: 'chattingrandompeople.appspot.com.appspot.com',
  appId: '1:966244274464:android:19965c0a95544cc6c58745',
  messagingSenderId: '966244274464',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
