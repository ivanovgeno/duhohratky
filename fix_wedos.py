import ftplib
import ssl
import sys

FTP_HOST = "391870.w70.wedos.net"
FTP_USER = "w391870"
FTP_PASS = "Duhohratky.2026"  # Původní heslo k hlavnímu účtu

DEFAULT_HTACCESS = """RewriteEngine On

# BEGIN WEDOS rozcestnik
RewriteCond %{REQUEST_URI} !^domains/
RewriteCond %{REQUEST_URI} !^/domains/
RewriteCond %{HTTP_HOST} ^(www\.)?(.*)$
RewriteCond %{DOCUMENT_ROOT}/domains/%2 -d
RewriteRule (.*) domains/%2/$1 [DPI]

RewriteCond %{REQUEST_URI} !^subdom/
RewriteCond %{REQUEST_URI} !^/subdom/
RewriteCond %{HTTP_HOST} ^(.*)\.([^\.]*)\.([^\.]*)$
RewriteCond %{DOCUMENT_ROOT}/subdom/%1 -d
RewriteRule (.*) subdom/%1/$1 [DPI]
# END WEDOS rozcestnik
"""

class FTP_TLS_Reuse(ftplib.FTP_TLS):
    def ntransfercmd(self, cmd, rest=None):
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        if self._prot_p:
            conn = self.context.wrap_socket(conn,
                                            server_hostname=self.host,
                                            session=self.sock.session)
        return conn, size

def fix_structure():
    print(f"Connecting to {FTP_HOST} as {FTP_USER} (hlavní účet WEDOS)...")
    try:
        ftp = FTP_TLS_Reuse(FTP_HOST, timeout=30)
        ftp.login(FTP_USER, FTP_PASS)
        ftp.prot_p()
        
        # Přejdeme do /www/
        try:
            ftp.cwd("/www")
            print("Successfully entered /www/ directory.")
        except Exception as e:
            print(f"Could not cwd to /www - either you are already there, or no permissions: {e}")

        # Vypíšeme seznam souborů
        print("\n--- Current files in root ---")
        items = ftp.nlst()
        for item in items:
            print(f" - {item}")

        # Varujeme, pokud je tam index.html
        if "index.html" in items:
            print("\n[!] UPOZORNĚNÍ: Nalezen 'index.html' v kořenovém adresáři /www/ !")
            print("[!] Tento soubor blokuje správné načítání ze složky domains/duhohratky.cz")
            # Pokud bys chtěl, můžeš to rovnou smazat (odkomentovat smazání):
            # ftp.delete("index.html")
            # print(" -> Smazal jsem překážející index.html v /www/")

        # Nahrajeme správný WEDOS rozcestník (htaccess)
        print("\n--- Generating & Uploading WEDOS default .htaccess ---")
        with open("temp_htaccess", "w", encoding="utf-8") as f:
            f.write(DEFAULT_HTACCESS)
            
        with open("temp_htaccess", "rb") as f:
            ftp.storbinary("STOR .htaccess", f)
        print(" -> Správný WEDOS '.htaccess' byl nahrán a aktivován!")

        import os
        os.remove("temp_htaccess")

        ftp.quit()
        print("\n[OK] Struktura na úrovni /www byla úspešně propojena. Otestuj stránku.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_structure()
