# UI Design System & AI Development Skill Guide
> **Dự án**: `uxcampvietnam.github.io`  
> **Tài liệu nguồn chuẩn hóa**: [`style/definition.css`](style/definition.css), [`style/style.css`](style/style.css), [`design-system.html`](design-system.html)  
> **Mục đích**: Bản hướng dẫn kỹ thuật toàn diện (AI Skill Guide) dành cho AI (và Lập trình viên) khi thiết kế, sinh mã (generate), chỉnh sửa hoặc mở rộng bất kỳ thành phần UI, trang web, công cụ (tool) hay layout mới nào trong hệ sinh thái UXCamp Vietnam.

---

## 📑 MỤC LỤC
1. [Triết Lý Thiết Kế & Nguyên Tắc Cốt Lõi](#1-triết-lý-thiết-kế--nguyên-tắc-cốt-lõi)
2. [Hệ Thống Typography (Phông Chữ & Phân Cấp Văn Bản)](#2-hệ-thống-typography-phông-chữ--phân-cấp-văn-bản)
3. [Hệ Thống Màu Sắc & Tokens (Light/Dark Mode)](#3-hệ-thống-màu-sắc--tokens-lightdark-mode)
4. [Thang Đo Khoảng Cách (Spacing), Bo Góc (Radius) & Hiệu Ứng](#4-thang-đo-khoảng-cách-spacing-bo-góc-radius--hiệu-ứng)
5. [Thư Viện Thành Phần UI Chuẩn Hóa (Component Directory)](#5-thư-viện-thành-phần-ui-chuẩn-hóa-component-directory)
   - 5.1 [Nút Bấm & Actions (Buttons)](#51-nút-bấm--actions-buttons)
   - 5.2 [Tabs vs. Segmented Controls vs. Chips](#52-tabs-vs-segmented-controls-vs-chips)
   - 5.3 [Form Controls, Search & Inputs](#53-form-controls-search--inputs)
   - 5.4 [Cards & Surface Containers](#54-cards--surface-containers)
   - 5.5 [Badges, Role Pills & Status Indicators](#55-badges-role-pills--status-indicators)
   - 5.6 [Accordions & Collapsible Panels](#56-accordions--collapsible-panels)
   - 5.7 [Alerts, Callouts & Toast Notifications](#57-alerts-callouts--toast-notifications)
   - 5.8 [Modals & Dialogs](#58-modals--dialogs)
   - 5.9 [Skeleton Shimmer Loading](#59-skeleton-shimmer-loading)
   - 5.10 [Bộ UI Thống Kê & Tính Toán (.stat-*)](#510-bộ-ui-thống-kê--tính-toán-stat-)
6. [Cấu Trúc Layout Toàn Cục (Layout Architecture & Shell)](#6-cấu-trúc-layout-toàn-cục-layout-architecture--shell)
7. [Quy Tắc Vàng Khi Viết & Chỉnh Sửa Code (AI Directives)](#7-quy-tắc-vàng-khi-viết--chỉnh-sửa-code-ai-directives)
8. [Mẫu HTML Hoàn Chỉnh (Ready-to-Use Templates)](#8-mẫu-html-hoàn-chỉnh-ready-to-use-templates)

---

## 1. Triết Lý Thiết Kế & Nguyên Tắc Cốt Lõi

Hệ thống thiết kế UXCamp Vietnam mang phong cách **Tối giản (Minimalist)**, **Học thuật & Thực tế**, **High-Contrast Typography-driven**, kết hợp hiệu ứng kính mờ tinh tế (**Glassmorphism**) và bo góc dạng **Squircle** mềm mại.

### 4 Nguyên Tắc Bất Di Bất Dịch:
1. **100% Token-Driven**: Mọi thuộc tính màu sắc, font chữ, khoảng cách (spacing), bo góc (radius) **phải** sử dụng biến CSS (`var(--...)`) hoặc các class tiện ích định sẵn trong [`style/definition.css`](style/definition.css). Tuyệt đối **không** hardcode mã màu HEX/RGB trực tiếp trong CSS inline hoặc component stylesheet riêng.
2. **Auto Adaptive Dark/Light Mode**: Màu sắc luôn phải tự chuyển đổi mượt mà qua media query `@media (prefers-color-scheme: dark)` hoặc thuộc tính `html[data-theme="dark"]`. Không dùng màu cố định gây cháy nền khi đổi theme.
3. **Weight Cap 500 (No Heavy Bold)**: Độ đậm chữ cao nhất trong toàn bộ hệ thống là `500` (`.bold`, `b`, `strong`). Hệ thống chuộng tính thanh thoát, sắc nét; không sử dụng `font-weight: 700` hay `900`.
4. **Squircle & Negative Space**: Tất cả phần tử tuân theo `corner-shape: squircle`. Khoảng trống (negative space) được điều tiết có tổ chức qua hệ thống lưới spacing 4pt/8pt.

---

## 2. Hệ Thống Typography (Phông Chữ & Phân Cấp Văn Bản)

UXCamp Vietnam sử dụng 3 họ phông chữ Google Fonts chính:
1. **`Work Sans`** (`var(--font-sans-family)`): Sans-serif hiện đại, rõ nét. Là phông chữ **mặc định** cho toàn bộ UI, văn bản thông thường, form controls, nút bấm, bảng dữ liệu, và cards.
2. **`Crimson Pro`** (`var(--font-serif-family)`): Serif học thuật, tinh tế. Dùng cho tiêu đề mang tính cảm xúc, editorial, case study headings, quotes hoặc các trang giới thiệu (About, Khóa học).
3. **`Chivo Mono`** (`var(--font-mono)`, `var(--font-mono-family)`): Monospace kỹ thuật số. Dùng cho công cụ thống kê (Applied Analytics), hiển thị mã định danh (`.badge-id`), chỉ số dữ liệu, bảng tính toán.

### 2.1 Bảng Phân Cấp Typography Chuẩn (Sans-serif & Serif)

> **Lưu ý**: Tất cả thẻ heading (`h1`-`h6`), `p`, `span` mặc định đã được reset `margin-top: 0; margin-bottom: 0;`. Khoảng cách phải được kiểm soát bằng Flexbox/Grid `gap` hoặc utility spacing.

| Tên Cấp Bậc | Class Sans-serif | Class Serif | Kích Thước Mobile (<768px) | Kích Thước Tablet (≥768px) | Kích Thước Desktop (≥1200px) | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **XL Title** | `.font-sans-xl-title` | `.font-serif-xl-title`, `.xl-title` | `40px` | `60px` | `72px` | `105% - 120%` |
| **Page Title** | `.font-sans-title` | `.font-serif-title`, `.title` | `32px` | `42px` - `48px` | `48px` - `60px` | `110% - 125%` |
| **Heading 1** | `.font-sans-h1`, `h1`, `.h1` | `.font-serif-h1` | `28px` | `37px` - `42px` | `42px` - `48px` | `115% - 128%` |
| **Heading 2** | `.font-sans-h2`, `h2`, `.h2` | `.font-serif-h2` | `24px` | `32px` - `36px` | `36px` - `42px` | `120% - 133%` |
| **Heading 3** | `.font-sans-h3`, `h3`, `.h3` | `.font-serif-h3` | `22px` | `26px` - `30px` | `30px` - `36px` | `125% - 138%` |
| **Heading 4** | `.font-sans-h4`, `h4`, `.h4` | `.font-serif-h4` | `20px` | `23px` - `26px` | `26px` - `30px` | `126% - 135%` |
| **Heading 5** | `.font-sans-h5`, `h5`, `.h5` | `.font-serif-h5` | `18px` | `17px` - `20px` | `20px` - `24px` | `135% - 145%` |
| **Heading 6** | `.font-sans-h6`, `h6`, `.h6` | `.font-serif-h6` | `16px` | `16px` - `18px` | `18px` - `20px` | `135% - 150%` |
| **Paragraph (Body)** | `.font-sans-paragraph`, `.paragraph`, `p`, `li`, `td`, `th` | `.font-serif-paragraph` | `15px` | `16px` | `16px` | `24px` (150%) |
| **Caption** | `.font-sans-caption`, `.caption` | `.font-serif-caption` | `14px` | `14px` | `14px` | `20px` - `22px` |
| **Small** | `.font-sans-small`, `.small` | `.font-serif-small`, `.small` | `12px` | `12px` | `12px` | `18px` - `19px` |
| **Extra Small**| `.font-sans-x-small`, `.x-small` | `.font-serif-x-small`, `.x-small` | `11px` | `10px` | `10px` | `18px` |

### 2.2 Monospace Typography (Chivo Mono)
Dành riêng cho bảng biểu, mã số, công cụ tính toán:
* `.mono-h1`: 48px | Line-height: 120%
* `.mono-h2`: 38px | Line-height: 120%
* `.mono-h3`: 30px | Line-height: 150%
* `.mono-h4`: 24px | Line-height: 150%
* `.mono-h5`: 20px | Line-height: 150%
* `.mono-body`: 14px (Mobile) / 16px (Tablet) / 17px (Desktop)
* `.mono-caption`: 14px
* `.mono-small`: 12px

### 2.3 Modifier Classes Cho Chữ
* `.bold`: `font-weight: 500;` *(Lưu ý: Mức đậm chuẩn là 500)*
* `.medium`: `font-weight: 450 !important;`
* `.extralight`: `font-weight: 200 !important;`
* `.italic`: `font-style: italic;`
* `.underline`: `text-decoration: underline;`

---

## 3. Hệ Thống Màu Sắc & Tokens (Light/Dark Mode)

Tất cả màu sắc được cấu trúc theo hệ thống biến đa tầng trong `:root` (Light Mode) và `@media (prefers-color-scheme: dark)` / `html[data-theme="dark"]` (Dark Mode).

### 3.1 Nền & Bề Mặt (Background & Surfaces)
| Tên Biến | Light Mode | Dark Mode | Mục Đích Sử Dụng |
| :--- | :--- | :--- | :--- |
| `--body-background` | `#F9F6F1` | `#000000` | Màu nền chính toàn trang (HTML/Body) |
| `--body-background-elevate-1` | `#FCFAF8` | `#0D0D0D` | Nền Card cấp 1, Sidebar, Surface mờ |
| `--body-background-elevate-2` | `#FFFFFF` | `#1A1A1A` | Nền Card cấp 2, Modal, Track lõm |
| `--main-colors-background-b100` | `#ffffff` | `#000000` | Nền tương phản cao nhất |
| `--main-colors-background-b-200-slide-bg` | `#F9F6F1` | `#010409` | Nền slide / Drawer Mobile menu |
| `--main-colors-background-b-300-main` | `#F5EADB` | `#020a18` | Nền khối nhấn chính (Secondary button) |
| `--transparent-background-elevate-blur`| `rgba(244, 237, 228, 0.6)` | `rgba(1, 4, 9, 0.2)` | Nền kính mờ (Backdrop filter) |

### 3.2 Màu Chữ & Tiêu Điểm (Foreground & Text)
| Tên Biến | Light Mode | Dark Mode | Mục Đích Sử Dụng |
| :--- | :--- | :--- | :--- |
| `--main-colors-foreground-f100` | `#000000` | `#ffffff` | Tiêu đề chính, Text Active, Tương phản cực đại |
| `--main-colors-foreground-f300` | `#02112c` | `#f1eef1` | Tiêu đề H2-H4, Nhãn nhấn mạnh |
| `--main-colors-foreground-f-500-main`| `#373d48` | `#c9c4ca` | **Màu chữ chuẩn (Body text)** |
| `--main-colors-foreground-f700` | `#706e6f` | `#85808e` | Chữ phụ (Muted text), Placeholder, Icon phụ |
| `--main-colors-foreground-f800` | `#8f8985` | `#636270` | Tiêu đề cột Footer, Label chú thích mờ |

### 3.3 Đường Viền (Strokes & Borders)
* `--console-stroke`: `rgb(200, 200, 200)` *(Light)* / `hsl(0, 0%, 24%)` *(Dark)* — **Đường viền chuẩn 0.5px** cho hầu hết Card, Input, Modal, Tab line.
* `--transparent-foreground-main-color-10` đến `40`: Thang viền trong suốt theo độ tương phản.

### 3.4 Màu Điểm Nhấn (Highlight Colors)
* `--highlight-blue`: `#1c70ee` (Light) / `#2e7aed` (Dark) — Liên kết chính, Focus outline, Accent.
* `--highlight-green`: `#01b313` (Light) / `#50C633` (Dark) — Trạng thái Pass, Success, Đạt chuẩn.
* `--highlight-red`: `#e62e2e` (Light) / `#ff6464` (Dark) — Trạng thái Fail, Error, Nút xoá Destructive.
* `--highlight-yellow`: `#dca015` (Light) / `#ffcc54` (Dark) — Cảnh báo Warning, Lưu ý, Quiz.
* `--highlight-magenta`: `#e523de` (Light) / `#ff64f9` (Dark) — Badge mới, Tag đặc biệt.

### 3.5 Màu Khối Phân Loại (Alternative Background & Foreground Pairs)
Luôn dùng **cặp đôi** Background + Foreground tương ứng để đảm bảo tỷ lệ tương phản đạt chuẩn WCAG AAA:
* **Blue / Case Study / Info**: `--alternative-background-blue-case-study` + `--alternative-foreground-blue`
* **Green / Further Reading / Pass**: `--alternative-background-green-further-reading` + `--alternative-foreground-green`
* **Red / To-Do / Fail / Alert**: `--alternative-background-red-to-do` + `--alternative-foreground-red`
* **Yellow / Quiz / Warning**: `--alternative-background-yellow-quiz` + `--alternative-foreground-yellow`
* **Magenta / Instructor / Special**: `--alternative-background-magenta` + `--alternative-foreground-magenta`

---

## 4. Thang Đo Khoảng Cách (Spacing), Bo Góc (Radius) & Hiệu Ứng

### 4.1 Spacing Tokens (Tự động thích ứng Responsive)
| Token | Mobile (<768px) | Tablet & Desktop (≥768px) |
| :--- | :--- | :--- |
| `--spacing-xxs` | `2px` | `8px` |
| `--spacing-xs` | `4px` | `12px` |
| `--spacing-s` | `8px` | `16px` |
| `--spacing-m` | `12px` | `20px` |
| `--spacing-l` | `16px` | `24px` |
| `--spacing-xl` | `20px` | `32px` |
| `--spacing-xxl` | `20px` | `48px` |

### 4.2 Bo Góc (Border Radius Scale)
* `--radius-xs`: `4px` (Icon button nhỏ, badge ID, table input)
* `--radius-sm`: `8px` (Nút bấm tiêu chuẩn, Form input, Checklist Card, Alert)
* `--radius-md`: `12px` (CTA Button, Modal container, Course card)
* `--radius-xl`: `16px` (Card container lớn, Dashboard panel)
* `Pill / Full`: `100px` hoặc `999px` (Segmented control pill, Tag role, Floating badge)

### 4.3 Transitions & Shadows
* `--transition-fast`: `0.15s ease`
* `--transition-normal`: `0.25s ease`
* `--shadow-sm`: `0 1px 3px var(--fix-black---black-05)`
* `--shadow-md`: `0 4px 12px var(--fix-black---black-10)`
* `--shadow-lg`: `0 8px 24px var(--fix-black---black-15)`

---

## 5. Thư Viện Thành Phần UI Chuẩn Hóa (Component Directory)

### 5.1 Nút Bấm & Actions (Buttons)

#### A. Call To Action (Primary Button)
Nút hành động chính nổi bật, có hiệu ứng kính mờ (backdrop-filter) và inner glow.
* **Class**: `.cta-large` (44px, padding 8x24px), `.cta-small` (padding 4x12px).
* **Modifiers**: `.stretch` (full width), `.fit-width` (width fit-content).

```html
<!-- CTA Large -->
<button class="cta-large paragraph">Bắt đầu ngay</button>

<!-- CTA kèm Icon SVG -->
<a href="register.html" class="cta-large stretch paragraph">
  <span>Đăng ký tham gia</span>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z"/>
  </svg>
</a>
```

#### B. Secondary Button
Nút phụ có nền sáng mờ tương phản nhẹ theo theme.
* **Class**: `.secondary-button`, `.secondary-button-large` (44px), `.secondary-button-small` (padding 4x12px).

```html
<button class="secondary-button-large paragraph">Xuất báo cáo</button>
<button class="secondary-button-small font-sans-caption">Xem lại</button>
```

#### C. Border / Outline Button
Chỉ có viền `0.5px solid`, nền hoàn toàn trong suốt.
* **Class**: `.border-button`, `.border-button-large`, `.border-button-small`, `.btn-outline`.

```html
<button class="border-button-large paragraph">Chỉnh sửa thông tin</button>
<button class="border-button-small font-sans-caption">Chi tiết</button>
```

#### D. Ghost Button
Không viền, không nền; hover xuất hiện lớp nền mờ tinh tế.
* **Class**: `.ghost-button`, `.ghost-button-large`, `.ghost-button-small`, `.btn-ghost`.

```html
<button class="ghost-button-large paragraph">Bỏ qua</button>
<button class="ghost-button-small font-sans-caption">Hủy</button>
```

#### E. Destructive / Danger Button
Dành cho hành động xóa vĩnh viễn, reset hoặc cảnh báo nguy hiểm.
* **Solid**: `.destructive-button`, `.destructive-button-large`, `.destructive-button-small`, `.btn-destructive`
* **Border**: `.destructive-button-border`, `.destructive-button-outline`
* **Ghost**: `.destructive-button-ghost`

```html
<!-- Solid Destructive -->
<button class="destructive-button-large paragraph">Xóa vĩnh viễn</button>

<!-- Outline Destructive -->
<button class="destructive-button-border paragraph">Hủy dự án</button>

<!-- Ghost Destructive -->
<button class="destructive-button-ghost font-sans-caption">Xóa</button>
```

#### F. Google Sign-In Button
* **Class**: `.google-signin-btn` (52px height, viền nhẹ, icon Google đa sắc).

```html
<button class="google-signin-btn" type="button">
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
  <span class="font-sans-caption medium">Tiếp tục với Google</span>
</button>
```

---

### 5.2 Tabs vs. Segmented Controls vs. Chips

Đây là phần **rất quan trọng** để giữ tính nhất quán trong trải nghiệm người dùng:

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHÂN BIỆT RÕ RÀNG 3 THÀNH PHẦN CHỌN:                                  │
│ 1. Tabs Navigation       : Thanh tab phẳng, có gạch chân đáy           │
│ 2. Segmented Control     : Khay lõm (Track), nút active nổi thành khối │
│ 3. Radio / Checkbox Chips: Từng chip rời rạc, toggle bật/tắt           │
└────────────────────────────────────────────────────────────────────────┘
```

#### A. Tabs Navigation (Underline Indicator Style)
Nằm phẳng trên nền, có đường phân cách đáy `border-bottom: 1px solid var(--console-stroke)`. Tab active có gạch chân (`border-bottom: 2px solid var(--main-colors-foreground-f100)`).
* **Sizes**: `.tabs-large` (font 1rem), `.tabs-medium` (mặc định, font 0.85rem), `.tabs-small` (font 0.75rem).
* **Full-width**: Thêm `.tabs-fill`.

```html
<div class="tabs-navigation tabs-medium tabs-fill">
  <button class="tab-btn active" type="button">
    <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    <span>Heuristic Evaluation</span>
  </button>
  <button class="tab-btn" type="button">
    <span>WCAG 2.2 Checklist</span>
  </button>
  <button class="tab-btn" type="button">
    <span>Báo Cáo Tổng Hợp</span>
  </button>
</div>
```

#### B. Segmented Controls & Status Selectors (Capsule / Track Style)
Nằm trong một khay chứa lõm (`border: 0.5px solid var(--console-stroke); background: var(--body-background-elevate-2)`). Nút active nổi lên có shadow nhẹ.
* **Sizes**: `.large`, `.medium` (mặc định), `.small`.
* **Shape**: Thêm `.pill` để bo tròn viên thuốc 100px.
* **Presets trạng thái đánh giá Checklist**:
  - `Pass`: `.status-btn.btn-done` hoặc `.segmented-item.variant-green` (`--highlight-green`)
  - `Fail`: `.status-btn.btn-todo` hoặc `.segmented-item.variant-red` (`--highlight-red`)
  - `N/A`: `.status-btn.btn-na` hoặc `.segmented-item.variant-gray` (`--main-colors-foreground-f600`)

```html
<!-- Bộ chọn trạng thái tiêu chuẩn cho Checklist -->
<div class="status-selector">
  <button class="status-btn btn-na font-sans-caption" type="button">N/A</button>
  <button class="status-btn btn-todo active font-sans-caption" type="button">Fail</button>
  <button class="status-btn btn-done font-sans-caption" type="button">Pass</button>
</div>

<!-- Segmented Control Pill dạng Filter -->
<div class="segmented-control pill">
  <button class="segmented-item active" type="button">Tất cả (50)</button>
  <button class="segmented-item" type="button">Chưa xong (12)</button>
  <button class="segmented-item" type="button">Đã đạt (38)</button>
</div>
```

#### C. Radio & Checkbox Chips (Unified Design System)
Sử dụng bộ chọn CSS `:has(input:checked)`. Thẻ input ẩn bên trong, label bọc lấy, khi checked sẽ chuyển sang nền đen/trắng tương phản cao.
* **Sizes**: `span.chip-large:has(...)`, `span.chip-medium:has(...)`, `span.chip-small:has(...)`.

```html
<!-- Radio Chip Group -->
<div style="display: flex; gap: 8px; flex-wrap: wrap;">
  <span>
    <input type="radio" id="opt1" name="demoGroup" value="1" checked>
    <label for="opt1">Tùy chọn A</label>
  </span>
  <span>
    <input type="radio" id="opt2" name="demoGroup" value="2">
    <label for="opt2">Tùy chọn B</label>
  </span>
</div>

<!-- Filter Checkbox Chip -->
<label class="chip-filter">
  <input type="checkbox" name="levelA" checked>
  <span class="chip-btn">Level A (22)</span>
</label>
```

---

### 5.3 Form Controls, Search & Inputs

#### A. Form Group & Form Input
```html
<div class="form-group">
  <label class="font-sans-caption">Tên luồng sản phẩm</label>
  <input type="text" class="form-input" placeholder="Nhập tên luồng đánh giá..." value="Trang chủ Web App">
  <span class="font-sans-x-small" style="color: var(--main-colors-foreground-f700);">Tên luồng giúp phân loại báo cáo.</span>
</div>
```

#### B. Search Wrapper & Input (Icon trái cố định)
* **Sizes**: `.search-wrapper.large` (font 1rem, padding-left 48px), `.search-wrapper` (mặc định, padding-left 42px), `.search-wrapper.small` (padding-left 34px).

```html
<div class="search-wrapper">
  <svg class="search-icon" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
  <input type="text" class="search-input" placeholder="Tìm kiếm tiêu chí (Ví dụ: 1.4.3, màu sắc)...">
</div>
```

#### C. Toggle Switch
```html
<label class="switch">
  <input type="checkbox" id="toggleDarkMode">
  <span class="slider"></span>
</label>
```

---

### 5.4 Cards & Surface Containers

#### A. Standard Base Card (.card-container)
Khối thẻ dùng chung cho toàn hệ thống.  
> **Quy tắc quan trọng**: **Không** dùng hiệu ứng nhảy card (`transform: translateY(-4px)`); phản hồi hover bằng cách đổi `border-color: var(--transparent-foreground-main-color-40)` và thêm `box-shadow: var(--shadow-sm)`.

```html
<div class="card-container">
  <span class="mono-caption" style="color: var(--highlight-blue); margin-bottom: 8px;">[ MODULE 01 ]</span>
  <h4 class="font-sans-h5" style="margin-bottom: 8px; color: var(--main-colors-foreground-f100);">Applied UX Analytics</h4>
  <p class="font-sans-caption" style="color: var(--main-colors-foreground-f700); margin-bottom: 0;">
    Phân tích hành vi người dùng định lượng và tối ưu hóa chuyển đổi sản phẩm số.
  </p>
</div>
```

#### B. Do / Don't Comparison Box
Khối so sánh mẫu chuẩn thực hành NÊN / TRÁNH:

```html
<div class="compare-container">
  <div class="compare-box do-box">
    <h5>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      NÊN LÀM (DO)
    </h5>
    <p>Kiểm tra độ tương phản màu tối thiểu 4.5:1 trước khi hoàn tất bàn giao.</p>
  </div>
  <div class="compare-box dont-box">
    <h5>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      TRÁNH LÀM (DON'T)
    </h5>
    <p>Dùng màu chữ xám nhạt trên nền trắng khiến người thị lực kém không đọc được.</p>
  </div>
</div>
```

#### C. Empty State (Zero State)
```html
<div class="empty-state">
  <svg viewBox="0 0 24 24" width="48" height="48">
    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
  <h3 class="font-sans-h6">Không tìm thấy tiêu chí nào</h3>
  <p class="font-sans-caption">Thử thay đổi bộ lọc hoặc xóa từ khóa tìm kiếm xem sao nhé!</p>
</div>
```

---

### 5.5 Badges, Role Pills & Status Indicators

#### A. Badges Tiêu Chuẩn & WCAG Level
```html
<span class="badge badge-id">1.4.3</span>
<span class="badge badge-level badge-level-a">A</span>
<span class="badge badge-level badge-level-aa">AA</span>
<span class="badge badge-level badge-level-aaa">AAA</span>
<span class="badge badge-new">Mới (WCAG 2.2)</span>
```

#### B. User Role Badges (Admin, Member, Instructor, Alumni)
```html
<span class="role-badge admin">ADMIN</span>
<span class="role-badge member">MEMBER</span>
<span class="role-badge instructor">INSTRUCTOR</span>
<span class="role-badge alumni">ALUMNI</span>
```

#### C. Status Indicator Icons
```html
<!-- Pass (Xanh) -->
<span class="status-indicator indicator-done">
  <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
</span>

<!-- Fail (Đỏ) -->
<span class="status-indicator indicator-todo">
  <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
</span>
```

---

### 5.6 Accordions & Collapsible Panels

Sử dụng cấu trúc `.accordion` hoặc `.ds-accordion`. Khi mở ra, thêm class `.active` vào `.accordion-item`. Icon tự động xoay 180° và nội dung hiển thị mượt mà.

```html
<div class="accordion" id="faqAccordion">
  <!-- Item 1 (Đang mở) -->
  <div class="accordion-item active">
    <button class="accordion-header" type="button">
      <span>1. Bộ nguyên tắc Heuristic của Jakob Nielsen là gì?</span>
      <svg class="accordion-icon" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
    </button>
    <div class="accordion-content">
      <p>Là 10 nguyên tắc phổ quát được áp dụng để kiểm tra tính dễ dùng của giao diện người dùng sản phẩm số.</p>
    </div>
  </div>

  <!-- Item 2 -->
  <div class="accordion-item">
    <button class="accordion-header" type="button">
      <span>2. Ai nên tham gia khóa học UXCamp?</span>
      <svg class="accordion-icon" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
    </button>
    <div class="accordion-content">
      <p>Product Designer, UI/UX Designer, Product Manager và Software Engineer muốn tối ưu sản phẩm theo dữ liệu.</p>
    </div>
  </div>
</div>
```

---

### 5.7 Alerts, Callouts & Toast Notifications

#### A. Alert Box Banners
```html
<div class="alert-box success">Dữ liệu đánh giá đã được lưu lên đám mây.</div>
<div class="alert-box error">Có lỗi xảy ra khi đồng bộ tài khoản.</div>
<div class="alert-box warning">Vui lòng hoàn thành các mục bắt buộc trước khi xuất file.</div>
<div class="alert-box info">Phiên bản checklist cập nhật mới nhất theo chuẩn WCAG 2.2.</div>
```

#### B. Notice Box (Lưu ý quan trọng)
```html
<div class="p-4" style="background: var(--alternative-background-yellow-quiz); border-left: 4px solid var(--highlight-yellow); border-radius: 8px;">
  <h5 class="font-sans-caption bold" style="color: var(--highlight-yellow); margin-bottom: 4px;">LƯU Ý QUAN TRỌNG</h5>
  <p class="font-sans-caption" style="margin: 0;">Đánh giá Heuristic mang tính định hướng chuyên gia, cần kết hợp kiểm thử trên tập người dùng thực tế.</p>
</div>
```

#### C. Toast Notification Container & Toast
Toast được định vị cố định ở góc dưới (`bottom: 24px; right: 24px;` hoặc `left: 50%; transform: translateX(-50%)`).

```html
<!-- Container cố định trong Body -->
<div class="toast-container" id="toastContainer"></div>

<!-- Mẫu Toast phần tử con -->
<div class="toast">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
  <span>Đã sao chép liên kết vào bộ nhớ tạm!</span>
</div>
```

---

### 5.8 Modals & Dialogs

Modal phủ toàn màn hình có nền mờ `backdrop-filter: blur(10px)`. Khi mở, thêm class `.active` vào `.modal-overlay`.

```html
<div class="modal-overlay" id="exampleModal">
  <div class="modal-content">
    <div class="modal-header">
      <h6 class="font-sans-h6">Xác nhận xuất báo cáo</h6>
      <button class="modal-close-btn" aria-label="Đóng" type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      <p class="font-sans-paragraph">Báo cáo sẽ bao gồm toàn bộ 50 tiêu chí Heuristic kèm theo các ghi chú fail của bạn.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="secondary-button-large paragraph">Hủy</button>
      <button type="button" class="cta-large paragraph">Tải file PDF</button>
    </div>
  </div>
</div>
```

---

### 5.9 Skeleton Shimmer Loading

Dùng khi nạp dữ liệu từ Firebase / REST API để tránh hiện tượng giật cục giao diện (Layout Shift).

```html
<div style="padding: 20px; border: 0.5px solid var(--console-stroke); border-radius: 8px;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <div class="skeleton skeleton-avatar"></div>
    <div style="flex: 1;">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-line" style="width: 40%;"></div>
    </div>
  </div>
  <div class="skeleton skeleton-line"></div>
  <div class="skeleton skeleton-line" style="width: 80%;"></div>
</div>
```

---

### 5.10 Bộ UI Thống Kê & Tính Toán (.stat-*)

Dành cho các công cụ giải toán thống kê, A/B Testing sample size, Kruskal-Wallis, ANOVA, Z-Test.  
**Đặc thù**: High-contrast đơn sắc (Monochrome), font monospace Chivo Mono, bo góc gọn `4px`.

* Nút bấm: `.stat-btn-primary`, `.stat-btn-secondary`, `.stat-btn-small`
* Input & Select: `.stat-input`, `.stat-select`, `.stat-textarea`
* Khung Panel: `.stat-card`
* Chip chọn: `.stat-radio-group`, `.stat-radio`, `.stat-chip`
* Bảng số liệu: `.stat-table`

```html
<div class="stat-card">
  <h4 class="font-sans-h6" style="font-family: var(--font-mono);">Z-TEST TWO PROPORTIONS CALCULATOR</h4>
  
  <div class="stat-radio-group">
    <span class="stat-radio">
      <input type="radio" id="alpha05" name="alpha" value="0.05" checked>
      <label for="alpha05">α = 0.05 (95%)</label>
    </span>
    <span class="stat-radio">
      <input type="radio" id="alpha01" name="alpha" value="0.01">
      <label for="alpha01">α = 0.01 (99%)</label>
    </span>
  </div>

  <table class="stat-table">
    <thead>
      <tr>
        <th>Biến thể</th>
        <th>Số mẫu (Visitors)</th>
        <th>Chuyển đổi (Conversions)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Control (A)</td>
        <td><input type="number" class="stat-input" value="5000"></td>
        <td><input type="number" class="stat-input" value="450"></td>
      </tr>
      <tr>
        <td>Variant (B)</td>
        <td><input type="number" class="stat-input" value="5000"></td>
        <td><input type="number" class="stat-input" value="520"></td>
      </tr>
    </tbody>
  </table>

  <div style="margin-top: 16px;">
    <button class="stat-btn-primary" type="button">Tính toán kết quả P-Value</button>
  </div>
</div>
```

---

## 6. Cấu Trúc Layout Toàn Cục (Layout Architecture & Shell)

### 6.1 Site Main Header (Đường cong Bell-curve độc bản)
Header có chiều cao cố định `40px`, màu nền `#152751`, cố định ở đỉnh trang (`top: 0; left: 0; width: 100%; z-index: 9999;`).  
Các mục menu sử dụng SVG đường cong Bell-curve chuyển tiếp mượt mà vào màu nền trang khi active.

```html
<!-- Khai báo Header trong HTML (script/main-header.js sẽ tự render hoặc dán trực tiếp) -->
<header class="site-main-header" id="siteMainHeader" data-active="Tool"></header>
```

### 6.2 Cấu Trúc Trang Tool / Web App có Sidebar (Checklist, BigTextBox, Analytics)
Khi trang có Header + Sidebar cố định:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Công cụ Heuristic - UXCamp Vietnam</title>
  
  <!-- CSS chuẩn bắt buộc -->
  <link rel="stylesheet" type="text/css" href="style/definition.css">
  <link rel="stylesheet" type="text/css" href="style/style.css">
  
  <!-- JS Header & Script -->
  <script src="script/main-header.js" defer></script>
</head>
<body>

  <!-- 1. Header toàn trang -->
  <header class="site-main-header" id="siteMainHeader" data-active="Tool"></header>

  <!-- 2. Container ứng dụng -->
  <div class="app-container">

    <!-- 3. Sidebar bên trái (320px) -->
    <aside class="sidebar" id="sidebar">
      <button id="sidebar-toggle-btn" class="sidebar-toggle-btn" aria-label="Thu nhỏ menu">
        <svg class="toggle-icon" viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      <div class="sidebar-content">
        <!-- Tabs hoặc danh mục của công cụ -->
        <div class="tabs-navigation tabs-fill">
          <a href="#" class="tab-btn active"><span>Heuristic</span></a>
          <a href="#" class="tab-btn"><span>WCAG 2.2</span></a>
        </div>

        <div class="search-wrapper small" style="margin-bottom: 16px;">
          <svg class="search-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input type="text" class="search-input" placeholder="Lọc tiêu chí...">
        </div>
      </div>
    </aside>

    <!-- 4. Nội dung chính bên phải -->
    <main class="main-wrapper" style="margin-left: var(--sidebar-width, 320px); padding: 32px; flex: 1;">
      <h1 class="font-sans-h3">Danh Sách Tiêu Chí Đánh Giá</h1>
      <!-- Các checklist card đặt ở đây -->
    </main>

  </div>

</body>
</html>
```

### 6.3 Cấu Trúc Trang Bài Viết / Editorial / Landing Page (About, Home, Business)
Các trang thông tin không có Sidebar được bọc trong hệ thống lưới chuẩn Bootstrap kết hợp Design System:

```html
<div class="container">
  <div class="row justify-content-center">
    <main class="col-12 col-lg-10" style="padding-top: 40px; padding-bottom: 80px;">
      <span class="mono-caption" style="color: var(--highlight-blue);">[ ABOUT US ]</span>
      <h1 class="font-serif-title" style="margin: 16px 0 24px 0;">Kiến tạo thế hệ Product Builders thực chiến</h1>
      <p class="font-sans-paragraph" style="color: var(--main-colors-foreground-f700); margin-bottom: 32px;">
        UXCamp Vietnam là tổ chức đào tạo và phát triển năng lực product development tại Việt Nam...
      </p>
      
      <!-- Lưới Cards -->
      <div class="row g-4">
        <div class="col-12 col-md-6">
          <div class="card-container">
            <h3 class="font-sans-h5">Product Discovery</h3>
            <p class="font-sans-caption">Khám phá và xác thực nhu cầu người dùng.</p>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="card-container">
            <h3 class="font-sans-h5">Product Delivery</h3>
            <p class="font-sans-caption">Xây dựng và tối ưu quy trình bàn giao thiết kế.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```

---

## 7. Quy Tắc Vàng Khi Viết & Chỉnh Sửa Code (AI Directives)

Khi nhận yêu cầu từ người dùng để sửa đổi hoặc tạo mới UI trong repo này, AI **bắt buộc** tuân thủ danh sách kiểm tra sau:

### ✅ NHỮNG VIỆC BẮT BUỘC LÀM (DO):
1. **Kiểm tra CSS Dependencies**: Mọi file HTML mới phải nhúng `style/definition.css` trước tiên.
2. **Ưu tiên Class Có Sẵn**: Luôn tìm và tái sử dụng class từ `definition.css` trước khi nghĩ đến việc viết CSS mới.
3. **Sử dụng đúng biến màu**: Dùng `var(--body-background-elevate-1)`, `var(--main-colors-foreground-f-500-main)`, `var(--console-stroke)`, v.v.
4. **Kiểm tra Dark Mode Tương Thích**: Bất kỳ màu nền hoặc màu chữ nào được thêm mới phải hiển thị đẹp và tương phản chuẩn trên cả nền sáng (`#F9F6F1`) lẫn nền đen (`#000000`).
5. **Đồng bộ hóa Icon SVG**: Sử dụng SVG inline với thuộc tính `fill="currentColor"` hoặc `stroke="currentColor"` để màu icon tự ăn theo màu chữ của nút/nhãn cha.

### ❌ NHỮNG ĐIỀU TUYỆT ĐỐI CẤM (DON'T):
1. **Không hardcode màu HEX tùy tiện**: Không viết `color: #333;` hay `background: #fff;` trong CSS hoặc HTML `style=""`.
2. **Không dùng font-weight vượt quá 500**: Không dùng `font-weight: 600`, `700`, `900` cho headings. Luôn dùng `font-weight: 500` hoặc class `.bold`.
3. **Không tạo class trùng lặp**: Không tự chế ra `.my-button`, `.custom-tab`, `.app-card` nếu các class `.cta-large`, `.tab-btn`, `.card-container` đã tồn tại.
4. **Không cài cắm thư viện CSS lạ**: Tuyệt đối không import Tailwind CSS, Ant Design, Material UI hay các stylesheet bên ngoài gây xung đột với Design System.
5. **Không dùng hover nhảy card (`translateY`)**: Giữ card ổn định vị trí khi hover; chỉ hover nhấc nhẹ đối với các nút bấm độc lập hoặc icon tương tác.

---

## 8. Mẫu HTML Hoàn Chỉnh (Ready-to-Use Templates)

### 8.1 Mẫu Thẻ Tiêu Chí Đánh Giá Heuristic (.checklist-card)
```html
<article class="checklist-card card-todo" id="criterion-1-4-3" style="margin-bottom: 24px;">
  <div class="card-header-main" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 16px;">
    <div class="card-title-group" style="flex: 1;">
      <div class="card-badges" style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
        <span class="status-indicator indicator-todo">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </span>
        <span class="badge badge-id">1.4.3</span>
        <span class="badge badge-level badge-level-aa">AA</span>
      </div>
      <h3 class="font-sans-h6">Độ tương phản văn bản tối thiểu (Contrast Minimum)</h3>
      <p class="font-sans-caption" style="color: var(--main-colors-foreground-f700); margin-top: 4px;">
        Đảm bảo tỷ lệ tương phản giữa chữ và màu nền đạt ít nhất 4.5:1 đối với văn bản thông thường.
      </p>
    </div>

    <!-- Segmented Status Selector -->
    <div class="status-selector">
      <button class="status-btn btn-na font-sans-caption" type="button">N/A</button>
      <button class="status-btn btn-todo active font-sans-caption" type="button">Fail</button>
      <button class="status-btn btn-done font-sans-caption" type="button">Pass</button>
    </div>
  </div>

  <!-- Hộp giải trình khi Fail -->
  <div class="fail-reason-container" style="margin-bottom: 16px;">
    <label class="fail-reason-label font-sans-caption" style="color: var(--highlight-red);">Lý do đánh fail luồng:</label>
    <input type="text" class="form-input font-sans-paragraph" value="Màu chữ xám #999 trên nền trắng chỉ đạt 2.8:1" placeholder="Nhập lý do chưa đạt chuẩn...">
  </div>

  <!-- Chi tiết & Khối Do / Don't -->
  <details class="card-details">
    <summary class="font-sans-caption" style="cursor: pointer; color: var(--highlight-blue); margin-bottom: 12px;">Xem hướng dẫn & ví dụ chuẩn hóa</summary>
    <div class="details-content" style="padding-top: 8px;">
      <div class="compare-container">
        <div class="compare-box do-box">
          <h5><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> NÊN LÀM</h5>
          <p>Dùng công cụ Contrast Checker để đo kiểm trước khi chốt bản thiết kế.</p>
        </div>
        <div class="compare-box dont-box">
          <h5><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> TRÁNH LÀM</h5>
          <p>Dùng màu chữ quá mờ vì nghĩ rằng trông hiện đại hơn.</p>
        </div>
      </div>
    </div>
  </details>
</article>
```

---
*Tài liệu này được biên soạn cho dự án **UXCamp Vietnam**. Khi cần bổ sung token hoặc sửa đổi quy chuẩn, vui lòng cập nhật đồng thời file [`style/definition.css`](style/definition.css) và [`design-system.html`](design-system.html).*
