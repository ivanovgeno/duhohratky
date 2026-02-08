<?php
// delete.php - Handles deletion of gallery images
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['filename'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing filename.']);
    exit;
}

$filename = basename($data['filename']); // Security: basename() prevents directory traversal
$path = 'gallery/' . $filename;

if (!file_exists($path)) {
    echo json_encode(['status' => 'error', 'message' => 'File not found.']);
    exit;
}

if (unlink($path)) {
    echo json_encode(['status' => 'success', 'message' => 'File deleted']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Unable to delete file. Check permissions.']);
}
?>