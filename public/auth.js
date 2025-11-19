import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js';


document.addEventListener('DOMContentLoaded', function () {
   const auth = getAuth();
   const loginButton = document.getElementById('login-button');
   const emailInput = document.getElementById('email');
   const passwordInput = document.getElementById('password');
   const errorMessage = document.getElementById('error-message');


   loginButton.addEventListener('click', function () {
       const email = emailInput.value;
       const password = passwordInput.value;


       signInWithEmailAndPassword(auth, email, password)
           .then((userCredential) => {
               // Signed in
               const user = userCredential.user;
               console.log('User signed in:', user);
               window.location.href = './dash-produtos.html';
           })
           .catch((error) => {
               const errorCode = error.code;
               const errorMessageText = error.message;
               console.error('Sign-in error:', errorCode, errorMessageText);
               errorMessage.textContent = 'Email ou senha inválidos.';
           });
   });
});
