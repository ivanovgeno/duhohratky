<?php
// api/config.php

// Allow CORS for development (if needed, but same-origin is preferred)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Session start for storing credentials securely in server memory
session_start();

// Email Server Configuration (Localhost)
// Using 127.0.0.1:143 (IMAP) and 127.0.0.1:25 (SMTP) to bypass external firewall
define('IMAP_HOST', '{127.0.0.1:143/imap/notls}INBOX');
define('SMTP_HOST', '127.0.0.1');
define('SMTP_PORT', 25);

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