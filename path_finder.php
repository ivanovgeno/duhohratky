<?php
header('Content-Type: text/plain');
echo "Duhohrátky Path Finder\n";
echo "======================\n\n";
echo "Current Directory: " . getcwd() . "\n";
echo "Base Name: " . basename(getcwd()) . "\n";
echo "Server IP: " . $_SERVER['SERVER_ADDR'] . "\n";
echo "Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "\n\n";

echo "File Listing:\n";
$files = scandir('.');
foreach ($files as $file) {
    if ($file != "." && $file != "..") {
        $size = filesize($file);
        $mtime = date("Y-m-d H:i:s", filemtime($file));
        echo sprintf("[%s] %-20s (%d bytes)\n", $mtime, $file, $size);
    }
}
?>
