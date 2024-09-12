// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwk9oESZTP7qnCfIk9pDOh2W8QddMtEYI",
  authDomain: "react-native-e0568.firebaseapp.com",
  projectId: "react-native-e0568",
  storageBucket: "react-native-e0568.appspot.com",
  messagingSenderId: "435888503825",
  appId: "1:435888503825:web:651010fba2797b9a6045b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };