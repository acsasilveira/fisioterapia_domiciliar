import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', function () {
   const testimonialsContainer = document.getElementById('testimonials-container');

   async function fetchTestimonials() {
       try {
           const querySnapshot = await getDocs(collection(db, 'testimonials'));
           testimonialsContainer.innerHTML = ''; 

           if (querySnapshot.empty) {
               testimonialsContainer.innerHTML = '<p>Nenhum depoimento encontrado.</p>';
               return;
           }

           querySnapshot.forEach((doc) => {
               const testimonial = doc.data();
               const card = document.createElement('article');
               card.classList.add('testimonial-card');

               card.innerHTML = `
                   <img src="./assets/images/img_container.svg" alt="5 stars rating" class="testimonial-stars">
                   <p class="testimonial-text">\"${testimonial.depoimento}\"</p>
                   <div class="testimonial-author">
                       <p class="testimonial-name">${testimonial.paciente}</p>
                       <p class="testimonial-role">${testimonial.papelFamiliar}</p>
                   </div>
               `;
               testimonialsContainer.appendChild(card);
           });
       } catch (error) {
           console.error("Erro ao buscar depoimentos: ", error);
           testimonialsContainer.innerHTML = '<p>Erro ao carregar depoimentos.</p>';
       }
   }

   fetchTestimonials();
});
