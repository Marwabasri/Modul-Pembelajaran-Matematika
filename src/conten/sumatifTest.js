const steps = document.querySelectorAll('.question-step');
const progressBar = document.getElementById('progress-bar');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let currentIndex = 0;

function updateDisplay() {
  // 1. Tampilkan section yang aktif, sembunyikan yang lain
  steps.forEach((step, index) => {
    if (index === currentIndex) {
      step.classList.remove('hidden');
    } else {
      step.classList.add('hidden');
    }
  });

  // 2. Update Progres Bar
  const progressPercent = ((currentIndex + 1) / steps.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  // 3. Atur Tombol Sebelumnya (disable jika di soal pertama)
  prevBtn.disabled = currentIndex === 0;
  if (currentIndex === 0) {
    prevBtn.classList.add('text-gray-400');
    prevBtn.classList.remove('text-gray-700', 'bg-gray-200');
  } else {
    prevBtn.classList.remove('text-gray-400');
    prevBtn.classList.add('text-gray-700', 'bg-gray-200');
  }

  // 4. Atur Tombol Selanjutnya/Selesai
  if (currentIndex === steps.length - 1) {
    nextBtn.innerText = "Selesai";
    nextBtn.classList.replace('bg-blue-600', 'bg-green-600');
  } else {
    nextBtn.innerText = "Selanjutnya";
    nextBtn.classList.replace('bg-green-600', 'bg-blue-600');
  }
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < steps.length - 1) {
    currentIndex++;
    updateDisplay();
  } else {
    alert("Tes Selesai!");
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateDisplay();
  }
});

// Jalankan saat pertama kali dibuka
updateDisplay();