# Hướng Dẫn Tích Hợp Kệ Sách (Book Shelf Component)

Hệ thống kệ sách được thiết kế tối giản: File [book-shelf.js](script/book-shelf.js) **đã tự động cấu hình sẵn đường dẫn đến [books-data.json](script/books-data.json)**, do đó bạn không cần phải khai báo `data-source="script/books-data.json"` trong HTML nữa.

---

## 1. Cách Nhúng Siêu Ngắn Gọn (Chỉ Cần 1 Thẻ `<div>`)

Trong bất kỳ trang HTML nào, bạn chỉ cần:

```html
<!-- 1. Nhúng GSAP, CSS & Script Kệ Sách -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<link rel="stylesheet" href="style/book-shelf.css">
<script src="script/book-shelf.js"></script>

<!-- 2. Đặt thẻ div hiển thị kệ sách: -->

<!-- Load toàn bộ tất cả kệ sách: -->
<div class="book-shelf-gallery"></div>
```

---

## 2. Cấu Trúc Dữ Liệu Sách Chuẩn Hóa Theo Mô Hình Quan Hệ ([books-data.json](script/books-data.json))

Dữ liệu được chuẩn hóa tách biệt như cấu trúc bảng trong Database (bảng Kệ `shelves` và bảng Sách `books`):
- Kệ (`shelves`): Chỉ chứa thông tin của kệ và mảng ID các cuốn sách thuộc kệ (`book_ids`).
- Sách (`books`): Chứa toàn bộ thông tin chi tiết của từng cuốn sách.

```json
{
  "shelves": [
    {
      "id": "product-curriculum",
      "category": "Nội dung đào tạo",
      "book_ids": [
        "talent-insight",
        "fundamental-of-product-development",
        "descriptive-statistics-analysis"
      ]
    }
  ],
  "books": [
    {
      "id": "talent-insight",
      "title": "Product Talent & Insights",
      "topBadge": "α",
      "tags": "101",
      "description": "Đánh giá năng lực với 14 Skills Competency; định hướng phát triển nhân sự Product...",
      "height": 408,
      "spineImage": "asset/image/book-cover/talent-insight-spine.png",
      "coverImage": "asset/image/book-cover/talent-insight-cover.png",
      "meta": {
        "Module": "α / Talent Insight",
        "Author": "UXCamp Vietnam",
        "Stage": "Management",
        "Format": "HR Playbook",
        "Focus": "Skill Assessment, Career Path, Team Culture, 14 Skills Competency"
      }
    }
  ]
}
```

---

## 3. Cấu Trúc File Dự Án

```text
├── asset/image/book-cover/     # 54 file ảnh bìa (cover) & gáy sách (spine) cho 27 cuốn sách
├── style/
│   └── book-shelf.css          # Định dạng giao diện Design System & Dark/Light mode
├── script/
│   ├── books-data.json         # File JSON chứa toàn bộ 27 cuốn sách giáo trình
│   └── book-shelf.js           # Engine tự động nạp books-data.json & tạo tương tác 3D
├── book.html                   # Trang hiển thị / demo component
└── readme-book.md              # Tài liệu hướng dẫn tích hợp
```
