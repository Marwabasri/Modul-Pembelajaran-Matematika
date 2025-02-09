//
//Script Pemenang Kejadian Batu Gunting Kertas
//

function validateAnswers() {
  // Mengambil semua dropdown (select elements)
  const selects = document.querySelectorAll("select");
  let correctAnswers = 0;
  let totalQuestions = selects.length;

  // Jawaban yang benar untuk setiap pertandingan
  const correctResults = {
      "Batu vs Batu": "seri",
      "Batu vs Gunting": "p1",
      "Batu vs Kertas": "p2",
      "Gunting vs Batu": "p2",
      "Gunting vs Gunting": "seri",
      "Gunting vs Kertas": "p1",
      "Kertas vs Batu": "p1",
      "Kertas vs Gunting": "p2",
      "Kertas vs Kertas": "seri"
  };

  // Cek setiap dropdown
  selects.forEach((select) => {
      const img = select.parentElement.querySelector('img'); //mengambil elemen gambar
      const label = img.alt.trim();//mengambil atribut alt sebagai label
      const selectedValue = select.value;

      // Cek apakah hasil yang dipilih sesuai dengan jawaban yang benar
      if (correctResults[label] === selectedValue) {
          correctAnswers++;
          // Menghapus kelas merah jika jawaban benar
          select.classList.remove("border-red-500");
          select.classList.add("border-green-500");
      } else if (selectedValue !== "") {
          // Menandai kotak dengan border merah jika jawaban salah
          select.classList.remove("border-green-500");
          select.classList.add("border-red-500");
      }
  });

  // Menampilkan hasil
  const feedbackElement = document.getElementById("resultWin");
  if (correctAnswers === totalQuestions) {
      feedbackElement.textContent = "Selamat! Semua jawaban benar.";
      feedbackElement.classList.add("text-green-500");
      feedbackElement.classList.remove("text-red-500");
  } else {
      feedbackElement.textContent = `Anda benar ${correctAnswers} dari ${totalQuestions} jawaban.`;
      feedbackElement.classList.add("text-red-500");
      feedbackElement.classList.remove("text-green-500");
  }

  // Menonaktifkan semua dropdown setelah memeriksa jawaban
  selects.forEach((select) => {
      select.disabled = true;  // Menonaktifkan dropdown
  });

  // Menonaktifkan tombol "Periksa Jawaban"
  document.getElementById("checkWin").disabled = true;
}

function restartWin() {
  // Mengambil semua elemen dropdown
  const selects = document.querySelectorAll("select");

  // Mengatur ulang setiap dropdown ke opsi default
  selects.forEach(select => {
      select.value = "";  // Kembali ke opsi awal
      select.disabled = false;  // Mengaktifkan dropdown
      select.classList.remove("border-red-500", "border-green-500");  // Hapus highlight
  });

  // Kosongkan hasil feedback
  const feedbackElement = document.getElementById("resultWin");
  feedbackElement.textContent = "";
  feedbackElement.classList.remove("text-green-500", "text-red-500");

  // Mengaktifkan tombol "Periksa Jawaban"
  document.getElementById("checkWin").disabled = false;
}



//
// SCRIPT QUIZ TYPE 5
//

function setupQuestionType5(questionType5Id, correctAnswersType5) {
  const answerList = document.getElementById(`answerType5-list-${questionType5Id}`);
  const optionsContainer = document.getElementById(`optionsType5-list-${questionType5Id}`);
  const optionButtons = optionsContainer.querySelectorAll('.option-btnType5');
  const submitButton = document.getElementById(`submitType5-btn-${questionType5Id}`);
  const feedback = document.getElementById(`feedbackType5-${questionType5Id}`);
  let isAnswerCorrect = false;

  // Move an option to the answer box
  const moveOptionToAnswer = (button) => {
      if (isAnswerCorrect) return; // Prevent interaction if the answer is correct

      const existingAnswers = Array.from(answerList.children).map(item => item.getAttribute('value'));
      if (existingAnswers.includes(button.value)) {
          feedback.textContent = 'Jawaban sudah dipilih!';
          feedback.className = 'mt-4 text-sm font-semibold text-red-600';
          return;
      }

      const answerItem = document.createElement('div');
      answerItem.id = `answer-item-${questionType5Id}-${button.textContent}`;
      answerItem.textContent = button.textContent;
      answerItem.setAttribute('value', button.value);
      answerItem.className = 'bg-gray-100 text-gray-600 text-xs items-center ml-1 rounded-sm cursor-pointer hover:bg-gray-300';
      answerList.appendChild(answerItem);

      button.remove();

      // Return an answer to the options container
      answerItem.addEventListener('click', () => {
          if (isAnswerCorrect) return; // Prevent interaction if the answer is correct

          const optionButton = document.createElement('button');
          optionButton.id = `option-btn-${questionType5Id}-${answerItem.textContent}`;
          optionButton.textContent = answerItem.textContent;
          optionButton.setAttribute('value', answerItem.getAttribute('value'));
          optionButton.className = 'option-btnType5 bg-gray-100 text-gray-600 p-2 rounded-sm hover:bg-secondary focus:outline-none';
          optionsContainer.appendChild(optionButton);

          optionButton.addEventListener('click', () => moveOptionToAnswer(optionButton));

          answerItem.remove();
      });
  };

  // Attach click event to all option buttons
  optionButtons.forEach(button => {
      button.addEventListener('click', () => {
          moveOptionToAnswer(button);
      });
  });

  // Submit answer functionality
  const submitAnswer = () => {
      const answerItems = Array.from(answerList.children).map(item => item.getAttribute('value'));
      if (answerItems.length === correctAnswersType5.length && answerItems.every(ans => correctAnswersType5.includes(ans))) {
          feedback.innerHTML = '<img src="../dist/img/true.svg" alt="Benar"><span>Jawaban Benar!</span>';
          feedback.className = 'alert correct';
          isAnswerCorrect = true;
          submitButton.style.display = 'none'; 
          disableAllButtons();
      } else {
          feedback.innerHTML = '<img src="../dist/img/false.svg" alt="Salah"><span>Jawaban salah!</span>';
          feedback.className = 'alert incorrect';
      }
  };

  // Disable all buttons and interactions
  const disableAllButtons = () => {
      const allButtons = optionsContainer.querySelectorAll('button');
      allButtons.forEach(button => button.disabled = true);
      submitButton.disabled = true;
      const answerItemsInBox = answerList.querySelectorAll('div');
      answerItemsInBox.forEach(item => {
          item.style.cursor = 'not-allowed';
          item.style.pointerEvents = 'none';
      });
  };

  submitButton.addEventListener('click', submitAnswer);
}

// Initialize question 
setupQuestionType5(7, ['Opsi 77','Opsi 79', 'Opsi 74']);
setupQuestionType5(8, ['Opsi 82','Opsi 85', 'Opsi 83']);
setupQuestionType5(9, ['Opsi 91','Opsi 96', 'Opsi 98']);




//kubus
const cube = document.getElementById("cube");
let isDragging = false;
let previousX, previousY;
let currentRotationX = 0;
let currentRotationY = 0;

// Fungsi untuk mendapatkan posisi yang sesuai (mouse atau touch)
function getClientPos(e) {
  if (e.type.startsWith("touch")) {
    return { x: e.touches[0].pageX, y: e.touches[0].pageY };
  } else {
    return { x: e.clientX, y: e.clientY };
  }
}

// Fungsi untuk memulai interaksi
function startDrag(e) {
  e.preventDefault(); // Hindari scrolling pada touch
  isDragging = true;
  const pos = getClientPos(e);
  previousX = pos.x;
  previousY = pos.y;
  cube.style.cursor = "grabbing";
}

// Fungsi untuk menangani pergerakan
function onDrag(e) {
  if (!isDragging) return;

  const pos = getClientPos(e);
  const deltaX = pos.x - previousX;
  const deltaY = pos.y - previousY;

  currentRotationX -= deltaY * 0.5;
  currentRotationY += deltaX * 0.5;

  cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

  previousX = pos.x;
  previousY = pos.y;
}

// Fungsi untuk menghentikan interaksi
function stopDrag() {
  isDragging = false;
  cube.style.cursor = "grab";
}

// Event listener untuk mouse
cube.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", onDrag);
window.addEventListener("mouseup", stopDrag);

// Event listener untuk touch (mobile/tablet)
cube.addEventListener("touchstart", startDrag, { passive: false });
window.addEventListener("touchmove", onDrag, { passive: false });
window.addEventListener("touchend", stopDrag);
