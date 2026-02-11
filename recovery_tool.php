<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// 1. Scan Gallery Directory
$gallery_dir = 'gallery/';
$images = [];
if (is_dir($gallery_dir)) {
    $files = glob($gallery_dir . '*.{jpg,jpeg,png,gif,webp}', GLOB_BRACE);
    foreach ($files as $file) {
        $images[] = basename($file);
    }
}

// 2. Read content.js
$content_js = '';
if (file_exists('content.js')) {
    $content_js = file_get_contents('content.js');
}

// 3. Return Report
echo json_encode([
    'status' => 'success',
    'server_time' => date('Y-m-d H:i:s'),
    'gallery_count' => count($images),
    'gallery_files' => array_slice($images, 0, 50), // Show first 50
    'content_js_size' => strlen($content_js),
    'content_js_preview' => substr($content_js, 0, 200)
]);
?>