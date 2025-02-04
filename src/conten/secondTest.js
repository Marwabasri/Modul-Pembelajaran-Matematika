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
    
    // Show/hide check all button based on answers
    const checkAllButton = document.getElementById('check-all');
    checkAllButton.style.display = (q1Answered && q2Answered) ? 'block' : 'none';
    
    return q1Answered && q2Answered;
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
        feedbackMessage += `<br><span class="text-gray-600 mt-2 block">Jawaban yang benar: ${correctAnswer}</span>`;
    }
    
    element.innerHTML = feedbackMessage;
    element.className = `mt-4 text-xs font-medium ${feedbackClass}`;
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

// Check All Answers with confirmation
document.getElementById('check-all').addEventListener('click', () => {
    if (!confirm('Apakah Anda yakin ingin mengecek semua jawaban? Anda tidak akan dapat mengubah jawaban setelah ini.')) {
        return;
    }

    let score = 0;
    const wrongQuestions = [];

    // Check Question 1
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    const isQ1Correct = q1Answer && q1Answer.value === 'b';
    if (isQ1Correct) {
        score++;
    } else {
        wrongQuestions.push(1);
    }
    setFeedback('feedback-1',
        isQ1Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ1Correct,
        isQ1Correct ? '' : 'Peluang teoritis adalah rasio banyaknya kejadian yang diharapkan terhadap banyaknya anggota ruang sampel'
    );

    // Check Question 2
    const q2Answer = document.getElementById('answer-2').value.trim().replace(/\s+/g, '').replace(',', '.');
    const correctQ2Answers = ['1/4', '0.25', '25%'].map(ans => ans.replace(/\s+/g, ''));
    const isQ2Correct = correctQ2Answers.includes(q2Answer);
    if (isQ2Correct) {
        score++;
    } else {
        wrongQuestions.push(2);
    }
    setFeedback('feedback-2',
        isQ2Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ2Correct,
        isQ2Correct ? '' : '1/4 atau 25%'
    );

    // Show all questions for review
    document.querySelectorAll('section[id^="question-"]').forEach(section => {
        section.classList.remove('hidden');
    });

    // Display results
    document.getElementById('final-score').textContent = `Skor Total: ${score}/2`;
    document.getElementById('final-score').className = 'mt-4 text-lg font-bold text-center text-primary';

    // Hide navigation buttons after showing final score
    hideNavButtons();

    // Disable all inputs after checking
    disableAllInputs();
});

// Initially hide the check all button
document.getElementById('check-all').style.display = 'none';

// Initialize first question
updateQuestion(1);
