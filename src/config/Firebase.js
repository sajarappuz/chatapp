// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZSV-ejoZhd-junuE3ulTLBfI9Z6Oq-JM",
  authDomain: "chatapp-1a883.firebaseapp.com",
  projectId: "chatapp-1a883",
  storageBucket: "chatapp-1a883.appspot.com",
  messagingSenderId: "999800579846",
  appId: "1:999800579846:web:8adc8a54ff5da4ba3a6087"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);