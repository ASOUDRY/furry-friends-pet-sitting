import {initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {initializeAuth} from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native';
import {AsyncStorage } from '@react-native-async-storage/async-storage';

const firebaseApp = initializeApp({
  apiKey: "API Key",
  authDomain: "dog-sitting-2.firebaseapp.com",
  projectId: "dog-sitting-2",
});

export const firestore = getFirestore(firebaseApp)

export const auth = initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
});
