
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-x-3c676.firebaseapp.com",
  projectId: "estate-x-3c676",
  storageBucket: "estate-x-3c676.appspot.com",
  messagingSenderId: "406596245195",
  appId: "1:406596245195:web:af0fbc2af3d62375e0ed4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
