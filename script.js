//Navbar Fixed

window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop; 

    if(window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }
};

//hamburger

const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click',function(){
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

//close for each question on desain pembelajaran
document.querySelectorAll('details').forEach((detail) => {
    detail.addEventListener('toggle', (event) => {
        if (detail.open) {
            document.querySelectorAll('details').forEach((otherDetail) => {
                if (otherDetail !== detail) {
                    otherDetail.open = false;
                }
            });
        }
    });
});

//frekeuensi relatif js

  const showCardButton = document.getElementById('showCardButton');
  const interactiveCard = document.getElementById('interactiveCard');
  const closeCardButton = document.getElementById('closeCardButton');

  showCardButton.addEventListener('click', () => {
    interactiveCard.classList.remove('hidden');
    interactiveCard.style.display = 'flex';
  });

  closeCardButton.addEventListener('click', () => {
    interactiveCard.classList.add('hidden');
    interactiveCard.style.display = 'none';
  });

  