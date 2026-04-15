<?php
// fix_permissions.php - Pomocný skript pro opravu práv souborů
// Tento skript nastaví práva 777 pro content.js, aby do něj mohl PHP skript zapisovat.

header('Content-Type: text/plain; charset=utf-8');

$file = 'content.js';

echo "🚀 Spouštím opravu oprávnění pro soubor: $file\n\n";

if (!file_exists($file)) {
    echo "❌ CHYBA: Soubor $file neexistuje. Vytvářím prázdný soubor...\n";
    file_put_contents($file, "window.defaultContent = {};");
}

if (chmod($file, 0777)) {
    echo "✅ ÚSPĚCH: Oprávnění nastavena na 777 (každý může zapisovat).\n";
} else {
    echo "❌ CHYBA: Nepodařilo se změnit oprávnění. Zkuste to prosím ručně ve WebFTP (CHMOD).\n";
}

// Kontrola, zda je soubor skutečně zapisovatelný
if (is_writable($file)) {
    echo "📝 TEST: Soubor je nyní zapisovatelný pro PHP.\n";
} else {
    echo "⚠️ VÝSTRAHA: Soubor stále hlásí, že do něj nelze zapisovat.\n";
}

echo "\nNyní zkuste v administraci kliknout na 'Uložit změny'.";
?>
