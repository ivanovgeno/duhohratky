<?php
// api/debug_mail.php
// Access this file in browser to test mail server connection: /api/debug_mail.php

header("Content-Type: text/plain; charset=UTF-8");
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "--- DUHOHRATKY MAIL DEBUG ---\n";

$host = 'mail.duhohratky.cz';
$port = 993;
$ssl = true;

echo "Targeting Host: $host\n";
echo "Port: $port\n";

// 1. DNS Check
$ip = gethostbyname($host);
echo "Resolved IP: $ip\n";

if ($ip == $host) {
    echo "❌ DNS Lookup Failed. Server cannot find '$host'.\n";
} else {
    echo "✅ DNS Lookup OK.\n";
}

// 2. Network Socket Check
echo "\nTesting Socket Connection...\n";
$timeout = 10;
$socket = @fsockopen("ssl://$host", $port, $errno, $errstr, $timeout);

if ($socket) {
    echo "✅ Socket Connection Successful!\n";
    fclose($socket);
} else {
    echo "❌ Socket Connection Failed.\n";
    echo "Error $errno: $errstr\n";
}

// 3. IMAP Extension Check
echo "\nChecking PHP IMAP Extension...\n";
if (function_exists('imap_open')) {
    echo "✅ PHP IMAP Extension is loaded.\n";
} else {
    echo "❌ PHP IMAP Extension is MISSING.\n";
}

echo "\n--- End Debug ---\n";
?>