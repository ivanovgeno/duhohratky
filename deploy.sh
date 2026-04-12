#!/bin/bash

# Configuration
FTP_HOST="46.28.106.57"
FTP_USER="w391870"
FTP_PASS="Duhohratky.2026"
FTP_PATH="/www"
COMMIT_MSG="$1"

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update site"
fi

echo "🚀 Starting Deployment: $COMMIT_MSG"

# Step 1: Push to GitHub (Intermittent network issues might cause failure)
echo "📦 Syncing with GitHub..."
git add .
git commit -m "$COMMIT_MSG"
if git push origin gh-pages; then
    echo "   ✅ GitHub deployment successful!"
else
    echo "   ⚠️ GitHub push failed (Network). Proceeding with FTP..."
fi

# Step 2: Upload to FTP
echo "📡 Uploading to FTP ($FTP_HOST)..."

# Target Paths
PATHS=( "/www" "/www/domains/duhohratky.cz" "/www/subdom/www" "/" )

for REMOTE_PATH in "${PATHS[@]}"; do
    echo "📂 Target: $REMOTE_PATH"
    
    # Create api directory if missing
    curl -s --ftp-ssl -k -u "$FTP_USER:$FTP_PASS" -Q "MKD $REMOTE_PATH/api" "ftp://$FTP_HOST/" > /dev/null 2>&1

    # Define files to upload (Root)
    for file in *.html *.js *.css *.php *.png *.ttf *.otf .htaccess robots.txt manifest.json sitemap.xml findme_*.txt debug_check.php path_finder.php; do
        if [ -f "$file" ]; then
            # SKIP content.js (it contains production data!)
            if [[ "$file" == "content.js" ]]; then
                echo "   Skipping content.js (Production Data Protection) 🛡️"
                continue
            fi
            
            if curl -s --ftp-ssl -k -u "$FTP_USER:$FTP_PASS" -T "$file" "ftp://$FTP_HOST$REMOTE_PATH/$file"; then
                echo "   ✅ $file uploaded"
            else
                echo "   ❌ ERROR: Failed to upload $file"
            fi
        fi
    done

    # Upload API files
    for file in api/*.php; do
        if [ -f "$file" ]; then
             # Remove api/ prefix for the remote path
             filename=$(basename "$file")
             if curl -s --ftp-ssl -k -u "$FTP_USER:$FTP_PASS" -T "$file" "ftp://$FTP_HOST$REMOTE_PATH/api/$filename"; then
                 echo "   ✅ $file uploaded"
             else
                 echo "   ❌ ERROR: Failed to upload $file"
             fi
        fi
    done
done

echo "✅ Deployment Complete! 🌍"
