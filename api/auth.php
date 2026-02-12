<?php
// api/auth.php
require_once 'config.php';

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

if (!$email || !$password) {
    jsonResponse(false, 'Email a heslo jsou povinné.');
}

// Try to connect to IMAP to verify credentials
$mbox = @imap_open(IMAP_HOST, $email, $password);

if ($mbox) {
    // Login Successful
    $_SESSION['email'] = $email;
    $_SESSION['password'] = $password; // Store session password (needed for subsequent IMAP calls)

    imap_close($mbox);
    jsonResponse(true, 'Přihlášení úspěšné', ['email' => $email]);
} else {
    // Login Failed
    jsonResponse(false, 'Chyba přihlášení: ' . imap_last_error());
}
?>