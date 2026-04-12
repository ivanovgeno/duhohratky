import ftplib
import os
import sys

# Configuration
FTP_HOST = "46.28.106.57" # Using IP provided by user
FTP_USER = "w391870"
FTP_PASS = "Duhohratky.124"
REMOTE_PATHS = ["/", "/www", "/www/domains/duhohratky.cz", "/www/subdom/www"]

def deploy_file(local_path, remote_dir):
    filename = os.path.basename(local_path)
    try:
        print(f"Connecting to {FTP_HOST}...")
        ftp = ftplib.FTP(FTP_HOST, timeout=30)
        ftp.login(FTP_USER, FTP_PASS)
        
        print(f"Targeting directory: {remote_dir}")
        try:
            ftp.cwd(remote_dir)
        except Exception as e:
            print(f"Could not CWD to {remote_dir}: {e}")
            return False

        with open(local_path, "rb") as f:
            print(f"Uploading {filename}...")
            ftp.storbinary(f"STOR {filename}", f)
            print("Upload Successful!")
        
        ftp.quit()
        return True
    except Exception as e:
        print(f"Error deploying to {remote_dir}: {e}")
        return False

if __name__ == "__main__":
    local_target = "api/findme_api.txt"
    if not os.path.exists(local_target):
        print(f"Error: {local_target} not found")
        sys.exit(1)
        
    for path in REMOTE_PATHS:
        # For API folder, we append /api
        target_dir = os.path.join(path, "api").replace("\\", "/")
        print(f"\n--- Trying Path: {target_dir} ---")
        deploy_file(local_target, target_dir)
