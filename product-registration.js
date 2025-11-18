import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';


document.addEventListener('DOMContentLoaded', function () {
   const db = getFirestore();
   const productForm = document.getElementById('productForm');


   productForm.addEventListener('submit', function (e) {
       e.preventDefault();


       const formData = new FormData(productForm);
       const productData = {
           name: formData.get('productName'),
           value: formData.get('productValue'),
           soldBy: formData.get('soldBy'),
           description: formData.get('description'),
           imageUrl: formData.get('imageUrl')
       };


       if (!productData.name || !productData.value || !productData.soldBy) {
           alert('Por favor, preencha todos os campos obrigatórios.');
           return;
       }


       addDoc(collection(db, 'products'), productData)
           .then((docRef) => {
               console.log('Document written with ID: ', docRef.id);
               alert('Produto cadastrado com sucesso!');
               productForm.reset();
           })
           .catch((error) => {
               console.error('Error adding document: ', error);
               alert('Erro ao cadastrar o produto. Tente novamente.');
           });
   });
});
