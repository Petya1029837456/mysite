<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "quiz";

// Подключение
$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
  die("Ошибка подключения: " . $conn->connect_error);
}

// Получаем данные
$data = json_decode(file_get_contents("php://input"), true);
$name = $conn->real_escape_string($data["name"]);
$score = (int)$data["score"];

// Проверяем, есть ли уже такой игрок
$sql_check = "SELECT score FROM leaderboard WHERE name = '$name'";
$result = $conn->query($sql_check);

if ($result && $result->num_rows > 0) {
  // Игрок найден, проверяем очки
  $row = $result->fetch_assoc();
  if ($score > $row['score']) {
    // Новый результат лучше, обновляем
    $sql_update = "UPDATE leaderboard SET score = $score WHERE name = '$name'";
    if ($conn->query($sql_update) === TRUE) {
      echo "Обновлено";
    } else {
      echo "Ошибка при обновлении: " . $conn->error;
    }
  } else {
    // Новый результат хуже или равен — не меняем
    echo "Результат не улучшен";
  }
} else {
  // Игрок не найден — вставляем новую запись
  $sql_insert = "INSERT INTO leaderboard (name, score) VALUES ('$name', $score)";
  if ($conn->query($sql_insert) === TRUE) {
    echo "Добавлено";
  } else {
    echo "Ошибка при добавлении: " . $conn->error;
  }
}

$conn->close();
?>
