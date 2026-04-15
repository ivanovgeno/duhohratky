import os
import re

files_to_check = [
    "index.html", "galerie.html", "admin.html", "gdpr.html", 
    "marketing.html", "tips.html", "vop.html", "admin.js", "main.js", "quick_deploy.py"
]

for file_name in files_to_check:
    if os.path.exists(file_name):
        with open(file_name, "r", encoding="utf-8") as f:
            content = f.read()

        # Update HTML nav links
        content = content.replace('href="/gallery"', 'href="/galerie"')
        content = content.replace('href="gallery.html"', 'href="galerie.html"')
        
        # In quick_deploy.py
        content = content.replace('"gallery.html"', '"galerie.html"')
        
        with open(file_name, "w", encoding="utf-8") as f:
            f.write(content)

print("Renamed gallery -> galerie where needed.")
