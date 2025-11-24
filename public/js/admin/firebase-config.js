import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDrfuIWyDI4OrKPwOfA5Oxm0yAY9nNjLOc",
    authDomain: "dra-gabriela-fisio.firebaseapp.com",
    projectId: "dra-gabriela-fisio",
    storageBucket: "dra-gabriela-fisio.appspot.com",
    messagingSenderId: "310192884196",
    appId: "1:310192884196:web:27b11b2550342ed2115ff1",
    measurementId: "G-TQ69G0M1M9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
