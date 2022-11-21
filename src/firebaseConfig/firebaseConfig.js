import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCk4Oj5VutgfBKvNd7qz6xgiMejeSt8R4c",
    authDomain: "auth-syt.firebaseapp.com",
    projectId: "auth-syt",
    storageBucket: "auth-syt.appspot.com",
    messagingSenderId: "164868528681",
    appId: "1:164868528681:web:b2ba513607b052b80cda38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
