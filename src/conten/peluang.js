//SCRIPT EXPERIENCE
//
//
//Script RUANG SAMPEL KEJADIAN BATU GUNTING KERTAS 
// game-logic.js
let draggedElement = null;
let touchStartX = 0;
let touchStartY = 0;

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

function initializeGame() {
    setupDragElements();
    setupDropZones();

    const checkButton = document.querySelector('button[onclick="validateSampleSpace()"]');
    if (checkButton) checkButton.addEventListener("click", validateSampleSpace);

    const restartButton = document.querySelector('button[onclick="restartGame()"]');
    if (restartButton) restartButton.addEventListener("click", restartGame);
}

function setupDragElements() {
    const draggableElements = document.querySelectorAll('[draggable="true"]');
    draggableElements.forEach(elem => {
        elem.addEventListener('dragstart', startDrag);
        elem.addEventListener('touchstart', handleTouchStart, { passive: false });
        elem.addEventListener('touchmove', handleTouchMove, { passive: false });
        elem.addEventListener('touchend', handleTouchEnd, { passive: false });
        elem.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    });
}

function setupDropZones() {
    const dropZones = document.querySelectorAll('[id^="dropZone"]');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', allowDrop);
        zone.addEventListener('drop', handleDrop);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function startDrag(event) {
    const draggedItemId = event.target.id;
    if (dragCounts[draggedItemId] < 3) {
        event.dataTransfer.setData("text", draggedItemId);
        draggedElement = event.target;
    } else {
        event.preventDefault();
        alert("Item ini hanya dapat dipindahkan maksimal 3 kali!");
    }
}

function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    if (!data) return;
    
    const dropZone = event.target.closest('[id^="dropZone"]');
    if (!dropZone) {
        alert("Anda tidak dapat menjatuhkan item ke elemen ini!");
        return;
    }

    // Periksa apakah item yang sama sudah ada di drop zone
    const existingItems = dropZone.querySelectorAll(`[data-original-id="${data}"]`);
    if (existingItems.length > 0) {
        return;
    }

    if (dropZone.children.length < 2) {
        const draggedItem = document.getElementById(data);
        const clonedElement = draggedItem.cloneNode(true);
        clonedElement.removeAttribute('draggable');
        clonedElement.classList.remove("cursor-move");
        clonedElement.style.cursor = 'default';
        clonedElement.setAttribute('data-original-id', data);
        dropZone.appendChild(clonedElement);

        dragCounts[data]++;
        if (dragCounts[data] >= 3) {
            draggedItem.draggable = false;
            draggedItem.classList.add("opacity-50");
        }
    } else {
        alert("Drop zone sudah penuh! Hanya dua elemen yang diperbolehkan.");
    }
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const element = e.target.closest('[draggable="true"]');
    if (!element || dragCounts[element.id] >= 3) {
        if (element && dragCounts[element.id] >= 3) {
            alert("Item ini hanya dapat dipindahkan maksimal 3 kali!");
        }
        return;
    }

    draggedElement = element;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

    draggedElement.classList.add('dragging');
    draggedElement.style.opacity = '0.7';
    draggedElement.style.transition = 'none';
    draggedElement.style.position = 'fixed';
    draggedElement.style.zIndex = '1000';
    draggedElement.style.width = `${draggedElement.offsetWidth}px`;
    draggedElement.style.left = `${draggedElement.getBoundingClientRect().left}px`;
    draggedElement.style.top = `${draggedElement.getBoundingClientRect().top}px`;
}

function handleTouchMove(e) {
    if (!draggedElement) return;
    e.preventDefault();
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    draggedElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    document.querySelectorAll('[id^="dropZone"]').forEach(zone => {
        const rect = zone.getBoundingClientRect();
        if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
            touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
            zone.classList.add('potential-drop');
        } else {
            zone.classList.remove('potential-drop');
        }
    });
}

function handleTouchEnd(e) {
    if (!draggedElement) return;
    e.preventDefault();

    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
    const validDropZone = dropTarget?.closest('[id^="dropZone"]');

    draggedElement.classList.remove('dragging');
    draggedElement.style.opacity = '';
    draggedElement.style.transition = '';
    draggedElement.style.position = '';
    draggedElement.style.zIndex = '';
    draggedElement.style.transform = '';
    draggedElement.style.width = '';
    draggedElement.style.left = '';
    draggedElement.style.top = '';

    document.querySelectorAll('[id^="dropZone"]').forEach(zone => {
        zone.classList.remove('potential-drop');
    });

    if (validDropZone) {
        const existingItems = validDropZone.querySelectorAll(`[data-original-id="${draggedElement.id}"]`);
        if (existingItems.length > 0) {
            alert("Item ini sudah ada di drop zone!");
            return;
        }

        if (validDropZone.children.length < 2) {
            const clonedElement = draggedElement.cloneNode(true);
            clonedElement.removeAttribute('draggable');
            clonedElement.classList.remove("cursor-move");
            clonedElement.style.cursor = 'default';
            clonedElement.setAttribute('data-original-id', draggedElement.id);
            validDropZone.appendChild(clonedElement);

            dragCounts[draggedElement.id]++;
            if (dragCounts[draggedElement.id] >= 3) {
                draggedElement.draggable = false;
                draggedElement.classList.add("opacity-50");
            }
        } else {
            alert("Drop zone sudah penuh! Hanya dua elemen yang diperbolehkan.");
        }
    }

    draggedElement = null;
}

function validateSampleSpace() {
    let allCorrect = true;

    const allDropZones = document.querySelectorAll('[id^="dropZone"]');
    allDropZones.forEach(zone => {
        zone.classList.remove('border-red-500', 'border-green-500', 'bg-red-200', 'bg-green-200');
        zone.classList.add('border-tertiary', 'bg-gray-200');
    });

    for (const [zoneId, correctItems] of Object.entries(correctItemPairs)) {
        const zone = document.getElementById(zoneId);
        if (!zone || zone.children.length !== 2) {
            allCorrect = false;
            zone.classList.remove('border-tertiary');
            zone.classList.add('border-red-500', 'bg-red-200');
            continue;
        }

        const childIds = Array.from(zone.children).map(child => child.getAttribute('data-original-id'));
        const isCorrect = childIds.includes(correctItems[0]) && childIds.includes(correctItems[1]);

        if (!isCorrect) {
            allCorrect = false;
            zone.classList.remove('border-tertiary');
            zone.classList.add('border-red-500', 'bg-red-200');
        } else {
            zone.classList.remove('border-tertiary');
            zone.classList.add('border-green-500', 'bg-green-200');
        }
    }

    const resultFeedback = document.getElementById("resultFeedback");
    const nextGame = document.getElementById("nextGame");

    if (allCorrect) {
        resultFeedback.innerHTML = "<span class='text-green-600'>🎉 Selamat! Anda berhasil melengkapi ruang sampel dengan benar.</span>";
        resultFeedback.className = "text-center mt-4 text-lg font-bold";
        if (nextGame) nextGame.style.display = 'block';
    } else {
        resultFeedback.innerHTML = "<span class='text-red-600'>❌ Jawaban Anda belum tepat. Periksa kembali kombinasi yang masih salah (ditandai dengan border merah).</span>";
        resultFeedback.className = "text-center mt-4 text-lg font-bold";
    }

    disableDragItems();
}

function disableDragItems() {
    const originalDragItems = document.querySelectorAll('[id^="itemBatu"], [id^="itemGunting"], [id^="itemKertas"]');
    originalDragItems.forEach(item => {
        item.draggable = false;
        item.classList.add("opacity-50");
        item.style.pointerEvents = "none";
    });

    const clonedItems = document.querySelectorAll('[id^="dropZone"] [data-original-id]');
    clonedItems.forEach(item => {
        item.draggable = false;
        item.classList.add("opacity-50");
        item.style.pointerEvents = "none";
        item.removeEventListener('touchstart', handleTouchStart);
        item.removeEventListener('touchmove', handleTouchMove);
        item.removeEventListener('touchend', handleTouchEnd);
        item.removeEventListener('touchcancel', handleTouchEnd);
    });
}

function restartGame() {
    const dropZones = document.querySelectorAll('[id^="dropZone"]');
    dropZones.forEach(zone => {
        while (zone.firstChild) zone.removeChild(zone.firstChild);
        zone.classList.remove('border-red-500', 'border-green-500', 'bg-red-200', 'bg-green-200', 'potential-drop');
        zone.classList.add('border-tertiary', 'bg-gray-200');
    });

    const allDragItems = document.querySelectorAll('[id^="itemBatu"], [id^="itemGunting"], [id^="itemKertas"]');
    allDragItems.forEach(item => {
        if (dragCounts.hasOwnProperty(item.id)) dragCounts[item.id] = 0;
        item.draggable = true;
        item.classList.remove("opacity-50", "dragging");
        item.style.pointerEvents = "auto";
        item.style.transform = "";
        item.style.position = "";
        item.style.zIndex = "";

        item.addEventListener('touchstart', handleTouchStart, { passive: false });
        item.addEventListener('touchmove', handleTouchMove, { passive: false });
        item.addEventListener('touchend', handleTouchEnd, { passive: false });
        item.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    });

    const resultFeedback = document.getElementById("resultFeedback");
    resultFeedback.textContent = "";
    resultFeedback.className = "text-center mt-4 text-lg font-bold";

    const nextGame = document.getElementById("nextGame");
    if (nextGame) nextGame.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', initializeGame);

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
            const profilePic = `<img src="${message.avatar}" alt="${message.sender}'s avatar" class="bg-gray-100 w-7 h-7 rounded-full mr-3 sm:h-10 sm:w-10">`;

            // Menambahkan foto profil dan pesan ke chat element
            if (message.sender === "Zari") {
                chatElement.innerHTML = `
                    <div class="flex items-start">
                        ${profilePic}
                        <div class="bg-gray-300 max-w-80 text-gray-800 p-1.5 text-xxs rounded-r-lg rounded-bl-lg sm:text-xs">
                            ${message.text}
                        </div>
                    </div>
                `;
            } else {
                chatElement.classList.add("ml-auto");  // Menambahkan margin kiri otomatis untuk membuatnya di sebelah kanan
                chatElement.innerHTML = `
                    <div class="flex justify-end space-x-3 ml-auto">
                        <div class="bg-blue-500 max-w-80 text-white p-1.5 text-xxs rounded-l-lg rounded-br-lg sm:text-xs">
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
  setupQuestionType5(6, ['Opsi 60', 'Opsi 61','Opsi 62', 'Opsi 63','Opsi 64', 'Opsi 65', 'Opsi 67', 'Opsi 69','Opsi 601']);


