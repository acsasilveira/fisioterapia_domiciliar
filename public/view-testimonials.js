import { collection, getDocs, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { db } from '../firebase-config.js';

document.addEventListener('DOMContentLoaded', function () {
   const testimonialList = document.getElementById('testimonial-list');
   const testimonialCount = document.getElementById('testimonial-count');

   async function fetchTestimonials() {
       try {
           const querySnapshot = await getDocs(collection(db, 'testimonials'));
           let count = 0;
           testimonialList.innerHTML = ''; 

           if (querySnapshot.empty) {
               testimonialCount.textContent = '(0)';
               return;
           }

           querySnapshot.forEach((doc) => {
               const testimonial = doc.data();
               const row = document.createElement('div');
               row.classList.add('table-row');
               row.setAttribute('role', 'row');
               row.setAttribute('data-id', doc.id);

               row.innerHTML = `
                   <div class="table-cell" role="cell" data-label="Paciente:">${testimonial.paciente}</div>
                   <div class="table-cell" role="cell" data-label="Papel Familiar:">${testimonial.papelFamiliar}</div>
                   <div class="table-cell" role="cell" data-label="Ações:">
                       <div class="action-buttons">
                           <button class="edit-button">Editar</button>
                           <button class="delete-button">Excluir</button>
                       </div>
                   </div>
               `;
               testimonialList.appendChild(row);
               count++;
           });
           testimonialCount.textContent = `(${count})`;
       } catch (error) {
           console.error("Erro ao buscar depoimentos: ", error);
           testimonialList.innerHTML = '<p>Erro ao carregar depoimentos.</p>';
       }
   }

   fetchTestimonials();

   testimonialList.addEventListener('click', function (e) {
       const target = e.target;
       const row = target.closest('.table-row');
       if (!row) return;

       const testimonialId = row.getAttribute('data-id');

       if (target.classList.contains('delete-button')) {
           if (confirm('Tem certeza que deseja excluir este depoimento?')) {
               deleteDoc(doc(db, 'testimonials', testimonialId))
                   .then(() => {
                       console.log('Document successfully deleted!');
                       fetchTestimonials(); // Recarrega a lista
                   })
                   .catch((error) => {
                       console.error('Error removing document: ', error);
                       alert('Ocorreu um erro ao excluir o depoimento.');
                   });
           }
       }

       if (target.classList.contains('edit-button')) {
           window.location.href = `cadastro-depoimento.html?id=${testimonialId}`;
       }
   });
});
