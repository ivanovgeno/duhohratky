<?php
// save.php - Ukládání dat z Admin panelu
// Přijímá JSON data a zapisuje je do souboru content.js

header('Content-Type: application/json');

// 1. Načtení dat z požadavku
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Žádná data nebyla přijata.']);
    exit;
}

// 2. Příprava obsahu souboru content.js
// Formát: window.defaultContent = { ... };
$jsContent = "window.defaultContent = " . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . ";";

// 3. Zápis do souboru
if (file_put_contents('content.js', $jsContent)) {
    clearstatcache();
    $size = filesize('content.js');
    echo json_encode([
        'status' => 'success',
        'message' => 'Data byla úspěšně uložena.',
        'size' => $size
    ]);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Chyba při zápisu do souboru content.js. Zkontrolujte oprávnění (chmod 777 nebo 666).']);
}
?>