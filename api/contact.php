<?php
header('Content-Type: application/json');

// Get POST data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$message = $_POST['message'] ?? '';

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Prosím vyplňte všechna povinná pole.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Neplatná e-mailová adresa.']);
    exit;
}

// Log submission
$log_dir = __DIR__ . '/logs';
if (!is_dir($log_dir)) {
    mkdir($log_dir, 0755, true);
}

$log_file = $log_dir . '/contact_submissions.txt';
$log_entry = date('Y-m-d H:i:s') . " | Name: $name | Email: $email | Phone: $phone | Message: $message\n";
file_put_contents($log_file, $log_entry, FILE_APPEND);

// We simulate sending success
// On WEDOS, mail() usually works if configured, but we keep it simple for now
echo json_encode(['success' => true]);
