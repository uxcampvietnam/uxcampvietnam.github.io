# CẨM NANG TOÀN DIỆN: LOGIC ĐIỀU KHIỂN & TINH CHỈNH CHUYỂN ĐỘNG UI
> **UXCamp Vietnam** — Tài liệu hướng dẫn chuyên sâu về toán học, vật lý, kiến trúc code và phương pháp tinh chỉnh thẩm mỹ cho 4 hệ thống chuyển động trên giao diện:
> 1. **Dây Treo Ảnh Tương Tác** (`script/hanger-rope.js`)
> 2. **Showcase Case Study Bay & Đổ Bóng Không Gian** (`script/case-study-showcase.js`)
> 3. **Khối Cầu 3D Người Tham Dự** (`script/participant-sphere.js`)
> 4. **Cột Thư 3D Xoắn Ốc** (`script/envelope.js`)

---

## MỤC LỤC
1. [Nguyên Tắc Chung & Cách Bật Tắt Bảng Điều Khiển (Motion Tuners)](#1-nguyên-tắc-chung--cách-bật-tắt-bảng-điều-khiển-motion-tuners)
2. [Module 1: Dây Treo Ảnh Tương Tác (Hanger Rope)](#2-module-1-dây-treo-ảnh-tương-tác-hanger-rope)
3. [Module 2: Showcase Case Study Bay (Case Study Showcase)](#3-module-2-showcase-case-study-bay-case-study-showcase)
4. [Module 3: Khối Cầu 3D Người Tham Dự (Participant Sphere)](#4-module-3-khối-cầu-3d-người-tham-dự-participant-sphere)
5. [Module 4: Cột Thư 3D Xoắn Ốc (Envelope 3D Helix)](#5-module-4-cột-thư-3d-xoắn-ốc-envelope-3d-helix)
6. [Bí Quyết Phối Hợp & Tinh Chỉnh Thẩm Mỹ Toàn Trang](#6-bí-quyết-phối-hợp--tinh-chỉnh-thẩm-mỹ-toàn-trang)

---

## 1. NGUYÊN TẮC CHUNG & CÁCH BẬT TẮT BẢNG ĐIỀU KHIỂN (MOTION TUNERS)

### 1.1. Kiến Trúc Hợp Nhất (Unified Motion Tuner System)
Toàn bộ style giao diện của các bảng điều khiển (Dev Mode Tuner) của cả 4 module đã được quy hoạch vào **duy nhất 1 file CSS siêu nhẹ**:
- Đường dẫn: [`style/motion-tuner.css`](file:///Users/MAC/Desktop/uxcampvietnam.github.io/style/motion-tuner.css)
- Thiết kế: Dark-mode Glassmorphism cao cấp, độ tương phản cao, tự động tương thích dù website đang ở Dark Mode hay Light Mode.
- Tối ưu DOM: Không có phím tắt ẩn/hiện, không có nút bấm đóng/mở rườm rà. Bảng điều khiển gắn trực tiếp vào màn hình khi bạn bật cờ cấu hình trong code và biến mất 100% không để lại DOM dư thừa khi tắt.

### 1.2. Cách Bật Bảng Điều Khiển Cho Từng Module
Chỉ cần đổi `false` thành `true` tại vị trí cấu hình trong từng file JS tương ứng:

| Module | File JS | Dòng Cấu Hình | Vị Trí Hiển Thị Trên Màn Hình |
| :--- | :--- | :--- | :--- |
| **Dây Treo** | `script/hanger-rope.js` | `ENABLE_CONFIG_PANEL = true;` *(hoặc `HANGER_ROPE_CONFIG.devMode.showLiveTuner: true`)* | Góc dưới bên trái (`left: 20px, bottom: 20px`) |
| **Case Study** | `script/case-study-showcase.js` | `DEFAULT_CONFIG.showLiveTuner: true;` | Góc dưới bên phải (`right: 20px, bottom: 20px`) |
| **Sphere 3D** | `script/participant-sphere.js` | `DEFAULT_CONFIG.devMode.showLiveTuner: true;` | Góc dưới bên trái (`left: 20px, bottom: 20px`) |
| **Envelope** | `script/envelope.js` | `ENVELOPE_SCROLL_CONFIG.devMode.showLiveTuner: true;` | Góc dưới bên phải (`right: 20px, bottom: 20px`) |

> **Mẹo:** Các bảng điều khiển bên trái và bên phải được tách biệt tọa độ, do đó bạn có thể bật đồng thời 1 panel bên trái (ví dụ Sphere hoặc Rope) và 1 panel bên phải (Case Study hoặc Envelope) mà không sợ chúng đè lên nhau.
> 
> Nút **📋 Copy JSON** trên mỗi bảng sẽ sao chép toàn bộ cấu hình mới nhất vào Clipboard, bạn chỉ việc Paste đè vào khối config ban đầu trong file JS.

---

## 2. MODULE 1: DÂY TREO ẢNH TƯƠNG TÁC (HANGER ROPE)
*File code:* [`script/hanger-rope.js`](file:///Users/MAC/Desktop/uxcampvietnam.github.io/script/hanger-rope.js) & [`style/hanger-rope.css`](file:///Users/MAC/Desktop/uxcampvietnam.github.io/style/hanger-rope.css)

### 2.1. Bản Chất Toán Học & Vật Lý
Sợi dây treo ảnh mô phỏng vật lý thời gian thực trên HTML5 Canvas dựa trên 3 trụ cột toán học:
1. **Tích phân Verlet (Verlet Integration):**
   - Thay vì dùng vận tốc $v$ thông thường, vị trí tiếp theo $x_{new}$ của mỗi hạt trên dây được tính từ vị trí hiện tại $x$ và vị trí bước trước $x_{old}$:
     $$x_{new} = x + (x - x_{old}) \times \text{damping} + a \times \Delta t^2$$
   - Giúp mô phỏng dây treo cực kỳ ổn định, không bị nổ tọa độ hay dao động mất kiểm soát.
2. **Ràng buộc khoảng cách (Distance Constraints - Relaxation Loops):**
   - Dây được chia thành $N$ điểm hạt (`pointCount`). Các vòng lặp (`constraintIterations`) liên tục kéo các hạt về đúng chiều dài mắt xích ban đầu, tạo ra sức căng (`stiffness`).
   - Hai đầu dây được ghim cố định (`pinned: true`) tại mép container.
3. **Mô phỏng con lắc kép (Pendulum Angular Dynamics) cho từng bức ảnh:**
   - Mỗi card ảnh được treo tại một tọa độ tỉ lệ trên dây (`ropePosition: 0.0 -> 1.0`).
   - **Trục Z (3D Depth Sway):** Ảnh đu đưa trước - sau vào sâu màn hình nhờ CSS 3D `perspective(900px) rotateX(...)`. Lực này nhận gia tốc từ việc cuộn trang (`depthScrollInfluence`, `depthScrollFlutter`).
   - **Trục Roll (2D Tilt Sway):** Ảnh tự động nghiêng theo tiếp tuyến độ dốc của đoạn dây (`tangentInfluence`) và quán tính lắc ngang.
4. **Hiệu ứng gió thoảng tự nhiên (Idle Breeze):**
   - Khi không có tương tác, hàm sóng điều hòa $A \cdot \sin(\omega t)$ truyền sóng rung rinh nhẹ dọc chiều dài dây.

### 2.2. Bảng Thông Số Trọng Yếu & Cách Tinh Chỉnh

| Thuộc Tính (trong `HANGER_ROPE_CONFIG`) | Mặc Định | Mô Tả & Ảnh Hưởng Thẩm Mỹ |
| :--- | :--- | :--- |
| `rope.stiffness` | `0.85` | **Độ căng của dây.** Càng gần 1.0 dây càng căng, nảy nhanh và sắc nét. Giảm xuống 0.6 dây sẽ võng và nhão như sợi cao su. |
| `rope.sagRatio` | `0.05` | **Độ võng tự nhiên.** Tỉ lệ võng đáy chữ U so với chiều rộng. Tăng lên 0.08 nếu muốn dây trĩu sâu xuống khi treo các ảnh nặng. |
| `rope.restoreSpeed` | `0.077` | **Tốc độ đàn hồi hồi phục.** Quyết định dây trở về đường cong chuẩn nhanh hay chậm sau khi bị kéo thả. |
| `rope.gravity` | `1.5` | **Trọng lực.** Kéo dây trĩu xuống dưới. |
| `scroll.influence` | `0.18` | **Lực nảy khi cuộn chuột.** Càng cao thì khi cuộn trang nhanh, sợi dây càng rung giật mạnh. |
| `drag.radius` | `400` | **Bán kính bắt chuột.** Khoảng cách con trỏ chuột/ngón tay có thể "hút" lấy dây để kéo. |
| `drag.releaseImpulse` | `1.4` | **Lực búng nảy khi thả tay.** Độ "bật tanh tách" khi kéo căng dây rồi buông chuột. |
| `itemsSway.depthScrollFlutter` | `0.011` | **Độ phấp phới của ảnh khi cuộn.** Tạo cảm giác các bức ảnh bị gió thổi bay lật phật theo chiều cuộn trang. |
| `itemsSway.perspective` | `900` | **Độ sâu 3D.** Càng nhỏ thì góc nghiêng phối cảnh của ảnh càng mạnh mẽ, tạo chiều sâu thị giác ấn tượng. |

### 2.3. Hướng Dẫn Điều Chỉnh Cho Đẹp Hơn
- **Nếu muốn dây đầm và sang trọng (Elegant & Subtle):**
  - Đặt `rope.stiffness: 0.90`, `rope.sagRatio: 0.04`, `itemsSway.depthScrollFlutter: 0.008`. Dây sẽ căng thẳng tinh tế, các ảnh chỉ lắc nhẹ rất êm ái khi lướt trang.
- **Nếu muốn dây nghịch ngợm, giàu tính tương tác (Playful & Bouncy):**
  - Đặt `drag.releaseImpulse: 2.2`, `drag.strength: 0.9`, `rope.restoreSpeed: 0.10`. Khi người dùng dùng chuột kéo dây rồi thả, dây sẽ búng nảy liên tục nhiều nhịp.

---

## 3. MODULE 2: SHOWCASE CASE STUDY BAY (CASE STUDY SHOWCASE)
*File code:* [`script/case-study-showcase.js`](file:///Users/MAC/Desktop/uxcampvietnam.github.io/script/case-study-showcase.js) & [`style/case-study-showcase.css`](file:///Users/MAC/Desktop/uxcampvietnam.github.io/style/case-study-showcase.css)

### 3.1. Bản Chất Toán Học & Quỹ Đạo Bay
Hệ thống hiển thị các case study lướt qua màn hình đồng bộ với cuộn trang thông qua GSAP ScrollTrigger và thuật toán đồ họa chuyên sâu:

1. **Quỹ đạo bay Parabol & Góc chéo:**
   - Case study bay từ góc dưới bên trái $\rightarrow$ tiến vào tâm màn hình $\rightarrow$ bay thoát ra góc trên bên phải.
   - **Xuất phát hoàn toàn ngoài Viewport (`getOffscreenU`):**
     Code tính toán kích thước bounding box của thẻ sau khi xoay góc nghiêng $\theta$ để xác định khoảng cách $U_{off}$ sao cho ở tiến trình bắt đầu, toàn bộ thumbnail nằm khuất hoàn toàn dưới đáy màn hình, không bị giật xuất hiện đột ngột.
2. **Làm mượt nội suy (Progress Smoothing Lerp):**
   - Vị trí thực tế `currentProgress` bám đuổi `targetProgress` của thanh cuộn theo công thức:
     $$\text{currentProgress} += (\text{targetProgress} - \text{currentProgress}) \times \text{lerpFactor}$$
   - Nhờ đó, ngay cả khi người dùng cuộn chuột giật cục hoặc dùng chuột bi, các thẻ case study vẫn lướt đi vô cùng trơn tru.
3. **Đường cong vận tốc After Effects (Cubic Bezier Velocity Easing):**
   - Chuyển động lướt qua tâm màn hình được áp dụng bộ giải phương trình bậc 3 Newton-Raphson `solveBezier(u, p1x, p1y, p2x, p2y)` chuẩn After Effects.
   - Nhờ đó, thẻ bay nhanh vào từ ngoài mép, **hãm tốc độ chậm lại và dừng mắt ở trung tâm để người dùng đọc nội dung**, rồi tăng tốc bay vút ra ngoài.
4. **Hệ thống đổ bóng 2 tầng đa chiều (Dynamic Floating Depth Shadow Math):**
   - Để tạo cảm giác thumbnail đang bay lơ lửng trong không gian 3D, độ cao bóng được tính bằng hàm Parabol theo khoảng cách tới tâm:
     $$t_{center} = 1.0 - \text{clamp}\left(\frac{|u - 0.5|}{0.5}, 0, 1\right)$$
   - **Tầng 1 (Bóng đổ tiếp xúc bề mặt - Sharp Ambient Shadow):** Tạo độ sắc nét ngay sát viền thẻ.
   - **Tầng 2 (Bóng tán xạ khí quyển sâu - Soft Diffusion Shadow):** Khi thẻ bay vào tâm (cao nhất), độ mờ (`blur`) và độ mở rộng (`spread`) tăng vọt, trong khi độ tối mờ dần (`opacity` giảm nhẹ), tạo cảm giác thẻ đang bay cách nền hàng chục centimet.
   - **Hiệu ứng nghiêng bóng theo góc xoay (`shadowTiltResponse`):** Khi thẻ nghiêng góc X/Y, bóng đổ sẽ dạt lệch sang phía đối diện như ánh đèn rọi từ trên cao.

### 3.2. Bảng Thông Số Trọng Yếu & Cách Tinh Chỉnh

| Thuộc Tính (trong `DEFAULT_CONFIG`) | Mặc Định | Mô Tả & Ảnh Hưởng Thẩm Mỹ |
| :--- | :--- | :--- |
| `lerpFactor` | `0.08` | **Độ mượt bám đuổi cuộn.** Giá trị `0.05 - 0.08` cho cảm giác trôi lướt bồng bềnh rất điện ảnh; `0.15` cho phản hồi nhanh tức thì theo tay cuộn. |
| `rotYMultiplier` | `11` | **Góc nghiêng xoay 3D (Trục Y).** Khi thẻ bay từ góc lên, nó hơi xoay nghiêng đón hướng nhìn của mắt. |
| `shadowElevationCenter` | `1` | **Độ nâng bóng ở tâm.** Tọa độ Y dịch chuyển của bóng khi thẻ bay ở giữa màn hình. |
| `shadowElevationEdge` | `582` | **Độ nâng bóng ở mép.** Tọa độ dịch chuyển khi thẻ ở ngoài rìa. |
| `shadowBlurCenter` | `307` | **Bán kính mờ bóng ở tâm.** Giá trị cao (250-400px) tạo quầng bóng phủ mềm mại, thumbnail nổi hẳn lên phía trước. |
| `shadowBlurEdge` | `334` | **Bán kính mờ bóng ở mép.** |
| `shadowOpacityCenter` | `0.142` | **Độ đậm của bóng ở tâm.** Nên giữ 0.12 - 0.20 để bóng thanh thoát, không bị đen bẩn nền. |
| `shadowTiltResponse` | `0.45` | **Mức phản hồi nghiêng của bóng theo góc xoay của thẻ.** |
| `sphereExitTriggerRatio` | `0.25` | **Tỉ lệ kích hoạt Sphere biến mất.** Khi case study đạt 25% tiến trình, khối cầu Sphere phía sau sẽ bắt đầu co nhỏ và biến mất để nhường spotlight cho Case Study. |

### 3.3. Hướng Dẫn Điều Chỉnh Cho Đẹp Hơn
- **Muốn thẻ bay nổi khối 3D cực mạnh như trong rạp chiếu:**
  - Tăng `shadowBlurCenter: 380`, tăng `rotYMultiplier: 15`, `rotZMultiplier: 5`. Thẻ sẽ nghiêng 3D rõ nét và đổ bóng siêu mềm trên nền.
- **Muốn thẻ bay dính sát ngón tay (Less Floating, More Direct):**
  - Tăng `lerpFactor: 0.14`, giảm `shadowBlurCenter: 180`, giảm `shadowElevationEdge: 250`.

---

## 4. MODULE 3: KHỐI CẦU 3D NGƯỜI THAM DỰ (PARTICIPANT SPHERE)
*File code:* [`script/participant-sphere.js`](file:///Users/MAC/Desktop/uxcampvietnam.github.io/script/participant-sphere.js) & [`style/participant-sphere.css`](file:///Users/MAC/Desktop/uxcampvietnam.github.io/style/participant-sphere.css)

### 4.1. Bản Chất Toán Học & Chiếu Phối Cảnh 3D
1. **Phân bố điểm xoắn ốc Fibonacci (Fibonacci Spiral on Sphere):**
   - Để rải hàng trăm avatar người tham dự đều đặn trên mặt cầu không bị dồn cục ở 2 cực, vị trí mỗi điểm thứ $i$ được tính bằng Tỉ Lệ Vàng $\Phi = \frac{1 + \sqrt{5}}{2}$:
     $$y_i = 1 - \left(\frac{i}{N - 1}\right) \times 2$$
     $$\text{radius}_i = \sqrt{1 - y_i^2}, \quad \theta_i = 2\pi \times i \times \Phi$$
     $$x_i = \cos(\theta_i) \times \text{radius}_i, \quad z_i = \sin(\theta_i) \times \text{radius}_i$$
2. **Phép xoay ma trận Euler 3D (Rotation Matrix):**
   - Khi người dùng kéo chuột hoặc quả cầu tự quay (`autoRotateSpeed`), tọa độ được xoay quanh 2 trục:
     - Xoay quanh trục Y: $x' = x \cos\theta + z \sin\theta, \quad z' = -x \sin\theta + z \cos\theta$
     - Xoay quanh trục X: $y' = y \cos\phi - z' \sin\phi, \quad z'' = y \sin\phi + z' \cos\phi$
3. **Chiếu phối cảnh 3D lên Canvas 2D (Perspective Projection):**
   - Điểm trên mặt cầu được ánh xạ thành tọa độ màn hình thông qua tiêu cự `focalLength`:
     $$\text{scale} = \frac{\text{focalLength}}{\text{focalLength} + z'' + R}$$
     $$X_{screen} = X_{center} + x' \times \text{scale}, \quad Y_{screen} = Y_{center} + y' \times \text{scale}$$
4. **Phân lớp chiều sâu (Z-Sorting Pipeline):**
   - Mọi avatar được sắp xếp theo $z''$ giảm dần:
     - Avatar ở mặt trước ($z'' > 0$): Scale to (`itemSizeDesktop`), nét căng, độ mờ 100%, nổi lên trên.
     - Avatar ở mặt sau ($z'' < 0$): Scale thu nhỏ dần (`minScaleBack: 0.10`), mờ nhạt dần, chìm xuống dưới.

### 4.2. Bảng Thông Số Trọng Yếu & Cách Tinh Chỉnh

| Thuộc Tính (trong `DEFAULT_CONFIG`) | Mặc Định | Mô Tả & Ảnh Hưởng Thẩm Mỹ |
| :--- | :--- | :--- |
| `sphere.radiusDesktop` | `500` | **Bán kính quả cầu trên Desktop (px).** Quyết định độ bung rộng của mạng lưới avatar. |
| `sphere.radiusMobile` | `180` | **Bán kính quả cầu trên điện thoại.** |
| `sphere.focalLength` | `50` | **Tiêu cự camera ảo.** Tiêu cự càng ngắn thì hiệu ứng thị sai (parallax) càng mạnh: ảnh phía trước phóng cực to, ảnh phía sau co cực nhỏ. |
| `item.itemSizeDesktop` | `90` | **Kích thước ảnh avatar mặt trước (px).** |
| `item.minScaleBack` | `0.10` | **Tỉ lệ thu nhỏ của avatar ở mặt sau quả cầu.** Giữ 0.10 - 0.20 để tạo không gian sâu hun hút. |
| `rotation.friction` | `0.95` | **Ma sát quán tính khi kéo thả chuột.** Càng gần 1.0 (như 0.98) thì quả cầu xoay tít như con quay sau khi hất chuột. |
| `rotation.autoRotateSpeed` | `0.002` | **Tốc độ tự quay nhè nhẹ khi ở trạng thái nghỉ.** |

### 4.3. Hướng Dẫn Điều Chỉnh Cho Đẹp Hơn
- **Muốn quả cầu dày đặc, nhìn hoành tráng và đông đúc:**
  - Tăng `maxItems: 250`, giảm `itemSizeDesktop: 70`, tăng `sphere.radiusDesktop: 560`. Quả cầu sẽ bung to và ngập tràn gương mặt học viên.
- **Muốn quả cầu gọn gàng, tập trung:**
  - Giữ `radiusDesktop: 480`, `itemSizeDesktop: 90`, `focalLength: 60`.

---

## 5. MODULE 4: CỘT THƯ 3D XOẮN ỐC (ENVELOPE 3D HELIX)
*File code:* [`script/envelope.js`](file:///Users/MAC/Desktop/uxcampvietnam.github.io/script/envelope.js) & [`style/envelope.css`](file:///Users/MAC/Desktop/uxcampvietnam.github.io/style/envelope.css)

### 5.1. Bản Chất Toán Học & Động Cơ Vật Lý Xoắn Ốc
1. **Quỹ đạo hình xoắn ốc nón (Conical Helix Math):**
   - Các bức thư xếp thành một đường lốc xoáy trong không gian 3D. Tọa độ của lá thư thứ $i$ phụ thuộc vào góc xoay tổng hợp $\theta_i = (i - \text{scrollProgress}) \times \text{itemSpacing}$:
     $$x_i = \text{radiusX} \times \cos(\theta_i) \times (1 + \theta_i \times \text{spiralTightness})$$
     $$z_i = \text{radiusZ} \times \sin(\theta_i) \times (1 + \theta_i \times \text{spiralTightness})$$
     $$y_i = \theta_i \times \text{verticalPitch}$$
2. **Camera Phối Cảnh & Độ Nghiêng (Perspective & Tilt):**
   - Camera hướng nhìn được áp dụng góc nghiêng `cameraTiltX` và `cameraAngleY` để tạo góc nhìn chéo từ trên xuống dưới hoặc từ dưới lên, giúp người dùng nhìn rõ từng phong bì xếp tầng.
3. **Chiều sâu quang học (Depth of Field & Atmospheric Blur):**
   - `focalRange`: Khoảng cách an toàn quanh tiêu điểm. Khi thư ở trong khoảng này, độ mờ $blur = 0px$.
   - Khi thư trôi ra xa phía sau hoặc bay vụt qua sát mặt kính camera, bộ lọc `filter: blur(...)` tự động tăng mượt mà lên tới `maxBlur: 100px`, đồng thời phủ bóng tối `darkDepthShading` (hoặc ánh sáng trắng `lightDepthBrightness`).
4. **Hiệu ứng 3D Mở Nắp Phong Bì & Trồi Lá Thư Khi Click:**
   - Sử dụng CSS 3D Transforms với `transform-style: preserve-3d`.
   - Nắp phong bì xoay lật 180 độ quanh gờ trên: `transform: rotateX(-180deg)`.
   - Bức thư bên trong trượt nổi lên trên (`translateY(-75%)`) để lộ trọn vẹn lời nhắn gửi của học viên.

### 5.2. Bảng Thông Số Trọng Yếu & Cách Tinh Chỉnh

| Thuộc Tính (trong `ENVELOPE_SCROLL_CONFIG`) | Mặc Định | Mô Tả & Ảnh Hưởng Thẩm Mỹ |
| :--- | :--- | :--- |
| `geometry.itemSpacingRatio` | `1.1` | **Khoảng cách giữa các lá thư.** Càng nhỏ các thư càng xếp sát đè lên nhau; càng lớn các thư càng giãn cách đều. |
| `geometry.radiusXRatio` | `1.2` | **Bán kính ngang của vòng xoắn.** Mở rộng vòng xoắn sang hai bên để lá thư không che cụm tiêu đề trung tâm. |
| `geometry.radiusZRatio` | `1.2` | **Bán kính chiều sâu.** Tạo độ dày của vòng lốc xoáy. |
| `geometry.verticalPitchRatio` | `0.17` | **Khoảng cách bước nhảy chiều dọc.** Chiều cao chênh lệch giữa các vòng xoắn. |
| `geometry.spiralTightness` | `-0.58` | **Độ xoắn hình nón.** Giá trị âm tạo hình phễu loe to ở trên và thu nhỏ ở dưới. |
| `transform.activeScale` | `1.05` | **Mức phóng to của lá thư khi tiến sát màn hình.** Giúp lá thư ở tiêu điểm thu hút trọn vẹn ánh nhìn. |
| `depth.focalRange` | `3.5` | **Độ sâu vùng nét.** Vùng tiêu cự giữ cho phong thư luôn rõ chữ. |
| `depth.maxBlur` | `18` | **Độ mờ tối đa (px).** Khi phong thư lùi xa về phía sau lốc xoáy. |
| `physics.scrollDistancePerItem` | `280` | **Quãng đường cuộn chuột cho mỗi lá thư (px).** Số pixel người dùng cần cuộn để 1 lá thư hoàn tất một chu kỳ bay. |
| `physics.damping` | `0.08` | **Độ mượt giảm chấn.** Càng nhỏ cuộn càng êm và có quán tính trôi mượt mà. |

### 5.3. Hướng Dẫn Điều Chỉnh Cho Đẹp Hơn
- **Nếu muốn lốc xoáy thư trải dài hoành tráng, lướt thong thả:**
  - Tăng `physics.scrollDistancePerItem: 380`, tăng `geometry.radiusXRatio: 1.35`, tăng `depth.maxBlur: 24px`. Phong bì ở xa sẽ mờ ảo như trôi trong dải ngân hà, và khi cuộn mỗi phong bì dừng lại rõ nét lâu hơn.
- **Nếu muốn trải nghiệm trên điện thoại nhỏ gọn gàng:**
  - Tinh chỉnh `geometry.mobileCardWidthRatio: 0.65`, `geometry.mobileItemSpacingRatio: 1.2`.

---

## 6. BÍ QUYẾT PHỐI HỢP & TINH CHỈNH THẨM MỸ TOÀN TRANG

### 6.1. Đồng Bộ Nhịp Độ Chuyển Động (Motion Rhythm)
Để toàn bộ trang web tạo cảm giác của một tác phẩm hoàn chỉnh, 4 hệ thống chuyển động cần tuân theo cùng một triết lý gia tốc:
1. **Triết lý Quán Tính Bồng Bềnh (Cinema Inertia):**
   - Cả Case Study (`lerpFactor: 0.08`), Envelope (`damping: 0.08`), và Sphere (`friction: 0.95`) đều dùng chung mức phản hồi ~8%. Tránh việc 1 phần cuộn quá cứng (bám sát từng pixel) trong khi phần khác lại trôi quá trễ.
2. **Quy tắc Trọng Tâm Ánh Nhìn (Visual Focal Hierarchy):**
   - Khi Case Study bắt đầu bay (`case-study-showcase.js`), cờ `sphereExitTriggerRatio: 0.25` tự động kích hoạt hiệu ứng thu nhỏ và mờ dần của Khối Cầu Sphere. Đừng tắt tính năng này, vì nếu cả 2 cùng bay đồng thời ở kích thước tối đa, người dùng sẽ bị quá tải thị giác (cognitive overload).

### 6.2. Quy Trình 3 Bước Để Tinh Chỉnh & Cố Định Cấu Hình Mới
1. **Bước 1:** Mở file JS của module cần chỉnh, đổi flag `showLiveTuner: true` (hoặc `ENABLE_CONFIG_PANEL = true`).
2. **Bước 2:** Mở trình duyệt, kéo các thanh slider trên panel trực quan cho đến khi đạt được độ mượt và thẩm mỹ ưng ý nhất.
3. **Bước 3:** Nhấn nút **📋 Copy JSON** trên panel, dán đè vào object cấu hình trong file JS, sau đó đổi flag về `false` để sẵn sàng cho môi trường production.
