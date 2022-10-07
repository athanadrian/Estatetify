import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBw8nwvPdtmypL_iG3Sp33guTtFY7f_rH0',
  authDomain: 'estatetify-db.firebaseapp.com',
  projectId: 'estatetify-db',
  storageBucket: 'estatetify-db.appspot.com',
  messagingSenderId: '298086193669',
  appId: '1:298086193669:web:c6663f386459c3f8d81a6c',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
};
