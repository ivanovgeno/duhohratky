<?php
// api/config.php

// Allow CORS for development (if needed, but same-origin is preferred)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Session start for storing credentials securely in server memory
session_start();

// Email Server Configuration (Hosting Node)
// Using direct hosting hostname which might be whitelisted
define('IMAP_HOST', '{391870.w70.wedos.net:993/imap/ssl/novalidate-cert}INBOX');
define('SMTP_HOST', '391870.w70.wedos.net');
define('SMTP_PORT', 465);

function jsonResponse($success, $message, $data = null)
{
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

function checkAuth()
{
    if (!isset($_SESSION['email']) || !isset($_SESSION['password'])) {
        http_response_code(401);
        jsonResponse(false, 'Unauthorized');
    }
}
?>