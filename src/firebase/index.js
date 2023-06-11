import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

// Replace this with your Firebase SDK config snippet
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAycAyIPq0hsTl5x512Y4645MBtMvh1i5Y",
  authDomain: "buzz-64e89.firebaseapp.com",
  projectId: "buzz-64e89",
  storageBucket: "buzz-64e89.appspot.com",
  messagingSenderId: "50246390089",
  appId: "1:50246390089:web:d429f6bf62ddcbcb70ca98",
  measurementId: "G-0M4ENE3MKD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
