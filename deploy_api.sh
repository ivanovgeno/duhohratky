#!/bin/bash
# deploy_api.sh - Fast upload for API files only

FTP_HOST="391870.w70.wedos.net"
FTP_USER="w391870"
FTP_PASS="Duhohratky.124"
FTP_PATH="/www"

echo "🚀 Starting Fast API Deployment..."

# Upload API files
for file in api/*.php; do
    if [ -f "$file" ]; then
        echo "   Uploading $file to $FTP_PATH/api/..."
        curl -s --ftp-ssl -u "$FTP_USER:$FTP_PASS" -T "$file" "ftp://$FTP_HOST$FTP_PATH/api/"
        
        # Also upload to domains path just in case
        curl -s --ftp-ssl -u "$FTP_USER:$FTP_PASS" -T "$file" "ftp://$FTP_HOST$FTP_PATH/domains/duhohratky.cz/api/"
    fi
done

echo "✅ API Deployment Complete!"
