// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1amt3bELwctFPi_FogMiLdLiTDrMQQMU",
    authDomain: "data-share-auth.firebaseapp.com",
    projectId: "data-share-auth",
    storageBucket: "data-share-auth.appspot.com",
    messagingSenderId: "678148807300",
    appId: "1:678148807300:web:a5885ca5d50888d97ac0d1",
    measurementId: "G-JYXWBJY2B8"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);