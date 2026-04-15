import ftplib
import ssl

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

try:
    ftp = FTP_TLS_Reuse(FTP_HOST, timeout=30)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.prot_p()
    
    # Navigate
    items = ftp.nlst()
    if "domains" in items:
        ftp.cwd("domains")
        if "duhohratky.cz" in ftp.nlst():
            ftp.cwd("duhohratky.cz")
    elif "www" in items:
        ftp.cwd("www/domains/duhohratky.cz")
        
    print(f"Current dir: {ftp.pwd()}")
    
    # Try deleting 'gallery' dir
    try:
        ftp.rmd("gallery")
        print("Deleted 'gallery' directory.")
    except Exception as e:
        print(f"Could not delete 'gallery' dir (maybe not empty or doesn't exist?): {e}")
        try:
            # Maybe there are files inside?
            sub_items = ftp.nlst("gallery")
            if sub_items:
                for f in sub_items:
                    ftp.delete(f)
                ftp.rmd("gallery")
                print("Deleted files inside then deleted 'gallery'.")
        except Exception as e2:
            pass

    # Re-upload upload.php and delete.php
    with open("upload.php", "rb") as f:
        ftp.storbinary("STOR upload.php", f)
        print("Uploaded upload.php")
    with open("delete.php", "rb") as f:
        ftp.storbinary("STOR delete.php", f)
        print("Uploaded delete.php")
        
    # Also create uploads folder just in case
    try:
        ftp.mkd("uploads")
        print("Created 'uploads' directory.")
    except:
        pass
        
    ftp.quit()
    print("Done FTP fix.")
except Exception as e:
    print(f"Error: {e}")
