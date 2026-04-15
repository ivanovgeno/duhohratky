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
    print("Files in dir:")
    for f in ftp.nlst():
        print(f)
        
    # Read .htaccess
    print("\n\n--- .htaccess ---")
    lines = []
    ftp.retrlines('RETR .htaccess', lines.append)
    print('\n'.join(lines))
    
    ftp.quit()
except Exception as e:
    print(f"Error: {e}")
