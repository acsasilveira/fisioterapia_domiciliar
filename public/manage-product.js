import { collection, addDoc, getDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { db } from '../firebase-config.js';

document.addEventListener('DOMContentLoaded', function () {
   const productForm = document.getElementById('productForm');
   const urlParams = new URLSearchParams(window.location.search);
   const productId = urlParams.get('id');

   if (productId) {
       // Edit mode
       const docRef = doc(db, 'products', productId);
       getDoc(docRef).then(docSnap => {
           if (docSnap.exists()) {
               const product = docSnap.data();
               document.getElementById('productName').value = product.name;
               document.getElementById('productValue').value = product.value;
               document.getElementById('productLink').value = product.productLink;
               document.getElementById('description').value = product.description;
               document.getElementById('imageUrl').value = product.imageUrl;
               document.querySelector('.primary-button').textContent = 'Atualizar Produto';
           } else {
               console.log('No such document!');
           }
       }).catch(error => {
           console.log('Error getting document:', error);
       });
   }

   productForm.addEventListener('submit', function (e) {
       e.preventDefault();

       const formData = new FormData(productForm);
       const productData = {
           name: formData.get('productName'),
           value: formData.get('productValue'),
           productLink: formData.get('productLink'),
           description: formData.get('description'),
           imageUrl: formData.get('imageUrl')
       };

       if (!productData.name || !productData.value || !productData.productLink) {
           alert('Por favor, preencha todos os campos obrigatórios.');
           return;
       }

       if (productId) {
           // Update existing document
           const docRef = doc(db, 'products', productId);
           updateDoc(docRef, productData)
               .then(() => {
                   console.log('Document successfully updated!');
                   alert('Produto atualizado com sucesso!');
                   window.location.href = './dash-produtos.html';
               })
               .catch((error) => {
                   console.error('Error updating document: ', error);
                   alert('Erro ao atualizar o produto. Tente novamente.');
               });
       } else {
           // Add new document
           addDoc(collection(db, 'products'), productData)
               .then((docRef) => {
                   console.log('Document written with ID: ', docRef.id);
                   alert('Produto cadastrado com sucesso!');
                   productForm.reset();
                   window.location.href = './dash-produtos.html';
               })
               .catch((error) => {
                   console.error('Error adding document: ', error);
                   alert('Erro ao cadastrar o produto. Tente novamente.');
               });
       }
   });
});
