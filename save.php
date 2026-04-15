<?php
// save.php - Ukládání dat z Admin panelu
// Přijímá JSON data a zapisuje je do souboru content.js

header('Content-Type: application/json');

// 1. Načtení dat z požadavku
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Žádná data nebyla přijata nebo neplatný JSON.']);
    exit;
}

// 2. Příprava obsahu souboru content.js
// Formát: window.defaultContent = { ... };
$jsContent = "window.defaultContent = " . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . ";";

// 3. Zápis do souboru
$file = 'content.js';

if (!is_writable('.') && !file_exists($file)) {
    echo json_encode(['status' => 'error', 'message' => 'Adresář není zapisovatelný.']);
    exit;
}

if (file_put_contents($file, $jsContent)) {
    if (function_exists('clearstatcache')) {
        clearstatcache();
    }
    $size = filesize($file);
    echo json_encode([
        'status' => 'success',
        'message' => 'Data byla úspěšně uložena.',
        'size' => $size,
        'file' => realpath($file)
    ]);
} else {
    $error = error_get_last();
    http_response_code(500);
    echo json_encode([
        'status' => 'error', 
        'message' => 'Chyba při zápisu do souboru content.js.',
        'php_error' => $error ? $error['message'] : 'Neznámá chyba přístupu'
    ]);
}
?>