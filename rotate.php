<?php
// rotate.php - Rotates an image 90 degrees left or right
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['image']) || !isset($data['direction'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing image path or direction.']);
    exit;
}

$imagePath = $data['image'];
$direction = $data['direction']; // 'left' or 'right'

// Security: Ensure path is within the allowed directory
if (strpos($imagePath, 'gallery/') !== 0 || strpos($imagePath, '..') !== false) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid image path.']);
    exit;
}

if (!file_exists($imagePath)) {
    echo json_encode(['status' => 'error', 'message' => 'Image not found.']);
    exit;
}

try {
    // 1. Load Image (assuming WebP as we convert everything to WebP)
    // But let's be safe and check mime type just in case
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($imagePath);

    switch ($mime) {
        case 'image/webp':
            $source = imagecreatefromwebp($imagePath);
            break;
        case 'image/jpeg':
            $source = imagecreatefromjpeg($imagePath);
            break;
        case 'image/png':
            $source = imagecreatefrompng($imagePath);
            break;
        default:
            throw new Exception('Unsupported image type for rotation.');
    }

    if (!$source) {
        throw new Exception('Failed to load image.');
    }

    // 2. Calculate Angle
    // imagerotate: angle is in degrees counter-clockwise
    $angle = ($direction === 'left') ? 90 : -90;

    // 3. Rotate
    // 0 = background color (transparent for png/webp)
    $rotated = imagerotate($source, $angle, 0);

    if (!$rotated) {
        imagedestroy($source);
        throw new Exception('Rotation failed.');
    }

    // 4. Save (Overwrite original)
    // Always save as WebP since we are standardizing
    // Enable alpha blending for transparency
    imagealphablending($rotated, true);
    imagesavealpha($rotated, true);

    if (imagewebp($rotated, $imagePath, 90)) {
        // Clear file stats cache so filesize() etc returns correct values later
        clearstatcache();

        echo json_encode([
            'status' => 'success',
            'message' => 'Image rotated.',
            'timestamp' => time() // Return timestamp to force frontend refresh
        ]);
    } else {
        throw new Exception('Failed to save rotated image.');
    }

    // Cleanup
    imagedestroy($source);
    imagedestroy($rotated);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>