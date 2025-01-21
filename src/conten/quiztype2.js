function checkAnswerType2(questionId, correctAnswer, alertId, buttonId) {
    const userAnswer = document.getElementById(questionId);
    const alertBoxType2 = document.getElementById(alertId);
    const answer = document.getElementById(`answerType2-${questionId}`);
    const buttonQuizType2 = document.getElementById(buttonId);

    if (parseInt(userAnswer.value) === correctAnswer) {
      alertBoxType2.innerHTML = '<img src="/src/dist/img/true.svg" alt="Benar"><span> Jawaban Benar!</span>';
      alertBoxType2.className = 'alert correct';
      userAnswer.classList.add('correct-answer');
      userAnswer.classList.remove('incorrect-answer');
      answer.style.display = 'none';
    } else {
      alertBoxType2.innerHTML = '<img src="/src/dist/img/false.svg" alt="Salah"><span> Jawaban salah!</span>';
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

    // Hide the alert after 2 seconds
    setTimeout(function() {
      alertBoxType2.style.display = 'none';
    }, 2000);
  }