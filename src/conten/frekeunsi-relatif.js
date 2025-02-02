 
////Button aturan permainan

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



///Shut the box
let rollDiceButton = document.querySelector(".roll-dice");
let submitSelectionButton = document.querySelector(".submit-selection");
let nextRollButton = document.querySelector(".next-roll");
let retrySelectionButton = document.querySelector(".retry-selection");
let giveUpButton = document.querySelector(".give-up");
let diceRollCount = 0;
let sumOfRolls = 0;
let arrayOfCheckBoxes = document.querySelectorAll(".checkBox");

function resetSelection() {
    arrayOfCheckBoxes.forEach(box => box.checked = false);
}

function checkGameOver() {
    let allDisabled = Array.from(arrayOfCheckBoxes).every(box => box.disabled);
    if (allDisabled) {
        document.querySelector(".gameover-message").textContent = "Congratulations! You shut the box and won the game!";
        rollDiceButton.disabled = true;
        submitSelectionButton.disabled = true;
    }
}

rollDiceButton.addEventListener("click", () => {
    diceRollCount++;
    document.getElementById("diceRollCount").textContent = diceRollCount;
    const dice1 = Math.ceil(Math.random() * 6);
    const dice2 = Math.ceil(Math.random() * 6);
    sumOfRolls = dice1 + dice2;

    // Update the dice images to reflect the new roll
    document.getElementById("dice1").src = `../dist/img/dice${dice1}.svg`;
    document.getElementById("dice2").src = `../dist/img/dice${dice2}.svg`;

    // Enable the submit selection buttob, disable the roll button
    submitSelectionButton.disabled = false;
    rollDiceButton.disabled = true;
    resetSelection();
    
});

submitSelectionButton.addEventListener("click", () => {
    let selectedSum = 0;
    arrayOfCheckBoxes.forEach(box => {
        if (box.checked && !box.disabled) {
            selectedSum += parseInt(box.value);
        }
    });

    if (selectedSum === sumOfRolls) {
        arrayOfCheckBoxes.forEach(box => {
            if (box.checked) {
                box.disabled = true;
            }
        });
        submitSelectionButton.disabled = true;
        rollDiceButton.disabled = false;
        nextRollButton.style.display = "none";
        retrySelectionButton.style.display = "none";
        checkGameOver();
    } else {
        alert("The sum of selected boxes does not match the dice roll.");
        nextRollButton.style.display = "inline-block";
        retrySelectionButton.style.display = "inline-block";
        submitSelectionButton.disabled = true;
    }
});

nextRollButton.addEventListener("click", () => {
    resetSelection();
    rollDiceButton.disabled = false;
    nextRollButton.style.display = "none";
    retrySelectionButton.style.display = "none";
});

retrySelectionButton.addEventListener("click", () => {
    resetSelection();
    submitSelectionButton.disabled = false;
});

giveUpButton.addEventListener("click", () => {
    let remainingSum = 0;
    arrayOfCheckBoxes.forEach(box => {
        if (!box.disabled) {
            remainingSum += parseInt(box.value);
        }
    });
    alert(`Game Over! Your final score is: ${remainingSum}`);
    location.reload(); // Reload the game
});


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
  setupQuestionType5(2, ['Opsi B','Opsi D', 'Opsi F', 'Opsi G']);

  

  



// QuizType2 Special 
// Experience Step
// Soal n(S) dari percobaan pelembaran 2 buah dadu 
// untuk menampilkan ruang sampel

function checkAnswerSpecialType2(questionId, correctAnswer, alertId, buttonId) {
    const userAnswer = document.getElementById(questionId);
    const alertBoxType2 = document.getElementById(alertId);
    const answer = document.getElementById(`answerType2-${questionId}`);
    const buttonQuizType2 = document.getElementById(buttonId);

    if (parseInt(userAnswer.value) === correctAnswer) {
      alertBoxType2.innerHTML = '<img src="../dist/img/true.svg" alt="Benar"><span> Jawaban Benar!</span>';
      alertBoxType2.className = 'alert correct';
      userAnswer.classList.add('correct-answer');
      userAnswer.classList.remove('incorrect-answer');
      answer.style.display = 'none';
    } else {
      alertBoxType2.innerHTML = '<img src="../dist/img/false.svg" alt="Salah"><span> Jawaban salah!</span>';
      alertBoxType2.className = 'alert incorrect';
      userAnswer.classList.add('incorrect-answer');
      userAnswer.classList.remove('correct-answer');
      answer.textContent = `Jawaban yang benar adalah: ${correctAnswer}`;
      answer.style.display = 'block';
    }

    alertBoxType2.style.display = 'flex';
    buttonQuizType2.style.display = 'none';

    // Disable the input field to prevent editing
    userAnswer.disabled = true;

    // Show the div with id 'sampleSpaceOfTwoDices'
    const sampleSpaceDiv = document.getElementById('sampleSpaceOfTwoDices');
    if (sampleSpaceDiv) {
      sampleSpaceDiv.style.display = 'block';
    }

    // Hide the alert after 2 seconds
    setTimeout(function() {
      alertBoxType2.style.display = 'none';
    }, 2000);
}

//QuisType6 Luaguange
function submitAnswers() {
    const inputNumber = document.getElementById('inputNumber').value;
    const inputAnswer = document.getElementById('inputAnswer');
    const inputAnswerValue = inputAnswer.value;

    if (inputNumber === "" || isNaN(inputNumber)) {
        alert('Harap masukkan angka yang valid di Soal 1.');
        return;
    }

    // Membuat jawaban benar berdasarkan input Soal 1
    const correctAnswer = `${inputNumber.trim()} / 10`;

    // Memvalidasi jawaban Soal 2 tanpa memperhatikan spasi
    const formattedInputAnswer = inputAnswerValue.replace(/\s+/g, "").toLowerCase();
    const formattedCorrectAnswer = correctAnswer.replace(/\s+/g, "").toLowerCase();

    const alertBoxType6 = document.getElementById('resultMessage');

    if (formattedInputAnswer === formattedCorrectAnswer) {
        alertBoxType6.innerHTML = '<img src="../dist/img/true.svg" alt="Benar"><span> Jawaban Benar!</span>';
        alertBoxType6.className = 'alert correct text-green-600';
        inputAnswer.classList.add('correct-answer');
        inputAnswer.classList.remove('incorrect-answer');
    } else {
        alertBoxType6.innerHTML = '<img src="../dist/img/false.svg" alt="Salah"><span> Jawaban salah!</span>';
        alertBoxType6.className = 'alert incorrect text-red-600';
        alertBoxType6.innerHTML += `<div>Jawaban yang benar adalah: ${correctAnswer}</div>`;
        inputAnswer.classList.add('incorrect-answer');
        inputAnswer.classList.remove('correct-answer');
    }

    // Disable the input field to prevent editing
    inputNumber.disabled = true;
    inputAnswer.disabled = true;

    // Hide the alert after 2 seconds
    setTimeout(function() {
        alertBoxType6.style.display = 'none';
    }, 2000);

}

///kubus
let isDragging1 = false, isDragging2 = false;
let previousX1, previousY1, previousX2, previousY2;
let currentRotationX1 = 0, currentRotationY1 = 0, currentRotationX2 = 0, currentRotationY2 = 0;

const cube1 = document.getElementById("cube1");
const cube2 = document.getElementById("cube2");

function getClientPos(e) {
    if (e.type.startsWith("touch")) {
        return { x: e.touches[0].pageX, y: e.touches[0].pageY };
    } else {
        return { x: e.clientX, y: e.clientY };
    }
}

function startDrag(e, cubeId) {
    e.preventDefault();
    const pos = getClientPos(e);

    if (cubeId === 1) {
        isDragging1 = true;
        previousX1 = pos.x;
        previousY1 = pos.y;
        cube1.style.cursor = "grabbing";
    } else if (cubeId === 2) {
        isDragging2 = true;
        previousX2 = pos.x;
        previousY2 = pos.y;
        cube2.style.cursor = "grabbing";
    }
}

function onDrag(e, cubeId) {
    if (cubeId === 1 && isDragging1) {
        const pos = getClientPos(e);
        const deltaX = pos.x - previousX1;
        const deltaY = pos.y - previousY1;

        currentRotationX1 -= deltaY * 0.5;
        currentRotationY1 += deltaX * 0.5;

        cube1.style.transform = `rotateX(${currentRotationX1}deg) rotateY(${currentRotationY1}deg)`;

        previousX1 = pos.x;
        previousY1 = pos.y;
    } else if (cubeId === 2 && isDragging2) {
        const pos = getClientPos(e);
        const deltaX = pos.x - previousX2;
        const deltaY = pos.y - previousY2;

        currentRotationX2 -= deltaY * 0.5;
        currentRotationY2 += deltaX * 0.5;

        cube2.style.transform = `rotateX(${currentRotationX2}deg) rotateY(${currentRotationY2}deg)`;

        previousX2 = pos.x;
        previousY2 = pos.y;
    }
}

function stopDrag(cubeId) {
    if (cubeId === 1) {
        isDragging1 = false;
        cube1.style.cursor = "grab";
    } else if (cubeId === 2) {
        isDragging2 = false;
        cube2.style.cursor = "grab";
    }
}

cube1.addEventListener("mousedown", (e) => startDrag(e, 1));
window.addEventListener("mousemove", (e) => onDrag(e, 1));
window.addEventListener("mouseup", () => stopDrag(1));

cube2.addEventListener("mousedown", (e) => startDrag(e, 2));
window.addEventListener("mousemove", (e) => onDrag(e, 2));
window.addEventListener("mouseup", () => stopDrag(2));

cube1.addEventListener("touchstart", (e) => startDrag(e, 1), { passive: false });
window.addEventListener("touchmove", (e) => onDrag(e, 1), { passive: false });
window.addEventListener("touchend", () => stopDrag(1));

cube2.addEventListener("touchstart", (e) => startDrag(e, 2), { passive: false });
window.addEventListener("touchmove", (e) => onDrag(e, 2), { passive: false });
window.addEventListener("touchend", () => stopDrag(2));

