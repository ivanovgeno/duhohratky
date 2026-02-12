<?php
// api/debug_mail.php
header("Content-Type: text/plain; charset=UTF-8");
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "--- DUHOHRATKY MAIL DEBUG (EXTENDED) ---\n";

$tests = [
    ['host' => 'mail.duhohratky.cz', 'port' => 993, 'ssl' => true],
    ['host' => 'mail.duhohratky.cz', 'port' => 143, 'ssl' => false],
    ['host' => '127.0.0.1', 'port' => 143, 'ssl' => false],
    ['host' => 'smtp-391870.w70.wedos.net', 'port' => 587, 'ssl' => false], // Guessing specific host
];

foreach ($tests as $test) {
    $host = $test['host'];
    $port = $test['port'];
    $prefix = $test['ssl'] ? 'ssl://' : '';
    $address = $prefix . $host;

    echo "\nTesting: $address : $port\n";

    // DNS
    $ip = gethostbyname($host);
    echo "  IP: $ip\n";

    // Socket
    $start = microtime(true);
    $socket = @fsockopen($address, $port, $errno, $errstr, 5);
    $end = microtime(true);
    $duration = round($end - $start, 3);

    if ($socket) {
        echo "  ✅ SUCCESS ($duration s)\n";
        fclose($socket);
    } else {
        echo "  ❌ FAILED ($duration s) - Error $errno: $errstr\n";
    }
}

echo "\n--- PHP INFO ---\n";
echo "OpenSSL loaded: " . (extension_loaded('openssl') ? 'Yes' : 'No') . "\n";
echo "IMAP loaded: " . (extension_loaded('imap') ? 'Yes' : 'No') . "\n";
?>