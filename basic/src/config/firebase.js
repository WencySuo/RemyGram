// Sets up everything we need to run Firebase, hopefully?
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm8-VphRQGkREsbXgy3zMpa0dxb3jHb4I",
  authDomain: "remygram.firebaseapp.com",
  databaseURL: "https://remygram-default-rtdb.firebaseio.com",
  projectId: "remygram",
  storageBucket: "remygram.appspot.com",
  messagingSenderId: "32679591692",
  appId: "1:32679591692:web:27506d4665416e0ded1329",
  measurementId: "G-8DMP2RVTVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();