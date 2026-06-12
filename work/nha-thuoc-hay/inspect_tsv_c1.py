import csv

file_path = "/Users/MAC/Desktop/Nha Thuoc Hay/Master Data Nhà Thuốc Hay - Trang tính1.tsv"

c1_values = set()

with open(file_path, "r", encoding="utf-8") as f:
    reader = csv.reader(f, delimiter="\t")
    header = next(reader)
    for row in reader:
        if len(row) > 3:
            c1_values.add(row[3].strip())

print("Unique Level 1 categories in TSV:")
for v in sorted(c1_values):
    print("-", v)
