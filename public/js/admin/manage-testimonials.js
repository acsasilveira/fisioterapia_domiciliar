import { collection, addDoc, getDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js';
import { db } from '../firebase-config.js';

document.addEventListener('DOMContentLoaded', function () {
    const testimonialForm = document.getElementById('testimonialForm');
    const urlParams = new URLSearchParams(window.location.search);
    const testimonialId = urlParams.get('id');

    if (testimonialId) {
        // Edit mode
        const docRef = doc(db, 'testimonials', testimonialId);
        document.title = 'Editar Depoimento | Gabriela Ribeiro';
        document.querySelector('.form-title').textContent = 'Editar Depoimento';

        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const testimonial = docSnap.data();
                document.getElementById('paciente').value = testimonial.paciente;
                document.getElementById('papelFamiliar').value = testimonial.papelFamiliar;
                document.getElementById('depoimento').value = testimonial.depoimento;
                document.querySelector('.primary-button').textContent = 'Atualizar Depoimento';
            } else {
                console.log('No such document!');
                alert('Depoimento não encontrado. Você será redirecionado para o painel.');
                window.location.href = 'dash-depoimentos.html';
            }
        }).catch(error => {
            console.log('Error getting document:', error);
        });
    }

    testimonialForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(testimonialForm);
        const testimonialData = {
            paciente: formData.get('paciente'),
            papelFamiliar: formData.get('papelFamiliar'),
            depoimento: formData.get('depoimento')
        };

        if (!testimonialData.paciente || !testimonialData.papelFamiliar || !testimonialData.depoimento) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const promise = testimonialId
            ? updateDoc(doc(db, 'testimonials', testimonialId), testimonialData)
            : addDoc(collection(db, 'testimonials'), testimonialData);

        promise.then(() => {
            const message = testimonialId ? 'Depoimento atualizado com sucesso!' : 'Depoimento cadastrado com sucesso!';
            console.log('Document successfully handled!');
            alert(message);
            window.location.href = 'dash-depoimentos.html';
        }).catch((error) => {
            const message = testimonialId ? 'Erro ao atualizar o depoimento.' : 'Erro ao cadastrar o depoimento.';
            console.error('Error handling document: ', error);
            alert(message + ' Tente novamente.');
        });
    });
});