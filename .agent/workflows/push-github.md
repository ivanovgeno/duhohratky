---
description: Po každé změně nahrát (push) změny na GitHub
---

# Push na GitHub

Po dokončení jakékoliv změny v kódu, vždy proved následující kroky:

// turbo-all

1. Přidej všechny změněné soubory do stage:
```bash
git add -A
```

2. Vytvoř commit s popisem změny (použij výstižný popis v češtině):
```bash
git commit -m "Popis změny"
```

3. Push změny na GitHub:
```bash
git push origin main
```

## Poznámky
- Remote je nastaven na: `https://github.com/ivanovgeno/duhohratky`
- Branch je `main`
- Tento workflow spustit automaticky po každé změně v projektu
