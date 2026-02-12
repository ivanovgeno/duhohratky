<?php
// api/send.php
require_once 'config.php';
checkAuth();

$input = json_decode(file_get_contents('php://input'), true);
$to = $input['to'] ?? '';
$subject = $input['subject'] ?? '';
$message = $input['message'] ?? '';

if (!$to || !$subject || !$message) {
    jsonResponse(false, 'Chybí příjemce, předmět nebo zpráva.');
}

$from = $_SESSION['email'];
$headers = "From: $from\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// PHP mail() function (Basic - might go to spam, but works on standard hosting)
// Ideally use PHPMailer with SMTP, but `mail()` is native and zero-dep.
if (mail($to, $subject, $message, $headers)) {
    // Optionally append to "Sent" folder via IMAP
    $mbox = @imap_open(IMAP_HOST, $from, $_SESSION['password']);
    if ($mbox) {
        $sentFolder = str_replace('INBOX', 'Sent', IMAP_HOST); // Guessing Sent folder name
        imap_append($mbox, $sentFolder, "From: $from\r\nTo: $to\r\nSubject: $subject\r\n$headers\r\n\r\n$message");
        imap_close($mbox);
    }

    jsonResponse(true, 'Zpráva úspěšně odeslána.');
} else {
    jsonResponse(false, 'Odeslání selhalo.');
}
?>