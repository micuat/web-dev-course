<?php
//I fully used chat gpt here, bcs I have no idea how this works lol
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = "drawings/";
    $filename = basename($_FILES['drawingFile']['name']);
    $targetFile = $uploadDir . $filename;

    // 1. Загружаем файл
    if (isset($_FILES['drawingFile']) && $_FILES['drawingFile']['error'] === 0) {
        if (move_uploaded_file($_FILES['drawingFile']['tmp_name'], $targetFile)) {
            // 2. Получаем данные из формы
            $description = $_POST['description'] ?? '';
            $timePeriod = $_POST['timePeriod'] ?? '';
            $category = $_POST['category'] ?? '';

            file_put_contents("log.txt", "Trying to write\n", FILE_APPEND);
            // 3. Загружаем текущий файл, если есть
            $databaseFile = "database.txt";
            if (file_exists($databaseFile)) {
                $existingData = json_decode(file_get_contents($databaseFile), true);
            } else {
                $existingData = ["content" => []];
            }


            // 4. Добавляем новую запись
            $newEntry = [
                "name" => $filename,
                "description" => $description,
                "time" => $timePeriod,
                "category" => $category
            ];

            $existingData["content"][] = $newEntry;

            // 5. Сохраняем обратно
            $existingData["last_modified"] = time();
            file_put_contents($databaseFile, json_encode($existingData, JSON_PRETTY_PRINT));

            echo "Upload and save successful!";
        } else {
            echo "Upload failed.";
        }
    } else {
        echo "No file uploaded or error.";
    }
} else {
    echo "PHP is working";
}
