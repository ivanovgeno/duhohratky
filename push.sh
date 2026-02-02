#!/bin/bash
# Skript pro rychlé nahrání změn na GitHub
# Použití: ./push.sh "Popis změny"

# Pokud není zadán popis, použij výchozí
MESSAGE="${1:-Aktualizace webu}"

# Přidej všechny změny
git add .

# Vytvoř commit
git commit -m "$MESSAGE"

# Nahraj na GitHub
git push

echo ""
echo "✅ Změny byly nahrány na GitHub!"
echo "🔗 https://github.com/ivanovgeno/duhohratky"
