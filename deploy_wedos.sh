#!/bin/bash
# deploy_wedos.sh - Nahrání souborů na Wedos FTP

HOST="391870.w70.wedos.net"
USER="w391870"
PASS="Duhohratky.2026"
REMOTE_PATH="/www/domains/duhohratky.cz/"

FILES=("index.html" "main.js" "main.css" "admin.html" "admin.js" "save.php" "fix_permissions.php")

echo "⏳ Spouštím nahrávání na $HOST..."

for FILE in "${FILES[@]}"; do
    echo "📦 Nahrávám: $FILE..."
    curl --connect-timeout 10 -T "$FILE" "ftp://$USER:$PASS@$HOST$REMOTE_PATH"
    if [ $? -eq 0 ]; then
        echo "✅ $FILE nahrán."
    else
        echo "❌ Selhalo nahrávání $FILE."
    fi
done

echo "🏁 Hotovo."
