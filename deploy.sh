#!/bin/bash

# Configuration
FTP_HOST="391870.w70.wedos.net"
FTP_USER="w391870"
FTP_PASS="Duhohratky.124"
FTP_PATH="/www"
COMMIT_MSG="$1"

if [ -z "$COMMIT_MSG" ]; then
    echo "❌ Error: Missing commit message."
    echo "Usage: ./deploy.sh \"Commit message\""
    exit 1
fi

echo "🚀 Starting Deployment..."

# 1. GitHub Push
echo "📦 Pushing to GitHub..."
git add .
git commit -m "$COMMIT_MSG"
git push origin gh-pages

if [ $? -eq 0 ]; then
    echo "✅ GitHub Push Successful"
else
    echo "⚠️ GitHub Push Failed (check errors above)"
fi

# 2. FTP Upload
echo "📡 Uploading to FTP ($FTP_HOST)..."

# Target Paths
PATHS=( "/www" "/www/domains/duhohratky.cz" )

for REMOTE_PATH in "${PATHS[@]}"; do
    echo "📂 Target: $REMOTE_PATH"
    
    # Try to create directory (ignore error if exists)
    curl -s --ftp-ssl -u "$FTP_USER:$FTP_PASS" -Q "MKD $REMOTE_PATH" "ftp://$FTP_HOST/" > /dev/null 2>&1

    # Define files to upload (HTML, JS, CSS, PHP, Images, Fonts)
    for file in *.html *.js *.css *.php *.png *.ttf *.otf; do
        if [ -f "$file" ]; then
            echo "   Uploading $file to $REMOTE_PATH..."
            curl -s --ftp-ssl -u "$FTP_USER:$FTP_PASS" -T "$file" "ftp://$FTP_HOST$REMOTE_PATH/"
        fi
    done
done

echo "✅ Deployment Complete! 🌍"
