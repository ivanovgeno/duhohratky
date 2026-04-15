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

// Get recipient from POST (set in main.js from config)
$recipient = $_POST['recipient'] ?? 'info@duhohratky.cz';

// Prepare email
$subject = "Nová zpráva z webu Duhohrátky: $name";
$email_content = "Jméno: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Telefon: $phone\n\n";
$email_content .= "Zpráva:\n$message\n";

$headers = "From: web@duhohratky.cz\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Log submission
$log_dir = __DIR__ . '/logs';
if (!is_dir($log_dir)) {
    mkdir($log_dir, 0755, true);
}

$log_file = $log_dir . '/contact_submissions.txt';
$log_entry = date('Y-m-d H:i:s') . " | To: $recipient | Name: $name | Email: $email | Message: $message\n";
file_put_contents($log_file, $log_entry, FILE_APPEND);

// Attempt to send
$mail_success = mail($recipient, $subject, $email_content, $headers);

echo json_encode(['success' => $mail_success]);
?>
