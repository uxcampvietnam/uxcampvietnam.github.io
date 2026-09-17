# Cơ Chế Chuyển Động 3D Xoắn Ốc Của Hòm Thư Phong Bì (Helical Spiral Envelope Engine)

Tài liệu này giải thích chi tiết toàn bộ nguyên lý toán học, vật lý chuyển động, cơ chế dựng hình 3D và kiến trúc tối ưu hiệu năng của dải phong bì cảm nhận học viên trong dự án **UXCamp Vietnam**.

---

## 1. Kiến Trúc Không Gian Phụ Thuộc Container (Container-Relative Space Architecture)

Hệ thống được thiết kế theo mô hình **Hoàn toàn độc lập và tương đối theo Container (Container-Relative Geometry)**:
1. **Chiều rộng ($W$)**: Tự động nhận theo `clientWidth` / `offsetWidth` và CSS của container bao ngoài (kể cả khi đặt trong cột Bootstrap `.col-12`, thẻ `<div>` tùy biến, hay toàn màn hình).
2. **Chiều cao cuộn ($H_{\text{scroll}}$)**: Tự động co giãn theo số lượng thư thực tế $N$:
   $$H_{\text{scroll}} = \max\left(1.5 \times H_{\text{viewport}},\, N \times \text{scrollDistancePerItem}\right)$$
3. **Tâm gốc tọa độ ảo (Virtual Pivot $(0,0,0)$)**: Luôn nằm chính xác tại tâm hình học `(50% width, 50% height)` của container.

```
┌───────────────────────────── Container (W x H) ─────────────────────────────┐
│                                                                              │
│                               ▲ Y (Vertical Pitch)                           │
│                               │                                              │
│                               │     [Card i-1] (Hậu cảnh phía trên)          │
│                               │       /                                      │
│                               │      /                                       │
│                               │   [Card i]  <--- TIÊU ĐIỂM (Center: X=0, Y=0)│
│                               │      \                                       │
│                               │       \                                      │
│                               │     [Card i+1] (Tiền cảnh dốc xuống)         │
│                               └────────────────────────► X (Radius X)        │
│                              /                                               │
│                             /                                                │
│                            ▼ Z (Depth / Radius Z)                            │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Hệ Tọa Độ & Các Công Thức Toán Học Tính Vị Trí

Tại mỗi khung hình (frame), hệ thống xác định trạng thái của từng thẻ thứ $i$ dựa trên độ lệch tương đối so với vị trí cuộn hiện tại $S$ (trong đó $S \in [0, N-1]$):

$$\delta = i - S$$

Từ khoảng cách $\delta$, góc quay trên quỹ đạo xoắn ốc $\theta$ được tính theo công thức:

$$\theta = \delta \times \text{spiralTightness}$$

### 2.1. Tọa độ không gian 3 chiều $(X, Y, Z)$ tương đối theo Container

| Trục | Công thức toán học | Ý nghĩa hình học |
| :--- | :--- | :--- |
| **Trục $X$** | $$X = \sin(\theta) \times R_x$$ | Đưa thẻ lượn sóng tuần hoàn theo chiều ngang với bán kính $R_x = W_{\text{container}} \times \text{radiusXRatio}$. |
| **Trục $Y$** | $$Y = \delta \times P_y - \sin(2\theta) \times W_y + Y_{\text{offset}}$$ | $P_y = H_{\text{container}} \times \text{verticalPitchRatio}$ là bước dốc xoắn ốc; $-\sin(2\theta) \times W_y$ tạo sóng lượn tự nhiên mềm mại. |
| **Trục $Z$** | $$Z = (\cos(\theta) - 1) \times R_z$$ | $R_z = W_{\text{container}} \times \text{radiusZRatio}$. Khi $\theta = 0$ (thẻ ở tâm), $\cos(0) = 1 \Rightarrow Z = 0$ (gần mắt nhất). Khi xoay ra xa, $Z$ nhận giá trị âm lớn dần (chìm sâu vào hậu cảnh). |

---

## 3. Các Góc Xoay 3 Chiều Của Thẻ (3D Euler Rotations)

Để phong bì luôn hướng mặt trước về phía người xem một cách tự nhiên (tương tự chuyển động camera tracking trong 3D Animation), thẻ được áp dụng 3 góc xoay:

```javascript
// 1. Góc xoay trục Y: Hướng mặt trước theo tiếp tuyến cung tròn
const rotY = -theta * (180 / Math.PI) * transform.rotateYMultiplier + geo.cameraAngleY;

// 2. Góc xoay trục X: Độ chúc ngửa theo góc nghiêng Camera Tilt
const rotX = geo.cameraTiltX + (delta * transform.rotateXMultiplier * 8);

// 3. Góc xoay trục Z: Độ nghiêng cánh buồm (Banking roll) khi thẻ lượn vòng
const rotZ = -Math.sin(theta) * (180 / Math.PI) * transform.rotateZMultiplier;
```

* **Xoay $Y$ ($\text{Rotate Y}$)**: Khi thẻ di chuyển sang trái/phải, góc xoay $Y$ tự động quay ngược lại để hướng thẳng mặt bì thư vào tầm mắt người dùng.
* **Xoay $X$ ($\text{Rotate X}$)**: Tạo góc nhìn nghiêng từ trên xuống (Camera Pitch).
* **Xoay $Z$ ($\text{Rotate Z}$)**: Khi thẻ di chuyển quanh khúc cua elip, nó tự động nghiêng nhẹ như một chiếc máy bay lượn vòng, loại bỏ cảm giác cứng nhắc.

---

## 4. Hiệu Ứng Quang Học & Tiêu Điểm (Focal Depth, Scale & Shading)

### 4.1. Vùng Tiêu Điểm Rõ Nét (Focal Proximity)
Độ gần tâm tiêu điểm được chuẩn hóa trong khoảng $[0, 1]$ và làm mượt bằng hàm nội suy Hermite (Smoothstep):

$$\text{proximity} = \max\left(0, 1 - \frac{|\delta|}{\text{focalRange}}\right)$$

$$E(p) = p^2 \times (3 - 2p)$$

### 4.2. Phóng to / Thu nhỏ (Scale Depth)
Thẻ ở chính giữa đạt kích thước lớn nhất ($\text{activeScale}$), trong khi các thẻ ở xa thu nhỏ dần về $\text{minScale}$:

$$\text{Scale} = \text{minScale} + (\text{activeScale} - \text{minScale}) \times E(p)$$

### 4.3. Làm mờ quang học (Depth-of-Field Blur) & Độ sáng hậu cảnh
* **Độ mờ ($\text{Blur}$)**: Thẻ ở tâm có $\text{Blur} = 0\text{px}$ (sắc nét tuyệt đối). Thẻ càng ra xa thì độ mờ tăng dần đến $\text{maxBlur}$.
* **Độ sáng ($\text{Brightness}$)**: Áp dụng hiệu ứng Z-shading, thẻ ở xa giảm độ sáng để tạo cảm giác chiều sâu không gian tối chân thực:
  $$\text{Brightness} = 1 - (1 - E(p)) \times \text{depthShading}$$
* **Thứ tự xếp lớp ($Z\text{-Index}$)**: Được gán trực tiếp theo chiều sâu trục $Z$:
  $$\text{zIndex} = \text{round}(Z + 2000)$$

---

## 5. Cơ Chế Cuộn, Quán Tính & Vật Lý (Physics Engine)

```
[ User Action: Scroll / Wheel / Drag ]
                  │
                  ▼
          [ targetScroll ] ──────── (Lerp Damping: 0.18) ────────► [ currentScroll ]
                                                                           │
                                                                           ▼
                                                                  [ update3DPositions() ]
```

1. **Chiều cao cuộn phụ thuộc số lượng thư**:
   - Mỗi lá thư tương ứng với $\approx 140\text{px}$ quãng đường cuộn.
   - Khi có thêm thư mới từ Google Sheets API, quãng đường cuộn tự động kéo dài một cách mượt mà.
2. **Nội suy chuyển động (`currentScroll`)**: Tại mỗi khung hình (frame), vị trí thực tế dịch chuyển dần về đích theo tỉ lệ giảm chấn:
   $$S_{t+1} = S_t + (T - S_t) \times \text{damping}$$
3. **Tự động Snap vào tâm (`Center Snapping`)**: Khi người dùng ngừng tương tác quá $400\text{ms}$, hệ thống tự động hút nhẹ thẻ gần nhất vào chính giữa màn hình.

---

## 6. Kiến Trúc Tối Ưu Hiệu Năng Cực Đoan (60-120 FPS Extreme Optimization)

| Kỹ thuật tối ưu | Giải pháp triển khai | Lợi ích |
| :--- | :--- | :--- |
| **Zero Layout Thrashing** | Kích thước container được đo và cache 1 lần khi khởi tạo / Resize. Tuyệt đối không đọc layout trong vòng lặp RAF. | Triệt tiêu 100% hiện tượng Forced Synchronous Reflow. |
| **DOM Write-Diffing** | Lưu cache trạng thái style trước đó của từng thẻ (`cardDomStates[i]`). Chỉ cập nhật CSS khi giá trị thực sự thay đổi. | Giảm 90% chi phí can thiệp DOM tree. |
| **Micro Virtual Culling** | Chỉ render và cập nhật ma trận 3D cho các thẻ trong phạm vi hiển thị gần tâm ($|\delta| \le 3.5$). Toàn bộ các thẻ ở xa được gán `display: none`. | Giảm 75% tải Rasterization của GPU. |
| **Active Viewport Observer** | `IntersectionObserver` ngắt hoàn toàn RAF loop khi container ra ngoài màn hình. | 0% GPU/CPU khi không nhìn thấy. |
| **Full-Bleed GPU Isolation** | Áp dụng CSS `contain: layout paint; isolation: isolate; backface-visibility: hidden; transform: translate3d(0,0,0);` | Tách hòm thư thành 1 GPU Layer riêng biệt. |

---

## 7. Bảng Tra Cứu Tham Số Cấu Hình `ENVELOPE_SCROLL_CONFIG`

```javascript
const ENVELOPE_SCROLL_CONFIG = {
  "geometry": {
    "mode": "container-relative", // Bán kính co giãn theo kích thước container
    "radiusXRatio": 0.42,         // Bán kính ngang (% chiều rộng container)
    "radiusZRatio": 0.28,         // Bán kính chiều sâu (% chiều rộng container)
    "verticalPitchRatio": 0.16,   // Khoảng cách cao độ giữa 2 thẻ (% chiều cao container)
    "curveWaveYRatio": 0.05,      // Biên độ sóng lượn nhấp nhô
    "cardWidthRatio": 0.28,       // Chiều rộng thẻ (% chiều rộng container)
    "minRadiusX": 180,            // Giới hạn bán kính ngang nhỏ nhất
    "maxRadiusX": 680,            // Giới hạn bán kính ngang lớn nhất
    "minRadiusZ": 140,            // Giới hạn bán kính sâu nhỏ nhất
    "maxRadiusZ": 500,            // Giới hạn bán kính sâu lớn nhất
    "minCardWidth": 260,          // Chiều rộng thẻ nhỏ nhất (px)
    "maxCardWidth": 460,          // Chiều rộng thẻ lớn nhất (px)
    "spiralTightness": 0.78,      // Độ xoắn ốc
    "cameraTiltX": 20,            // Góc nghiêng camera nhìn từ trên xuống (độ)
    "cameraAngleY": -5,           // Góc lệch ngang của camera
    "offsetY": 0                  // Độ lệch tâm theo chiều dọc
  },
  "transform": {
    "rotateYMultiplier": 1.12,    // Hệ số xoay mặt thẻ hướng về người xem
    "rotateXMultiplier": 0.28,    // Hệ số chúc thẻ theo cao độ
    "rotateZMultiplier": 0.1,     // Hệ số nghiêng cánh buồm khi lượn vòng
    "activeScale": 0.88,          // Tỉ lệ phóng to của thẻ ở tiêu điểm chính giữa
    "minScale": 0.25              // Tỉ lệ thu nhỏ của thẻ ở xa hậu cảnh
  },
  "depth": {
    "focalRange": 2.2,            // Bán kính vùng nét (tính theo số lượng thẻ)
    "enableBlur": true,           // Bật/tắt hiệu ứng làm mờ hậu cảnh
    "maxBlur": 8.0,               // Độ mờ tối đa (pixel)
    "minOpacity": 0.2,            // Độ trong suốt của thẻ ở xa nhất
    "depthShading": 0.35          // Mức độ giảm sáng tạo bóng tối hậu cảnh
  },
  "physics": {
    "scrollDistancePerItem": 140, // Quãng đường cuộn cho mỗi thẻ (px/thư)
    "damping": 0.18,              // Quán tính mượt mà (càng nhỏ càng đầm tay)
    "wheelSensitivity": 0.00065,  // Độ nhạy khi cuộn con lăn chuột
    "dragSensitivity": 0.0012,    // Độ nhạy khi kéo thả chuột / vuốt cảm ứng
    "snapToCenter": true,         // Tự động hút thẻ gần nhất vào tâm khi dừng
    "snapDelay": 400              // Độ trễ chờ dừng cuộn trước khi snap (ms)
  }
};
```
