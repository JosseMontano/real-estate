import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc, collection, query, where, getDocs, getDoc, } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {

  apiKey: "AIzaSyCm51XRdM-9p81q6HvLfRUY8mlLMhe0H3A",

  authDomain: "new-realestate-f4127.firebaseapp.com",

  projectId: "new-realestate-f4127",

  storageBucket: "new-realestate-f4127.appspot.com",

  messagingSenderId: "658717400987",

  appId: "1:658717400987:web:2974bd07213538e15c0b3e"

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  db,
  storage,
  auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  ref,
  uploadBytes,
  getDownloadURL 
}