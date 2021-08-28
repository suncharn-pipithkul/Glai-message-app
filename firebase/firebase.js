// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDgNZL-R3H9WpfCEdhJl2M5IcI0KTdtRU",
  authDomain: "glai-e28eb.firebaseapp.com",
  projectId: "glai-e28eb",
  storageBucket: "glai-e28eb.appspot.com",
  messagingSenderId: "432028272428",
  appId: "1:432028272428:web:19293b0762cb1ec5748e89"
};

// Initialize Firebase
let app = null;
if (firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app(); // default app
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };