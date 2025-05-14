let questions = [], current = 0, score = 0, playerName = '';

async function loadQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
  const data = await res.json();
  questions = data.results;
  current = 0;
}

async function startQuiz() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';
  score = 0;
  document.getElementById('score').textContent = score;
  await loadQuestions();
  showQuestion();
}

async function showQuestion() {
  if (current >= questions.length) {
    await loadQuestions();
  }

  const q = questions[current];
  const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
  document.getElementById('question').innerHTML = decode(q.question);
  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';
  allAnswers.forEach(a => {
    const btn = document.createElement('button');
    btn.innerHTML = decode(a);
    btn.onclick = () => {
      if (a === q.correct_answer) score++;
      document.getElementById('score').textContent = score;
      current++;
      showQuestion();
    };
    answersDiv.appendChild(btn);
  });
}

function stopQuiz() {
  document.getElementById('quiz-screen').style.display = 'none';

  let name = localStorage.getItem('playerName');

  // Если имя не указано — спрашиваем, и не принимаем пустое
  while (!name || name.trim() === "") {
    name = prompt("Введите ваше имя для лидерборда:");
    if (name === null) {
      goToStart();
      return; // игрок нажал "Отмена", возвращаемся на старт
    }
    name = name.trim();
  }

  localStorage.setItem('playerName', name);

  const lb = JSON.parse(localStorage.getItem('leaderboard') || "[]");
  const existing = lb.find(p => p.name === name);

  if (existing) {
    if (score > existing.score) existing.score = score;
  } else {
    lb.push({ name: name, score: score });
  }

  localStorage.setItem('leaderboard', JSON.stringify(lb));
  goToStart();
}

function showLeaderboard() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('leaderboard-screen').style.display = 'block';
  const lb = JSON.parse(localStorage.getItem('leaderboard') || "[]");
  lb.sort((a, b) => b.score - a.score);
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';
  lb.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name}: ${p.score}`;
    list.appendChild(li);
  });
}

function goToStart() {
  document.getElementById('start-screen').style.display = 'block';
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('leaderboard-screen').style.display = 'none';
}

function decode(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}
window.onload = function() {
    for (let i = 350; i < 550; i++) { // Больше точек, чтобы эффект был реалистичнее
        let particle = document.createElement("div");
        particle.className = "particle";

        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.top = Math.random() * window.innerHeight + "px";
        particle.style.animationDuration = (Math.random() * 12 + 5) + "s";

        document.body.appendChild(particle);
    }
};
