// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey : "AIzaSyCKLRgHxi0TA5RpXv61YsN74wkfdt1PlV8" , 
  authDomain : "socialapp-d38de.firebaseapp.com" , 
  projectId : "socialapp-d38de" , 
  storageBucket : "socialapp-d38de.appspot.com" , 
  messagingSenderId : "919281898296" , 
  appId : "1:919281898296:web:06c2464fd4fc69b08467cd" , 
  measurementId : "G-090H6NG093" 
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth, firebase };