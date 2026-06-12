import json
import re

# Read products_data.js and extract the JSON array
with open("/Users/MAC/Desktop/Nha Thuoc Hay/products_data.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract the JSON array
json_match = re.search(r"const MOCK_PRODUCTS = (\[.*\]);", content, re.DOTALL)
if json_match:
    products = json.loads(json_match.group(1))
    
    categories = {}
    for p in products:
        c1 = p.get("category1", "")
        c2 = p.get("category2", "")
        if c1 not in categories:
            categories[c1] = set()
        categories[c1].add(c2)
        
    print("Categories in mock products:")
    for c1, c2s in sorted(categories.items()):
        print(f"Cấp 1: {c1}")
        for c2 in sorted(c2s):
            print(f"  - Cấp 2: {c2}")
else:
    print("Could not find MOCK_PRODUCTS in file")
