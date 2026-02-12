<?php
// api/fetch.php
require_once 'config.php';
checkAuth();

$email = $_SESSION['email'];
$password = $_SESSION['password'];

// Connect to IMAP
$mbox = @imap_open(IMAP_HOST, $email, $password);

if (!$mbox) {
    jsonResponse(false, 'Nepodařilo se připojit k emailové schránce.');
}

// Get total messages
$numMessages = imap_num_msg($mbox);
$emails = [];

// Fetch last 20 emails (descending order)
$start = max(1, $numMessages - 19);
for ($i = $numMessages; $i >= $start; $i--) {
    $header = imap_headerinfo($mbox, $i);

    // Decode subject
    $subject = '';
    $subjectElements = imap_mime_header_decode($header->subject);
    foreach ($subjectElements as $element) {
        $subject .= $element->text;
    }

    // Decode sender
    $from = $header->from[0];
    $senderName = isset($from->personal) ? $from->personal : $from->mailbox;
    // Basic decoding for sender name if needed
    $senderElements = imap_mime_header_decode($senderName);
    $senderNameDecoded = '';
    foreach ($senderElements as $element) {
        $senderNameDecoded .= $element->text;
    }

    // Get Body (Simplified - only fetching plain text mostly)
    // Fetch structure/body is complex in PHP IMAP, doing a basic fetch for now
    $structure = imap_fetchstructure($mbox, $i);
    $body = '';

    if (isset($structure->parts) && count($structure->parts)) {
        // Multipart
        $body = imap_fetchbody($mbox, $i, 1);
    } else {
        // Simple
        $body = imap_body($mbox, $i);
    }

    // Decode Body (Quoted-Printable / Base64)
    if ($structure->encoding == 3) {
        $body = base64_decode($body);
    } elseif ($structure->encoding == 4) {
        $body = quoted_printable_decode($body);
    }

    $emails[] = [
        'id' => $i,
        'sender' => $senderNameDecoded,
        'subject' => $subject, // Handle empty subject
        'date' => date("d.m.Y H:i", $header->udate),
        'read' => $header->Unseen != 'U', // 'U' means Unseen
        'body' => mb_convert_encoding($body, 'UTF-8', 'auto') // Ensure UTF-8
    ];
}

imap_close($mbox);
jsonResponse(true, 'Zprávy načteny', $emails);
?>