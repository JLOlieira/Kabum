const leftMenu_container = document.querySelector('.left-menu-container');
const leftMenu = document.querySelector('.left-menu');
const leftMenu_btn = document.querySelector('.left-menu-btn');
const closeMenu_btn = document.querySelector('.close-menu-btn');
const body = document.querySelector('body');
const header = document.getElementById('header');
const navbar = document.getElementById('navbar');

leftMenu_btn.addEventListener('click', () => {
    leftMenu_container.classList.add('active');
    leftMenu.classList.add('active');
    body.style.overflow = 'hidden';
});

closeMenu_btn.addEventListener('click', () => {
    leftMenu_container.classList.remove('active');
    leftMenu.classList.remove('active');
    body.style.overflow = 'auto';
});
leftMenu_container.addEventListener('click', (e) => {
    if (e.target === leftMenu_container) {
        leftMenu_container.classList.remove('active');
        leftMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.style.height = "70px";
        header.style.position = "fixed";
        navbar.style.marginTop = "70px";
    } else {
        header.style.height = "105px";
        header.style.position = "static";
        navbar.style.marginTop = "0px";
    }
}