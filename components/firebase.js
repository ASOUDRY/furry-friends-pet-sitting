import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseApp = initializeApp({
  apiKey: "API-KEY",
  authDomain: "dog-sitting-2.firebaseapp.com",
  projectId: "dog-sitting-2",
});

export const firestore = getFirestore(firebaseApp)

export const auth = getAuth(firebaseApp)