import json

with open("content.js", "r", encoding="utf-8") as f:
    text = f.read()

prefix = "window.defaultContent = "
suffix = ";"

content_json = text[len(prefix):-len(suffix)]
data = json.loads(content_json)

data["videos"] = {
    "title": "Videa z <span class=\"rainbow-text\">našich lekcí</span>",
    "subtitle": "Podívejte se na video ukázky z našich uplynulých témat",
    "v1": { "title": "Duhová laboratoř", "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    "v2": { "title": "Zatmění v písku", "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    "v3": { "title": "Vodní svět", "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
}

new_text = prefix + json.dumps(data, indent=4, ensure_ascii=False) + suffix

with open("content.js", "w", encoding="utf-8") as f:
    f.write(new_text)
