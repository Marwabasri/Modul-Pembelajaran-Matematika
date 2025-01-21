function checkAnswerType4(questionId, correctAnswer, alertId, buttonId) {
    const userAnswer = document.getElementById(questionId);
    const alertBoxType4 = document.getElementById(alertId);
    const answer = document.getElementById(`answerType4-${questionId}`);
    const buttonQuizType4 = document.getElementById(buttonId);
  
    // Pastikan elemen penting ditemukan
    if (!userAnswer || !alertBoxType4 || !answer || !buttonQuizType4) {
      console.error('Elemen penting tidak ditemukan');
      return;
    }
  
    // Ambil jawaban pengguna dan trim spasi
    const userInput = userAnswer.value.trim();
  
    // Validasi format jawaban (pecahan seperti 1/2)
    const fractionRegex = /^\d+\/\d+$/; // Pola: angka/angka
    if (!fractionRegex.test(userInput)) {
      alertBoxType4.innerHTML = '<img src="/src/dist/img/false.svg" alt="Salah"><span> Format jawaban salah! Harus berupa pecahan, misalnya 1/2.</span>';
      alertBoxType4.className = 'alert incorrect';
      alertBoxType4.style.display = 'flex';
      return;
    }
  
    // Bandingkan jawaban
    if (userInput === correctAnswer) {
      alertBoxType4.innerHTML = '<img src="/src/dist/img/true.svg" alt="Benar"><span> Jawaban Benar!</span>';
      alertBoxType4.className = 'alert correct';
      userAnswer.classList.add('correct-answer');
      userAnswer.classList.remove('incorrect-answer');
      answer.style.display = 'none';
    } else {
      alertBoxType4.innerHTML = '<img src="/dist/img/false.svg" alt="Salah"><span> Jawaban salah!</span>';
      alertBoxType4.className = 'alert incorrect';
      userAnswer.classList.add('incorrect-answer');
      userAnswer.classList.remove('correct-answer');
      answer.textContent = `Jawaban yang benar adalah: ${correctAnswer}`;
      answer.style.display = 'block';
    }
  
    // Tampilkan hasil dan sembunyikan tombol
    alertBoxType4.style.display = 'flex';
    buttonQuizType4.style.display = 'none';
  
    // Disable input
    userAnswer.disabled = true;
  
    // Sembunyikan alert setelah beberapa detik
    setTimeout(function () {
      alertBoxType4.style.display = 'none';
    }, 2000);
  }
  