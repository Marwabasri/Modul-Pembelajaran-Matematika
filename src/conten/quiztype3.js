
function checkAnswersType3() {
    const correctAnswersType3 = ["a", "c", "d"];
    const checkboxes = document.querySelectorAll('input[name="answer"]');

    checkboxes.forEach(checkbox => {
        const parentLabel = checkbox.parentElement;
        if (correctAnswersType3.includes(checkbox.value)) {
            parentLabel.classList.add('correct-answer');
            parentLabel.classList.remove('incorrect-answer');
        } 

        // Disable all checkboxes after submission
        checkbox.disabled = true;
    });

    const selectedAnswers = Array.from(checkboxes)
        .filter(input => input.checked)
        .map(input => input.value);

    const resultDiv = document.getElementById('result');
    

    if (JSON.stringify(selectedAnswers.sort()) === JSON.stringify(correctAnswersType3.sort())) {
        resultDiv.innerHTML = '<img src="/src/dist/img/true.svg" alt="Benar"><span>Jawaban Benar!</span>';
        resultDiv.className = "alert correct";
    } else {
        resultDiv.innerHTML = '<img src="/src/dist/img/false.svg" alt="Salah"><span>Jawaban salah atau belum lengkap!</span>';
        resultDiv.className = "alert incorrect";
    }

    resultDiv.classList.remove('hidden');

    // Hide the submit button after submission
    const buttonQuizType3 = document.getElementById('buttonQuizType3');
    buttonQuizType3.style.display = 'none';

    //peluang.html
    // Menampilkan elemen terminologi setelah tombol submit dihapus
    const terminologi1 = document.getElementById("terminologi1");
    terminologi1.style.display = "block";  // Menampilkan elemen terminologi
}
