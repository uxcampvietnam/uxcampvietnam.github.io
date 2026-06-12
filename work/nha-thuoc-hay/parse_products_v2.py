import csv
import json
import os

tsv_path = "/Users/MAC/Desktop/Nha Thuoc Hay/Master Data Nhà Thuốc Hay - Trang tính1.tsv"
output_path = "/Users/MAC/Desktop/Nha Thuoc Hay/products_data.js"

# Group raw Category 1 to Page Category mapping
page_map = {
    "Thuốc kê đơn": "Thuốc",
    "Thuốc Kê Đơn": "Thuốc",
    "Thuốc không kê đơn": "Thuốc",
    "Thuốc Không Kê Đơn": "Thuốc",
    "Thuốc đông dược": "Thuốc",
    "Thực phẩm chức năng": "Thực phẩm chức năng",
    "Thực Phẩm Chức Năng": "Thực phẩm chức năng",
    "Mỹ phẩm": "Dược mỹ phẩm",
    "Mỹ Phẩm": "Dược mỹ phẩm",
    "Hàng tiêu dùng": "Chăm sóc cá nhân & Thiết bị y tế",
    "Hàng Tiêu Dùng": "Chăm sóc cá nhân & Thiết bị y tế",
    "Trang thiết bị Y tế": "Chăm sóc cá nhân & Thiết bị y tế",
    "Trang Thiết Bị Y Tế": "Chăm sóc cá nhân & Thiết bị y tế",
    "Trang thiết bị y tế": "Chăm sóc cá nhân & Thiết bị y tế"
}

# Standardized casing map for Cấp 1
std_c1_map = {
    "Thuốc kê đơn": "Thuốc kê đơn",
    "Thuốc Kê Đơn": "Thuốc kê đơn",
    "Thuốc không kê đơn": "Thuốc không kê đơn",
    "Thuốc Không Kê Đơn": "Thuốc không kê đơn",
    "Thuốc đông dược": "Thuốc đông dược",
    "Thực phẩm chức năng": "Thực phẩm chức năng",
    "Thực Phẩm Chức Năng": "Thực phẩm chức năng",
    "Mỹ phẩm": "Mỹ phẩm",
    "Mỹ Phẩm": "Mỹ phẩm",
    "Hàng tiêu dùng": "Hàng tiêu dùng",
    "Hàng Tiêu Dùng": "Hàng tiêu dùng",
    "Trang thiết bị Y tế": "Trang thiết bị y tế",
    "Trang Thiết Bị Y Tế": "Trang thiết bị y tế",
    "Trang thiết bị y tế": "Trang thiết bị y tế"
}

category_tree = {} # page -> cap1 -> list(cap2)
products_pool = []

# To ensure a clean set of products, let's load all products first
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
            
        page_cat = page_map.get(cat1)
        if not page_cat:
            continue
            
        c1_std = std_c1_map.get(cat1, cat1)
        
        # Clean subcategory string
        c2_clean = cat2.strip()
        if c2_clean.lower() == "măt":
            c2_clean = "Mắt"
        if c2_clean.lower() == "mất":
            c2_clean = "Mắt"
        if c2_clean.lower() == "nói tiết và sinh lý":
            c2_clean = "Nội tiết và Sinh lý"
        if c2_clean.lower() == "thần kinh,não":
            c2_clean = "Thần kinh"
        if c2_clean.lower() == "tiêu hóa gan mật":
            c2_clean = "Tiêu hóa Gan Mật"
        if c2_clean == "da liễu":
            c2_clean = "Da liễu"
        if c2_clean == "c":
            c2_clean = "Chăm sóc cá nhân"
            
        # Build category tree
        if page_cat not in category_tree:
            category_tree[page_cat] = {}
        if c1_std not in category_tree[page_cat]:
            category_tree[page_cat][c1_std] = set()
        category_tree[page_cat][c1_std].add(c2_clean)
        
        products_pool.append({
            "name": name,
            "specification": spec,
            "page_category": page_cat,
            "category1": c1_std,
            "category2": c2_clean,
            "registration_num": reg_num,
            "is_prescription": "kê đơn" in cat1.lower()
        })

# Let's filter products to select a representative list (about 25-30 per page category)
selected_products = []
products_by_page = {
    "Thuốc": [],
    "Thực phẩm chức năng": [],
    "Dược mỹ phẩm": [],
    "Chăm sóc cá nhân & Thiết bị y tế": []
}

# We want to distribute selected products across various category1 and category2 pairs
for p in products_pool:
    page_cat = p["page_category"]
    
    # Allow more products to ensure we cover subcategories
    if len(products_by_page[page_cat]) < 30:
        price = 35000 + (hash(p["name"]) % 25) * 12000
        original_price = price + 25000 if hash(p["name"]) % 3 == 0 else price
        description = f"Sản phẩm {p['name']} được sản xuất theo quy cách {p['specification']}, đạt tiêu chuẩn chất lượng và được cấp số đăng ký {p['registration_num']}. Hỗ trợ chăm sóc và nâng cao sức khỏe hiệu quả."
        
        item = {
            "id": len(selected_products) + 1,
            "name": p["name"],
            "specification": p["specification"],
            "page_category": p["page_category"],
            "category1": p["category1"],
            "category2": p["category2"],
            "registration_num": p["registration_num"],
            "price": price,
            "original_price": original_price,
            "description": description,
            "in_stock": (hash(p["name"]) % 7 != 0),
            "rating": round(4.2 + (hash(p["name"]) % 9) / 10.0, 1),
            "sold_count": 15 + (hash(p["name"]) % 350),
            "is_prescription": p["is_prescription"]
        }
        products_by_page[page_cat].append(item)
        selected_products.append(item)

# Convert sets to sorted lists in category_tree
json_tree = {}
for p_cat, cap1s in category_tree.items():
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
