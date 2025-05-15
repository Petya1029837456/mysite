<<<<<<< HEAD
let questions = [];
let current = 0;
let score = 0;
let playerName = '';
let isLoading = false;

// Загружаем вопросы (по 10 за раз)
async function loadQuestions() {
  if (isLoading) return; // чтобы не грузить параллельно несколько раз
  isLoading = true;

  const res = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
  const data = await res.json();

  questions = questions.concat(data.results); // добавляем новые вопросы к уже имеющимся
  isLoading = false;
}

// Запускаем викторину
async function startQuiz() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';
  score = 0;
  current = 0;
  questions = [];
  document.getElementById('score').textContent = score;
  await loadQuestions();
  showQuestion();
}

// Показываем вопрос и варианты ответа
async function showQuestion() {
  if (current >= questions.length) {
    // Если достигли конца загруженных вопросов — загружаем ещё
    await loadQuestions();
  }

  const q = questions[current];
  const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

  document.getElementById('question').innerHTML = decodeHTML(q.question);

  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  allAnswers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerHTML = decodeHTML(answer);
    btn.onclick = () => {
      if (answer === q.correct_answer) score++;
      document.getElementById('score').textContent = score;
      current++;
      showQuestion();
    };
    answersDiv.appendChild(btn);
  });
}

// Завершаем викторину по кнопке "Закончить"
function endQuiz() {
  document.getElementById('quiz-screen').style.display = 'none';

  playerName = localStorage.getItem('playerName');

  while (!playerName || playerName.trim() === "") {
    playerName = prompt("Введите ваше имя для лидерборда:");
    if (playerName === null) {
      goToStart();
      return; // если отменили ввод — возвращаемся на старт
    }
    playerName = playerName.trim();
  }

  localStorage.setItem('playerName', playerName);

  // Отправляем результат на сервер
  saveScoreToServer(playerName, score);

  goToStart();
}

// Функция отправки результатов на сервер PHP
function saveScoreToServer(name, score) {
  fetch('save_score.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score })
  })
  .then(response => response.text())
  .then(data => {
    console.log('Ответ сервера:', data);
  })
  .catch(error => {
    console.error('Ошибка при отправке результатов:', error);
  });
}

// Показываем таблицу лидеров (загружаем с сервера)
async function showLeaderboard() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('leaderboard-screen').style.display = 'block';

  try {
    const res = await fetch('get_leaderboard.php'); // этот PHP-скрипт должен отдавать JSON с лидерами
    const lb = await res.json();

    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';

    lb.sort((a, b) => b.score - a.score);

    lb.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name}: ${p.score}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Ошибка загрузки лидеров:', err);
  }
}

// Возвращаемся на старт
function goToStart() {
  document.getElementById('start-screen').style.display = 'block';
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('leaderboard-screen').style.display = 'none';
}

// Декодируем HTML-сущности
function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

// Эффект частиц при загрузке страницы
window.onload = function() {
  for (let i = 350; i < 550; i++) {
    let particle = document.createElement("div");
    particle.className = "particle";

    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";
    particle.style.animationDuration = (Math.random() * 12 + 5) + "s";

    document.body.appendChild(particle);
  }

  // Кнопка "Закончить"
  document.getElementById('finish-btn').onclick = () => {
    endQuiz();
  };
};
=======
let questions = [];
let current = 0;
let score = 0;
let playerName = '';
let isLoading = false;

// Загружаем вопросы (по 10 за раз)
async function loadQuestions() {
  if (isLoading) return; // чтобы не грузить параллельно несколько раз
  isLoading = true;

  const res = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
  const data = await res.json();

  questions = questions.concat(data.results); // добавляем новые вопросы к уже имеющимся
  isLoading = false;
}

// Запускаем викторину
async function startQuiz() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('quiz-screen').style.display = 'block';
  score = 0;
  current = 0;
  questions = [];
  document.getElementById('score').textContent = score;
  await loadQuestions();
  showQuestion();
}

// Показываем вопрос и варианты ответа
async function showQuestion() {
  if (current >= questions.length) {
    // Если достигли конца загруженных вопросов — загружаем ещё
    await loadQuestions();
  }

  const q = questions[current];
  const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

  document.getElementById('question').innerHTML = decodeHTML(q.question);

  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  allAnswers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerHTML = decodeHTML(answer);
    btn.onclick = () => {
      if (answer === q.correct_answer) score++;
      document.getElementById('score').textContent = score;
      current++;
      showQuestion();
    };
    answersDiv.appendChild(btn);
  });
}

// Завершаем викторину по кнопке "Закончить"
function endQuiz() {
  document.getElementById('quiz-screen').style.display = 'none';

  playerName = localStorage.getItem('playerName');

  while (!playerName || playerName.trim() === "") {
    playerName = prompt("Введите ваше имя для лидерборда:");
    if (playerName === null) {
      goToStart();
      return; // если отменили ввод — возвращаемся на старт
    }
    playerName = playerName.trim();
  }

  localStorage.setItem('playerName', playerName);

  // Отправляем результат на сервер
  saveScoreToServer(playerName, score);

  goToStart();
}

// Функция отправки результатов на сервер PHP
function saveScoreToServer(name, score) {
  fetch('save_score.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score })
  })
  .then(response => response.text())
  .then(data => {
    console.log('Ответ сервера:', data);
  })
  .catch(error => {
    console.error('Ошибка при отправке результатов:', error);
  });
}

// Показываем таблицу лидеров (загружаем с сервера)
async function showLeaderboard() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('leaderboard-screen').style.display = 'block';

  try {
    const res = await fetch('get_leaderboard.php'); // этот PHP-скрипт должен отдавать JSON с лидерами
    const lb = await res.json();

    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';

    lb.sort((a, b) => b.score - a.score);

    lb.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name}: ${p.score}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Ошибка загрузки лидеров:', err);
  }
}

// Возвращаемся на старт
function goToStart() {
  document.getElementById('start-screen').style.display = 'block';
  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('leaderboard-screen').style.display = 'none';
}

// Декодируем HTML-сущности
function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

// Эффект частиц при загрузке страницы
window.onload = function() {
  for (let i = 350; i < 550; i++) {
    let particle = document.createElement("div");
    particle.className = "particle";

    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";
    particle.style.animationDuration = (Math.random() * 12 + 5) + "s";

    document.body.appendChild(particle);
  }

  // Кнопка "Закончить"
  document.getElementById('finish-btn').onclick = () => {
    endQuiz();
  };
};
>>>>>>> 39c55dcee3fa292e2606d85fe9b6c4e73f46caec
