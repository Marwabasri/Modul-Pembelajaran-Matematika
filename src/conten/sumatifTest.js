let currentQuestion = 1;
const totalQuestions = 5;

// Function to hide navigation buttons
const hideNavButtons = () => {
    const navButtons = document.querySelector('.fixed.bottom-0');
    if (navButtons) {
        navButtons.style.display = 'none';
    }
};

// Function to check if all questions are answered
const areAllQuestionsAnswered = () => {
    // Check Question 1 (drag & drop)
    const q1Answered = document.getElementById('selected-answers-1').children.length > 0;
    
    // Check Question 2 (drag & drop)
    const q2Answered = document.getElementById('selected-answers-2').children.length > 0;
    
    // Check Question 3 (short answer)
    const q3Answered = document.getElementById('answer-3').value.trim() !== '';
    
    // Check Question 4 (multiple choice)
    const q4Answered = document.querySelector('input[name="q4"]:checked') !== null;
    
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
        window.location.href = './peluang.html';
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
    // Disable drag & drop options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('opacity-50', 'cursor-not-allowed');
    });
    
    // Disable selected answers interaction
    document.querySelectorAll('#selected-answers-1 div').forEach(div => {
        div.style.pointerEvents = 'none';
        div.classList.add('opacity-50');
    });
    // Disable selected answers interaction
    document.querySelectorAll('#selected-answers-2 div').forEach(div => {
        div.style.pointerEvents = 'none';
        div.classList.add('opacity-50');
    });
    
    // Disable text input
    document.getElementById('answer-3').disabled = true;
    document.getElementById('answer-3').classList.add('bg-gray-100');
   
    // Disable radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true;
    });

    // Disable text input
    document.getElementById('answer-5').disabled = true;
    document.getElementById('answer-5').classList.add('bg-gray-100');
    // Disable text input
    document.getElementById('answer-6').disabled = true;
    document.getElementById('answer-6').classList.add('bg-gray-100');
    

    // Disable check all button
    document.getElementById('check-all').style.display = 'none';

};

// Question 1: Drag & Drop
(() => {
    const selectedAnswers = new Set();
    const correctAnswers = new Set([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8'
    ]);

    document.querySelectorAll('.option-btn-q1').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.value;
            if (!selectedAnswers.has(value)) {
                selectedAnswers.add(value);
                btn.classList.add('opacity-50', 'cursor-not-allowed');
                btn.disabled = true;
                
                const selectedDiv = document.createElement('div');
                selectedDiv.className = 'bg-blue-100 p-2 rounded text-sm cursor-pointer';
                selectedDiv.textContent = btn.textContent;
                selectedDiv.dataset.value = value;
                
                selectedDiv.addEventListener('click', () => {
                    selectedAnswers.delete(value);
                    btn.classList.remove('opacity-50', 'cursor-not-allowed');
                    btn.disabled = false;
                    selectedDiv.remove();
                    areAllQuestionsAnswered();
                });
                
                document.getElementById('selected-answers-1').appendChild(selectedDiv);
                areAllQuestionsAnswered();
            }
        });
    });
})();

// Question 2: Drag & Drop
(() => {
    const selectedAnswers2 = new Set();
    const correctAnswers2 = new Set([
        '(1,5)',
        '(2,4)',
        '(3,3)',
        '(4,2)',
        '(5,1)'
    ]);

    document.querySelectorAll('.option-btn-q2').forEach(btn => {
        btn.addEventListener('click', () => {
            const value = btn.dataset.value;
            if (!selectedAnswers2.has(value)) {
                selectedAnswers2.add(value);
                btn.classList.add('opacity-50', 'cursor-not-allowed');
                btn.disabled = true;

                const selectedDiv = document.createElement('div');
                selectedDiv.className = 'bg-blue-100 p-2 rounded text-sm cursor-pointer';
                selectedDiv.textContent = btn.textContent;
                selectedDiv.dataset.value = value;

                selectedDiv.addEventListener('click', () => {
                    selectedAnswers2.delete(value);
                    btn.classList.remove('opacity-50', 'cursor-not-allowed');
                    btn.disabled = false;
                    selectedDiv.remove();
                    areAllQuestionsAnswered();
                });

                document.getElementById('selected-answers-2').appendChild(selectedDiv);
                areAllQuestionsAnswered();
            }
        });
    });
})();


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
document.getElementById('answer-3').addEventListener('input', areAllQuestionsAnswered);

document.querySelectorAll('input[name="q4"]').forEach(radio => {
    radio.addEventListener('change', areAllQuestionsAnswered);
});

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
    const q1Answers = new Set(Array.from(document.getElementById('selected-answers-1').children).map(div => div.dataset.value));
    const correctQ1Answers = new Set([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8'
    ]);
    const isQ1Correct = q1Answers.size === correctQ1Answers.size && 
        [...q1Answers].every(answer => correctQ1Answers.has(answer));
    if (isQ1Correct) {
        score++;
    } else {
        wrongQuestions.push(1);
    }
    setFeedback('feedback-1', 
        isQ1Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ1Correct,
        isQ1Correct ? '' : '{ 1, 2, 3, 4, 5, 6, 7, 8 }'
    );    

    // Check Question 2
    const q2Answers = new Set(Array.from(document.getElementById('selected-answers-2').children).map(div => div.dataset.value));
    const correctQ2Answers = new Set([
        '(1,5)',
        '(2,4)',
        '(3,3)',
        '(4,2)',
        '(5,1)'
    ]);
    const isQ2Correct = q2Answers.size === correctQ2Answers.size && 
        [...q2Answers].every(answer => correctQ2Answers.has(answer));
    if (isQ2Correct) {
        score++;
    } else {
        wrongQuestions.push(2);
    }
    setFeedback('feedback-2', 
        isQ2Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ2Correct,
        isQ2Correct ? '' : '{ (1,5), (2,4), (3,3), (4,2), (5,1) }'
    );

    // Check Question 3
    const q3Answer = document.getElementById('answer-3').value.trim();
    const correctQ3Answers = ['12'].map(ans => ans.replace(/\s+/g, ''));
    const isQ3Correct = correctQ3Answers.includes(q3Answer);
    if (isQ3Correct) {
        score++;
    } else {
        wrongQuestions.push(3);
    }
    setFeedback('feedback-3',
        isQ3Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ3Correct,
        isQ3Correct ? '' : '12'
    );

    // Check Question 4
    const q4Answer = document.querySelector('input[name="q4"]:checked');
    const isQ4Correct = q4Answer && q4Answer.value === 'b';
    if (isQ4Correct) {
        score++;
    } else {
        wrongQuestions.push(4);
    }
    setFeedback('feedback-4',
        isQ4Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ4Correct,
        isQ4Correct ? '' : 'Peluang teoritis adalah rasio banyaknya anggota kejadian terhadap banyaknya anggota ruang sampel suatu percobaan'
    );

    // Check Question 5
    const q5Answer = document.getElementById('answer-5').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ5Answers = ['1/4', '0.25', '25%'].map(ans => ans.replace(/\s+/g, ''));
    const isQ5Correct = correctQ5Answers.includes(q5Answer);
    if (isQ5Correct) {
        score++;
    } else {
        wrongQuestions.push(5);
    }
    setFeedback('feedback-5',
        isQ5Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ5Correct,
        isQ5Correct ? '' : '1/4 atau 25%'
    );

    // Check Question 6
    const q6Answer = document.getElementById('answer-6').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ6Answers = ['6/8','3/4', '0.75','75%'].map(ans => ans.replace(/\s+/g, ''));
    const isQ6Correct = correctQ6Answers.includes(q6Answer);
    if (isQ6Correct) {
        score++;
    } else {
        wrongQuestions.push(6);
    }
    setFeedback('feedback-6',
        isQ6Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ6Correct,
        isQ6Correct ? '' : '6/8 atau 75%'
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
    // set the labels option to true to show the labels on the X and Y axis
    xaxis: {
      show: true,
      categories: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb', '08 Feb', '09 Feb', '10 Feb', '11 Feb', '12 Feb', '13 Feb', '14 Feb', '15 Feb'],
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
      show: true,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400 gap-4'
        },
        formatter: function (value) {
          return + value;
        }
      }
    },
    series: [
      {
        name: "Keroket Ayam",
        data: [90, 69, 71, 135, 120, 74, 90, 147, 112, 99, 80, 70, 120, 138, 126],
        color: "#1A56DB",
      },
      {
        name: "Keroket Udang",
        data: [65, 113, 79, 73, 60, 125, 87, 60, 67, 46, 114, 63, 84, 71, 52],
        color: "#7E3BF2",
      },
    ],
    chart: {
      sparkline: {
        enabled: false
      },
      height: "200%",
      width: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 4,
    },
    legend: {
      show: true,
    },
    grid: {
      show: true,
    },
    }
    
    if (document.getElementById("labels-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("labels-chart"), options);
    chart.render();
    }
    