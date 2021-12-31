import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCtTlZdbY1m8Hn0vNzDHXIKJ58pXVX4AfE",
  authDomain: "dog-sitting-3062d.firebaseapp.com",
  projectId: "dog-sitting-3062d",
});

export const firestore = getFirestore(firebaseApp)

export const auth = getAuth(firebaseApp)