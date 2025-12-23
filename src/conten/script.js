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

//pop up profil pengembang
const btnProfil = document.getElementById("btnProfil");
const overlayProfil = document.getElementById("overlayProfil");
const closeProfil = document.getElementById("closeProfil");

btnProfil.addEventListener("click", function (e) {
e.preventDefault();
overlayProfil.classList.remove("hidden");
});

closeProfil.addEventListener("click", function () {
overlayProfil.classList.add("hidden");
});

// Klik area gelap untuk menutup
overlayProfil.addEventListener("click", function (e) {
if (e.target === overlayProfil) {
overlayProfil.classList.add("hidden");
}
});




   