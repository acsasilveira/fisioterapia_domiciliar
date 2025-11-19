// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyDrfuIWyDI4OrKPwOfA5Oxm0yAY9nNjLOc",
 authDomain: "dra-gabriela-fisio.firebaseapp.com",
 projectId: "dra-gabriela-fisio",
 storageBucket: "dra-gabriela-fisio.firebasestorage.app",
 messagingSenderId: "310192884196",
 appId: "1:310192884196:web:27b11b2550342ed2115ff1",
 measurementId: "G-TQ69G0M1M9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);