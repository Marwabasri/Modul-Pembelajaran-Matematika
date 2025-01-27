//SPINNER

const createSpinner = (canvasId, buttonId, spinnerIndex, colors) => {
    const wheel = document.getElementById(canvasId);
    const spinBtn = document.getElementById(buttonId);
    const finalValue = document.getElementById("final-value");
  
    const rotationValues = [
      { minDegree: 0, maxDegree: 30, value: 2 },
      { minDegree: 31, maxDegree: 90, value: 1 },
      { minDegree: 91, maxDegree: 150, value: 6 },
      { minDegree: 151, maxDegree: 210, value: 5 },
      { minDegree: 211, maxDegree: 270, value: 4 },
      { minDegree: 271, maxDegree: 330, value: 3 },
      { minDegree: 331, maxDegree: 360, value: 2 },
    ];
  
    const data = [16, 16, 16, 16, 16, 16];
  
    let myChart = new Chart(wheel, {
      plugins: [ChartDataLabels],
      type: "pie",
      data: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
          {
            backgroundColor: colors,
            data: data,
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: 0 },
        plugins: {
          tooltip: false,
          legend: { display: false },
          datalabels: {
            color: "#ffffff",
            formatter: (_, context) => context.chart.data.labels[context.dataIndex],
            font: { size: 16 },
          },
        },
      },
    });
  
    const valueGenerator = (angleValue) => {
      for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
          return i.value;
        }
      }
    };
  
    let count = 0;
    let resultValue = 101;
  
    spinBtn.addEventListener("click", () => {
      spinBtn.disabled = true;
      finalValue.innerHTML = `<p>Good Luck!</p>`;
      let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  
      let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
  
        if (myChart.options.rotation >= 360) {
          count += 1;
          resultValue -= 5;
          myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
          const value = valueGenerator(randomDegree);
          window["spinner" + spinnerIndex] = value;
          const spinner1Value = window.spinner1 || 0;
          const spinner2Value = window.spinner2 || 0;
          finalValue.innerHTML = `<p>Kombinasi Value adalah: ${spinner1Value}, ${spinner2Value}</p>`;
          clearInterval(rotationInterval);
          count = 0;
          resultValue = 101;
        }
      }, 10);
    });
  };
  
  createSpinner("wheel1", "spin-btn1", 1, ["#fa0644", "#fa0644", "#3a5dc4", "#3a5dc4", "#ffde59", "#ffde59"]);
  createSpinner("wheel2", "spin-btn2", 2, ["#b163da", "#b163da", "#b163da", "#7ed957", "#7ed957", "#7ed957"]);
  
// Special
//QuizType1
//Expereinece RS spinner

function checkAnswerType1Special() {
  const alertBoxType1 = document.getElementById("alert9");
  const correctAnswerBox = document.getElementById("answer9");
  const selectedOption = document.querySelector('input[name="question9"]:checked');
  const correctAnswer = "b"; // Jawaban benar
  const correctAnswerText = "Tidak"; // Teks jawaban benar

  // Validasi jika belum ada jawaban yang dipilih
  if (!selectedOption) {
    alertBoxType1.innerHTML = '<span>Silakan pilih jawaban terlebih dahulu!</span>';
    alertBoxType1.className = "alert warning";
    alertBoxType1.style.display = "block";
    setTimeout(() => { alertBoxType1.style.display = "none"; }, 2000);
    return;
  }

  const selectedLabel = selectedOption.closest("label");

  // Menonaktifkan semua radio button setelah jawaban dipilih
  const buttons = document.querySelectorAll('input[name="question9"]');
  buttons.forEach(btn => btn.disabled = true);

  const userAnswer = selectedOption.value;

  if (userAnswer === correctAnswer) {
    alertBoxType1.innerHTML = '<img src="../dist/img/true.svg" alt="Benar"><span>Jawaban Benar!</span>';
    alertBoxType1.className = "alert correct";
    selectedLabel.classList.add("correct-answer"); // Tambahkan warna hijau pada jawaban benar
  } else {
    alertBoxType1.innerHTML = '<img src="../dist/img/false.svg" alt="Salah"><span>Jawaban Salah!</span>';
    alertBoxType1.className = "alert incorrect";
    selectedLabel.classList.add("incorrect-answer"); // Tambahkan warna merah pada jawaban salah
    correctAnswerBox.textContent = `Jawaban yang benar adalah: ${correctAnswerText}`;
    correctAnswerBox.style.display = "block";
  }

  // Tampilkan pesan hasil (Benar/Salah)
  alertBoxType1.style.display = "block";
  setTimeout(() => { alertBoxType1.style.display = "none"; }, 2000);

  // Menyembunyikan tombol kirim setelah jawaban diverifikasi
  const submitButton = document.querySelector('.submit-btn');
  const questionType1_10 = document.getElementById('questionType1_10');
  if (submitButton) {
    submitButton.style.display = "none";
  }
  if (questionType1_10) {
    questionType1_10.style.display = 'block';
  }
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
          feedback.textContent = 'Jawaban Anda Benar!';
          feedback.className = 'mt-4 text-sm font-semibold text-green-600';
          isAnswerCorrect = true;
          submitButton.style.display = 'none'; 
          disableAllButtons();
      } else {
          feedback.textContent = 'Jawaban Anda Salah. Coba lagi!';
          feedback.className = 'mt-4 text-sm font-semibold text-red-600';
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



// Initialize question 2
setupQuestionType5(3, ['Opsi 34','Opsi 36']);


//kubus
const cube = document.getElementById("cube");
let isDragging = false;
let previousX, previousY;
let currentRotationX = 0;
let currentRotationY = 0;

// Fungsi untuk memulai interaksi (mouse & touch)
function startDrag(e) {
  isDragging = true;
  previousX = e.clientX || e.touches[0].clientX;
  previousY = e.clientY || e.touches[0].clientY;
  cube.style.cursor = "grabbing";
}

// Fungsi untuk menangani pergerakan (mouse & touch)
function onDrag(e) {
  if (!isDragging) return;

  // Gunakan event touch atau mouse
  const clientX = e.clientX || e.touches[0].clientX;
  const clientY = e.clientY || e.touches[0].clientY;

  const deltaX = clientX - previousX;
  const deltaY = clientY - previousY;

  currentRotationX -= deltaY * 0.5;
  currentRotationY += deltaX * 0.5;

  cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;

  previousX = clientX;
  previousY = clientY;
}

// Fungsi untuk menghentikan interaksi (mouse & touch)
function stopDrag() {
  isDragging = false;
  cube.style.cursor = "grab";
}

// Event listener untuk mouse
cube.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", onDrag);
window.addEventListener("mouseup", stopDrag);

// Event listener untuk touch
cube.addEventListener("touchstart", startDrag, { passive: true });
window.addEventListener("touchmove", onDrag, { passive: true });
window.addEventListener("touchend", stopDrag);
