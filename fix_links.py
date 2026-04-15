import os
import re

files_to_fix = [
    "index.html", "gallery.html", "gdpr.html", "vop.html", "marketing.html", "tips.html", "admin.html"
]

for file_name in files_to_fix:
    if not os.path.exists(file_name):
        continue
    with open(file_name, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace index.html#something -> /#something
    content = re.sub(r'href="index\.html#([^"]*)"', r'href="/#\1"', content)
    # 2. Replace index.html -> /
    content = re.sub(r'href="index\.html"', r'href="/"', content)
    # 3. Replace xyz.html -> /xyz
    content = re.sub(r'href="(gallery|tips|gdpr|vop|marketing|admin)\.html"', r'href="/\1"', content)
    # 4. Fix window.location.href='gdpr.html'
    content = re.sub(r"window\.location\.href='([^']+)\.html'", r"window.location.href='/\1'", content)

    with open(file_name, 'w', encoding='utf-8') as f:
        f.write(content)

print("Links fixed in HTML files.")
