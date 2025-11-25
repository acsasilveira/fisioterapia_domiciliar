document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');

  // Lista de páginas onde o menu hambúrguer não deve aparecer
  const restrictedPages = [
    '/pages/admin-login.html',
    '/pages/cadastro-depoimentos.html',
    '/pages/cadastro-produtos.html',
    '/pages/dash-depoimentos.html',
    '/pages/dash-geral.html',
    '/pages/dash-produtos.html'
  ];

  // Verifica se a página atual está na lista de páginas restritas
  const isRestrictedPage = restrictedPages.some(page => window.location.pathname.endsWith(page));

  // Se estiver em uma página restrita, oculta o menu hambúrguer
  if (isRestrictedPage) {
    if (hamburger) {
      hamburger.style.display = 'none';
    }
    return; // Impede a execução do restante do código
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (event) => {
      event.stopPropagation();
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    document.addEventListener('click', (event) => {
      if (navMenu.classList.contains('open')) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger) {
          navMenu.classList.remove('open');
          hamburger.classList.remove('open');
        }
      }
    });

    const navItems = navMenu.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                hamburger.classList.remove('open');
            }
        });
    });
  }
});
