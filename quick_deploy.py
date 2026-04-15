import ftplib
import ssl
import os
import sys

FTP_HOST = "391870.w70.wedos.net"
FTP_USER = "w391870_antigravity"
FTP_PASS = "Duhohratky.2026"

class FTP_TLS_Reuse(ftplib.FTP_TLS):
    def ntransfercmd(self, cmd, rest=None):
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        if self._prot_p:
            conn = self.context.wrap_socket(conn,
                                            server_hostname=self.host,
                                            session=self.sock.session)
        return conn, size

def deploy():
    files = [
        "index.html", "main.js", "admin.html", "admin.css", "main.css", 
        "admin.js", "galerie.html", "gdpr.html", "vop.html", "marketing.html",
        "logo.png", "tips.html", ".htaccess", "api/contact.php"
    ]
    print(f"Connecting to {FTP_HOST} as {FTP_USER}...")
    try:
        ftp = FTP_TLS_Reuse(FTP_HOST, timeout=30)
        ftp.login(FTP_USER, FTP_PASS)
        ftp.prot_p()
        
        pwd = ftp.pwd()
        print(f"[DEBUG] Logged in successfully. Current directory: {pwd}")
        
        items = ftp.nlst()
        print(f"[DEBUG] Contents of current directory: {items}")
        
        # Smat routing logic based on Wedos folder structure
        target_path = ""
        if "domains" in items:
            print("[DEBUG] Found 'domains' folder. Entering domains/duhohratky.cz ...")
            ftp.cwd("domains")
            if "duhohratky.cz" in ftp.nlst():
                ftp.cwd("duhohratky.cz")
            target_path = ftp.pwd()
        elif "www" in items:
            print("[DEBUG] Found 'www' folder. Entering www/domains/duhohratky.cz ...")
            ftp.cwd("www/domains/duhohratky.cz")
            target_path = ftp.pwd()
        else:
            print("[DEBUG] Assumed we are directly in the target directory (chrooted).")
            target_path = pwd
            
        print(f"[DEBUG] Ready to upload to: {target_path}")
        
        for f_name in files:
            if os.path.exists(f_name):
                with open(f_name, "rb") as f:
                    print(f"Uploading {f_name}...")
                    ftp.storbinary(f"STOR {f_name}", f)
            else:
                print(f"Skipping {f_name} - local file not found.")

        print("\n--- Current files on server after upload ---")
        for i in ftp.nlst():
            print(f" - {i}")

        ftp.quit()
        print("\n[SUCCESS] Skript byl dokoncen! Please check the output.")
    except Exception as e:
        print(f"Error: {e}")

deploy()
