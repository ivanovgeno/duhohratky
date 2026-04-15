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
    
    items = ftp.nlst()
    if "domains" in items:
        ftp.cwd("domains/duhohratky.cz")
    elif "www" in items:
        ftp.cwd("www/domains/duhohratky.cz")
        
    print(f"Current dir: {ftp.pwd()}")
    
    print("\n--- Files in uploads/ ---")
    try:
        uploads = ftp.nlst("uploads")
        for u in uploads:
            print(u)
    except Exception as e:
        print("Failed to list uploads:", e)
        
    print("\n--- Last lines of content.js ---")
    try:
        lines = []
        ftp.retrlines('RETR content.js', lines.append)
        for line in lines[-20:]:  # Last 20 lines to see if gallery is there (wait, gallery is usually near the top)
            pass
        # Let's search for "gallery" in lines
        import json
        text = "\n".join(lines)
        if text.startswith("window.defaultContent"):
            # strip "window.defaultContent = " and ";"
            json_str = text[24:-1]
            try:
                data = json.loads(json_str)
                print(f"Gallery items in content.js: {len(data.get('gallery', []))}")
                if len(data.get('gallery', [])) > 0:
                    print(f"Sample item: {data['gallery'][-1]}")
            except Exception as jse:
                print("JSON Parse error:", jse)
    except Exception as e:
        print("Failed to read content.js:", e)
        
    ftp.quit()
    print("Done")
except Exception as e:
    print(f"Error: {e}")
