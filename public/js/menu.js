document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const dashboardNav = document.querySelector('.dashboard-nav');

    hamburgerMenu.addEventListener('click', function () {
        dashboardNav.classList.toggle('active');
    });
});
