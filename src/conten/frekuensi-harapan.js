const spinButton = document.getElementById('spin-button');
const spinnerContainer = document.getElementById('spinner-container');
const redeemButton = document.getElementById('redeem-button');
const voucherInput = document.getElementById('voucher');
const prizeList = document.getElementById('prize-list');        
const spinCounterElement = document.getElementById('spin-counter');

let spinCount = 0;

function showCustomAlert(message) {
    customAlert.textContent = message;
    customAlert.style.display = 'block';
    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 2000);
}

function updateSpinCounter() {
    spinCounterElement.textContent = spinCount;
}

redeemButton.addEventListener('click', () => {
    const voucherCode = voucherInput.value.trim();
    if (voucherCode === "SPIN2WIN") {
        spinCount += 3;
        alert("Voucher berhasil digunakan! Anda mendapatkan 3 spin.");
    } else if (voucherCode === "SPINMATH") {
        spinCount += 5;
        alert("Voucher berhasil digunakan! Anda mendapatkan 5 spin.");
    } else if (voucherCode === "MATHRESTO") {
        spinCount += 10;
        alert("Voucher berhasil digunakan! Anda mendapatkan 10 spin.");
    } else {
        alert("Kode voucher tidak valid.");
    }
    voucherInput.value = "";
    updateSpinCounter();
});

spinButton.addEventListener('click', () => {
    if (spinCount <= 0) {
        alert("Anda tidak memiliki spin tersisa. Masukkan kode voucher untuk mendapatkan spin.");
        return;
    }

    spinCount--;
    updateSpinCounter();

    // Filter kotak valid
    const boxes = Array.from(spinnerContainer.children).filter(box => {
        return box.innerText.trim() !== "" && box !== spinButton;
    });

    // Reset semua kotak ke warna aslinya
    boxes.forEach(box => {
        box.classList.remove('highlight', 'selected-box');
        box.style.backgroundColor = ""; // Menghapus warna yang diatur sebelumnya
        box.style.color = ""; // Menghapus warna teks yang diatur sebelumnya
    });

    const randomIndex = Math.floor(Math.random() * boxes.length);
    let currentIndex = 0;
    let rounds = 3; // Jumlah putaran penuh sebelum melambat
    let speed = 100; // Kecepatan awal animasi

    const interval = setInterval(() => {
        // Hapus highlight dari semua kotak
        boxes.forEach(box => box.classList.remove('highlight'));

        // Tambahkan highlight ke kotak saat ini
        boxes[currentIndex].classList.add('highlight');
        currentIndex = (currentIndex + 1) % boxes.length;

        // Melambatkan animasi mendekati target
        if (rounds === 0 && currentIndex === randomIndex) {
            clearInterval(interval);

            // Hapus semua highlight setelah animasi selesai
            boxes.forEach(box => box.classList.remove('highlight'));

            // Sorot kotak yang terpilih
            boxes[randomIndex].classList.add('selected-box');

            const prize = boxes[randomIndex].innerText;
            const listItem = document.createElement('li');
            listItem.textContent = prize;
            prizeList.appendChild(listItem);

        }
    }, speed);

    const slowDownInterval = setInterval(() => {
        if (rounds > 0) {
            rounds--;
        } else {
            speed += 50; // Perlahan melambatkan
        }

        if (speed >= 400) {
            clearInterval(slowDownInterval); // Hentikan pelambatan
        }
    }, 100);
});

/// Tiket_1 / Kuis Box (Kejaidan "Coba Lagi")
    const ticketForm = document.getElementById('ticket-quiz-form1');
    const ticketFeedback = document.getElementById('ticket-feedback1');
    const ticketVoucher = document.getElementById('ticket-voucher1');
    const ticketSubmitBtn = document.getElementById('ticket-submit-btn1');
    const ticketAnswer = document.getElementById('ticket-answer1');

    ticketSubmitBtn.addEventListener('click', () => {
      const userAnswer = ticketForm['ticket-answer'].value.trim();
      const correctAnswer = "5/10";

      if (userAnswer === correctAnswer) {
        ticketFeedback.innerHTML = '<img src="../dist/img/true.svg" alt="Benar"><span> Jawaban Benar!</span>';
        ticketFeedback.className = 'alert correct';
        ticketFeedback.style.display = "block";
        ticketAnswer.classList.add('correct-answer');
        
        // Tampilkan kode voucher
        ticketVoucher.innerHTML = `
            <p class="text-primary text-center text-sm font-bold">Selamat! Anda mendapatkan kode voucher:</p>
            <p class="text-primary text-center text-base font-mono mt-1">SPIN2WIN</p>
        `;
        ticketVoucher.style.display = "block";

        // Disable semua input dalam form
        Array.from(ticketForm.elements).forEach(element => {
            element.disabled = true;
        });
      } else {
        ticketFeedback.innerHTML = '<img src="../dist/img/false.svg" alt="Salah"><span> Jawaban salah! Coba lagi.</span>';
        ticketFeedback.className = 'alert incorrect';
        ticketFeedback.style.display = "block";

      }
    });


/// Tiket_2 / Kuis Box (Kejaidan " Gratis Es Teh")
    const ticketForm2 = document.getElementById('ticket-quiz-form2');
    const ticketFeedback2 = document.getElementById('ticket-feedback2');
    const ticketVoucher2 = document.getElementById('ticket-voucher2');
    const ticketSubmitBtn2 = document.getElementById('ticket-submit-btn2');
    const ticketAnswer2 = document.getElementById('ticket-answer2');

    ticketSubmitBtn2.addEventListener('click', () => {
        const userAnswer2 = ticketForm2['ticket-answer'].value.trim();
        const correctAnswer2 = "3/10";

        if (userAnswer2 === correctAnswer2) {
            ticketFeedback2.innerHTML = '<img src="../dist/img/true.svg" alt="Benar"><span> Jawaban Benar!</span>';
            ticketFeedback2.className = 'alert correct';
            ticketFeedback2.style.display = "block";
            ticketAnswer2.classList.add('correct-answer');
            
            // Tampilkan kode voucher
            ticketVoucher2.innerHTML = `
                <p class="text-primary text-center text-sm font-bold">Selamat! Anda mendapatkan kode voucher:</p>
                <p class="text-primary text-center text-base font-mono mt-1">SPINMATH</p>
            `;
            ticketVoucher2.style.display = "block";

            // Disable semua input dalam form
            Array.from(ticketForm2.elements).forEach(element => {
                element.disabled = true;
            });
        } else {
            ticketFeedback2.innerHTML = '<img src="../dist/img/false.svg" alt="Salah"><span> Jawaban salah! Coba lagi.</span>';
            ticketFeedback2.className = 'alert incorrect';
            ticketFeedback2.style.display = "block";

        }
    });    


/// Tiket_3 / Kuis Box (Kejaidan "Diskon 5%")
    const ticketForm3 = document.getElementById('ticket-quiz-form3');
    const ticketFeedback3 = document.getElementById('ticket-feedback3');
    const ticketVoucher3 = document.getElementById('ticket-voucher3');
    const ticketSubmitBtn3 = document.getElementById('ticket-submit-btn3');
    const ticketAnswer3 = document.getElementById('ticket-answer3');

    ticketSubmitBtn3.addEventListener('click', () => {
    const userAnswer3 = ticketForm3['ticket-answer'].value.trim();
    const correctAnswer3 = "2/10";

    if (userAnswer3 === correctAnswer3) {
        ticketFeedback3.innerHTML = '<img src="../dist/img/true.svg" alt="Benar"><span> Jawaban Benar!</span>';
        ticketFeedback3.className = 'alert correct';
        ticketFeedback3.style.display = "block";
        ticketAnswer3.classList.add('correct-answer');
        
        // Tampilkan kode voucher
        ticketVoucher3.innerHTML = `
            <p class="text-primary text-center text-sm font-bold">Selamat! Anda mendapatkan kode voucher:</p>
            <p class="text-primary text-center text-base font-mono mt-1">MATHRESTO</p>
        `;
        ticketVoucher3.style.display = "block";

        // Disable semua input dalam form
        Array.from(ticketForm3.elements).forEach(element => {
            element.disabled = true;
        });
    } else {
        ticketFeedback3.innerHTML = '<img src="../dist/img/false.svg" alt="Salah"><span> Jawaban salah! Coba lagi.</span>';
        ticketFeedback3.className = 'alert incorrect';
        ticketFeedback3.style.display = "block";

    }
    });       


///GeneralFormulaFH
//
const alertFH = document.getElementById('alertFH');
const secondChoice = document.getElementById('secondChoice');
function checkGeneralFormula(element, isCorrect) {
    if (isCorrect) {
        document.querySelectorAll('.optionFH').forEach(div => {
            if (div !== element) {
                div.style.display = 'none';
                alertFH.innerHTML = '<img src="../dist/img/true.svg" alt="Benar"><span> Jawaban Benar!</span>';
                alertFH.className = 'alert correct';
                alertFH.style.display = "block";
                secondChoice.style.display = "block";
            }
        });
    } else {
        element.style.display = 'none';
        alertFH.innerHTML = '<img src="../dist/img/false.svg" alt="Salah"><span> Jawaban salah! Coba lagi.</span>';
        alertFH.className = 'alert incorrect';
        alertFH.style.display = "block";

    }
    // Hide the alert after 2 seconds
    setTimeout(function() {
        alertFH.style.display = 'none';
      }, 1000);
}