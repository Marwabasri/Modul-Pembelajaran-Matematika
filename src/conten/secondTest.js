let currentQuestion = 1;
const totalQuestions = 2;

// Function to hide navigation buttons
const hideNavButtons = () => {
    const navButtons = document.querySelector('.fixed.bottom-0');
    if (navButtons) {
        navButtons.style.display = 'none';
    }
};

// Function to check if all questions are answered
const areAllQuestionsAnswered = () => {
    // Check Question 1 (multiple choice)
    const q1Answered = document.querySelector('input[name="q1"]:checked') !== null;
    
    // Check Question 2 (short answer)
    const q2Answered = document.getElementById('answer-2').value.trim() !== '';

    // Check Question 3 (short answer)
    const q3Answered = document.getElementById('answer-3').value.trim() !== '';

    // Check Question 4 (short answer)
    const q4Answered = document.getElementById('answer-4').value.trim() !== '';

    // Check Question 5 (short answer)
    const q5Answered = document.getElementById('answer-5').value.trim() !== '';

    // Check Question 6 (short answer)
    const q6Answered = document.getElementById('answer-6').value.trim() !== '';

    // Show/hide check all button based on answers
    const checkAllButton = document.getElementById('check-all');
    checkAllButton.style.display = (q1Answered && q2Answered && q3Answered && q4Answered && q5Answered && q6Answered) ? 'block' : 'none';
    
    return q1Answered && q2Answered && q3Answered && q4Answered && q5Answered && q6Answered;
};

// Navigation functions
const updateQuestion = (newQuestion) => {
    // Hide all questions
    for (let i = 1; i <= totalQuestions; i++) {
        document.getElementById(`question-${i}`).classList.add('hidden');
    }
    
    // Show current question
    document.getElementById(`question-${newQuestion}`).classList.remove('hidden');
    
    // Update progress bar
    const progress = (newQuestion / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    
    // Update button states
    document.getElementById('prev-btn').disabled = newQuestion === 1;
    document.getElementById('next-btn').disabled = newQuestion === totalQuestions;
    
    currentQuestion = newQuestion;
};

// Event listener for end test button
document.getElementById('endTheTest').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Apakah Anda yakin ingin mengakhiri sesi tes?')) {
        window.location.href = './frekuensi-relatif.html';
    }
});

// Enhanced setFeedback function with correct answer display
const setFeedback = (elementId, message, isCorrect, correctAnswer = '') => {
    const element = document.getElementById(elementId);
    const feedbackClass = isCorrect ? 'text-green-600' : 'text-red-600';
    
    let feedbackMessage = message;
    if (!isCorrect && correctAnswer) {
        feedbackMessage += `<br><span class="text-gray-600 block">Jawaban yang benar: ${correctAnswer}</span>`;
    }
    
    element.innerHTML = feedbackMessage;
    element.className = `mt-2 text-xs font-medium ${feedbackClass}`;
};

// Disable all inputs function
const disableAllInputs = () => {
    // Disable radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });
    // Disable selected answers interaction
    document.querySelectorAll('#selected-answers-2 div').forEach(div => {
        div.style.pointerEvents = 'none';
        div.classList.add('opacity-50');
    });
    document.querySelectorAll('#selected-answers-3 div').forEach(div => {
        div.style.pointerEvents = 'none';
        div.classList.add('opacity-50');
    });
    document.querySelectorAll('#selected-answers-4 div').forEach(div => {
        div.style.pointerEvents = 'none';
        div.classList.add('opacity-50');
    });
    document.querySelectorAll('#selected-answers-5 div').forEach(div => {
        div.style.pointerEvents = 'none';
        div.classList.add('opacity-50');
    });
    document.querySelectorAll('#selected-answers-6 div').forEach(div => {
        div.style.pointerEvents = 'none';
        div.classList.add('opacity-50');
    });

    // Disable check all button
    document.getElementById('check-all').style.display = 'none';
};


// Event listeners for navigation
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestion > 1) {
        updateQuestion(currentQuestion - 1);
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestion < totalQuestions) {
        updateQuestion(currentQuestion + 1);
    }
});

// Add input event listeners for all questions
document.querySelectorAll('input[name="q1"]').forEach(radio => {
    radio.addEventListener('change', areAllQuestionsAnswered);
});

document.getElementById('answer-2').addEventListener('input', areAllQuestionsAnswered);
document.getElementById('answer-3').addEventListener('input', areAllQuestionsAnswered);
document.getElementById('answer-4').addEventListener('input', areAllQuestionsAnswered);
document.getElementById('answer-5').addEventListener('input', areAllQuestionsAnswered);
document.getElementById('answer-6').addEventListener('input', areAllQuestionsAnswered);



// Check All Answers with confirmation
document.getElementById('check-all').addEventListener('click', () => {
    if (!confirm('Apakah Anda yakin ingin mengecek semua jawaban? Anda tidak akan dapat mengubah jawaban setelah ini.')) {
        return;
    }

    let score = 0;
    const wrongQuestions = [];

    // Check Question 1
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    const isQ1Correct = q1Answer && q1Answer.value === 'a';
    if (isQ1Correct) {
        score++;
    } else {
        wrongQuestions.push(1);
    }
    setFeedback('feedback-1',
        isQ1Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ1Correct,
        isQ1Correct ? '' : 'Frekuensi relatif atau peluang empiris  adalah rasio banyaknya kejadian yang diharapkan terhadap banyaknya anggota ruang sampel'
    );

    // Check Question 2
    const q2Answer = document.getElementById('answer-2').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ2Answers = ['34/50', '17/25', '0.68', '68%'].map(ans => ans.replace(/\s+/g, ''));
    const isQ2Correct = correctQ2Answers.includes(q2Answer);
    if (isQ2Correct) {
        score++;
    } else {
        wrongQuestions.push(2);
    }
    setFeedback('feedback-2',
        isQ2Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ2Correct,
        isQ2Correct ? '' : '34/50 atau 68%'
    );

    // Check Question 2
    const q3Answer = document.getElementById('answer-3').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ3Answers = ['30/40', '3/4','0.75', '75%'].map(ans => ans.replace(/\s+/g, ''));
    const isQ3Correct = correctQ3Answers.includes(q3Answer);
    if (isQ3Correct) {
        score++;
    } else {
        wrongQuestions.push(3);
    }
    setFeedback('feedback-3',
        isQ3Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ3Correct,
        isQ3Correct ? '' : '30/40 atau 75%'
    );

    // Check Question 4
    const q4Answer = document.getElementById('answer-4').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ4Answers = ['37/60', '0.6167', '61.67%'].map(ans => ans.replace(/\s+/g, ''));
    const isQ4Correct = correctQ4Answers.includes(q4Answer);
    if (isQ4Correct) {
        score++;
    } else {
        wrongQuestions.push(4);
    }
    setFeedback('feedback-4',
        isQ4Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ4Correct,
        isQ4Correct ? '' : '37/60 atau 61.67%'
    );

    // Check Question 5
    const q5Answer = document.getElementById('answer-5').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ5Answers = ['39/55','0.7091', '70.91%'].map(ans => ans.replace(/\s+/g, ''));
    const isQ5Correct = correctQ5Answers.includes(q5Answer);
    if (isQ5Correct) {
        score++;
    } else {
        wrongQuestions.push(5);
    }
    setFeedback('feedback-5',
        isQ5Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ5Correct,
        isQ5Correct ? '' : '39/55 atau 70.91%'
    );

    // Check Question 6
    const q6Answer = document.getElementById('answer-6').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ6Answers = ['Shadow', 'shadow'].map(ans => ans.replace(/\s+/g, ''));
    const isQ6Correct = correctQ6Answers.includes(q6Answer);
    if (isQ6Correct) {
        score++;
    } else {
        wrongQuestions.push(6);
    }
    setFeedback('feedback-6',
        isQ6Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ6Correct,
        isQ6Correct ? '' : 'Tim Shadow'
    );

    // Show all questions for review
    document.querySelectorAll('section[id^="question-"]').forEach(section => {
        section.classList.remove('hidden');
    });

    // Display results
    document.getElementById('final-score').textContent = `Skor Total: ${score}/6`;
    document.getElementById('final-score').className = 'mt-4 w-full p-3 bg-primary/20 text-lg rounded-md font-bold border border-primary text-primary text-center';

    // Hide navigation buttons after showing final score
    hideNavButtons();

    // Disable all inputs after checking
    disableAllInputs();
});

// Initially hide the check all button
document.getElementById('check-all').style.display = 'none';

// Initialize first question
updateQuestion(1);



const options = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: [
      {
        name: "Total Pertandingan",
        color: "#1A56DB",
        data: [
          { x: "Phoenix", y: 50 },
          { x: "Shadow", y: 40 },
          { x: "Titan", y: 60 },
          { x: "Nova", y: 55 },
        ],
      },
      {
        name: "Total Kemenangan",
        color: "#FDBA8C",
        data: [
          { x: "Phoenix", y: 34 },
          { x: "Shadow", y: 30 },
          { x: "Titan", y: 37 },
          { x: "Nova", y: 39 },
        ],
      },
    ],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  }
  
  if(document.getElementById("column-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("column-chart"), options);
    chart.render();
  }
  