<?php
// upload.php - Handles image upload and WebP conversion
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['status' => 'error', 'message' => 'Upload failed or no file selected.']);
    exit;
}

$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
$uploadDir = 'gallery/';

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Validation
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($file['tmp_name']);

if (!in_array($mime, $allowedTypes)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid file type. Only JPG, PNG, and GIF are allowed.']);
    exit;
}

// File Info
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = pathinfo($file['name'], PATHINFO_FILENAME);
$newFilename = uniqid('img_', true) . '.webp'; // Unique name
$targetPath = $uploadDir . $newFilename;

// Conversion to WebP
try {
    switch ($mime) {
        case 'image/jpeg':
            $image = imagecreatefromjpeg($file['tmp_name']);
            break;
        case 'image/png':
            $image = imagecreatefrompng($file['tmp_name']);
            imagepalettetotruecolor($image); // Handle transparency
            imagealphablending($image, true);
            imagesavealpha($image, true);
            break;
        case 'image/gif':
            $image = imagecreatefromgif($file['tmp_name']);
            imagepalettetotruecolor($image); // Convert to true color for better quality
            break;
        default:
            throw new Exception('Unsupported format');
    }

    if (!$image) {
        throw new Exception('Image creation failed');
    }

    // Convert to WebP (Quality 80)
    if (imagewebp($image, $targetPath, 80)) {
        imagedestroy($image);
        echo json_encode([
            'status' => 'success',
            'message' => 'Image uploaded and converted to WebP',
            'path' => $targetPath,
            'original_name' => $file['name']
        ]);
    } else {
        throw new Exception('WebP conversion failed');
    }

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>