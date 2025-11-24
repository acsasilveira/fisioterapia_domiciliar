import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { db } from '../firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productsGrid = document.querySelector('.products-grid');

    async function fetchAndRenderProducts() {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            productsGrid.innerHTML = ''; // Limpa os produtos estáticos

            if (querySnapshot.empty) {
                productsGrid.innerHTML = '<p>Nenhum produto cadastrado no momento.</p>';
                return;
            }

            querySnapshot.forEach(doc => {
                const product = doc.data();
                const productCard = document.createElement('article');
                productCard.className = 'product-card';

                productCard.innerHTML = `
                    <img src="${product.imageUrl || '../img/img_placeholder.png'}" alt="${product.name}" class="product-image">
                    <h3 class="product-title">${product.name}</h3>
                    <span class="product-price">${product.value}</span>
                    <p class="product-description">${product.description}</p>
                    <a href="${product.productLink}" target="_blank" class="product-button">
                        <img src="../img/click.svg" alt="Clique Aqui" class="whatsapp-icon">
                        Acessar Produto
                    </a>
                `;

                productsGrid.appendChild(productCard);
            });
        } catch (error) {
            console.error("Erro ao buscar produtos: ", error);
            productsGrid.innerHTML = '<p>Ocorreu um erro ao carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }

    fetchAndRenderProducts();
});
