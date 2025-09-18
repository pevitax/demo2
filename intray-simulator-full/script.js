const questions = [
  {
    text: "Anda menerima email dari atasan yang meminta laporan segera. Apa yang Anda lakukan?",
    options: [
      { text: "Segera buat laporan sesuai permintaan", score: 3 },
      { text: "Tunda dan kerjakan pekerjaan lain dulu", score: 1 },
      { text: "Abaikan karena terlalu sibuk", score: 0 }
    ]
  },
  {
    text: "Rekan kerja meminta bantuan untuk presentasi, tetapi deadline laporan sudah dekat. Apa prioritasmu?",
    options: [
      { text: "Bantu rekan kerja dulu", score: 1 },
      { text: "Selesaikan laporan dulu, lalu bantu rekan kerja", score: 3 },
      { text: "Tolak membantu karena bukan tanggung jawab Anda", score: 0 }
    ]
  },
  {
    text: "Ada rapat mendadak pada jam yang sama dengan jadwal presentasi. Apa langkah terbaik?",
    options: [
      { text: "Ikuti rapat dan abaikan presentasi", score: 0 },
      { text: "Koordinasi agar jadwal tidak bentrok", score: 3 },
      { text: "Lewatkan rapat tanpa izin", score: 1 }
    ]
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = `<p><b>${currentQuestion+1}.</b> ${q.text}</p>`;
    
    q.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.innerText = opt.text;
      btn.onclick = () => selectAnswer(opt.score);
      questionDiv.appendChild(btn);
    });

    quizDiv.appendChild(questionDiv);
  } else {
    showResult();
  }
}

function selectAnswer(points) {
  score += points;
  currentQuestion++;
  loadQuestion();
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");

  let feedback = "";
  if (score >= 8) feedback = "Bagus! Anda pandai mengatur prioritas ✅";
  else if (score >= 5) feedback = "Cukup baik, tapi masih perlu peningkatan ⚡";
  else feedback = "Perlu latihan lagi dalam manajemen waktu ❌";

  document.getElementById("scoreText").innerText = 
    `Skor Anda: ${score} dari ${questions.length * 3}\n${feedback}`;
}

function restartQuiz() {
  score = 0;
  currentQuestion = 0;
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  loadQuestion();
}

window.onload = loadQuestion;
