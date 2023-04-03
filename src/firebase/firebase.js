// import firebase from 'firebase/compat/app'
// import 'firebase/compat/database';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCuldu1XKqstq-ETu53rb--5VkgXv2R-MY",
    authDomain: "cook-now-8f48b.firebaseapp.com",
    projectId: "cook-now-8f48b",
    storageBucket: "cook-now-8f48b.appspot.com",
    messagingSenderId: "416884799422",
    appId: "1:416884799422:web:bd9824170525bf1c952bef",
    measurementId: "G-D3PJQMYJ11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// firebase.initializeApp(firebaseConfig);

export const db = getDatabase(app);
// export default firebase;