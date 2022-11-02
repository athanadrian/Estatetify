import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  serverTimestamp,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  limit,
  where,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'estatetify-db.firebaseapp.com',
  projectId: 'estatetify-db',
  storageBucket: 'estatetify-db.appspot.com',
  messagingSenderId: '298086193669',
  appId: '1:298086193669:web:c6663f386459c3f8d81a6c',
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const googleProvider = new GoogleAuthProvider();
export {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  db,
  serverTimestamp,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
};
