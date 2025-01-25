//SCRIPT EXPERIENCE
//
//
//Script RUANG SAMPEL KEJADIAN BATU GUNTING KERTAS 

const dragCounts = {
    itemBatu1: 0,
    itemGunting1: 0,
    itemKertas1: 0,
    itemBatu2: 0,
    itemGunting2: 0,
    itemKertas2: 0
};

const correctItemPairs = {
    "dropZone2_2": ["itemBatu1", "itemBatu2"],
    "dropZone3_2": ["itemBatu2", "itemGunting1"],
    "dropZone4_2": ["itemBatu2", "itemKertas1"],
    "dropZone2_3": ["itemGunting2", "itemBatu1"],
    "dropZone3_3": ["itemGunting1", "itemGunting2"],
    "dropZone4_3": ["itemGunting2", "itemKertas1"],
    "dropZone2_4": ["itemKertas2", "itemBatu1"],
    "dropZone3_4": ["itemKertas2", "itemGunting1"],
    "dropZone4_4": ["itemKertas1", "itemKertas2"]
};

function allowDrop(event) {
    event.preventDefault();
}

function startDrag(event) {
    const draggedItemId = event.target.id;

    if (dragCounts[draggedItemId] < 3) {
        event.dataTransfer.setData("text", draggedItemId);
    } else {
        event.preventDefault();
        alert("Item ini hanya dapat dipindahkan maksimal 3 kali!");
    }
}

function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const dropZone = event.target;

    // Check if drop zone is a valid element
    if (dropZone.id === "itemBatu1" || dropZone.id === "itemGunting1" || dropZone.id === "itemKertas1" || dropZone.id === "itemBatu2" || dropZone.id === "itemGunting2" || dropZone.id === "itemKertas2") {
        alert("Anda tidak dapat menjatuhkan item ke elemen ini!");
        return; // Stop execution if drop zone is invalid
    }

    if (dropZone.children.length < 2) {
        const draggedElement = document.getElementById(data).cloneNode(true);
        draggedElement.classList.remove("cursor-move");
        dropZone.appendChild(draggedElement);

        dragCounts[data]++;
        if (dragCounts[data] >= 3) {
            const element = document.getElementById(data);
            element.draggable = false;
            element.classList.add("opacity-50");
        }
    } else {
        alert("Drop zone sudah penuh! Hanya dua elemen yang diperbolehkan.");
    }
}

function validateSampleSpace() {
    let allCorrect = true;

    for (const [zoneId, expectedItems] of Object.entries(correctItemPairs)) {
        const dropZone = document.getElementById(zoneId);
        const children = dropZone.children;

        if (children.length !== 2) {
            allCorrect = false;
            break;
        }

        const childIds = Array.from(children).map(child => child.id).sort();
        const sortedExpectedItems = expectedItems.sort();

        if (JSON.stringify(childIds) !== JSON.stringify(sortedExpectedItems)) {
            allCorrect = false;
            break;
        }
    }

    const resultFeedback = document.getElementById("resultFeedback");
    const nextGame = document.getElementById("nextGame");
    if (allCorrect) {
        resultFeedback.textContent = "Selamat! Anda berhasil melengkapi ruang sampel dengan benar.";
        resultFeedback.className = "text-center mt-4 text-green-600 text-lg font-bold";
        nextGame.style.display = 'block';
    } else {
        resultFeedback.textContent = "Jawaban Anda belum tepat. Coba lagi!";
        resultFeedback.className = "text-center mt-4 text-red-600 text-lg font-bold";
    }

    // Menonaktifkan semua item drag setelah tombol resultFeedback diklik
    disableDragItems();
}

function disableDragItems() {
    const dragItems = document.querySelectorAll('[id^="itemBatu"], [id^="itemGunting"], [id^="itemKertas"]');
    dragItems.forEach(item => {
        item.draggable = false; // Menonaktifkan kemampuan drag
        item.classList.add("opacity-50"); // Memberikan efek visual
    });
}

function restartGame() {
    const dropZones = document.querySelectorAll('[id^="dropZone"]');
    dropZones.forEach(zone => {
        while (zone.firstChild) {
            zone.removeChild(zone.firstChild);
        }
    });

    for (const key in dragCounts) {
        dragCounts[key] = 0;
        const element = document.getElementById(key);
        element.draggable = true;
        element.classList.remove("opacity-50");
    }

    const resultFeedback = document.getElementById("resultFeedback");
    resultFeedback.textContent = "";
}

   

//
//Script Pemenang Kejadian Batu Gunting Kertas
//

function validateAnswers() {
    // Mengambil semua dropdown (select elements)
    const selects = document.querySelectorAll("select");
    let correctAnswers = 0;
    let totalQuestions = selects.length;

    // Jawaban yang benar untuk setiap pertandingan
    const correctResults = {
        "Batu vs Batu": "seri",
        "Batu vs Gunting": "p1",
        "Batu vs Kertas": "p2",
        "Gunting vs Batu": "p2",
        "Gunting vs Gunting": "seri",
        "Gunting vs Kertas": "p1",
        "Kertas vs Batu": "p1",
        "Kertas vs Gunting": "p2",
        "Kertas vs Kertas": "seri"
    };

    // Cek setiap dropdown
    selects.forEach((select) => {
        const img = select.parentElement.querySelector('img'); //mengambil elemen gambar
        const label = img.alt.trim();//mengambil atribut alt sebagai label
        const selectedValue = select.value;

        // Cek apakah hasil yang dipilih sesuai dengan jawaban yang benar
        if (correctResults[label] === selectedValue) {
            correctAnswers++;
            // Menghapus kelas merah jika jawaban benar
            select.classList.remove("border-red-500");
            select.classList.add("border-green-500");
        } else if (selectedValue !== "") {
            // Menandai kotak dengan border merah jika jawaban salah
            select.classList.remove("border-green-500");
            select.classList.add("border-red-500");
        }
    });

    // Menampilkan hasil
    const feedbackElement = document.getElementById("resultWin");
    if (correctAnswers === totalQuestions) {
        feedbackElement.textContent = "Selamat! Semua jawaban benar.";
        feedbackElement.classList.add("text-green-500");
        feedbackElement.classList.remove("text-red-500");
    } else {
        feedbackElement.textContent = `Anda benar ${correctAnswers} dari ${totalQuestions} jawaban.`;
        feedbackElement.classList.add("text-red-500");
        feedbackElement.classList.remove("text-green-500");
    }

    // Menonaktifkan semua dropdown setelah memeriksa jawaban
    selects.forEach((select) => {
        select.disabled = true;  // Menonaktifkan dropdown
    });

    // Menonaktifkan tombol "Periksa Jawaban"
    document.getElementById("checkWin").disabled = true;
}

function restartWin() {
    // Mengambil semua elemen dropdown
    const selects = document.querySelectorAll("select");

    // Mengatur ulang setiap dropdown ke opsi default
    selects.forEach(select => {
        select.value = "";  // Kembali ke opsi awal
        select.disabled = false;  // Mengaktifkan dropdown
        select.classList.remove("border-red-500", "border-green-500");  // Hapus highlight
    });

    // Kosongkan hasil feedback
    const feedbackElement = document.getElementById("resultWin");
    feedbackElement.textContent = "";
    feedbackElement.classList.remove("text-green-500", "text-red-500");

    // Mengaktifkan tombol "Periksa Jawaban"
    document.getElementById("checkWin").disabled = false;
}


//SCRIPT LANGUANGE
//
//
//Conversetion on Chat

(function() {
    // Daftar pesan obrolan
    const chatMessages = [
        { text: "Tahu nggak, waktu kita main batu, gunting, kertas itu sebenarnya ada istilah khusus untuk aktivitasnya?", sender: "Zari", avatar: "../dist/img/chillCube.svg" },
        { text: "Hah? Istilah khusus? Apa tuh maksudnya?", sender: "Rani", avatar: "../dist/img/person1.svg" },
        { text: "Jadi, saat kita memilih antara batu, gunting, atau kertas, kegiatan itu disebut 'percobaan'. Maksudnya, aktivitas yang punya hasil yang bisa diamati.", sender: "Zari", avatar: "../dist/img/chillCube.svg" },
        { text: "Oh, jadi pas kita pilih batu dan lawan kita pilih gunting, itu disebut percobaan ya?", sender: "Person1", avatar: "../dist/img/person1.svg" },
        { text: "Betul! Nah, dari percobaan itu, kita bisa bikin daftar semua kemungkinan hasilnya. Misalnya, batu vs batu, batu vs kertas, gunting vs kertas hingga semua kemungkinan hasilnya terdaftar. Itu namanya ruang sampel.", sender: "Zari", avatar: "../dist/img/chillCube.svg" },
        { text: "Ooo... Ruang sampel tuh himpunan semua kemungkinan hasil. artinya permainan pertama tadi kita sedang mendaftarkan ruang sampel, ya? Terus, kalau cuma lihat hasil di mana aku menang aja, itu apa?", sender: "Person1", avatar: "../dist/img/person1.svg" },
        { text: "Kalau gitu, itu disebut kejadian. Jadi, kejadian itu bagian dari ruang sampel, tapi sesuai dengan kriteria tertentu, seperti 'pemain 1 menang'.", sender: "Zari", avatar: "../dist/img/chillCube.svg" },
        { text: "Wah, keren juga ya. Jadi percobaan menghasilkan ruang sampel, terus kejadian itu subset dari ruang sampel. Gitu kan?", sender: "Person1", avatar: "../dist/img/person1.svg" },
        { text: "Yup, tepat sekali!", sender: "Zari", avatar: "../dist/img/chillCube.svg" },
        { text: "Teman-teman, ayo lanjutkan pembelajaran kita ke tahap berikutnya. Namun, sebelum itu jawab dulu pertanyaan di bawah ini, yah.", sender: "Zari", avatar: "../dist/img/chillCube.svg" },
    ];

    let currentIndex = 0;

    function showNextMessage() {
        if (currentIndex < chatMessages.length) {
            const message = chatMessages[currentIndex];
            const chatContainer = document.getElementById("chatContainer");

            if (!chatContainer) {
                console.error("Elemen #chatContainer tidak ditemukan.");
                return;
            }

            // Membuat elemen chat
            const chatElement = document.createElement("div");
            chatElement.classList.add("flex", "items-start", "space-y-4", "mt-4");

            // Membuat elemen untuk foto profil dan pesan
            const profilePic = `<img src="${message.avatar}" alt="${message.sender}'s avatar" class="bg-gray-100 w-7 h-7 rounded-full mr-3">`;

            // Menambahkan foto profil dan pesan ke chat element
            if (message.sender === "Zari") {
                chatElement.innerHTML = `
                    <div class="flex items-start">
                        ${profilePic}
                        <div class="bg-gray-300 max-w-80 text-gray-800 p-1.5 text-xxs rounded-r-lg rounded-bl-lg">
                            ${message.text}
                        </div>
                    </div>
                `;
            } else {
                chatElement.classList.add("ml-auto");  // Menambahkan margin kiri otomatis untuk membuatnya di sebelah kanan
                chatElement.innerHTML = `
                    <div class="flex justify-end space-x-3 ml-auto">
                        <div class="bg-blue-500 max-w-80 text-white p-1.5 text-xxs rounded-l-lg rounded-br-lg">
                            ${message.text}
                        </div>
                        ${profilePic}
                    </div>
                `;
            }

            // Menambahkan chat ke container
            chatContainer.appendChild(chatElement);

            // Update indeks
            currentIndex++;
        }

        // Menghapus tombol jika semua pesan sudah ditampilkan
        if (currentIndex >= chatMessages.length) {
            const buttonContainer = document.getElementById("buttonContainer");
            if (buttonContainer) buttonContainer.remove();

            // Menampilkan elemen terminologi setelah tombol Next dihapus
            const languangEques1 = document.getElementById("languangEques1");
            if (languangEques1) languangEques1.classList.remove("hidden");
        }
    }

    // Menambahkan event listener setelah halaman dimuat
    document.addEventListener("DOMContentLoaded", function() {
        const nextButton = document.querySelector("#buttonContainer button");
        if (nextButton) {
            nextButton.addEventListener("click", showNextMessage);
        }
    });

})();

 

//
// SCRIPT QUIZ TYPE 5 
// LOCATION APPLICATION NO. 1
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
            optionButton.className = 'option-btnType5 bg-gray-100 text-gray-600 p-2 ml-1  rounded-sm hover:bg-secondary focus:outline-none';
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
            feedback.textContent = 'Jawaban Anda Salah. Coba lagi hingga benar!';
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
  
  // Initialize question 1 Peluang.html
  setupQuestionType5(1, ['Opsi 1', 'Opsi 2', 'Opsi 3', 'Opsi 5', 'Opsi 6', 'Opsi 7']);
  setupQuestionType5(4, ['Opsi 11', 'Opsi 13', 'Opsi 14', 'Opsi 17']);
  setupQuestionType5(5, ['Opsi 52', ]);

