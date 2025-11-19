import { collection, getDocs, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { db } from '../firebase-config.js';

document.addEventListener('DOMContentLoaded', function () {
   const productList = document.getElementById('product-list');
   const productCount = document.getElementById('product-count');

   async function fetchProducts() {
       const querySnapshot = await getDocs(collection(db, 'products'));
       let count = 0;
       productList.innerHTML = '';
       querySnapshot.forEach((doc) => {
           const product = doc.data();
           const row = document.createElement('div');
           row.classList.add('table-row');
           row.setAttribute('role', 'row');
           row.setAttribute('data-id', doc.id);

           row.innerHTML = `
               <div class="table-cell" role="cell" data-label="Produto:">${product.name}</div>
               <div class="table-cell" role="cell" data-label="Valor:">${product.value}</div>
               <div class="table-cell" role="cell" data-label="Ações:">
                   <div class="action-buttons">
                       <button class="edit-button">Editar</button>
                       <button class="delete-button">Excluir</button>
                   </div>
               </div>
           `;
           productList.appendChild(row);
           count++;
       });
       productCount.textContent = `(${count})`;
   }

   fetchProducts();

   productList.addEventListener('click', function (e) {
       if (e.target.classList.contains('delete-button')) {
           const productId = e.target.closest('.table-row').getAttribute('data-id');
           if (confirm('Tem certeza que deseja excluir este produto?')) {
               deleteDoc(doc(db, 'products', productId))
                   .then(() => {
                       console.log('Document successfully deleted!');
                       fetchProducts();
                   })
                   .catch((error) => {
                       console.error('Error removing document: ', error);
                   });
           }
       }

       if (e.target.classList.contains('edit-button')) {
           const productId = e.target.closest('.table-row').getAttribute('data-id');
           window.location.href = `./pages/cadastro.html?id=${productId}`;
       }
   });
});
