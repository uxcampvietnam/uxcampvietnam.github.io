import csv

file_path = "/Users/MAC/Desktop/Nha Thuoc Hay/Master Data Nhà Thuốc Hay - Trang tính1.tsv"

categories = {}

with open(file_path, "r", encoding="utf-8") as f:
    reader = csv.reader(f, delimiter="\t")
    # Skip header
    header = next(reader)
    print("Header:", [h.strip() for h in header])
    
    for row in reader:
        if len(row) < 5:
            continue
        c1 = row[3].strip()
        c2 = row[4].strip()
        if not c1 or not c2:
            continue
        if c1 not in categories:
            categories[c1] = set()
        categories[c1].add(c2)

print("\n--- Categories found ---")
for c1, c2s in sorted(categories.items()):
    print(f"Cấp 1: {c1}")
    for c2 in sorted(c2s):
        print(f"  - Cấp 2: {c2}")
