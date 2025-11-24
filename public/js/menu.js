document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');

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
