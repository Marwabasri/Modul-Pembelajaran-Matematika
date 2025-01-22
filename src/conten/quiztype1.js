  let score = 0;
  let answeredQuestions = 0;
  const totalQuestions = document.querySelectorAll('.question').length;  // Total jumlah soal

  function checkAnswerType1(questionName, correctAnswer, correctAnswerText, alertId, answerId, button) {
    const alertBoxType1 = document.getElementById(alertId);
    const correctAnswerBox = document.getElementById(answerId);
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    const selectedLabel = selectedOption.closest('label');

    // Menonaktifkan semua radio button setelah jawaban dipilih
    const buttons = document.querySelectorAll(`input[name="${questionName}"]`);
    buttons.forEach(btn => btn.disabled = true);

    const userAnswer = selectedOption.value;

    if (userAnswer === correctAnswer.toString()) {
      alertBoxType1.innerHTML = '<img src="../dist/img/true.svg" alt="Benar"><span>Jawaban Benar!</span>';
      alertBoxType1.className = 'alert correct';
      selectedLabel.classList.add('correct-answer'); // Tambahkan warna hijau pada jawaban benar
      score++;
    } else {
      alertBoxType1.innerHTML = '<img src="../dist/img/false.svg" alt="Salah"><span>Jawaban salah!</span>';
      alertBoxType1.className = 'alert incorrect';
      selectedLabel.classList.add('incorrect-answer'); // Tambahkan warna merah pada jawaban salah
      correctAnswerBox.textContent = `Jawaban yang benar adalah: ${correctAnswerText}`;
      correctAnswerBox.style.display = 'block';
    }

    alertBoxType1.style.display = 'block';
    setTimeout(() => { alertBoxType1.style.display = 'none'; }, 2000);

    // Menyembunyikan tombol kirim setelah jawaban diverifikasi
    button.style.display = 'none';

    answeredQuestions++;

    // Menampilkan skor jika semua soal telah dijawab
    if (answeredQuestions === totalQuestions) {
      document.getElementById('score').textContent = `${score} `;  // Menampilkan skor dalam format benar
      document.getElementById('total-questions').textContent = totalQuestions;  // Menampilkan total soal
      document.getElementById('score-container').style.display = 'block';
      document.getElementById('restart').style.display = 'inline-block';
    }
  }

  function showSubmitButton(option) {
    const form = option.closest('form');
    const submitButton = form.querySelector('.submit-btn');
    submitButton.style.display = 'block';

    // Menambahkan kelas 'selected-answer' untuk memberi warna kuning pada jawaban yang dipilih
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
      button.closest('label').classList.remove('selected-answer');  // Menghapus kelas dari label lain
    });

    option.closest('label').classList.add('selected-answer');  // Menambahkan kelas 'selected-answer' pada label yang dipilih
  }

  function restartQuiz() {
    // Reset skor dan status jawaban
    score = 0;
    answeredQuestions = 0;
    document.getElementById('score').textContent = `${score} benar`;
    document.getElementById('total-questions').textContent = totalQuestions;

    // Menyembunyikan skor dan tombol restart
    document.getElementById('score-container').style.display = 'none';
    document.getElementById('restart').style.display = 'none';

    // Mengatur ulang tampilan untuk setiap pertanyaan
    const alertBoxesType1 = document.querySelectorAll('.alert');
    const answerBoxes = document.querySelectorAll('.answer');
    const submitButtons = document.querySelectorAll('.submit-btn');
    const labels = document.querySelectorAll('label');
    
    alertBoxesType1.forEach(alert => {
      alert.style.display = 'none';  // Menyembunyikan alert (jawaban benar/salah)
      alert.classList.remove('correct', 'incorrect');  // Menghapus kelas yang menandakan status jawaban
    });

    answerBoxes.forEach(answer => {
      answer.style.display = 'none';  // Menyembunyikan jawaban yang benar
    });

    submitButtons.forEach(button => {
      button.style.display = 'none';  // Menyembunyikan tombol kirim
    });

    labels.forEach(label => {
        label.classList.remove('selected-answer', 'correct-answer', 'incorrect-answer');
      });

    // Mengaktifkan kembali semua radio button
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
      button.disabled = false;  // Mengaktifkan kembali radio button
    });

    // Menghapus semua pilihan yang dipilih (reset pilihan pengguna)
    const radioForms = document.querySelectorAll('form');
    radioForms.forEach(form => {
      const checkedInputs = form.querySelectorAll('input[type="radio"]:checked');
      checkedInputs.forEach(input => input.checked = false);  // Menghapus pilihan yang dipilih
    });
  }
