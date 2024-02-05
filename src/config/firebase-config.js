// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdE0QNvNXVkoWLo8vrYufEsQgASGITx6E",
  authDomain: "querie-13f66.firebaseapp.com",
  projectId: "querie-13f66",
  storageBucket: "querie-13f66.appspot.com",
  messagingSenderId: "477239465007",
  appId: "1:477239465007:web:2999d6ec620bbf928ae2da",
  measurementId: "G-WS2BWJ1LWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);