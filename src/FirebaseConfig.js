// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { firebase } from 'firebase/app';
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1RNfARK9QGdQINDZEXYW03pnXkiurDNs",
  authDomain: "bole-1682306332488.firebaseapp.com",
  projectId: "bole-1682306332488",
  storageBucket: "bole-1682306332488.appspot.com",
  messagingSenderId: "566907185849",
  appId: "1:566907185849:web:097529d7f6a182ea218968",
  measurementId: "G-PZLTKRHHYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export
export const auth = getAuth(app);
export const db = getFirestore(app);