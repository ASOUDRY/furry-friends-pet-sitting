import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCtTlZdbY1m8Hn0vNzDHXIKJ58pXVX4AfE",
  authDomain: "dog-sitting-3062d.firebaseapp.com",
  projectId: "dog-sitting-3062d",
  storageBucket: "dog-sitting-3062d.appspot.com",
  messagingSenderId: "526056133562",
  appId: "1:526056133562:web:cff32c48609d63345a4383",
  measurementId: "G-GY06ND9Z86"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)