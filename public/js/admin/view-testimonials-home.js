import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { db } from './firebase-config.js';
import { initCarousel } from '../carousel.js';

document.addEventListener('DOMContentLoaded', function () {
   const testimonialsContainer = document.querySelector('.carousel-container');

   async function fetchTestimonials() {
       if (!testimonialsContainer) {
           console.error("O contêiner de depoimentos não foi encontrado.");
           return;
       }

       try {
           const querySnapshot = await getDocs(collection(db, 'testimonials'));
           
           testimonialsContainer.innerHTML = '';

           if (querySnapshot.empty) {
               testimonialsContainer.innerHTML = '<p>Nenhum depoimento encontrado.</p>';
               const carouselControls = document.querySelector('.carousel-controls');
               if (carouselControls) {
                   carouselControls.style.display = 'none';
               }
               return;
           }

           querySnapshot.forEach((doc) => {
               const testimonial = doc.data();
               const slide = document.createElement('div');
               slide.classList.add('carousel-slide');

               const card = document.createElement('article');
               card.classList.add('testimonial-card');

               card.innerHTML = `
                   <p class="testimonial-text">\"${testimonial.depoimento}\"</p>
                   <div class="testimonial-author">
                       <p class="testimonial-name">${testimonial.paciente}</p>
                       <p class="testimonial-role">${testimonial.papelFamiliar}</p>
                   </div>
               `;
               slide.appendChild(card);
               testimonialsContainer.appendChild(slide);
           });

           // Inicializa o carrossel depois que os depoimentos são carregados.
           initCarousel();

       } catch (error) {
           console.error("Erro ao buscar depoimentos: ", error);
           if (testimonialsContainer) {
            testimonialsContainer.innerHTML = '<p>Erro ao carregar depoimentos.</p>';
           }
       }
   }

   fetchTestimonials();
});
