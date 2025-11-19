import { collection, addDoc, getDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { db } from '../firebase-config.js';

document.addEventListener('DOMContentLoaded', function () {
   const productForm = document.getElementById('productForm');
   const urlParams = new URLSearchParams(window.location.search);
   const productId = urlParams.get('id');

   if (productId) {
       // Edit mode
       const docRef = doc(db, 'products', productId);
       document.title = 'Editar Produto | Gabriela Ribeiro';
       document.querySelector('.form-title').textContent = 'Editar Produto';

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
               alert('Produto não encontrado. Você será redirecionado para o painel.');
               window.location.href = 'dash-produtos.html';
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

       const promise = productId 
           ? updateDoc(doc(db, 'products', productId), productData) 
           : addDoc(collection(db, 'products'), productData);

       promise.then(() => {
           const message = productId ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!';
           console.log('Document successfully handled!');
           alert(message);
           window.location.href = 'dash-produtos.html';
       }).catch((error) => {
           const message = productId ? 'Erro ao atualizar o produto.' : 'Erro ao cadastrar o produto.';
           console.error('Error handling document: ', error);
           alert(message + ' Tente novamente.');
       });
   });
});
