<?php
// api/debug_mail.php
header("Content-Type: text/plain; charset=UTF-8");
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "--- DUHOHRATKY MAIL DEBUG (MX LOOKUP) ---\n";

// 1. Get MX Records
$domain = 'duhohratky.cz';
echo "Fetching MX records for: $domain\n";
if (getmxrr($domain, $mx_details)) {
    echo "Found MX records:\n";
    print_r($mx_details);
} else {
    echo "❌ Could not find MX records.\n";
    $mx_details = ['wes1-imap1.wedos.net', 'mail.wedos.net', 'imap.wedos.net']; // Fallbacks
}

$tests = [];
foreach ($mx_details as $mx_host) {
    if (!empty($mx_host)) {
        $tests[] = ['host' => $mx_host, 'port' => 993, 'ssl' => true];
        $tests[] = ['host' => $mx_host, 'port' => 143, 'ssl' => false];
    }
}

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