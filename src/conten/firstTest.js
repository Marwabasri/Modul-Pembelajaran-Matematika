let isDragging = false;
let previousX, previousY;
let currentRotationX = 30;
let currentRotationY = 45;
let velocityX = 0;
let velocityY = 0;
let lastTime = performance.now();

const octa1 = document.getElementById("octa1");

function getClientPos(e) {
    return e.type.startsWith("touch") 
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX, y: e.clientY };
}

function startDrag(e) {
    isDragging = true;
    const pos = getClientPos(e);
    previousX = pos.x;
    previousY = pos.y;
    velocityX = 0;
    velocityY = 0;
    octa1.style.cursor = "grabbing";
    
    if (e.type === "touchstart") {
        e.preventDefault();
    }
}
              
function onDrag(e) {
    if (!isDragging) return;
    
    const pos = getClientPos(e);
    const deltaX = pos.x - previousX;
    const deltaY = pos.y - previousY;
    
    const currentTime = performance.now();
    const dt = (currentTime - lastTime) || 16.7;
    lastTime = currentTime;

    velocityX = deltaX / dt;
    velocityY = deltaY / dt;
    
    currentRotationX = currentRotationX + deltaY * 0.5;
    currentRotationY = currentRotationY + deltaX * 0.5;
    
    updateTransform();
    
    previousX = pos.x;
    previousY = pos.y;
    
    if (e.type === "touchmove") {
        e.preventDefault();
    }
}
              
function stopDrag() {
    isDragging = false;
    octa1.style.cursor = "grab";
}

function updateTransform() {
    octa1.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
}

function animate() {
    if (!isDragging) {
        const friction = 0.95;
        velocityX *= friction;
        velocityY *= friction;

        if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
            currentRotationY += velocityX;
            currentRotationX += velocityY;
        } else {
            // Gentle continuous rotation when no interaction
            currentRotationY += 0.05;
        }
        
        updateTransform();
    }
    requestAnimationFrame(animate);
}
              
animate();

octa1.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", onDrag);
window.addEventListener("mouseup", stopDrag);
window.addEventListener("mouseleave", stopDrag);

octa1.addEventListener("touchstart", startDrag);
window.addEventListener("touchmove", onDrag);
window.addEventListener("touchend", stopDrag);
window.addEventListener("touchcancel", stopDrag);


let currentQuestion = 1;
const totalQuestions = 6;

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
        feedbackMessage += `<br><span class="text-gray-600 mt-2 block">Jawaban yang benar: ${correctAnswer}</span>`;
    }
    
    element.innerHTML = feedbackMessage;
    element.className = `mt-4 text-xs font-medium ${feedbackClass}`;
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
        isQ1Correct ? '' : '{(P1:Batu, P2:Batu), (P1:Batu, P2:Gunting), (P1:Batu, P2:Kertas), (P1:Gunting, P2:Batu), (P1:Gunting, P2:Gunting), (P1:Gunting, P2:Kertas), (P1:Kertas, P2:Batu)}'
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
    const correctQ3Answers = ['12'];
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
        isQ4Correct ? '' : 'Peluang teoritis adalah rasio banyaknya kejadian yang diharapkan terhadap banyaknya anggota ruang sampel'
    );

    // Check Question 5
    const q5Answer = document.getElementById('answer-5').value.trim();
    const correctQ5Answers = ['1/4', '0,25', '25%'];
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
    const q6Answer = document.getElementById('answer-6').value.trim();
    const correctQ6Answers = ['1/10', '0.1','10%'];
    const isQ6Correct = correctQ6Answers.includes(q6Answer);
    if (isQ6Correct) {
        score++;
    } else {
        wrongQuestions.push(6);
    }
    setFeedback('feedback-6',
        isQ6Correct ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah!',
        isQ6Correct,
        isQ6Correct ? '' : '1/10 atau 10%'
    );

    // Show all questions for review
    document.querySelectorAll('section[id^="question-"]').forEach(section => {
        section.classList.remove('hidden');
    });

    // Display results
    document.getElementById('final-score').textContent = `Skor Total: ${score}/6`;
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
