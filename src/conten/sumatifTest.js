const steps = document.querySelectorAll('.question-step');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const navButtons = document.getElementById('nav-buttons');
const questionsContainer = document.getElementById('questions-container');
const resultSection = document.getElementById('result-section');
const pembahasanSection = document.getElementById('pembahasan-section');
const inputSoal5 = document.getElementById('input-soal-5');

let currentIndex = 0;

// Data Kunci Jawaban & Pembahasan
const quizData = [
  { soal: "Berapa hasil dari 5 x 5?", kunci: "25", pembahasan: "Perkalian dasar matematika: 5 dikalikan 5 hasilnya adalah 25." },
  { soal: "Ibukota Indonesia adalah?", kunci: "jakarta", pembahasan: "Saat ini ibukota Indonesia adalah Jakarta (meskipun sedang dalam proses transisi ke IKN)." },
  { soal: "Berapa hasil dari 10 + 15?", kunci: "25", pembahasan: "Penjumlahan dasar: 10 + 15 = 25." },
  { soal: "Hitung frekuensi harapan produk cacat dalam satu bulan (24 hari) produksi?", kunci: "480", pembahasan: "Produksi per hari = 1000 unit. Peluang cacat = 2% (0.02). Cacat per hari = 1000 x 0.02 = 20 unit. Dalam 24 hari = 20 x 24 = 480 unit." },
  { soal: "Berapa jumlah warna pada pelangi?", kunci: "7", pembahasan: "Warna pelangi ada 7, yaitu Merah, Jingga, Kuning, Hijau, Biru, Nila, Ungu (Mejikuhibiniu)." }
];

function updateDisplay() {
  // 1. Tampilkan section yang aktif
  steps.forEach((step, index) => {
    if (index === currentIndex) {
      step.classList.remove('hidden');
    } else {
      step.classList.add('hidden');
    }
  });

  // 2. Atur Tombol Sebelumnya
  prevBtn.disabled = currentIndex === 0;
  if (currentIndex === 0) {
    prevBtn.classList.replace('text-gray-700', 'text-gray-400');
    prevBtn.classList.remove('bg-gray-200');
  } else {
    prevBtn.classList.replace('text-gray-400', 'text-gray-700');
    prevBtn.classList.add('bg-gray-200');
  }

  // 3. Atur Tombol Selanjutnya / Periksa Jawaban
  if (currentIndex === steps.length - 1) {
    nextBtn.innerText = "Periksa Jawaban";
    // Cek apakah soal 5 sudah diisi
    cekInputTerakhir(); 
  } else {
    nextBtn.innerText = "Selanjutnya";
    nextBtn.disabled = false; // Aktifkan tombol untuk soal 1-4
    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    nextBtn.classList.add('bg-primary');
  }
}

// Memantau input pada soal 5 untuk mengaktifkan tombol Periksa
inputSoal5.addEventListener('input', cekInputTerakhir);

function cekInputTerakhir() {
  if (currentIndex === steps.length - 1) {
    if (inputSoal5.value.trim() !== "") {
      nextBtn.disabled = false;
      nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      nextBtn.classList.add('bg-green-600');
    } else {
      nextBtn.disabled = true;
      nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
      nextBtn.classList.remove('bg-green-600');
    }
  }
}

// Event Listeners Navigasi
nextBtn.addEventListener('click', () => {
  if (currentIndex < steps.length - 1) {
    currentIndex++;
    updateDisplay();
  } else {
    // Tombol berfungsi sebagai 'Periksa Jawaban' di step terakhir
    prosesHasil();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateDisplay();
  }
});

// Fungsi Menghitung Skor dan Menampilkan Hasil
function prosesHasil() {
  const inputs = document.querySelectorAll('.answer-input');
  let score = 0;
  const bobotNilai = 100 / steps.length;
  let summaryHTML = "";
  let pembahasanHTML = "";

  inputs.forEach((input, index) => {
    const jawabanUser = input.value.trim().toLowerCase();
    const jawabanBenar = quizData[index].kunci.toLowerCase();
    const isBenar = jawabanUser === jawabanBenar;

    if (isBenar) score += bobotNilai;

    // Build UI untuk Ringkasan Jawaban
    summaryHTML += `
      <div class="flex justify-between items-center p-3 rounded-lg ${isBenar ? 'bg-green-50' : 'bg-red-50'}">
        <span class="text-sm font-semibold">Soal ${index + 1}</span>
        <span class="text-sm ${isBenar ? 'text-green-600' : 'text-red-600'}">
          ${isBenar ? 'Benar ✔' : 'Salah ✘'}
        </span>
      </div>
    `;

    // Build UI untuk Kotak Pembahasan Lengkap
    pembahasanHTML += `
      <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <p class="text-sm font-bold text-gray-700 mb-2">Soal ${index + 1}: <span class="font-normal">${quizData[index].soal}</span></p>
        <div class="grid grid-cols-2 gap-2 text-sm mb-3">
          <div class="bg-white p-2 rounded border">
            <span class="text-gray-500 text-xs block">Jawaban Anda:</span>
            <span class="${isBenar ? 'text-green-600' : 'text-red-600'} font-semibold">${input.value || '- Kosong -'}</span>
          </div>
          <div class="bg-white p-2 rounded border">
            <span class="text-gray-500 text-xs block">Kunci Jawaban:</span>
            <span class="text-blue-600 font-semibold">${quizData[index].kunci}</span>
          </div>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <p class="text-xs font-bold text-blue-800 mb-1">Pembahasan:</p>
          <p class="text-sm text-gray-700">${quizData[index].pembahasan}</p>
        </div>
      </div>
    `;
  });

  // Tampilkan UI Hasil
  document.getElementById('total-score').innerText = Math.round(score);
  document.getElementById('summary-container').innerHTML = summaryHTML;
  document.getElementById('pembahasan-container').innerHTML = pembahasanHTML;

  // Sembunyikan form soal & navigasi, tampilkan halaman hasil
  questionsContainer.classList.add('hidden');
  navButtons.classList.add('hidden');
  resultSection.classList.remove('hidden');
}

// Event Listener Tombol Lihat Pembahasan
document.getElementById('btn-pembahasan').addEventListener('click', () => {
  pembahasanSection.classList.toggle('hidden');
  
  // Ubah teks tombol jika sedang terbuka/tertutup
  const btn = document.getElementById('btn-pembahasan');
  if(pembahasanSection.classList.contains('hidden')) {
    btn.innerText = "Lihat Pembahasan Lengkap";
  } else {
    btn.innerText = "Tutup Pembahasan";
  }
});

// Inisialisasi awal
updateDisplay();