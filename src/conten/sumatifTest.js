let currentQuestion = 1;
const totalQuestions = 4;

// Function to hide navigation buttons
const hideNavButtons = () => {
    const navButtons = document.querySelector('.fixed.bottom-0');
    if (navButtons) {
        navButtons.style.display = 'none';
    }
};

// Function to check if all questions are answered
const areAllQuestionsAnswered = () => {
    // Check Question 1 (short answer)
    const q1Answered = document.getElementById('answer-1').value.trim() !== '';

    // Check Question 2 (short answer)
    const q2Answered = document.getElementById('answer-2').value.trim() !== '';

    // Check Question 3 (short answer)
    const q3Answered = document.getElementById('answer-3').value.trim() !== '';

    // Check Question 4 (short answer)
    const q4Answered = document.getElementById('answer-4').value.trim() !== '';

    // Check Question 5 (short answer)
    const q5Answered = document.getElementById('answer-5').value.trim() !== '';

    // Show/hide check all button based on answers
    const checkAllButton = document.getElementById('check-all');
    checkAllButton.style.display = (q1Answered && q2Answered && q3Answered && q4Answered && q5Answered) ? 'block' : 'none';
    
    return q1Answered && q2Answered && q3Answered && q4Answered && q5Answered;
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
        window.location.href = './frekuensi-harapan.html';
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
    // Disable text input 1
    document.getElementById('answer-1').disabled = true;
    document.getElementById('answer-1').classList.add('bg-gray-100');
    // Disable text input 2
    document.getElementById('answer-2').disabled = true;
    document.getElementById('answer-2').classList.add('bg-gray-100');
    // Disable text input
    document.getElementById('answer-3').disabled = true;
    document.getElementById('answer-3').classList.add('bg-gray-100');
    // Disable text input
    document.getElementById('answer-4').disabled = true;
    document.getElementById('answer-4').classList.add('bg-gray-100');
    // Disable text input
    document.getElementById('answer-5').disabled = true;
    document.getElementById('answer-5').classList.add('bg-gray-100');

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
document.getElementById('answer-1').addEventListener('input', areAllQuestionsAnswered);
document.getElementById('answer-2').addEventListener('input', areAllQuestionsAnswered);
document.getElementById('answer-3').addEventListener('input', areAllQuestionsAnswered);
document.getElementById('answer-4').addEventListener('input', areAllQuestionsAnswered);
document.getElementById('answer-5').addEventListener('input', areAllQuestionsAnswered);




// Check All Answers with confirmation
document.getElementById('check-all').addEventListener('click', () => {
    if (!confirm('Apakah Anda yakin ingin mengecek semua jawaban? Anda tidak akan dapat mengubah jawaban setelah ini.')) {
        return;
    }

    let score = 0;
    const wrongQuestions = [];
    // Check Question 1
    const q1Answer = document.getElementById('answer-1').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ1Answers = ['900'].map(ans => ans.replace(/\s+/g, ''));
    const isQ1Correct = correctQ1Answers.includes(q1Answer);
    if (isQ1Correct) {
        score++;
    } else {
        wrongQuestions.push(1);
    }
    setFeedback('feedback-1',
        isQ1Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ1Correct,
        isQ1Correct ? '' : '900 Siswa'
    );

    // Check Question 2
    const q2Answer = document.getElementById('answer-2').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ2Answers = ['6.750', '6750'].map(ans => ans.replace(/\s+/g, ''));
    const isQ2Correct = correctQ2Answers.includes(q2Answer);
    if (isQ2Correct) {
        score++;
    } else {
        wrongQuestions.push(2);
    }
    setFeedback('feedback-2',
        isQ2Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ2Correct,
        isQ2Correct ? '' : '6.750 Orang'
    );

    // Check Question 3
    const q3Answer = document.getElementById('answer-3').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ3Answers = ['5'].map(ans => ans.replace(/\s+/g, ''));
    const isQ3Correct = correctQ3Answers.includes(q3Answer);
    if (isQ3Correct) {
        score++;
    } else {
        wrongQuestions.push(3);
    }
    setFeedback('feedback-3',
        isQ3Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ3Correct,
        isQ3Correct ? '' : '5 Gol'
    );

    // Check Question 4
    const q4Answer = document.getElementById('answer-4').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ4Answers = ['3/6', '1/2', '50%', '0.5'].map(ans => ans.replace(/\s+/g, ''));
    const isQ4Correct = correctQ4Answers.includes(q4Answer);
    if (isQ4Correct) {
        score++;
    } else {
        wrongQuestions.push(4);
    }
    setFeedback('feedback-4',
        isQ4Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ4Correct,
        isQ4Correct ? '' : '3/6 atau 50%'
    );

    // Check Question 5
    const q5Answer = document.getElementById('answer-5').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ5Answers = ['60'].map(ans => ans.replace(/\s+/g, ''));
    const isQ5Correct = correctQ5Answers.includes(q5Answer);
    if (isQ5Correct) {
        score++;
    } else {
        wrongQuestions.push(5);
    }
    setFeedback('feedback-5',
        isQ5Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ5Correct,
        isQ5Correct ? '' : '60 Kali'
    );

    // Show all questions for review
    document.querySelectorAll('section[id^="question-"]').forEach(section => {
        section.classList.remove('hidden');
    });

    // Display results
    document.getElementById('final-score').textContent = `Skor Total: ${score}/5`;
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
    series: [
      {
        name: "Pembayaran Digital",
        color: "#ffa114",
        data: ["225"],
      },
      {
        name: "Pembayaran Tunai",
        data: ["25"],
        color: "#081F5C",
      }
    ],
    chart: {
      sparkline: {
        enabled: false,
      },
      type: "bar",
      width: "100%",
      height: 100,
      toolbar: {
        show: false,
      }
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      formatter: function (value) {
        return "$" + value
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        },
        formatter: function(value) {
          return "" + value
        }
      },
      categories: [""],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20
      },
    },
    fill: {
      opacity: 1,
    }
  }
  
  if(document.getElementById("bar-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("bar-chart"), options);
    chart.render();
  }
  
  