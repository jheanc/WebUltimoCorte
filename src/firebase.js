// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD20PmgWFco7p9m4Xwrb2nJ2Yi3OWO6AdE",
  authDomain: "lista-usuario.firebaseapp.com",
  projectId: "lista-usuario",
  storageBucket: "lista-usuario.appspot.com",
  messagingSenderId: "656911595794",
  appId: "1:656911595794:web:0727f194d7953ac71bdbcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const baseD = getFirestore(app)
export {baseD}