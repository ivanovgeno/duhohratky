#!/bin/bash

# Configuration
FTP_HOST="46.28.106.57"
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
PATHS=( "/" "/www" "/www/domains/duhohratky.cz" "/www/subdom/www" )

for REMOTE_PATH in "${PATHS[@]}"; do
    echo "📂 Target: $REMOTE_PATH"
    
    # Create gallery directory (and set permissions if possible)
    curl -s --ftp-ssl -u "$FTP_USER:$FTP_PASS" -Q "MKD $REMOTE_PATH/gallery" "ftp://$FTP_HOST/" > /dev/null 2>&1
    curl -s --ftp-ssl -u "$FTP_USER:$FTP_PASS" -Q "SITE CHMOD 755 $REMOTE_PATH/gallery" "ftp://$FTP_HOST/" > /dev/null 2>&1

    # Create api directory
    curl -s --ftp-ssl -u "$FTP_USER:$FTP_PASS" -Q "MKD $REMOTE_PATH/api" "ftp://$FTP_HOST/" > /dev/null 2>&1

    # Define files to upload (Root)
    for file in *.html *.js *.css *.php *.png *.ttf *.otf .htaccess robots.txt manifest.json sitemap.xml findme_*.txt debug_check.php; do
        if [ -f "$file" ]; then
            # SKIP content.js (it contains production data!)
            if [[ "$file" == "content.js" ]]; then
                echo "   Skipping $file (Production Data Protection) 🛡️"
                continue
            fi
            
            echo "   Uploading $file to $REMOTE_PATH..."
            curl -s --ftp-ssl -u "$FTP_USER:$FTP_PASS" -T "$file" "ftp://$FTP_HOST$REMOTE_PATH/"
        fi
    done

    # Upload API files
    for file in api/*.php; do
        if [ -f "$file" ]; then
            echo "   Uploading $file to $REMOTE_PATH/api/..."
            curl -s --ftp-ssl -u "$FTP_USER:$FTP_PASS" -T "$file" "ftp://$FTP_HOST$REMOTE_PATH/api/"
        fi
    done
done

echo "✅ Deployment Complete! 🌍"
