// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArw0LDv84pdN9imLqNA9hcaMQjpi2cXxI",
  authDomain: "dinetime-31e63.firebaseapp.com",
  projectId: "dinetime-31e63",
  storageBucket: "dinetime-31e63.firebasestorage.app",
  messagingSenderId: "93116159785",
  appId: "1:93116159785:web:3233e5dec7d26698eec938",
  measurementId: "G-E1WEQY8RDQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);