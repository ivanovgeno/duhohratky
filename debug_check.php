<?php
header('Content-Type: text/plain');
echo "--- Wedos Debug Check ---\n";
echo "Date: " . date('Y-m-d H:i:s') . "\n";
echo "Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "\n";
echo "Current File: " . __FILE__ . "\n";
echo "Current Dir: " . getcwd() . "\n";
echo "Server IP: " . $_SERVER['SERVER_ADDR'] . "\n";
echo "Client IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
echo "PHP Version: " . phpversion() . "\n";
echo "\n--- Directory Listing --- \n";
$files = scandir('.');
foreach ($files as $file) {
    echo $file . "\n";
}
?>
