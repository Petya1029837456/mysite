<?php
// Параметры подключения к базе — замените на свои
$host = 'localhost';
$db   = 'quiz';
$user = 'root';     // ваш пользователь MySQL
$pass = '';         // ваш пароль MySQL
$charset = 'utf8mb4';

// Настройка подключения через PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);

    // Выбираем всё из leaderboard
    $stmt = $pdo->query('SELECT name, score FROM leaderboard ORDER BY score DESC');
    $leaderboard = $stmt->fetchAll();

    // Отдаем JSON
    header('Content-Type: application/json');
    echo json_encode($leaderboard);

} catch (\PDOException $e) {
    // В случае ошибки отдаём JSON с ошибкой
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}
?>
