import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';


document.addEventListener('DOMContentLoaded', function () {
   const db = getFirestore();
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


           row.innerHTML = `
               <div class="table-cell" role="cell" data-label="Produto:">${product.name}</div>
               <div class="table-cell" role="cell" data-label="Valor:">${product.value}</div>
               <div class="table-cell" role="cell" data-label="Vendido Por:">
                   <span>${product.soldBy}</span>
                   <img src="../assets/images/img_cones.svg" alt="Ações do produto" class="action-icons">
               </div>
           `;
           productList.appendChild(row);
           count++;
       });
       productCount.textContent = `(${count})`;
   }


   fetchProducts();
});
