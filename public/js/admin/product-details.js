import { collection, getDocs, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', function () {
   const productList = document.getElementById('product-list');
   const productCount = document.getElementById('product-count');

   async function fetchProducts() {
       try {
           const querySnapshot = await getDocs(collection(db, 'products'));
           let count = 0;
           productList.innerHTML = ''; 

           if (querySnapshot.empty) {
               productCount.textContent = '(0)';
               return;
           }

           querySnapshot.forEach((doc) => {
               const product = doc.data();
               const row = document.createElement('div');
               row.classList.add('table-row');
               row.setAttribute('role', 'row');
               row.setAttribute('data-id', doc.id);

               row.innerHTML = `
                   <div class="table-cell" role="cell" data-label="Produto:">${product.name}</div>
                   <div class="table-cell" role="cell" data-label="Valor:">R$ ${product.value}</div>
                   <div class="table-cell" role="cell" data-label="Vendido por:">${product.soldBy}</div>
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
       } catch (error) {
           console.error("Erro ao buscar produtos: ", error);
           productList.innerHTML = '<p>Erro ao carregar produtos.</p>';
       }
   }

   fetchProducts();

   productList.addEventListener('click', function (e) {
       const target = e.target;
       const row = target.closest('.table-row');
       if (!row) return;

       const productId = row.getAttribute('data-id');

       if (target.classList.contains('delete-button')) {
           if (confirm('Tem certeza que deseja excluir este produto?')) {
               deleteDoc(doc(db, 'products', productId))
                   .then(() => {
                       console.log('Document successfully deleted!');
                       fetchProducts(); // Recarrega a lista
                   })
                   .catch((error) => {
                       console.error('Error removing document: ', error);
                       alert('Ocorreu um erro ao excluir o produto.');
                   });
           }
       }

       if (target.classList.contains('edit-button')) {
           window.location.href = `cadastro-produtos.html?id=${productId}`;
       }
   });
});
