<?php
// api/config.php

// Allow CORS for development (if needed, but same-origin is preferred)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Session start for storing credentials securely in server memory
session_start();

// Email Server Configuration (WEDOS)
// "mail.duhohratky.cz" connects to the assigned mail server for the domain
define('IMAP_HOST', '{mail.duhohratky.cz:993/imap/ssl/novalidate-cert}INBOX');
define('SMTP_HOST', 'mail.duhohratky.cz');
define('SMTP_PORT', 465); // SSL

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