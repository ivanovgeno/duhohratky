import json

with open("content.js", "r", encoding="utf-8") as f:
    text = f.read()
    
# text is formatted as: window.defaultContent = { ... };
prefix = "window.defaultContent = "
suffix = ";"

content_json = text[len(prefix):-len(suffix)]
data = json.loads(content_json)

data["gallery"] = []

new_text = prefix + json.dumps(data, indent=4, ensure_ascii=False) + suffix

with open("content.js", "w", encoding="utf-8") as f:
    f.write(new_text)
