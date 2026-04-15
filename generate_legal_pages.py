import os

TEMPLATE = """<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{TITLE} | Duhohratky</title>
    <meta name="theme-color" content="#FF6B9D">
    <link rel="icon" type="image/png" sizes="32x32" href="logo.png">
    <link rel="apple-touch-icon" sizes="180x180" href="logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="main.css?v=200">
    <style>
        .legal-page-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 3rem;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(255, 107, 157, 0.1);
        }
        .legal-page-content h1, .legal-page-content h2, .legal-page-content h3 {
            color: var(--color-primary);
            margin-bottom: 1.5rem;
            margin-top: 2rem;
        }
        .legal-page-content p {
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
    </style>
</head>
<body>
    <div class="bubbles-container" id="bubbles"></div>
    <header class="header" id="header">
        <nav class="nav container">
            <a href="index.html" class="logo">
                <img src="logo.png" alt="Duhohrátky" class="logo-image" width="50" height="50">
            </a>
            <ul class="nav-menu" id="nav-menu">
                <li><a href="index.html" class="nav-link">Domů</a></li>
                <li><a href="index.html#about" class="nav-link">O nás</a></li>
                <li><a href="index.html#activities" class="nav-link">Aktivity</a></li>
                <li><a href="gallery.html" class="nav-link">Galerie</a></li>
                <li><a href="index.html#reservation" class="nav-link nav-cta">Rezervace</a></li>
            </ul>
        </nav>
    </header>

    <section class="page-hero" style="padding-top: 8rem; min-height: 40vh; display: flex; align-items: center; justify-content: center;">
        <div class="container text-center">
            <h1 class="page-title">{TITLE}</h1>
        </div>
    </section>

    <section class="gallery-page" style="padding-top: 0;">
        <div class="container">
            <div class="legal-page-content glass-card" id="legal-content">
                Načítám obsah...
            </div>
        </div>
    </section>

    <script src="content.js?v=200"></script>
    <script src="main.js?v=200"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            let data = window.defaultContent || {};
            try {
                const localData = localStorage.getItem('duhohratky_content');
                if (localData) {
                    const parsed = JSON.parse(localData);
                    data = { ...data, ...parsed };
                }
            } catch (e) {}
            
            const legalContentHtml = (data.legal && data.legal['{KEY}']) ? data.legal['{KEY}'] : "<p>Text nebyl nalezen. Prosím, nastavte jej v administraci.</p>";
            document.getElementById('legal-content').innerHTML = legalContentHtml;
        });
    </script>
</body>
</html>
"""

pages = {
    "gdpr.html": {"TITLE": "Ochrana osobních údajů (GDPR)", "KEY": "gdpr"},
    "vop.html": {"TITLE": "Všeobecné obchodní podmínky (VOP)", "KEY": "vop"},
    "marketing.html": {"TITLE": "Marketingový souhlas", "KEY": "marketing"},
}

for filename, info in pages.items():
    content = TEMPLATE.replace("{TITLE}", info["TITLE"]).replace("{KEY}", info["KEY"])
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {filename}")
