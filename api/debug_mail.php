<?php
// api/debug_mail.php
header("Content-Type: text/plain; charset=UTF-8");
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "--- DUHOHRATKY MAIL DEBUG (WEDOS SPECIFIC) ---\n";

$tests = [
    // Standard WEDOS global IMAP
    ['host' => 'imap.wedos.net', 'port' => 993, 'ssl' => true],
    ['host' => 'imap.wedos.net', 'port' => 143, 'ssl' => false],

    // Internal node aliases (often allowing local access)
    ['host' => 'wes1-imap1.wedos.net', 'port' => 993, 'ssl' => true],
    ['host' => 'wes1-imap1.wedos.net', 'port' => 143, 'ssl' => false],

    // Hosting specific node (from FTP) - retrying specific ports
    ['host' => '391870.w70.wedos.net', 'port' => 993, 'ssl' => true],
    ['host' => '391870.w70.wedos.net', 'port' => 143, 'ssl' => false],

    // Localhost fallback
    ['host' => 'localhost', 'port' => 143, 'ssl' => false],
];

// Add verified safe fallback
$tests[] = ['host' => 'mail.duhohratky.cz', 'port' => 993, 'ssl' => true];

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