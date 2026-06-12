import csv
import json
import collections

tsv_path = "/Users/MAC/Desktop/Nha Thuoc Hay/Master Data Nhà Thuốc Hay - Trang tính1.tsv"
output_path = "/Users/MAC/Desktop/Nha Thuoc Hay/products_data.js"

# Page Category mapping for the 11 Level 1 categories
page_map = {
    "Dị ứng và Miễn dịch": "Thuốc",
    "Hàng thiết bị y tế": "Chăm sóc cá nhân & Thiết bị y tế",
    "Hàng tiêu dùng": "Chăm sóc cá nhân & Thiết bị y tế",
    "Kháng Virus": "Thuốc",
    "Mỹ phẩm": "Dược mỹ phẩm",
    "Thiết bị y tế": "Chăm sóc cá nhân & Thiết bị y tế",
    "Thuốc đông dược": "Thuốc",
    "Thuốc kê đơn": "Thuốc",
    "Thuốc không kê đơn": "Thuốc",
    "Thực phẩm chức năng": "Thực phẩm chức năng",
    "Trang thiết bị Y tế": "Chăm sóc cá nhân & Thiết bị y tế"
}

# Normalizer mapping for Level 1 categories
c1_normalizer = {
    "dị ứng và miễn dịch": "Dị ứng và Miễn dịch",
    "dị ứng và miễn dịch": "Dị ứng và Miễn dịch",
    "hàng thiết bị y tế": "Hàng thiết bị y tế",
    "hàng tiêu dùng": "Hàng tiêu dùng",
    "kháng virus": "Kháng Virus",
    "mỹ phẩm": "Mỹ phẩm",
    "thiết bị y tế": "Thiết bị y tế",
    "thuốc đông dược": "Thuốc đông dược",
    "thuốc kê đơn": "Thuốc kê đơn",
    "thuốc không kê đơn": "Thuốc không kê đơn",
    "thực phẩm chức năng": "Thực phẩm chức năng",
    "trang thiết bị y tế": "Trang thiết bị Y tế"
}

# Level 2 cleaning/normalization
def clean_c2(c2):
    c2 = c2.strip()
    c2_lower = c2.lower()
    if c2_lower in ["măt", "mất"]:
        return "Mắt"
    if c2_lower == "nói tiết và sinh lý":
        return "Nội tiết và Sinh lý"
    if c2_lower == "thần kinh,não":
        return "Thần kinh"
    if c2_lower == "tiêu hóa gan mật":
        return "Tiêu hóa Gan Mật"
    if c2_lower == "da liễu":
        return "Da liễu"
    if c2_lower == "c":
        return "Chăm sóc cá nhân"
    
    # Capitalize first letter of each word for clean look
    words = c2.split()
    if len(words) > 0:
        words[0] = words[0].capitalize()
    return " ".join(words)

categories_tree = {} # page -> cap1 -> list(cap2)
products_by_pair = collections.defaultdict(list)

# Read all rows from TSV
with open(tsv_path, "r", encoding="utf-8") as f:
    reader = csv.reader(f, delimiter="\t")
    header = next(reader)
    
    for row in reader:
        if len(row) < 5:
            continue
        stt, name, spec, cat1, cat2 = row[0].strip(), row[1].strip(), row[2].strip(), row[3].strip(), row[4].strip()
        reg_num = row[5].strip() if len(row) > 5 else ""
        if not cat1 or not cat2:
            continue
            
        cat1_lower = cat1.lower()
        c1_std = c1_normalizer.get(cat1_lower)
        if not c1_std:
            # Handle other casing
            for k, v in c1_normalizer.items():
                if k in cat1_lower:
                    c1_std = v
                    break
            if not c1_std:
                continue
                
        page_cat = page_map[c1_std]
        c2_clean = clean_c2(cat2)
        
        # Build tree representation
        if page_cat not in categories_tree:
            categories_tree[page_cat] = {}
        if c1_std not in categories_tree[page_cat]:
            categories_tree[page_cat][c1_std] = set()
        categories_tree[page_cat][c1_std].add(c2_clean)
        
        products_by_pair[(page_cat, c1_std, c2_clean)].append({
            "name": name,
            "specification": spec,
            "registration_num": reg_num,
            "is_prescription": "kê đơn" in cat1_lower
        })

# Let's select products from each (page_category, category1, category2) key
# We will pick 1 product from each pair, and up to 2-3 products for common pairs
selected_products = []
products_count_by_page = collections.defaultdict(int)

# First pass: ensure at least one product per pair
for (page_cat, c1, c2), prods in sorted(products_by_pair.items()):
    # Pick the first product
    p = prods[0]
    
    price = 35000 + (hash(p["name"]) % 25) * 12000
    original_price = price + 25000 if hash(p["name"]) % 3 == 0 else price
    description = f"Sản phẩm {p['name']} được sản xuất theo quy cách {p['specification']}, đạt tiêu chuẩn chất lượng và được cấp số đăng ký {p['registration_num']}. Hỗ trợ chăm sóc và nâng cao sức khỏe hiệu quả."
    
    item = {
        "id": len(selected_products) + 1,
        "name": p["name"],
        "specification": p["specification"],
        "page_category": page_cat,
        "category1": c1,
        "category2": c2,
        "registration_num": p["registration_num"],
        "price": price,
        "original_price": original_price,
        "description": description,
        "in_stock": (hash(p["name"]) % 7 != 0),
        "rating": round(4.2 + (hash(p["name"]) % 9) / 10.0, 1),
        "sold_count": 15 + (hash(p["name"]) % 350),
        "is_prescription": p["is_prescription"]
    }
    selected_products.append(item)
    products_count_by_page[page_cat] += 1

# Second pass: add more products to common categories if total count is low (max 180 total)
for (page_cat, c1, c2), prods in sorted(products_by_pair.items()):
    if len(selected_products) >= 180:
        break
    if len(prods) > 1:
        # Add a second product for this pair
        p = prods[1]
        
        price = 35000 + (hash(p["name"]) % 25) * 12000
        original_price = price + 25000 if hash(p["name"]) % 3 == 0 else price
        description = f"Sản phẩm {p['name']} được sản xuất theo quy cách {p['specification']}, đạt tiêu chuẩn chất lượng và được cấp số đăng ký {p['registration_num']}. Hỗ trợ chăm sóc và nâng cao sức khỏe hiệu quả."
        
        item = {
            "id": len(selected_products) + 1,
            "name": p["name"],
            "specification": p["specification"],
            "page_category": page_cat,
            "category1": c1,
            "category2": c2,
            "registration_num": p["registration_num"],
            "price": price,
            "original_price": original_price,
            "description": description,
            "in_stock": (hash(p["name"]) % 7 != 0),
            "rating": round(4.2 + (hash(p["name"]) % 9) / 10.0, 1),
            "sold_count": 15 + (hash(p["name"]) % 350),
            "is_prescription": p["is_prescription"]
        }
        selected_products.append(item)
        products_count_by_page[page_cat] += 1

# Convert sets to sorted lists in category_tree
json_tree = {}
for p_cat, cap1s in categories_tree.items():
    json_tree[p_cat] = {}
    for c1, c2s in cap1s.items():
        json_tree[p_cat][c1] = sorted(list(c2s))

# Save output
with open(output_path, "w", encoding="utf-8") as f:
    f.write("// Complete Category Tree extracted from Master Data\n")
    f.write("const CATEGORIES_TREE = ")
    json.dump(json_tree, f, ensure_ascii=False, indent=2)
    f.write(";\n\n")
    f.write("// Mock product data preserving original classifications\n")
    f.write("const MOCK_PRODUCTS = ")
    json.dump(selected_products, f, ensure_ascii=False, indent=2)
    f.write(";\n")

print(f"Categories Tree written for pages: {list(json_tree.keys())}")
print(f"Total products selected: {len(selected_products)}")
for k, v in products_count_by_page.items():
    print(f"  - {k}: {v} products")
