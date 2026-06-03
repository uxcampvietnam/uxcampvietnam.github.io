// --- TỆP DỮ LIỆU ĐẦY ĐỦ 86 TIÊU CHÍ WCAG 2.2 ---
const WCAG_DATA = [
  {
    "id": "alt-text",
    "wcag": "1.1.1",
    "title": "Hình ảnh nếu không load được phải có văn bản thay thế (Alt text)",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp văn bản mô tả thay thế (Alt Text) cho các hình ảnh truyền tải thông tin, hoặc ẩn đi các hình ảnh trang trí.",
    "why": "Người khiếm thị sử dụng Screen Reader để hiểu hình ảnh đó đang thể hiện điều gì.",
    "how": [
      "Mô tả ngắn gọn ý nghĩa hình ảnh trong Figma.",
      "Đặt thuộc tính alt=\"\" cho hình trang trí để Screen Reader bỏ qua."
    ],
    "do": "alt='Logo Antigravity màu xanh dương'",
    "dont": "alt='hinh_anh_123.jpg' hoặc bỏ trống alt đối với hình có nghĩa."
  },
  {
    "id": "audio-video-only-prerecorded",
    "wcag": "1.2.1",
    "title": "Bản dịch/Transcript cho tệp chỉ có âm thanh hoặc video ghi sẵn",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp transcript cho tệp chỉ có âm thanh (podcasts) hoặc mô tả hình ảnh cho tệp chỉ có video.",
    "why": "Người điếc hoặc người mù có thể tiếp cận được thông tin trong các tệp đơn phương tiện ghi sẵn.",
    "how": [
      "Thiết kế nút tải bản gạch đầu dòng/văn bản ghi âm (transcript) đặt ngay dưới trình phát podcast.",
      "Cung cấp bản mô tả văn bản mô tả các cảnh chuyển động cho video không có tiếng."
    ],
    "do": "Nút bấm 'Xem văn bản thay thế cho tệp ghi âm này' đặt cạnh trình phát.",
    "dont": "Đăng tải bài phỏng vấn âm thanh mà không có bất kỳ văn bản đi kèm nào."
  },
  {
    "id": "captions-prerecorded",
    "wcag": "1.2.2",
    "title": "captions cho video ghi sẵn",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Đảm bảo tất cả video có âm thanh đều được thiết kế UI hiển thị captions.",
    "why": "Người khiếm thính cần captions để hiểu lời nói và các âm thanh quan trọng trong video.",
    "how": [
      "Thiết kế khu vực hiển thị captions rõ ràng, độ tương phản (contrast) cao so với nền video.",
      "Cung cấp nút bật/tắt captions (CC) trong thiết kế thanh điều khiển video."
    ],
    "do": "Nút 'CC' nổi bật và captions có nền đen mờ giúp tăng độ đọc.",
    "dont": "Nhúng cứng captions nhỏ xíu, mờ nhạt thẳng vào video mà không cho phép bật/tắt."
  },
  {
    "id": "audio-description-alternative-prerecorded",
    "wcag": "1.2.3",
    "title": "Thuyết minh giọng nói (Audio Description) hoặc văn bản thay thế cho video",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp audio description (mô tả những gì đang diễn ra trên màn hình) hoặc transcript chi tiết cho video ghi sẵn.",
    "why": "Người mù cần nghe mô tả hành động, biểu cảm nhân vật hoặc chữ viết trên màn hình video.",
    "how": [
      "Thiết kế một tùy chọn bật luồng âm thanh thuyết minh (audio description track).",
      "Cung cấp tệp tài liệu văn bản mô tả đầy đủ cả lời thoại lẫn bối cảnh video."
    ],
    "do": "Menu phát video có tùy chọn: 'Bật thuyết minh mô tả hình ảnh'.",
    "dont": "Để video tự chạy mà không có cách nào cho người mù hiểu các diễn biến không lời."
  },
  {
    "id": "captions-live",
    "wcag": "1.2.4",
    "title": "captions trực tiếp (Live Captions) cho livestream",
    "level": "AA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp captions thời gian thực (live captions) cho các sự kiện phát sóng trực tiếp (livestream).",
    "why": "Giúp người khiếm thính có thể theo dõi và tương tác với các sự kiện trực tiếp cùng lúc với người khác.",
    "how": [
      "Thiết kế không gian hiển thị captions trực tiếp không đè lên các thông tin quan trọng.",
      "Tích hợp các API captions tự động hoặc captions do người gõ trực tiếp vào UI xem live."
    ],
    "do": "captions trực tiếp chạy ở dải băng chuyên dụng dưới khung hình video livestream.",
    "dont": "Livestream hội thảo lớn mà hoàn toàn không có captions trực tiếp."
  },
  {
    "id": "audio-description-prerecorded",
    "wcag": "1.2.5",
    "title": "Thuyết minh giọng nói (Audio Description) bắt buộc cho video ghi sẵn",
    "level": "AA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp audio description chuyên dụng cho tất cả nội dung video ghi sẵn (bắt buộc, không dùng văn bản thay thế như 1.2.3).",
    "why": "user khiếm thị cần nghe mô tả trực tiếp tích hợp trong luồng âm thanh phát song song.",
    "how": [
      "Thiết kế trình phát hỗ trợ chuyển đổi giữa luồng âm thanh gốc và luồng âm thanh có thuyết minh."
    ],
    "do": "Cung cấp luồng âm thanh phụ mô tả: '[Tiếng bước chân tiến lại gần, nhân vật mở ngăn kéo]' lúc nghỉ giữa các lời thoại.",
    "dont": "Không có mô tả âm thanh cho các cảnh hành động kéo dài không lời thoại."
  },
  {
    "id": "sign-language-prerecorded",
    "wcag": "1.2.6",
    "title": "Ngôn ngữ ký hiệu (Thủ ngữ) cho video ghi sẵn",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Thiết kế một màn hình phụ hiển thị người dịch ngôn ngữ ký hiệu (sign language) cho các nội dung video ghi sẵn.",
    "why": "Đối với nhiều người điếc bẩm sinh, ngôn ngữ ký hiệu là ngôn ngữ mẹ đẻ của họ chứ không phải chữ viết captions.",
    "how": [
      "Thiết kế cửa sổ nhỏ góc màn hình (picture-in-picture) hiển thị người dịch ngôn ngữ ký hiệu với kích thước đủ lớn để nhìn rõ cử chỉ tay."
    ],
    "do": "Một khung hiển thị người dịch thủ ngữ ở góc phải màn hình, có thể bật/tắt hoặc phóng to.",
    "dont": "Chỉ dựa hoàn toàn vào captions chữ viết."
  },
  {
    "id": "extended-audio-description-prerecorded",
    "wcag": "1.2.7",
    "title": "Thuyết minh giọng nói mở rộng (Extended Audio Description)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Khi video gốc không có đủ khoảng nghỉ âm thanh để thuyết minh, thiết kế tính năng tạm dừng video để phát audio description chi tiết rồi chạy tiếp.",
    "why": "Đảm bảo người mù nhận được thông tin đầy đủ về cốt truyện ngay cả khi video có tiết tấu nhanh.",
    "how": [
      "Thiết kế trình phát tự động dừng hình ảnh khi phát thuyết minh bổ sung và tự động chạy tiếp."
    ],
    "do": "Tính năng phát tự động dừng video 5 giây để đọc mô tả sơ đồ vẽ trên bảng rồi tiếp tục phát.",
    "dont": "Bỏ qua các thông tin hình ảnh quan trọng vì video không có đủ thời gian dừng."
  },
  {
    "id": "media-alternative-prerecorded",
    "wcag": "1.2.8",
    "title": "Kịch bản văn bản chi tiết (Media Alternative) cho video/audio",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp tài liệu văn bản thay thế mô tả đầy đủ toàn bộ diễn biến, lời thoại và thông tin âm thanh/hình ảnh trong video.",
    "why": "Người mù-điếc có thể đọc thông tin video thông qua thiết bị màn hình chữ nổi Braille.",
    "how": [
      "Soạn thảo tài liệu kịch bản chi tiết bao gồm mọi hội thoại và mô tả hành động, cung cấp đường link tải dễ tìm."
    ],
    "do": "Tệp HTML chuyên biệt chứa toàn bộ kịch bản chi tiết của tập phim.",
    "dont": "Chỉ cung cấp video mà không có bất kỳ dạng tài liệu thay thế nào."
  },
  {
    "id": "audio-only-live",
    "wcag": "1.2.9",
    "title": "Bản dịch thời gian thực cho âm thanh trực tiếp (Live Audio-only)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp transcript thời gian thực (real-time text alternative) cho các luồng phát âm thanh trực tiếp (như radio, họp trực tuyến chỉ nói).",
    "why": "Giúp người điếc theo dõi các buổi thảo luận, họp truyền hình trực tuyến hoặc radio trực tiếp.",
    "how": [
      "Thiết kế bảng hiển thị văn bản cập nhật liên tục song song với luồng âm thanh trực tiếp."
    ],
    "do": "Trang nghe radio trực tiếp tích hợp dòng chạy chữ cập nhật nội dung đang phát.",
    "dont": "Phát trực tiếp tin nhắn khẩn cấp bằng âm thanh mà không có hiển thị chữ."
  },
  {
    "id": "info-relationships",
    "wcag": "1.3.1",
    "title": "Thông tin và quan hệ phân cấp rõ ràng (Info & Relationships bằng semantic HTML)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo cấu trúc thông tin (tiêu đề, danh sách, bảng biểu) được thiết kế rõ ràng và có thể được xác định bằng mã lập trình (semantic HTML).",
    "why": "Giúp Screen Reader hiểu đúng phân cấp thông tin và mối liên hệ giữa các phần tử.",
    "how": [
      "Sử dụng đúng phân cấp tiêu đề (H1, H2, H3...) trong Figma và bàn giao cho lập trình viên.",
      "Nhóm các trường nhập liệu có liên quan vào các nhóm (`fieldset`) rõ ràng với tiêu đề nhóm (`legend`)."
    ],
    "do": "Thiết kế bảng dữ liệu có tiêu đề cột (table headers) phân biệt rõ với dữ liệu thường.",
    "dont": "Dùng cỡ chữ to in đậm để làm tiêu đề thay vì cấu trúc tiêu đề chuẩn."
  },
  {
    "id": "meaningful-sequence",
    "wcag": "1.3.2",
    "title": "Thứ tự đọc nội dung logic và đúng tuần tự (Meaningful Sequence)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo thứ tự đọc của nội dung là logic và nhất quán khi UI được giản lược cấu trúc (như khi đọc bằng screen reader).",
    "why": "Tránh việc user khiếm thị nghe các đoạn văn bị đảo lộn thứ tự do bố cục dạng CSS Grid/Flexbox phức tạp.",
    "how": [
      "Thiết kế thứ tự đọc nội dung từ trái qua phải, từ trên xuống dưới.",
      "Chỉ dẫn rõ ràng thứ tự đọc trong tài liệu bàn giao Figma cho dev nếu bố cục không tuần tự."
    ],
    "do": "Bố cục cột bên phải chứa thông tin bổ trợ được xếp đọc sau cột nội dung chính.",
    "dont": "Xếp nội dung cột phụ xen kẽ vào giữa các câu của nội dung chính khi hiển thị mã nguồn."
  },
  {
    "id": "sensory-characteristics",
    "wcag": "1.3.3",
    "title": "Không chỉ dẫn dựa vào hình dạng, kích thước, vị trí hay âm thanh (Sensory Characteristics)",
    "level": "A",
    "category": "visual",
    "isNew22": false,
    "desc": "Không viết các chỉ dẫn dựa hoàn toàn vào hình dạng, kích thước, vị trí trực quan hoặc âm thanh của phần tử.",
    "why": "Người mù không nhìn thấy vị trí hoặc hình dáng, người điếc không nghe thấy âm thanh cảnh báo.",
    "how": [
      "Không viết: 'Bấm nút hình tròn màu xanh lá bên phải để tiếp tục'.",
      "Thay vào đó viết: 'Bấm nút Tiếp Tục (nút hình tròn màu xanh lá bên phải)'."
    ],
    "do": "Viết chỉ dẫn: 'Nhấp vào nút Lưu thay đổi ở cuối form'.",
    "dont": "Viết chỉ dẫn: 'Bấm vào nút màu đỏ để hủy bỏ'."
  },
  {
    "id": "orientation",
    "wcag": "1.3.4",
    "title": "Hỗ trợ xoay ngang/dọc màn hình (Orientation)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo trang web hoạt động bình thường trên cả hướng màn hình dọc (Portrait) và ngang (Landscape), trừ khi có lý do kỹ thuật đặc biệt.",
    "why": "Một số user khuyết tật gắn chặt máy tính bảng vào xe lăn theo một hướng cố định và không thể xoay thiết bị.",
    "how": [
      "Thiết kế responsive thích ứng tốt khi xoay ngang/dọc điện thoại.",
      "Không khóa cứng hướng hiển thị bằng code, cho phép UI tự co giãn linh hoạt."
    ],
    "do": "Trang ứng dụng ngân hàng tự động tổ chức lại các thẻ khi xoay ngang điện thoại.",
    "dont": "Hiển thị popup/modal ép buộc user: 'Vui lòng xoay dọc màn hình để tiếp tục sử dụng'."
  },
  {
    "id": "identify-input-purpose",
    "wcag": "1.3.5",
    "title": "autocomplete (Autocomplete) cho ô nhập liệu cá nhân",
    "level": "AA",
    "category": "form",
    "isNew22": false,
    "desc": "Đảm bảo các ô nhập dữ liệu cá nhân thông dụng (Tên, Email, Điện thoại, Địa chỉ) được gắn label chuẩn để browser autocomplete (Autocomplete).",
    "why": "user gặp khó khăn trong việc gõ chữ hoặc suy giảm nhận thức có thể điền thông tin nhanh chóng mà không gặp lỗi.",
    "how": [
      "Thiết kế các trường nhập liệu chuẩn hóa, tương thích với thuộc tính `autocomplete` của HTML.",
      "Sử dụng các biểu tượng và label trực quan đại diện cho thông tin cần nhập."
    ],
    "do": "Trường Email có mã autocomplete='email' giúp browser đề xuất email lưu sẵn.",
    "dont": "Sử dụng các thẻ nhập liệu tùy biến quá mức khiến browser không nhận diện được để tự điền dữ liệu."
  },
  {
    "id": "identify-purpose-enhanced",
    "wcag": "1.3.6",
    "title": "Xác định mục đích các thành phần (Identify Purpose - Enhanced)",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Sử dụng các thuộc tính đánh dấu ngữ nghĩa để cho phép user thay đổi biểu tượng hoặc ẩn đi các phần không cần thiết nhằm tối giản UI.",
    "why": "Người khuyết tật nhận thức có thể sử dụng các công cụ bổ trợ để tùy biến icon thành chữ hoặc giản lược UI theo cách họ dễ hiểu nhất.",
    "how": [
      "Thiết kế cấu trúc web chuẩn hóa (sử dụng WAI-ARIA Landmark Roles như `banner`, `navigation`, `main`).",
      "Đảm bảo các icon chức năng thông dụng được gắn thẻ siêu dữ liệu rõ ràng."
    ],
    "do": "Biểu tượng Trang chủ có gắn thẻ vai trò rõ ràng giúp user có thể đổi nó thành chữ 'Trang chủ' thông qua extension.",
    "dont": "Dùng các hình ảnh trang trí làm nút điều hướng mà không có bất kỳ cấu trúc siêu dữ liệu nào."
  },
  {
    "id": "use-of-color",
    "wcag": "1.4.1",
    "title": "Không chỉ dùng màu sắc để phân biệt thông tin (Use of Color)",
    "level": "A",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo màu sắc không phải là phương tiện trực quan duy nhất để truyền tải thông tin, chỉ báo hành động, gợi ý phản hồi hoặc phân biệt các phần tử trên UI.",
    "why": "Người mù màu hoặc suy giảm thị lực không thể phân biệt được các trạng thái hoặc thông tin chỉ được truyền đạt qua sự khác biệt về màu sắc.",
    "how": [
      "Luôn kết hợp màu sắc với các yếu tố trực quan khác như biểu tượng, hoa văn, label chữ hoặc gạch chân để phân biệt thông tin.",
      "Trong biểu đồ, sử dụng thêm hoa văn (pattern) hoặc label trực tiếp bên cạnh màu sắc."
    ],
    "do": "link trong đoạn văn vừa có màu xanh vừa được gạch chân, trường lỗi vừa viền đỏ vừa có biểu tượng cảnh báo và dòng chữ mô tả lỗi.",
    "dont": "Chỉ dùng màu đỏ để đánh dấu trường nhập liệu bị lỗi mà không có biểu tượng hay chữ giải thích đi kèm."
  },
  {
    "id": "audio-control",
    "wcag": "1.4.2",
    "title": "Kiểm soát âm thanh tự phát (Audio Control)",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Nếu âm thanh trên trang tự động phát kéo dài hơn 3 giây, phải cung cấp một cơ chế rõ ràng ở đầu trang để tạm dừng, tắt tiếng hoặc điều chỉnh âm lượng độc lập.",
    "why": "Âm thanh tự phát đè lên tiếng đọc của screen reader, khiến người khiếm thị không thể nghe và điều hướng trang web.",
    "how": [
      "Tránh thiết kế âm thanh tự động phát khi tải trang.",
      "Nếu bắt buộc, hãy cung cấp nút Tắt âm (Mute) ngay trên banner hoặc ở góc nổi bật dễ tiếp cận bằng bàn phím."
    ],
    "do": "Video giới thiệu tự động phát nhưng mặc định ở chế độ tắt tiếng (Muted), user cần bấm mới phát âm thanh.",
    "dont": "Phát nhạc nền ầm ĩ ngay khi mở trang web mà không có nút tạm dừng."
  },
  {
    "id": "contrast-minimum",
    "wcag": "1.4.3",
    "title": "độ tương phản (contrast) chữ tối thiểu 4.5:1 (Contrast - Minimum)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo độ tương phản (contrast) tối thiểu giữa màu chữ và màu nền đạt tỷ lệ 4.5:1 đối với văn bản cỡ thường, và 3:1 đối với văn bản lớn (từ 18pt hoặc 14pt in đậm trở lên).",
    "why": "Người suy giảm thị lực hoặc user trong môi trường ánh sáng mạnh cần độ tương phản (contrast) đủ cao để đọc được nội dung trên màn hình.",
    "how": [
      "Sử dụng các công cụ kiểm tra tương phản (như Stark, Contrast Checker trong Figma) để đo tỷ lệ tương phản của tất cả cặp màu chữ/nền trong bảng màu thiết kế.",
      "Tránh đặt chữ có màu nhạt trên nền sáng hoặc chữ tối trên nền tối."
    ],
    "do": "Chữ xám đậm (#333333) trên nền trắng (#FFFFFF) đạt tỷ lệ tương phản 12.6:1 (vượt chuẩn AA).",
    "dont": "Chữ xám nhạt (#999999) trên nền trắng chỉ đạt tương phản 2.8:1, không đủ tiêu chuẩn."
  },
  {
    "id": "resize-text",
    "wcag": "1.4.4",
    "title": "Phóng to chữ lên 200% không bị vỡ bố cục (Resize Text)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo văn bản có thể được phóng to lên đến 200% mà không bị mất nội dung hoặc chức năng, không cần sử dụng các công nghệ hỗ trợ.",
    "why": "Người suy giảm thị lực thường sử dụng tính năng phóng to chữ của browser để đọc nội dung, và UI cần hoạt động bình thường khi chữ lớn hơn.",
    "how": [
      "Sử dụng đơn vị kích thước tương đối (rem, em, %) thay vì đơn vị tuyệt đối (px) cho cỡ chữ.",
      "Thiết kế bố cục linh hoạt tự co giãn khi user phóng to chữ bằng browser (Ctrl/Cmd + Plus)."
    ],
    "do": "Trang web hiển thị bình thường, văn bản xuống dòng tự nhiên khi user phóng to browser lên 200%.",
    "dont": "Văn bản bị cắt cụt, đè chồng lên nhau hoặc tràn ra ngoài khung chứa khi user phóng to cỡ chữ."
  },
  {
    "id": "images-of-text",
    "wcag": "1.4.5",
    "title": "Hạn chế dùng hình ảnh chứa chữ (Images of Text)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Tránh sử dụng hình ảnh để hiển thị văn bản, ngoại trừ logo thương hiệu hoặc trường hợp bắt buộc (như sơ đồ bản đồ phức tạp).",
    "why": "Văn bản thật bằng HTML có thể phóng to, đổi màu và đọc được bởi các thiết bị hỗ trợ, trong khi văn bản dạng ảnh thì không.",
    "how": [
      "Chuyển đổi các thiết kế banner quảng cáo có chữ thành dạng chữ văn bản thật sử dụng CSS để căn chỉnh kiểu chữ và khoảng cách."
    ],
    "do": "Banner có logo thương hiệu dạng ảnh, nhưng các khẩu hiệu và thông tin ưu đãi là văn bản HTML thật.",
    "dont": "Dùng một bức ảnh JPG chứa toàn bộ nội dung điều khoản sử dụng để đăng lên trang web."
  },
  {
    "id": "contrast-enhanced",
    "wcag": "1.4.6",
    "title": "độ tương phản (contrast) chữ nâng cao 7:1 (Contrast - Enhanced)",
    "level": "AAA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo độ tương phản (contrast) tối thiểu giữa văn bản thường và nền là 7:1, và văn bản lớn là 4.5:1.",
    "why": "Giúp user bị suy giảm thị lực nặng có thể đọc nội dung trực tiếp mà không cần bật phần mềm hỗ trợ phóng to màn hình.",
    "how": [
      "Sử dụng màu chữ tối hơn hoặc nền sáng hơn để đạt tỷ lệ tương phản cực cao.",
      "Thiết kế một bộ chuyển đổi độ tương phản (contrast) cao (High Contrast Mode) riêng cho UI nếu không muốn đổi bảng màu gốc."
    ],
    "do": "Chữ đen (#000000) trên nền trắng đạt tỷ lệ tương phản 21:1 (vượt chuẩn AAA).",
    "dont": "Sử dụng chữ xám (#888888) trên nền trắng chỉ đạt tương phản 3.5:1."
  },
  {
    "id": "low-or-no-background-audio",
    "wcag": "1.4.7",
    "title": "Âm thanh nền cực nhỏ hoặc không có (Low or No Background Audio)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Đảm bảo các tệp âm thanh chỉ có lời nói ghi sẵn không chứa nhạc nền, hoặc tiếng nhạc nền nhỏ hơn tiếng nói ít nhất 20 decibel.",
    "why": "user máy trợ thính hoặc người suy giảm thính lực khó lọc được giọng nói nếu có tiếng ồn nền lớn.",
    "how": [
      "Bàn giao tài liệu thiết kế âm thanh yêu cầu lọc bỏ hoàn toàn tạp âm và nhạc nền trong các video bài giảng/hướng dẫn."
    ],
    "do": "Video hướng dẫn chỉ có tiếng nói thuyết minh trong môi trường hoàn toàn yên tĩnh.",
    "dont": "Phát nhạc nền sôi động lồng dưới lời thuyết minh của chuyên gia."
  },
  {
    "id": "visual-presentation",
    "wcag": "1.4.8",
    "title": "Cho phép user tùy biến UI đọc văn bản (Visual Presentation)",
    "level": "AAA",
    "category": "visual",
    "isNew22": false,
    "desc": "Cung cấp khả năng tùy biến văn bản cho user: đổi màu chữ/nền, giới hạn chiều rộng đoạn văn dưới 80 ký tự, căn lề trái (không căn đều hai bên), và điều chỉnh giãn dòng.",
    "why": "user mắc chứng khó đọc (dyslexia) hoặc suy giảm thị lực cần cấu trúc chữ thưa và không căn đều hai bên để tránh nhầm dòng.",
    "how": [
      "Thiết kế đoạn văn căn lề trái (hoặc phải tùy ngôn ngữ), không dùng căn đều hai bên (Justify).",
      "Đảm bảo khoảng cách dòng tối thiểu 1.5 lần cỡ chữ, và giãn cách đoạn văn gấp 1.5 lần giãn cách dòng."
    ],
    "do": "UI bài viết blog có khoảng rộng chữ tối đa 650px và căn lề trái tự nhiên.",
    "dont": "Thiết kế căn đều hai bên (Justify) tạo ra nhiều 'khoảng trắng dọc' gây nhức mắt cho người đọc."
  },
  {
    "id": "images-of-text-no-exception",
    "wcag": "1.4.9",
    "title": "Tuyệt đối không dùng hình ảnh chứa chữ (Images of Text - No Exception)",
    "level": "AAA",
    "category": "visual",
    "isNew22": false,
    "desc": "Không được sử dụng hình ảnh chứa chữ trừ khi đó là biểu trưng (logo) hoặc thương hiệu.",
    "why": "Chữ trên ảnh sẽ bị mờ vỡ khi phóng to và Screen Reader hoàn toàn không thể đọc trực tiếp được.",
    "how": [
      "Sử dụng CSS để thiết kế chữ đè lên ảnh thay vì vẽ chữ trực tiếp vào ảnh trong Photoshop/Figma."
    ],
    "do": "Banner dùng text thật dựng bằng HTML/CSS đè lên trên ảnh nền.",
    "dont": "Tạo banner quảng cáo chứa thông tin khuyến mãi dạng ảnh JPG đính kèm."
  },
  {
    "id": "reflow",
    "wcag": "1.4.10",
    "title": "Co giãn UI không bị cuộn ngang (Reflow/Responsive ở 320px)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo nội dung có thể hiển thị ở chiều rộng tương đương 320 CSS pixels (thu phóng 400%) mà không cần cuộn ngang (trừ các nội dung đặc thù như bảng dữ liệu lớn, bản đồ, sơ đồ).",
    "why": "Người suy giảm thị lực thường phóng to màn hình rất lớn; nếu bố cục không co giãn theo, họ phải cuộn ngang liên tục gây mất phương hướng và mệt mỏi.",
    "how": [
      "Thiết kế responsive thích ứng tốt ở chiều rộng 320px (tương đương thu phóng 400% trên màn hình 1280px).",
      "Tránh dùng bố cục nhiều cột cố định; sử dụng CSS Flexbox hoặc Grid để các cột tự động xếp chồng thành một cột khi thu hẹp."
    ],
    "do": "Trang bài viết tự động chuyển từ bố cục 2 cột sang 1 cột khi thu hẹp xuống 320px, nội dung chỉ cuộn dọc.",
    "dont": "Trang web xuất hiện thanh cuộn ngang bắt buộc khi phóng to 400%, user phải cuộn qua lại để đọc hết mỗi dòng chữ."
  },
  {
    "id": "non-text-contrast",
    "wcag": "1.4.11",
    "title": "độ tương phản (contrast) cho nút, viền, icon tối thiểu 3:1 (Non-text Contrast)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo các thành phần UI (nút bấm, ô nhập liệu, biểu tượng) và các đồ họa thông tin quan trọng (biểu đồ, sơ đồ) có độ tương phản (contrast) tối thiểu 3:1 so với màu nền liền kề.",
    "why": "Người suy giảm thị lực cần nhìn rõ viền nút bấm, viền ô nhập liệu và biểu đồ để phân biệt các thành phần tương tác và hiểu dữ liệu trực quan.",
    "how": [
      "Kiểm tra tỷ lệ tương phản của viền nút bấm, viền ô nhập, biểu tượng hành động và các phần tử đồ họa so với nền xung quanh đạt tối thiểu 3:1.",
      "Đảm bảo trạng thái focus, hover và active của các phần tử tương tác cũng đạt tỷ lệ tương phản 3:1."
    ],
    "do": "Ô nhập liệu có viền xám đậm (#767676) trên nền trắng đạt tương phản 4.5:1, biểu tượng tìm kiếm màu đậm rõ ràng.",
    "dont": "Ô nhập liệu chỉ có viền xám nhạt (#E0E0E0) gần như hòa lẫn với nền trắng, user khó nhận diện vị trí nhập."
  },
  {
    "id": "text-spacing",
    "wcag": "1.4.12",
    "title": "Không lỗi khi user tự tăng giãn cách chữ (Text Spacing)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo UI không bị lỗi hiển thị khi user điều chỉnh tăng giãn cách dòng, giãn cách đoạn văn, giãn cách chữ và giãn cách từ.",
    "why": "user có vấn đề về đọc thường sử dụng stylesheet cá nhân để giãn rộng chữ giúp dễ đọc hơn.",
    "how": [
      "Thiết kế các khối văn bản mềm dẻo, tự động đẩy các phần tử khác xuống khi tăng chiều cao dòng.",
      "Tránh sử dụng thuộc tính chiều cao tuyệt đối (fixed height) cho các ô chứa văn bản."
    ],
    "do": "Ô tiêu đề tự động xuống dòng và đẩy phần mô tả xuống dưới khi tăng khoảng cách chữ.",
    "dont": "Chữ đè lên nhau hoặc bị cắt cụt do khung chứa quá hẹp và cố định chiều cao."
  },
  {
    "id": "hover-focus-content-dismissible",
    "wcag": "1.4.13",
    "title": "Nội dung hiện khi hover/focus (Tooltip, Dropdown) phải tắt được và giữ chuột được",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Nội dung phụ xuất hiện khi hover chuột hoặc focus (như tooltips, menu thả xuống) phải tắt được (dismissible), hover lên được (hoverable), và tồn tại lâu dài (persistent).",
    "why": "Đảm bảo user sử dụng kính lúp hoặc bị run tay có thể đọc và tương tác với nội dung phụ mà không sợ nó tự động biến mất.",
    "how": [
      "Thiết kế cách tắt nội dung phụ bằng phím Escape.",
      "Cho phép con trỏ chuột di chuyển trực tiếp lên vùng chứa nội dung phụ vừa hiện ra."
    ],
    "do": "Menu con hiển thị và giữ nguyên trạng thái khi user rê chuột từ nút chính vào menu con.",
    "dont": "Tooltip tự biến mất sau vài giây hoặc tự đóng khi con trỏ lệch 1px khỏi nút chính."
  },
  {
    "id": "keyboard-operable",
    "wcag": "2.1.1",
    "title": "Điều hành mọi tính năng bằng bàn phím (Keyboard Only)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Tất cả các chức năng tương tác đều có thể vận hành được chỉ bằng bàn phím (không cần dùng chuột).",
    "why": "Người mù, người liệt tay hoặc suy giảm vận động sử dụng bàn phím hoặc công cụ mô phỏng bàn phím để tương tác.",
    "how": [
      "Thiết kế các nút bấm, menu, link bằng các thẻ tương tác tiêu chuẩn.",
      "Đảm bảo các trạng thái focus trực quan rõ ràng đối với từng phần tử tương tác."
    ],
    "do": "user có thể Tab đến nút 'Mua ngay' và ấn Enter để thực hiện hành động.",
    "dont": "Thiết kế một bản đồ kéo thả tùy biến bằng JavaScript mà hoàn toàn không có cách nào dùng phím Tab và phím mũi tên để chọn vị trí."
  },
  {
    "id": "no-keyboard-trap",
    "wcag": "2.1.2",
    "title": "Không kẹt phím điều hướng (No Keyboard Trap)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Đảm bảo focus bàn phím (focus) không bị 'kẹt' lại ở bất kỳ phần tử nào trên trang mà không thể thoát ra bằng phím di chuyển thông thường.",
    "why": "user chỉ sử dụng bàn phím sẽ bị khóa cứng trên trang và không thể tắt/thoát nếu rơi vào bẫy kẹt focus.",
    "how": [
      "Khi thiết kế popup/modal (modal popup), đảm bảo nút Đóng (Close) luôn có thể chọn được bằng cách nhấn phím Tab hoặc ESC để đóng modal."
    ],
    "do": "Nhấn phím ESC tự động đóng modal và trả focus lại cho phần tử kích hoạt trước đó.",
    "dont": "Mở popup/modal khảo sát đè lên UI chính mà không có cách nào dùng phím Tab để chuyển đến nút đóng."
  },
  {
    "id": "keyboard-no-exception",
    "wcag": "2.1.3",
    "title": "Điều hướng bằng bàn phím tuyệt đối không có ngoại lệ (Keyboard - No Exception)",
    "level": "AAA",
    "category": "interaction",
    "isNew22": false,
    "desc": "Tất cả mọi chức năng của trang web phải điều hướng được bằng bàn phím mà không có bất kỳ ngoại lệ nào.",
    "why": "Loại bỏ hoàn toàn các rào cản tương tác đối với user không thể sử dụng chuột.",
    "how": [
      "Thiết kế các thao tác phức tạp nhất (vẽ đồ họa, kéo thả phần tử) đều có bảng điều khiển phím phụ trợ đi kèm."
    ],
    "do": "Trình chỉnh sửa ảnh cho phép dùng phím mũi tên và shortcut để căn lề ảnh chính xác.",
    "dont": "Cho phép vẽ tự do trên màn hình bằng chuột nhưng không có giải pháp bàn phím thay thế."
  },
  {
    "id": "character-key-shortcuts",
    "wcag": "2.1.4",
    "title": "Cho phép tắt hoặc đổi shortcut ký tự đơn (Character Key Shortcuts)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Nếu thiết kế shortcut chỉ sử dụng một phím ký tự đơn (ví dụ nhấn 'm' để tắt tiếng), phải cho phép user tắt shortcut đó hoặc thêm phím bổ trợ (như Ctrl/Cmd).",
    "why": "user sử dụng phần mềm đọc giọng nói có thể vô tình kích hoạt hàng loạt shortcut khi họ đọc văn bản.",
    "how": [
      "Cung cấp màn hình cấu hình shortcut cho phép tắt bỏ các shortcut đơn lẻ.",
      "Khuyến nghị sử dụng tổ hợp phím có phím điều khiển (Ctrl, Alt, Cmd) thay vì dùng một ký tự đơn."
    ],
    "do": "Thiết kế shortcut chuyển trang là Ctrl + Shift + Mũi tên phải.",
    "dont": "Định nghĩa phím 'S' để bắt đầu tìm kiếm mà không cho phép vô hiệu hóa."
  },
  {
    "id": "timing-adjustable",
    "wcag": "2.2.1",
    "title": "Cho phép kéo dài thời gian giới hạn session (Session timeout)",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Cung cấp tùy chọn cho phép user tắt, điều chỉnh hoặc kéo dài thời gian giới hạn của một session (session).",
    "why": "Người khuyết tật vận động hoặc nhận thức cần nhiều thời gian hơn để đọc tài liệu và điền form.",
    "how": [
      "Trước khi hết hạn session 2 phút, hiển thị một popup/modal cảnh báo cho phép kéo dài thời gian bằng cách nhấn một nút bấm đơn giản."
    ],
    "do": "Hiển thị thông báo: 'Phiên của bạn sắp hết hạn sau 2 phút. Bấm nút Kéo Dài để tiếp tục'.",
    "dont": "Tự động đăng xuất user đang điền dở tờ khai thanh toán mà không có cảnh báo trước."
  },
  {
    "id": "pause-stop-hide",
    "wcag": "2.2.2",
    "title": "Có nút dừng cho banner chạy, carousel hoặc chữ chạy tự động (Pause, Stop, Hide)",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Đối với các nội dung tự động di chuyển, nhấp nháy hoặc cuộn kéo dài hơn 5 giây (như banner quảng cáo chạy, carousel), phải có nút tạm dừng hoặc ẩn đi.",
    "why": "Chữ chuyển động liên tục gây mất tập trung nghiêm trọng cho user mắc hội chứng giảm chú ý (ADHD) hoặc gây khó khăn cho user screen reader.",
    "how": [
      "Thiết kế nút Tạm dừng (Pause) trực quan hiển thị rõ ràng trên các slider/carousel tự động chạy.",
      "Tự động dừng hoạt ảnh cuộn sau 5 giây nếu user không tương tác."
    ],
    "do": "Carousel tự chạy có nút Pause/Play nổi bật ở góc dưới.",
    "dont": "Thiết kế dải chữ chạy tin tức (ticker) chuyển động liên tục ở chân trang mà không có cách nào dừng lại."
  },
  {
    "id": "no-timing",
    "wcag": "2.2.3",
    "title": "Không giới hạn thời gian thực hiện tác vụ (No Timing)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Thiết kế các tác vụ không chứa bất kỳ giới hạn thời gian nào, ngoại trừ các sự kiện trực tiếp không thể thay đổi thời gian (như đấu giá).",
    "why": "Giúp user hoàn thành công việc ở tốc độ của riêng họ mà không gặp bất kỳ áp lực căng thẳng nào.",
    "how": [
      "Loại bỏ hoàn toàn các bộ đếm ngược thời gian trong các form đăng ký hoặc bài kiểm tra phi thực tế."
    ],
    "do": "Bài thi trắc nghiệm trực tuyến cho phép người học lưu lại tiến trình và hoàn thành bất cứ khi nào họ muốn.",
    "dont": "Giới hạn thời gian 15 phút để đọc một trang điều khoản chính sách dài dằng dặc."
  },
  {
    "id": "interruptions",
    "wcag": "2.2.4",
    "title": "Cho phép trì hoãn các thông báo/popup gián đoạn đột ngột (Interruptions)",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Cho phép user tắt hoặc trì hoãn các cảnh báo gián đoạn đột ngột (như popup quảng cáo, thông báo cập nhật hệ thống), trừ trường hợp khẩn cấp.",
    "why": "Popup bất ngờ xuất hiện gây rối loạn định hướng cho user khiếm thị hoặc người khuyết tật nhận thức.",
    "how": [
      "Cung cấp tùy chọn cấu hình: 'Chế độ không làm phiền' giúp chặn mọi thông báo popup phụ."
    ],
    "do": "Popup cập nhật phần mềm có nút chọn 'Nhắc tôi sau 1 ngày'.",
    "dont": "Tự động nhảy ra popup khảo sát giữa lúc user đang thực hiện thanh toán giao dịch."
  },
  {
    "id": "re-authenticating",
    "wcag": "2.2.5",
    "title": "Lưu trữ và bảo toàn dữ liệu form khi phải đăng nhập lại (Re-authenticating)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Nếu session hết hạn và bắt buộc đăng nhập lại, đảm bảo dữ liệu user đã điền dở trong form được bảo toàn và gửi đi bình thường sau khi đăng nhập.",
    "why": "Giúp user không bị mất công sức nhập lại toàn bộ thông tin dài khi phiên đăng nhập bị ngắt giữa chừng.",
    "how": [
      "Thiết kế cơ chế lưu trữ tạm thời dữ liệu form trên máy khách (client-side) hoặc máy chủ trước khi chuyển tiếp user sang trang đăng nhập."
    ],
    "do": "Sau khi đăng nhập lại, form khai báo thuế tự động tải lại đầy đủ các trường thông tin đã điền trước đó.",
    "dont": "Xóa sạch toàn bộ form và bắt user điền lại từ bước 1 sau khi đăng nhập lại thành công."
  },
  {
    "id": "timeouts-warning",
    "wcag": "2.2.6",
    "title": "Cảnh báo trước khi hết hạn session (Timeouts)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Thông báo trước cho user về thời gian hết hạn của phiên hoạt động và nguy cơ mất dữ liệu nếu họ không tương tác tiếp.",
    "why": "Giúp user chủ động lưu lại tiến trình làm việc trước khi bị ngắt kết nối đột ngột.",
    "how": [
      "Thiết kế thông báo hiển thị thời hạn còn lại ngay từ khi mở trang (ví dụ: 'Phiên đăng nhập này có hiệu lực trong 30 phút')."
    ],
    "do": "Hiển thị dòng chữ nhỏ ở thanh trạng thái: 'session sẽ tự động kết thúc vào lúc 15:30'.",
    "dont": "Đăng xuất user một cách im lặng và xóa sạch dữ liệu giỏ hàng mà không báo trước."
  },
  {
    "id": "three-flashes",
    "wcag": "2.3.1",
    "title": "Tránh thiết kế nội dung nhấp nháy mạnh (Three Flashes or Below Threshold)",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Không thiết kế nội dung nhấp nháy quá 3 lần trong vòng 1 giây, hoặc vượt quá ngưỡng nhấp nháy cho phép.",
    "why": "Nội dung nhấp nháy mạnh tần số cao có thể kích hoạt các cơn co giật động kinh ở những người nhạy cảm với ánh sáng.",
    "how": [
      "Kiểm tra các hoạt ảnh banner động để đảm bảo tần suất nhấp nháy dưới 3Hz.",
      "Không sử dụng các hiệu ứng chuyển động lóa mắt đột ngột."
    ],
    "do": "Hoạt ảnh gif nhấp nháy chậm với tần suất 1 lần mỗi 2 giây.",
    "dont": "Thiết kế banner sự kiện chớp nháy màu đỏ-xanh liên tục với tốc độ cao."
  },
  {
    "id": "three-flashes-no-exception",
    "wcag": "2.3.2",
    "title": "Hoàn toàn không có nội dung nhấp nháy (Three Flashes - No Exception)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Đảm bảo trang web hoàn toàn không chứa bất kỳ nội dung nào nhấp nháy quá 3 lần trong 1 giây mà không có bất kỳ ngoại lệ nào.",
    "why": "Loại bỏ hoàn toàn rủi ro gây co giật cho tất cả user nhạy cảm với ánh sáng.",
    "how": [
      "Nghiêm cấm sử dụng các hiệu ứng nhấp nháy tần suất cao trên toàn bộ trang."
    ],
    "do": "Các hiệu ứng chuyển đổi trạng thái (transitions) hoạt động mượt mà và dịu mắt.",
    "dont": "Nhúng video chứa các cảnh chớp đèn strobe sáng mạnh liên tục."
  },
  {
    "id": "animation-from-interactions",
    "wcag": "2.3.3",
    "title": "Cho phép tắt các hiệu ứng/hoạt ảnh chuyển động (Animation from Interactions)",
    "level": "AAA",
    "category": "visual",
    "isNew22": false,
    "desc": "Cung cấp tùy chọn tắt tất cả hoạt ảnh chuyển động được kích hoạt bởi sự tương tác của user, trừ khi hoạt ảnh đó là thiết yếu đối với chức năng.",
    "why": "Hoạt ảnh cuộn trang hoặc chuyển động 3D phức tạp có thể gây chóng mặt, buồn nôn cho người mắc hội chứng tiền đình.",
    "how": [
      "Hỗ trợ truy vấn media query `@media (prefers-reduced-motion)` trong CSS để tắt hoạt ảnh khi user yêu cầu trên OS.",
      "Thiết kế nút tắt hoạt ảnh trực tiếp trên trang web."
    ],
    "do": "Khi chế độ giảm chuyển động được bật, các hiệu ứng trượt mượt chuyển thành hiệu ứng ẩn hiện (fade-in) tức thì.",
    "dont": "Bắt buộc user xem hiệu ứng cuộn trang parallax giật cục làm mỏi mắt."
  },
  {
    "id": "bypass-blocks",
    "wcag": "2.4.1",
    "title": "Nút nhảy nhanh đến nội dung chính (Skip to content / Bypass Blocks)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Cung cấp cơ chế cho phép user bàn phím bỏ qua các khối nội dung lặp lại (như thanh menu chính) để đi thẳng đến nội dung chính.",
    "why": "user bàn phím không phải nhấn phím Tab hàng chục lần qua tất cả các link menu ở mỗi lần tải trang.",
    "how": [
      "Thiết kế link ẩn 'Bỏ qua và đi đến nội dung chính' (Skip to content) xuất hiện đầu tiên khi user nhấn Tab lần đầu khi tải trang.",
      "Cấu trúc trang rõ ràng bằng các phần tử HTML5 landmark."
    ],
    "do": "Nhấn phím Tab đầu tiên hiện nút 'Chuyển nhanh đến nội dung chính' ở đầu trang.",
    "dont": "Bắt user Tab qua 50 danh mục sản phẩm trước khi tiếp cận được bài viết chính."
  },
  {
    "id": "page-titled",
    "wcag": "2.4.2",
    "title": "Tiêu đề trang (Page Title) mô tả đúng nội dung",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo mỗi trang web đều có một tiêu đề trang độc nhất, mô tả chính xác nội dung hoặc mục đích của trang đó.",
    "why": "Giúp user khiếm thị nhận biết ngay lập tức họ đang ở trang nào khi chuyển đổi giữa các thẻ browser.",
    "how": [
      "Thiết kế tiêu đề trang động thay đổi theo nội dung hiển thị (ví dụ: 'Giỏ hàng | Antigravity' thay vì chỉ để tên thương hiệu)."
    ],
    "do": "Tiêu đề thẻ browser hiển thị: 'Thanh toán đơn hàng #12345 - Antigravity Store'.",
    "dont": "Tất cả các trang con trong website đều dùng chung một tiêu đề cố định: 'Trang chủ'."
  },
  {
    "id": "focus-order",
    "wcag": "2.4.3",
    "title": "Thứ tự di chuyển focus bàn phím tự nhiên và logic (Focus Order)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo thứ tự di chuyển focus khi dùng phím Tab qua các phần tử tương tác là tự nhiên và logic.",
    "why": "Giúp user bàn phím điều hướng qua các form và menu theo trình tự mong đợi, tránh bị nhảy lộn xộn.",
    "how": [
      "Sắp xếp thứ tự các phần tử tương tác trong mã nguồn HTML tương đồng với thứ tự hiển thị trực quan trên màn hình.",
      "Tránh dùng thuộc tính `tabindex` dương (như `tabindex=\"1\"`) vì nó phá vỡ thứ tự focus mặc định của browser."
    ],
    "do": "Thứ tự Tab đi từ ô nhập Họ tên -> ô Email -> ô Mật khẩu -> nút Gửi.",
    "dont": "Nhấn Tab nhảy từ ô Họ tên xuống nút Gửi, rồi nhấn Tab tiếp mới quay lại ô nhập Email."
  },
  {
    "id": "link-purpose-context",
    "wcag": "2.4.4",
    "title": "Tên link rõ nghĩa hoặc có ngữ cảnh rõ ràng (Link Purpose)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Mục đích của mỗi link phải được xác định rõ thông qua chữ viết của chính link đó, hoặc qua câu văn chứa nó.",
    "why": "Người khiếm thị có thể hiểu được đích đến của đường link mà không cần đọc toàn bộ trang.",
    "how": [
      "Tránh viết các link dạng 'Xem thêm' hoặc 'Bấm vào đây' chung chung.",
      "Nếu bắt buộc, hãy dùng thuộc tính `aria-label` để bổ sung thông tin (ví dụ: `aria-label=\"Đọc thêm về sản phẩm ABC\"`)."
    ],
    "do": "link viết rõ ràng: 'Tải về mẫu đơn đăng ký thuế (PDF)'.",
    "dont": "Đoạn văn kết thúc bằng link: 'Để biết thêm chi tiết, nhấp vào [đây]'."
  },
  {
    "id": "multiple-ways",
    "wcag": "2.4.5",
    "title": "Cung cấp nhiều cách để tìm thấy một trang (Multiple Ways)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Cung cấp ít nhất hai cách khác nhau để tìm kiếm một trang web trong hệ thống (ví dụ: Thanh tìm kiếm, sitemap Sitemap, Menu phân cấp).",
    "why": "user khuyết tật nhận thức có thể thích dùng sitemap trực quan hơn là dùng menu đa cấp phức tạp.",
    "how": [
      "Thiết kế thanh tìm kiếm ở đầu trang và đồng thời cung cấp link Sitemap ở chân trang (Footer)."
    ],
    "do": "Trang web có cả thanh tìm kiếm tổng thể và menu danh mục danh sách rõ ràng.",
    "dont": "Chỉ cung cấp menu thả xuống nhiều cấp và không có cách nào khác để tìm các trang ẩn bên trong."
  },
  {
    "id": "headings-labels",
    "wcag": "2.4.6",
    "title": "Tiêu đề phần và label ô nhập rõ nghĩa (Headings and Labels)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Các tiêu đề phần (headings) và label form (labels) phải được viết rõ nghĩa, mô tả đúng chủ đề hoặc mục đích.",
    "why": "Giúp user nhanh chóng lướt qua trang và hiểu đúng các khu vực nội dung mà không bị nhầm lẫn.",
    "how": [
      "Đặt tiêu đề phần ngắn gọn và phản ánh đúng nội dung phía sau.",
      "Tránh đặt label ô nhập liệu mơ hồ (ví dụ: label 'Thông tin' quá rộng, thay vào đó hãy ghi cụ thể 'Thông tin liên hệ')."
    ],
    "do": "label ô nhập ghi rõ: 'Họ và tên đệm', 'Tên riêng'. Tiêu đề phần ghi: 'Thông tin tài khoản'.",
    "dont": "label ô nhập chỉ ghi: 'Nhập thông tin tại đây'."
  },
  {
    "id": "focus-visible-standard",
    "wcag": "2.4.7",
    "title": "Hiển thị rõ chỉ báo focus bàn phím (Focus Visible)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Bất kỳ phần tử nhận focus nào đều phải hiển thị chỉ báo focus trực quan khi điều hướng bằng bàn phím.",
    "why": "user bàn phím cần biết rõ vị trí tương tác hiện tại của họ trên trang.",
    "how": [
      "Giữ nguyên focus ring mặc định hoặc thiết kế focus ring riêng có độ tương phản (contrast) tối thiểu 3:1 so với nền."
    ],
    "do": "Vòng focus ring màu xanh lam bao quanh phần tử khi user Tab qua.",
    "dont": "Đặt thuộc tính CSS `outline: none` mà không có chỉ báo focus thay thế."
  },
  {
    "id": "location",
    "wcag": "2.4.8",
    "title": "Thông báo rõ ràng vị trí hiện tại của user trong sitemap / user journey",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Cung cấp thông tin trực quan cho biết user hiện đang ở đâu trong cấu trúc phân cấp của website (ví dụ: dùng Breadcrumbs).",
    "why": "Giúp người khuyết tật nhận thức hoặc user bị lạc hướng dễ dàng định vị lại vị trí của họ.",
    "how": [
      "Thiết kế navigation bar Breadcrumb ở phía trên nội dung trang con.",
      "Đánh dấu trạng thái 'Active' của trang hiện tại trên thanh menu chính."
    ],
    "do": "Hiển thị: 'Trang chủ > Sản phẩm > Điện thoại > iPhone 15' trên navigation bar.",
    "dont": "Trang web sâu nhiều cấp nhưng không có chỉ dẫn nào cho biết đang ở chuyên mục nào."
  },
  {
    "id": "link-purpose-link-only",
    "wcag": "2.4.9",
    "title": "Tên link phải rõ nghĩa độc lập (Link Purpose - Link Only)",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo mục đích của mỗi link có thể được hiểu rõ chỉ bằng chính dòng chữ trong đường link đó (không cần dựa vào ngữ cảnh xung quanh).",
    "why": "Cho phép user khiếm thị duyệt danh sách link một cách nhanh chóng và chính xác nhất.",
    "how": [
      "Không bao giờ dùng chữ 'Xem thêm' làm text của link. Phải ghi rõ: 'Xem thêm thông tin về sản phẩm X'."
    ],
    "do": "Văn bản link ghi: 'Đọc hướng dẫn cài đặt phần mềm Antigravity'.",
    "dont": "Đoạn văn chứa link: 'Nhấp vào [link này] để xem tài liệu hướng dẫn'."
  },
  {
    "id": "section-headings-enhanced",
    "wcag": "2.4.10",
    "title": "Phân chia các khối nội dung lớn bằng tiêu đề (Section Headings)",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Sử dụng tiêu đề phần để tổ chức tất cả các khối nội dung lớn trên trang.",
    "why": "Giúp phân tách trực quan các phần nội dung rõ ràng, cải thiện trải nghiệm đọc cho tất cả mọi người.",
    "how": [
      "Đặt các thẻ H2, H3 làm tiêu đề cho mỗi khu vực bài viết, sản phẩm hoặc form trên trang."
    ],
    "do": "Các khối nội dung được chia bằng tiêu đề H2 rõ nghĩa như: 'Tính năng chính', 'Ý kiến khách hàng'.",
    "dont": "Trang thông tin dài hàng trang giấy chỉ có chữ thường viết liền mạch mà không được phân chia bằng tiêu đề."
  },
  {
    "id": "focus-not-obscured-minimum",
    "wcag": "2.4.11",
    "title": "focus ring không bị che khuất hoàn toàn bởi Sticky Header/Popup (AA)",
    "level": "AA",
    "category": "visual",
    "isNew22": true,
    "desc": "Khi một thành phần nhận focus bàn phím, nó không được bị che khuất hoàn toàn bởi nội dung cố định (như header dính, quảng cáo nổi).",
    "why": "user bàn phím cần nhìn thấy ít nhất một phần của phần tử nhận focus để biết mình đang ở đâu.",
    "how": [
      "Sử dụng `scroll-margin-top` trong CSS để tránh phần tử bị khuất dưới Sticky Header khi cuộn Tab."
    ],
    "do": "focus ring hiển thị rõ phía dưới chân của Sticky Header khi user Tab qua.",
    "dont": "Thanh header cố định che hoàn toàn ô nhập liệu nhận focus hiện tại."
  },
  {
    "id": "focus-not-obscured-enhanced",
    "wcag": "2.4.12",
    "title": "focus ring không bị che khuất dù chỉ một phần (AAA)",
    "level": "AAA",
    "category": "visual",
    "isNew22": true,
    "desc": "Đảm bảo 100% diện tích của thành phần nhận focus không bị che khuất bởi bất kỳ nội dung nào khác trên màn hình.",
    "why": "Tối ưu hóa khả năng quan sát focus bàn phím cho user suy giảm thị lực.",
    "how": [
      "Tính toán khoảng cách an toàn, thiết kế cơ chế tự động đẩy popup hoặc ẩn banner nổi khi focus bàn phím di chuyển vào vùng bị khuất."
    ],
    "do": "Popup chatbot tự động thu nhỏ lại khi user Tab qua các nút hành động nằm ngay phía sau chatbot.",
    "dont": "Chatbot nằm đè và che khuất hoàn toàn nút bấm nhận focus ở góc phải màn hình."
  },
  {
    "id": "focus-appearance-enhanced",
    "wcag": "2.4.13",
    "title": "Chỉ báo focus dày tối thiểu 2px và tương phản cao (Focus Appearance)",
    "level": "AAA",
    "category": "visual",
    "isNew22": true,
    "desc": "Đảm bảo chỉ báo focus có kích thước tối thiểu tương đương đường viền dày 2px bao quanh phần tử và có độ tương phản (contrast) tối thiểu 3:1.",
    "why": "Người suy giảm thị lực nặng có thể dễ dàng nhìn thấy focus mà không phải dò tìm căng thẳng.",
    "how": [
      "Thiết kế chỉ báo focus là một đường viền đậm màu sắc tương phản cao bao quanh hoàn toàn phần tử."
    ],
    "do": "Nút bấm có focus ring màu xanh neon dày 2px bao quanh bên ngoài khi nhận focus.",
    "dont": "Chỉ đổi nhẹ bóng đổ (box-shadow) mờ nhạt của nút khi focus bàn phím."
  },
  {
    "id": "pointer-gestures",
    "wcag": "2.5.1",
    "title": "Hỗ trợ chạm đơn giản thay cho vuốt, chụm ngón tay (Pointer Gestures)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Mọi cử chỉ tương tác phức tạp (như vuốt swipe, chụm ngón tay pinch, vẽ đường) phải có giải pháp thay thế bằng các thao tác chạm đơn giản (như tap, bấm nút).",
    "why": "user sử dụng các thiết bị trợ giúp (chuột bằng đầu, thiết bị một chạm) hoặc người bị run tay không thể thực hiện các vuốt chính xác.",
    "how": [
      "Thiết kế thêm các nút bấm mũi tên '<' và '>' để chuyển ảnh bên cạnh thao tác vuốt ngang slider.",
      "Cung cấp thanh trượt thu phóng bằng nút '+' và '-' thay vì chỉ có pinch-to-zoom."
    ],
    "do": "Trình xem ảnh có hai nút bấm 'Trước' và 'Sau' hiển thị rõ ràng.",
    "dont": "Một carousel ảnh trên mobile chỉ có thể vuốt để chuyển ảnh mà không có bất kỳ nút điều khiển nào khác."
  },
  {
    "id": "pointer-cancellation",
    "wcag": "2.5.2",
    "title": "Chỉ kích hoạt hành động khi nhấc chuột/tay lên (Pointer Cancellation)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Các sự kiện tương tác kích hoạt bằng chạm/click phải được kích hoạt ở sự kiện nhấc lên (mouseup / touchend), cho phép user hủy bỏ hành động bằng cách di ngón tay ra ngoài trước khi nhấc lên.",
    "why": "Ngăn ngừa việc vô tình kích hoạt nhầm nút bấm khi user lỡ tay chạm vào màn hình.",
    "how": [
      "Thiết kế các nút bấm tương tác kích hoạt khi nhấc chuột/tay lên (click), không kích hoạt khi vừa nhấn xuống (mousedown)."
    ],
    "do": "user bấm nhầm nút 'Hủy đơn hàng', hover ra ngoài nút rồi mới nhấc tay ra thì hành động không bị kích hoạt.",
    "dont": "Hành động thanh toán lập tức kích hoạt ngay khi ngón tay vừa chạm xuống (mousedown) trên nút."
  },
  {
    "id": "label-in-name",
    "wcag": "2.5.3",
    "title": "label hiển thị trùng với tên ẩn lập trình (Label in Name)",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Đối với các thành phần có chứa văn bản hiển thị trực quan, tên lập trình ẩn (accessible name) của nó phải chứa chính văn bản đó.",
    "why": "user sử dụng điều khiển bằng giọng nói có thể gọi đúng tên nút hiển thị trên màn hình để kích hoạt.",
    "how": [
      "Nếu nút ghi chữ 'Tìm kiếm', đảm bảo label ẩn `aria-label` của nó cũng chứa chữ 'Tìm kiếm' chứ không đặt tên khác như 'SearchBtn'."
    ],
    "do": "Nút bấm hiển thị 'Gửi email', mã lập trình tương ứng có `aria-label=\"Gửi email đăng ký của bạn\"`.",
    "dont": "Nút bấm hiển thị chữ 'OK' nhưng mã lập trình ẩn lại đặt `aria-label=\"Chấp nhận điều khoản và thanh toán\"`."
  },
  {
    "id": "motion-actuation",
    "wcag": "2.5.4",
    "title": "Có nút thay thế cho thao tác lắc/nghiêng thiết bị (Motion Actuation)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Các hành động kích hoạt bằng cách lắc, xoay hoặc nghiêng thiết bị phải có nút bấm thay thế trực quan trên màn hình và có thể tắt được cảm biến chuyển động.",
    "why": "user đặt điện thoại cố định trên bàn hoặc người bị khuyết tật vận động không thể lắc thiết bị để thực hiện tác vụ.",
    "how": [
      "Nếu có tính năng lắc để undo (Shake to Undo), hãy thiết kế thêm nút 'undo' (Undo) trực tiếp trên màn hình.",
      "Cung cấp tùy chọn trong phần cài đặt để tắt phản hồi chuyển động."
    ],
    "do": "Thiết kế nút 'Undo' hiển thị rõ trên thanh công cụ soạn thảo.",
    "dont": "Chức năng undo chỉ kích hoạt duy nhất bằng cách lắc mạnh điện thoại."
  },
  {
    "id": "target-size-enhanced",
    "wcag": "2.5.5",
    "title": "Vùng click/tap tối thiểu 44x44px (Target Size - AAA)",
    "level": "AAA",
    "category": "interaction",
    "isNew22": false,
    "desc": "Đảm bảo diện tích vùng click/tap tối thiểu là 44x44 CSS pixels, ngoại trừ các link nội dòng hoặc lý do đặc thù.",
    "why": "Giúp user bị run tay hoặc sử dụng màn hình cảm ứng nhỏ có thể dễ dàng nhấn trúng đích mà không bị bấm nhầm.",
    "how": [
      "Thiết kế tất cả các icon chức năng, checkbox và nút bấm có khoảng đệm tối thiểu đạt kích thước 44x44px."
    ],
    "do": "Biểu tượng giỏ hàng có kích thước hiển thị 24x24px nhưng diện tích bấm hoạt động rộng 44x44px.",
    "dont": "Thiết kế các nút bấm nhỏ nằm san sát nhau với kích thước chỉ 20x20px."
  },
  {
    "id": "concurrent-input-mechanisms",
    "wcag": "2.5.6",
    "title": "Hỗ trợ nhiều phương thức nhập liệu đồng thời (Concurrent Input)",
    "level": "AAA",
    "category": "interaction",
    "isNew22": false,
    "desc": "Trang web không được hạn chế user sử dụng bất kỳ phương thức nhập liệu nào có sẵn trên thiết bị (bàn phím, chuột, màn hình cảm ứng, bút stylus, điều khiển giọng nói).",
    "why": "user có thể chuyển đổi linh hoạt giữa việc chạm màn hình và sử dụng bàn phím ngoài tùy thuộc vào tình trạng sức khỏe của họ.",
    "how": [
      "Không viết code chặn cảm ứng chạm khi phát hiện thiết bị có kết nối chuột.",
      "Đảm bảo UI phản hồi tốt với mọi loại thiết bị ngoại vi."
    ],
    "do": "user máy tính bảng lai có thể vừa chạm màn hình vừa gõ bàn phím vật lý để điền form.",
    "dont": "Khóa không cho phép chạm màn hình cảm ứng trên laptop chỉ vì phát hiện đang dùng chuột."
  },
  {
    "id": "dragging-movements-standard",
    "wcag": "2.5.7",
    "title": "Thao tác thay thế cho kéo thả (Dragging Movements)",
    "level": "AA",
    "category": "interaction",
    "isNew22": true,
    "desc": "Các chức năng yêu cầu kéo thả phải có giải pháp thay thế bằng việc bấm/tap chạm đơn giản.",
    "why": "Nhiều user khuyết tật vận động không thể thực hiện thao tác kéo giữ chuột ổn định trên quãng đường dài.",
    "how": [
      "Thiết kế thêm các nút di chuyển (ví dụ: mũi tên lên/xuống) cho các mục trong danh sách có thể sắp xếp lại."
    ],
    "do": "Cung cấp nút 'Lên' và 'Xuống' bên cạnh mỗi thẻ công việc để sắp xếp thứ tự công việc.",
    "dont": "Thiết kế bảng Kanban chỉ cho phép kéo thả thẻ để chuyển cột mà không có tùy chọn menu nào."
  },
  {
    "id": "target-size-minimum",
    "wcag": "2.5.8",
    "title": "Vùng click/tap tối thiểu 24x24px (Target Size - AA)",
    "level": "AA",
    "category": "interaction",
    "isNew22": true,
    "desc": "vùng click/tap phải đạt tối thiểu 24x24 CSS pixels, hoặc có khoảng cách đệm an toàn để tránh bị bấm chồng lấn.",
    "why": "Hạn chế lỗi bấm nhầm trên màn hình cảm ứng di động.",
    "how": [
      "Đảm bảo các nút bấm cách xa nhau hoặc có kích thước tối thiểu là 24x24px.",
      "Nếu nút nhỏ, hãy thiết kế khoảng cách trống xung quanh lớn hơn."
    ],
    "do": "Biểu tượng nút đóng popup kích thước 16x16px có padding xung quanh rộng 8px tạo thành vùng bấm 32x32px.",
    "dont": "Đặt các nút điều hướng nhỏ 16x16px liền kề nhau không có khoảng trống đệm."
  },
  {
    "id": "language-of-page",
    "wcag": "3.1.1",
    "title": "Khai báo đúng ngôn ngữ của trang (Language of Page)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo ngôn ngữ chính của trang web được khai báo đúng trong mã nguồn (ví dụ: thuộc tính `<html lang=\"vi\">`).",
    "why": "Screen Reader dựa vào khai báo này để phát âm đúng ngữ điệu và ngôn ngữ của văn bản.",
    "how": [
      "Đưa yêu cầu khai báo thuộc tính `lang` tương ứng vào tài liệu thiết kế hệ thống (Design System)."
    ],
    "do": "Mã HTML có thuộc tính `<html lang=\"vi\">` cho trang tiếng Việt.",
    "dont": "Bỏ qua thuộc tính lang khiến Screen Reader dùng tiếng Anh để đọc chữ tiếng Việt."
  },
  {
    "id": "language-of-parts",
    "wcag": "3.1.2",
    "title": "Khai báo ngôn ngữ cho từng phần văn bản ngoại ngữ (Language of Parts)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Khai báo ngôn ngữ riêng biệt cho các đoạn văn hoặc cụm từ viết bằng ngôn ngữ khác với ngôn ngữ chính của trang.",
    "why": "Screen Reader có thể chuyển giọng đọc chuẩn xác khi gặp một cụm từ tiếng nước ngoài giữa câu.",
    "how": [
      "Đánh dấu rõ ràng các từ mượn, câu trích dẫn tiếng nước ngoài để lập trình viên bọc thẻ thích hợp (ví dụ: `<span lang=\"en\">`)."
    ],
    "do": "Đoạn văn viết: 'Chúng tôi hướng tới chuẩn tiếp cận <span lang=\"en\">Accessibility</span> trên web.'",
    "dont": "Viết đoạn văn song ngữ lẫn lộn mà không khai báo thuộc tính lang cho phần dịch ngoại ngữ."
  },
  {
    "id": "unusual-words",
    "wcag": "3.1.3",
    "title": "Giải nghĩa các từ ngữ đặc biệt, biệt ngữ chuyên ngành (Unusual Words)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp cơ chế định nghĩa hoặc giải nghĩa các từ ngữ chuyên ngành, thuật ngữ, biệt ngữ, tiếng lóng hoặc từ ngữ mang nghĩa bóng.",
    "why": "Người khuyết tật trí tuệ hoặc user phổ thông có thể dễ dàng hiểu được các thuật ngữ phức tạp.",
    "how": [
      "Thiết kế thuật ngữ đi kèm link chú giải (Tooltip giải nghĩa) hoặc trang Glossary tổng hợp từ điển thuật ngữ."
    ],
    "do": "Từ chuyên ngành có gạch chân nét đứt, khi hover chuột hiện Tooltip giải thích định nghĩa ngắn.",
    "dont": "Sử dụng hàng loạt thuật ngữ viết tắt chuyên môn y học phức tạp mà không có giải thích."
  },
  {
    "id": "abbreviations",
    "wcag": "3.1.4",
    "title": "Giải nghĩa các từ viết tắt trong lần dùng đầu tiên (Abbreviations)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp định nghĩa đầy đủ cho các từ viết tắt hoặc cụm từ viết tắt chữ đầu (acronyms) ở lần xuất hiện đầu tiên.",
    "why": "Giúp người đọc và Screen Reader hiểu đúng nghĩa của từ viết tắt đó.",
    "how": [
      "Viết đầy đủ nghĩa trước từ viết tắt ở lần đầu dùng (ví dụ: 'Web Content Accessibility Guidelines (WCAG)').",
      "Sử dụng phần tử `<abbr>` trong HTML."
    ],
    "do": "Viết: 'Bộ Y tế (BYT) khuyến nghị...'.",
    "dont": "Sử dụng liên tục các ký tự viết tắt lạ mà không có chú giải ở bất kỳ đâu."
  },
  {
    "id": "reading-level",
    "wcag": "3.1.5",
    "title": "Cung cấp bản tóm tắt dễ hiểu cho văn bản phức tạp (Reading Level)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Nếu văn bản yêu cầu trình độ đọc hiểu cao hơn trung học cơ sở, hãy cung cấp thêm một phiên bản tóm tắt giản lược hoặc giải thích bằng hình ảnh trực quan.",
    "why": "user mắc chứng khó đọc hoặc suy giảm nhận thức có thể nắm bắt được nội dung cốt lõi của các tài liệu pháp lý phức tạp.",
    "how": [
      "Thiết kế hộp tóm tắt nội dung chính ngắn gọn (TL;DR) ở đầu trang bài viết.",
      "Sử dụng biểu đồ hình ảnh minh họa cho các quy trình phức tạp."
    ],
    "do": "Ở đầu văn bản điều khoản dịch vụ dài, có hộp thông tin: 'Tóm tắt nhanh bằng ngôn ngữ dễ hiểu trong 3 gạch đầu dòng'.",
    "dont": "Đăng tải văn bản chính sách chuyên ngành dài 10 trang mà không có bất kỳ dòng tóm tắt nào."
  },
  {
    "id": "pronunciation",
    "wcag": "3.1.6",
    "title": "Hướng dẫn phát âm cho từ ngữ dễ hiểu lầm (Pronunciation)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp cách phát âm cụ thể đối với những từ dễ gây hiểu nhầm nếu không có cách phát âm (như từ đồng chữ dị âm).",
    "why": "Screen Reader và user có thể hiểu sai hoàn toàn ngữ cảnh nếu phát âm sai từ đó.",
    "how": [
      "Sử dụng các ký tự phiên âm quốc tế hoặc file âm thanh phát âm đính kèm bên cạnh từ mơ hồ."
    ],
    "do": "Thiết kế ký hiệu loa nhỏ phát âm thanh phát âm chuẩn bên cạnh tên thương hiệu nước ngoài.",
    "dont": "Sử dụng các từ đồng âm phức tạp mà không có bất kỳ chỉ dẫn phát âm nào."
  },
  {
    "id": "on-focus",
    "wcag": "3.2.1",
    "title": "Không tự động chuyển trang hay thay đổi ngữ cảnh khi nhận focus (On Focus)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Việc di chuyển focus (bấm Tab) đến một phần tử tương tác không được phép tự động kích hoạt hành động thay đổi ngữ cảnh (như tự mở tab mới, tự gửi form).",
    "why": "user khiếm thị điều hướng bàn phím sẽ cực kỳ hoang mang nếu trang web tự động chuyển hướng chỉ vì họ lỡ Tab qua một ô nhập.",
    "how": [
      "Đảm bảo các hành động thay đổi ngữ cảnh chỉ xảy ra khi user chủ động nhấn nút hoặc phím Enter.",
      "Tránh kích hoạt hành động mở popup chỉ bằng việc focus."
    ],
    "do": "Tab qua ô nhập điện thoại hiển thị viền xanh bình thường.",
    "dont": "Chỉ vừa nhấn Tab vào ô nhập điện thoại thì trang web tự động chuyển hướng sang trang mới."
  },
  {
    "id": "on-input",
    "wcag": "3.2.2",
    "title": "Không thay đổi ngữ cảnh đột ngột khi user đang nhập liệu (On Input)",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Thay đổi cài đặt của bất kỳ ô nhập liệu nào (như tích chọn checkbox, chọn một mục trong dropdown) không được tự động gây ra thay đổi ngữ cảnh lớn, trừ khi user đã được báo trước.",
    "why": "Giúp user kiểm soát được UI mà không gặp bất ngờ gây gián đoạn công việc.",
    "how": [
      "Nếu việc chọn một mục trong dropdown tự động chuyển trang, hãy ghi rõ văn bản cảnh báo bên cạnh dropdown.",
      "Tốt nhất là thiết kế thêm nút 'Đi tiếp' (Submit) bên cạnh để user nhấn chọn thay vì tự động kích hoạt."
    ],
    "do": "Chọn phương thức thanh toán thẻ tín dụng hiển thị thêm form nhập thẻ ở ngay bên dưới một cách tự nhiên.",
    "dont": "Tích chọn một checkbox đồng ý điều khoản thì trang web tự động chuyển hướng ngay sang trang khác."
  },
  {
    "id": "consistent-navigation",
    "wcag": "3.2.3",
    "title": "Hệ thống điều hướng nhất quán vị trí và thứ tự (Consistent Navigation)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Các cơ chế điều hướng lặp lại trên nhiều trang (như thanh menu chính, menu chân trang Footer) phải xuất hiện theo cùng một thứ tự và vị trí tương đối.",
    "why": "user có thể hình thành thói quen sử dụng và biết chính xác nơi tìm các link mà không phải làm quen lại từ đầu ở mỗi trang con.",
    "how": [
      "Giữ nguyên thứ tự các nút trên thanh Header (ví dụ: Trang chủ, Sản phẩm, Liên hệ) ở tất cả các trang.",
      "Sử dụng chung một Layout mẫu điều hướng cho toàn hệ thống."
    ],
    "do": "navigation bar chính có cùng thiết kế và vị trí trên tất cả các trang của website.",
    "dont": "Trang chủ có menu nằm ngang ở đầu trang, nhưng sang trang bài viết menu lại chuyển thành dạng dọc bên trái."
  },
  {
    "id": "consistent-identification",
    "wcag": "3.2.4",
    "title": "Biểu tượng và label chức năng nhất quán toàn trang (Consistent Identification)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Các thành phần UI có cùng một chức năng trên toàn bộ website phải được gắn label và thiết kế ký hiệu nhất quán.",
    "why": "Tránh gây bối rối cho user khuyết tật nhận thức khi gặp các ký hiệu khác nhau cho cùng một tác vụ.",
    "how": [
      "Sử dụng cùng một biểu tượng (icon) chiếc kính lúp cho chức năng 'Tìm kiếm' ở mọi trang.",
      "Nhất quán trong cách đặt tên label nút bấm (ví dụ: cùng dùng chữ 'Lưu' thay vì chỗ dùng 'Lưu', chỗ dùng 'Cập nhật')."
    ],
    "do": "Biểu tượng thùng rác luôn đại diện cho hành động 'Xóa' trên toàn bộ ứng dụng.",
    "dont": "Sử dụng biểu tượng phong bì cho nút 'Liên hệ' ở trang này nhưng lại dùng cho nút 'Nhận thư tin tức' ở trang khác."
  },
  {
    "id": "change-on-request",
    "wcag": "3.2.5",
    "title": "Thay đổi ngữ cảnh chỉ khi có yêu cầu từ user (Change on Request)",
    "level": "AAA",
    "category": "interaction",
    "isNew22": false,
    "desc": "Đảm bảo mọi thay đổi ngữ cảnh (mở cửa sổ mới, chuyển trang, cập nhật nội dung tự động) chỉ được kích hoạt bởi hành động chủ động của user.",
    "why": "user khiếm thị hoặc khuyết tật nhận thức có thể bị mất kiểm soát hoàn toàn nếu UI tự động thay đổi ngoài ý muốn.",
    "how": [
      "Tắt bỏ các popup quảng cáo tự nhảy ra theo thời gian.",
      "Không tự động chuyển trang khi user vừa hoàn thành điền ô nhập."
    ],
    "do": "Trang web chỉ cập nhật dữ liệu mới khi user nhấn nút 'Tải lại dữ liệu'.",
    "dont": "Tự động mở ra một tab browser mới giới thiệu sản phẩm mà user không hề bấm vào link nào."
  },
  {
    "id": "consistent-help-standard",
    "wcag": "3.2.6",
    "title": "Đặt thông tin trợ giúp ở vị trí nhất quán trên các trang (Consistent Help)",
    "level": "A",
    "category": "navigation",
    "isNew22": true,
    "desc": "Nếu trang cung cấp các hình thức trợ giúp, chúng phải được đặt ở cùng một vị trí tương đối trên mọi trang.",
    "why": "Giúp user dễ dàng tìm thấy sự trợ giúp khi gặp khó khăn tại bất kỳ bước nào của quy trình.",
    "how": [
      "Thiết kế link 'Trợ giúp' hoặc biểu tượng chat hỗ trợ nằm ở một góc cố định trên mọi trang."
    ],
    "do": "Nút chat hỗ trợ luôn cố định ở góc dưới bên phải màn hình trên toàn hệ thống.",
    "dont": "Trang này chatbot nằm ở góc phải, trang khác lại di chuyển lên thanh menu chính."
  },
  {
    "id": "error-identification",
    "wcag": "3.3.1",
    "title": "Nhận diện và báo lỗi cụ thể cho từng trường nhập liệu (Error Identification)",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Khi phát hiện lỗi nhập liệu tự động, phần tử bị lỗi phải được chỉ rõ bằng trực quan và thông báo lỗi phải được mô tả bằng văn bản cho user.",
    "why": "Người khiếm thị hoặc người khuyết tật nhận thức cần biết chính xác trường nào bị lỗi và lỗi đó là gì để sửa đúng chỗ.",
    "how": [
      "Thiết kế trạng thái lỗi rõ ràng cho ô nhập liệu: viền đổi màu đỏ, biểu tượng cảnh báo và dòng chữ mô tả lỗi cụ thể hiển thị ngay bên dưới ô.",
      "Đảm bảo thông báo lỗi có thể được Screen Reader đọc lên (sử dụng thuộc tính `aria-describedby` hoặc `aria-live`)."
    ],
    "do": "Ô nhập Email đổi viền đỏ kèm thông báo rõ ràng: 'Vui lòng nhập địa chỉ email hợp lệ (ví dụ: ten@email.com)'.",
    "dont": "Chỉ đổi viền ô nhập sang màu đỏ mà không hiển thị bất kỳ dòng chữ nào giải thích lỗi."
  },
  {
    "id": "labels-or-instructions",
    "wcag": "3.3.2",
    "title": "Cung cấp label (labels) hoặc hướng dẫn rõ ràng cho ô nhập liệu",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Cung cấp label (labels) hoặc hướng dẫn rõ ràng cho các ô nhập liệu yêu cầu user nhập dữ liệu.",
    "why": "Người khiếm thị sử dụng Screen Reader cần nghe label để hiểu ô nhập liệu yêu cầu thông tin gì; người khuyết tật nhận thức cần hướng dẫn rõ ràng để điền đúng.",
    "how": [
      "Thiết kế label hiển thị rõ ràng, cố định bên ngoài ô nhập (không chỉ dùng placeholder biến mất khi gõ).",
      "Cung cấp hướng dẫn bổ sung về định dạng dữ liệu bắt buộc (ví dụ: 'Định dạng: DD/MM/YYYY') và đánh dấu rõ ràng các trường bắt buộc (*)."
    ],
    "do": "Ô nhập ngày sinh có label cố định 'Ngày sinh *' phía trên và gợi ý định dạng 'DD/MM/YYYY' hiển thị bên dưới.",
    "dont": "Ô nhập chỉ có placeholder 'Nhập thông tin...' biến mất khi user bắt đầu gõ, khiến họ quên mình đang điền gì."
  },
  {
    "id": "error-suggestions",
    "wcag": "3.3.3",
    "title": "Gợi ý cách khắc phục lỗi cụ thể cho form (Error Suggestion)",
    "level": "AA",
    "category": "form",
    "isNew22": false,
    "desc": "Khi phát hiện lỗi nhập liệu, cung cấp văn bản gợi ý cách sửa lỗi cụ thể cho user (trừ khi ảnh hưởng đến bảo mật).",
    "why": "Giúp người khuyết tật nhận thức hoặc user phổ thông biết cách sửa lỗi nhanh chóng mà không cần đoán.",
    "how": [
      "Thay vì ghi 'Lỗi nhập liệu', hãy viết cụ thể: 'Mật khẩu phải bao gồm ít nhất 1 chữ in hoa và 1 ký số'."
    ],
    "do": "Hiển thị gợi ý: 'Vui lòng nhập định dạng ngày sinh DD/MM/YYYY'.",
    "dont": "Chỉ hiển thị dòng chữ cảnh báo chung chung: 'Dữ liệu không hợp lệ'."
  },
  {
    "id": "error-prevention-legal",
    "wcag": "3.3.4",
    "title": "Ngăn ngừa sai sót cho giao dịch tài chính, pháp lý (Error Prevention)",
    "level": "AA",
    "category": "form",
    "isNew22": false,
    "desc": "Đối với các trang web thực hiện giao dịch tài chính, pháp lý hoặc gửi dữ liệu quan trọng, phải cho phép user kiểm tra lại thông tin, sửa lỗi hoặc hủy giao dịch trước khi gửi đi.",
    "why": "user khuyết tật dễ gặp sai sót khi nhập liệu; việc cho phép undo hoặc xem lại giúp ngăn chặn các thiệt hại nghiêm trọng.",
    "how": [
      "Thiết kế bước 'Xác nhận thông tin' hiển thị tóm tắt toàn bộ dữ liệu đã điền trước khi nhấn nút thanh toán/gửi.",
      "Cung cấp nút 'Hủy bỏ' hoặc cơ chế 'undo' giao dịch trong một khoảng thời gian."
    ],
    "do": "Quy trình chuyển tiền có bước hiển thị thông tin người nhận và số tiền để user ấn xác nhận.",
    "dont": "Thực hiện gửi đơn hàng và trừ tiền ngay lập tức khi user vừa điền xong form mà không qua bước xác nhận."
  },
  {
    "id": "help-context-sensitive",
    "wcag": "3.3.5",
    "title": "Cung cấp trợ giúp theo ngữ cảnh cho từng ô nhập phức tạp (Help)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Cung cấp trợ giúp chi tiết theo ngữ cảnh cho từng trường nhập liệu phức tạp (như tooltip giải nghĩa, văn bản hướng dẫn đi kèm).",
    "why": "Giúp user hiểu rõ mục đích của các câu hỏi phức tạp hoặc định dạng bắt buộc mà không cần rời khỏi trang.",
    "how": [
      "Thiết kế biểu tượng dấu hỏi chấm tròn nhỏ bên cạnh label trường; khi nhấn vào hiển thị giải thích chi tiết."
    ],
    "do": "Trường mã bưu chính có nút '?' hiển thị mô tả: 'Mã bưu chính gồm 6 chữ số đại diện cho tỉnh/thành của bạn'.",
    "dont": "Yêu cầu nhập mã số thuế cá nhân mà không giải thích cách tìm mã số đó ở đâu."
  },
  {
    "id": "error-prevention-all",
    "wcag": "3.3.6",
    "title": "Ngăn ngừa sai sót cho tất cả form nhập liệu (Error Prevention - All)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Đảm bảo cơ chế kiểm tra lại dữ liệu và xác nhận được áp dụng cho mọi form nhập liệu trên website (không giới hạn ở tài chính/pháp lý như 3.3.4).",
    "why": "Tạo sự an tâm tuyệt đối cho user khi gửi bất kỳ thông tin nào lên hệ thống.",
    "how": [
      "Thiết kế popup/modal xác nhận cho tất cả các loại form (kể cả form liên hệ hoặc gửi khảo sát)."
    ],
    "do": "Hiển thị popup/modal hỏi lại: 'Bạn có chắc chắn muốn gửi ý kiến phản hồi này không?' trước khi gửi form.",
    "dont": "Đăng tải bài viết blog ngay lập tức sau khi nhấn Enter mà không cho phép xem trước hoặc sửa đổi."
  },
  {
    "id": "redundant-entry-standard",
    "wcag": "3.3.7",
    "title": "Tránh bắt nhập liệu lặp lại thông tin cũ (Redundant Entry)",
    "level": "A",
    "category": "form",
    "isNew22": true,
    "desc": "autocomplete hoặc cung cấp tùy chọn chọn lại thông tin đã nhập trước đó trong cùng một quy trình.",
    "why": "Giúp user khuyết tật vận động hoặc nhận thức tiết kiệm thời gian và giảm mệt mỏi.",
    "how": [
      "Thiết kế nút tích chọn: 'Địa chỉ thanh toán trùng với địa chỉ giao hàng'."
    ],
    "do": "Form tự động lấy tên và số điện thoại đăng ký tài khoản điền sẵn vào form đặt hàng.",
    "dont": "Bắt user điền lại thông tin cá nhân ở mỗi bước của quy trình đăng ký dịch vụ gồm 3 bước."
  },
  {
    "id": "accessible-auth-minimum",
    "wcag": "3.3.8",
    "title": "Đăng nhập không bắt giải đố/CAPTCHA nhận thức (Accessible Auth - AA)",
    "level": "AA",
    "category": "form",
    "isNew22": true,
    "desc": "Không yêu cầu các bài kiểm tra nhận thức (giải toán, giải đố CAPTCHA) trong quy trình xác thực/đăng nhập mà không có giải pháp thay thế.",
    "why": "Nhiều user gặp khó khăn lớn về trí nhớ hoặc nhận thức không thể giải được các câu đố để đăng nhập.",
    "how": [
      "Hỗ trợ các trình quản lý mật khẩu autocomplete.",
      "Cho phép copy-paste mật khẩu và mã xác thực OTP.",
      "Cung cấp đăng nhập sinh trắc học hoặc link đăng nhập qua email (Magic Link)."
    ],
    "do": "Đăng nhập nhanh bằng tài khoản Google/Facebook hoặc hỗ trợ quét vân tay.",
    "dont": "Bắt buộc user giải bài toán phép tính cộng trừ để hoàn tất đăng nhập."
  },
  {
    "id": "accessible-auth-enhanced",
    "wcag": "3.3.9",
    "title": "Đăng nhập không rào cản nhận thức (Accessible Auth - AAA)",
    "level": "AAA",
    "category": "form",
    "isNew22": true,
    "desc": "Quy trình xác thực hoàn toàn không được yêu cầu bài kiểm tra nhận thức, kể cả các hình thức nhận diện hình ảnh hoặc nội dung cá nhân (không có ngoại lệ như 3.3.8).",
    "why": "Đảm bảo trải nghiệm đăng nhập không có rào cản nhận thức cho mọi đối tượng.",
    "how": [
      "Thiết kế quy trình đăng nhập cực kỳ đơn giản sử dụng link Magic Link gửi qua email hoặc mã bảo mật vật lý."
    ],
    "do": "Đăng nhập bằng cách nhấp vào link xác nhận gửi về email của user.",
    "dont": "Yêu cầu user chọn tất cả các bức ảnh có chứa xe buýt để chứng minh không phải robot."
  },
  {
    "id": "name-role-value",
    "wcag": "4.1.2",
    "title": "Khai báo rõ Tên, Vai trò và Giá trị của component tùy biến (Name, Role, Value)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo tất cả các thành phần UI tùy biến (như nút tự vẽ, tab tùy biến) đều được thiết kế rõ ràng về Tên (Name), Vai trò (Role) và Trạng thái/Giá trị (Value) để công nghệ hỗ trợ nhận diện được.",
    "why": "Người khiếm thị dựa vào thông tin này để biết phần tử đó là gì (nút bấm hay slider) và trạng thái hiện tại (đang đóng hay mở).",
    "how": [
      "Cung cấp hướng dẫn sử dụng các thuộc tính ARIA thích hợp (ví dụ: `role=\"tab\"`, `aria-expanded=\"true\"`) khi bàn giao thiết kế tùy biến cho lập trình viên.",
      "Đảm bảo các trạng thái trực quan luôn có mã code tương ứng đi kèm."
    ],
    "do": "Menu thả xuống tùy biến có thẻ khai báo `role=\"combobox\"` và `aria-expanded` cập nhật đúng trạng thái.",
    "dont": "Thiết kế một nút bấm bằng thẻ `<div>` thường mà không khai báo role hay aria-label."
  },
  {
    "id": "status-messages",
    "wcag": "4.1.3",
    "title": "Thông báo trạng thái động (Status Messages) cho Screen Reader",
    "level": "AA",
    "category": "form",
    "isNew22": false,
    "desc": "Đảm bảo các thông báo trạng thái mới xuất hiện động trên trang (như thông báo 'Đã lưu thành công', 'Giỏ hàng đã cập nhật') được Screen Reader thông báo cho user mà không cần di chuyển focus đến đó.",
    "why": "Giúp user khiếm thị biết các thay đổi đang diễn ra trên trang mà không bị mất vị trí tương tác hiện tại.",
    "how": [
      "Định nghĩa các vùng thông báo động sử dụng thuộc tính `aria-live=\"polite\"` hoặc `role=\"status\"`."
    ],
    "do": "Thông báo 'Đã thêm sản phẩm vào giỏ hàng' hiển thị ở góc màn hình và được Screen Reader tự động đọc lên.",
    "dont": "Hiển thị thông báo trạng thái cập nhật thành công một cách im lặng khiến người mù không biết thao tác của họ đã hoàn tất chưa."
  }
];
