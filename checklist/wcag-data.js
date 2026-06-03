// --- TỆP DỮ LIỆU ĐẦY ĐỦ 86 TIÊU CHÍ WCAG 2.2 ---
const WCAG_DATA = [
  {
    "id": "alt-text",
    "wcag": "1.1.1",
    "title": "Văn bản thay thế cho hình ảnh (Non-text Content)",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp văn bản mô tả thay thế (Alt Text) cho các hình ảnh truyền tải thông tin, hoặc ẩn đi các hình ảnh trang trí.",
    "why": "Người khiếm thị sử dụng trình đọc màn hình để hiểu hình ảnh đó đang thể hiện điều gì.",
    "how": [
      "Mô tả ngắn gọn ý nghĩa hình ảnh trong Figma.",
      "Đặt thuộc tính alt=\"\" cho hình trang trí để trình đọc màn hình bỏ qua."
    ],
    "do": "alt='Logo Antigravity màu xanh dương'",
    "dont": "alt='hinh_anh_123.jpg' hoặc bỏ trống alt đối với hình có nghĩa."
  },
  {
    "id": "audio-video-only-prerecorded",
    "wcag": "1.2.1",
    "title": "Lựa chọn thay thế cho âm thanh/video ghi sẵn (Audio-only / Video-only)",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp bản dịch văn bản (transcript) cho tệp chỉ có âm thanh (podcasts) hoặc mô tả hình ảnh cho tệp chỉ có video.",
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
    "title": "Phụ đề cho video ghi sẵn (Captions - Prerecorded)",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Đảm bảo tất cả video có âm thanh đều được thiết kế giao diện hiển thị phụ đề (captions).",
    "why": "Người khiếm thính cần phụ đề để hiểu lời nói và các âm thanh quan trọng trong video.",
    "how": [
      "Thiết kế khu vực hiển thị phụ đề rõ ràng, độ tương phản cao so với nền video.",
      "Cung cấp nút bật/tắt phụ đề (CC) trong thiết kế thanh điều khiển video."
    ],
    "do": "Nút 'CC' nổi bật và phụ đề có nền đen mờ giúp tăng độ đọc.",
    "dont": "Nhúng cứng phụ đề nhỏ xíu, mờ nhạt thẳng vào video mà không cho phép bật/tắt."
  },
  {
    "id": "audio-description-alternative-prerecorded",
    "wcag": "1.2.3",
    "title": "Thuyết minh âm thanh hoặc văn bản thay thế (Audio Description / Alternative)",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp thuyết minh bằng âm thanh (mô tả những gì đang diễn ra trên màn hình) hoặc bản dịch văn bản chi tiết cho video ghi sẵn.",
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
    "title": "Phụ đề cho video trực tiếp (Captions - Live)",
    "level": "AA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp phụ đề thời gian thực (live captions) cho các sự kiện phát sóng trực tiếp (livestream).",
    "why": "Giúp người khiếm thính có thể theo dõi và tương tác với các sự kiện trực tiếp cùng lúc với người khác.",
    "how": [
      "Thiết kế không gian hiển thị phụ đề trực tiếp không đè lên các thông tin quan trọng.",
      "Tích hợp các API phụ đề tự động hoặc phụ đề do người gõ trực tiếp vào giao diện xem live."
    ],
    "do": "Phụ đề trực tiếp chạy ở dải băng chuyên dụng dưới khung hình video livestream.",
    "dont": "Livestream hội thảo lớn mà hoàn toàn không có phụ đề trực tiếp."
  },
  {
    "id": "audio-description-prerecorded",
    "wcag": "1.2.5",
    "title": "Thuyết minh âm thanh ghi sẵn (Audio Description - Prerecorded)",
    "level": "AA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp thuyết minh âm thanh chuyên dụng cho tất cả nội dung video ghi sẵn (bắt buộc, không dùng văn bản thay thế như 1.2.3).",
    "why": "Người dùng khiếm thị cần nghe mô tả trực tiếp tích hợp trong luồng âm thanh phát song song.",
    "how": [
      "Thiết kế trình phát hỗ trợ chuyển đổi giữa luồng âm thanh gốc và luồng âm thanh có thuyết minh."
    ],
    "do": "Cung cấp luồng âm thanh phụ mô tả: '[Tiếng bước chân tiến lại gần, nhân vật mở ngăn kéo]' lúc nghỉ giữa các lời thoại.",
    "dont": "Không có mô tả âm thanh cho các cảnh hành động kéo dài không lời thoại."
  },
  {
    "id": "sign-language-prerecorded",
    "wcag": "1.2.6",
    "title": "Ngôn ngữ ký hiệu ghi sẵn (Sign Language - Prerecorded)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Thiết kế một màn hình phụ hiển thị người dịch ngôn ngữ ký hiệu (sign language) cho các nội dung video ghi sẵn.",
    "why": "Đối với nhiều người điếc bẩm sinh, ngôn ngữ ký hiệu là ngôn ngữ mẹ đẻ của họ chứ không phải chữ viết phụ đề.",
    "how": [
      "Thiết kế cửa sổ nhỏ góc màn hình (picture-in-picture) hiển thị người dịch ngôn ngữ ký hiệu với kích thước đủ lớn để nhìn rõ cử chỉ tay."
    ],
    "do": "Một khung hiển thị người dịch thủ ngữ ở góc phải màn hình, có thể bật/tắt hoặc phóng to.",
    "dont": "Chỉ dựa hoàn toàn vào phụ đề chữ viết."
  },
  {
    "id": "extended-audio-description-prerecorded",
    "wcag": "1.2.7",
    "title": "Thuyết minh âm thanh mở rộng (Extended Audio Description)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Khi video gốc không có đủ khoảng nghỉ âm thanh để thuyết minh, thiết kế tính năng tạm dừng video để phát thuyết minh âm thanh chi tiết rồi chạy tiếp.",
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
    "title": "Văn bản thay thế toàn diện cho đa phương tiện (Media Alternative)",
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
    "title": "Lựa chọn thay thế cho âm thanh trực tiếp (Audio-only - Live)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp bản dịch văn bản thời gian thực (real-time text alternative) cho các luồng phát âm thanh trực tiếp (như radio, họp trực tuyến chỉ nói).",
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
    "title": "Thông tin và các mối quan hệ (Info and Relationships)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo cấu trúc thông tin (tiêu đề, danh sách, bảng biểu) được thiết kế rõ ràng và có thể được xác định bằng mã lập trình (semantic HTML).",
    "why": "Giúp trình đọc màn hình hiểu đúng phân cấp thông tin và mối liên hệ giữa các phần tử.",
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
    "title": "Thứ tự đọc có nghĩa (Meaningful Sequence)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo thứ tự đọc của nội dung là logic và nhất quán khi giao diện được giản lược cấu trúc (như khi đọc bằng screen reader).",
    "why": "Tránh việc người dùng khiếm thị nghe các đoạn văn bị đảo lộn thứ tự do bố cục dạng CSS Grid/Flexbox phức tạp.",
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
    "title": "Tránh chỉ sử dụng đặc điểm cảm quan để chỉ dẫn (Sensory Characteristics)",
    "level": "A",
    "category": "visual",
    "isNew22": false,
    "desc": "Không viết các chỉ dẫn dựa hoàn toàn vào hình dạng, kích thước, vị trí trực quan hoặc âm thanh của phần tử.",
    "why": "Người mù không nhìn thấy vị trí hoặc hình dáng, người điếc không nghe thấy âm thanh cảnh báo.",
    "how": [
      "Không viết: 'Bấm nút hình tròn màu xanh lá bên phải để tiếp tục'.",
      "Thay vào đó viết: 'Bấm nút Tiếp Tục (nút hình tròn màu xanh lá bên phải)'."
    ],
    "do": "Viết chỉ dẫn: 'Nhấp vào nút Lưu thay đổi ở cuối biểu mẫu'.",
    "dont": "Viết chỉ dẫn: 'Bấm vào nút màu đỏ để hủy bỏ'."
  },
  {
    "id": "orientation",
    "wcag": "1.3.4",
    "title": "Hướng hiển thị màn hình (Orientation)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo trang web hoạt động bình thường trên cả hướng màn hình dọc (Portrait) và ngang (Landscape), trừ khi có lý do kỹ thuật đặc biệt.",
    "why": "Một số người dùng khuyết tật gắn chặt máy tính bảng vào xe lăn theo một hướng cố định và không thể xoay thiết bị.",
    "how": [
      "Thiết kế responsive thích ứng tốt khi xoay ngang/dọc điện thoại.",
      "Không khóa cứng hướng hiển thị bằng code, cho phép giao diện tự co giãn linh hoạt."
    ],
    "do": "Trang ứng dụng ngân hàng tự động tổ chức lại các thẻ khi xoay ngang điện thoại.",
    "dont": "Hiển thị hộp thoại ép buộc người dùng: 'Vui lòng xoay dọc màn hình để tiếp tục sử dụng'."
  },
  {
    "id": "identify-input-purpose",
    "wcag": "1.3.5",
    "title": "Xác định mục đích ô nhập liệu (Identify Input Purpose)",
    "level": "AA",
    "category": "form",
    "isNew22": false,
    "desc": "Đảm bảo các ô nhập dữ liệu cá nhân thông dụng (Tên, Email, Điện thoại, Địa chỉ) được gắn nhãn chuẩn để trình duyệt tự động điền (Autocomplete).",
    "why": "Người dùng gặp khó khăn trong việc gõ chữ hoặc suy giảm nhận thức có thể điền thông tin nhanh chóng mà không gặp lỗi.",
    "how": [
      "Thiết kế các trường nhập liệu chuẩn hóa, tương thích với thuộc tính `autocomplete` của HTML.",
      "Sử dụng các biểu tượng và nhãn trực quan đại diện cho thông tin cần nhập."
    ],
    "do": "Trường Email có mã autocomplete='email' giúp trình duyệt đề xuất email lưu sẵn.",
    "dont": "Sử dụng các thẻ nhập liệu tùy biến quá mức khiến trình duyệt không nhận diện được để tự điền dữ liệu."
  },
  {
    "id": "identify-purpose-enhanced",
    "wcag": "1.3.6",
    "title": "Xác định mục đích các thành phần (Identify Purpose - Enhanced)",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Sử dụng các thuộc tính đánh dấu ngữ nghĩa để cho phép người dùng thay đổi biểu tượng hoặc ẩn đi các phần không cần thiết nhằm tối giản giao diện.",
    "why": "Người khuyết tật nhận thức có thể sử dụng các công cụ bổ trợ để tùy biến icon thành chữ hoặc giản lược giao diện theo cách họ dễ hiểu nhất.",
    "how": [
      "Thiết kế cấu trúc web chuẩn hóa (sử dụng WAI-ARIA Landmark Roles như `banner`, `navigation`, `main`).",
      "Đảm bảo các icon chức năng thông dụng được gắn thẻ siêu dữ liệu rõ ràng."
    ],
    "do": "Biểu tượng Trang chủ có gắn thẻ vai trò rõ ràng giúp người dùng có thể đổi nó thành chữ 'Trang chủ' thông qua extension.",
    "dont": "Dùng các hình ảnh trang trí làm nút điều hướng mà không có bất kỳ cấu trúc siêu dữ liệu nào."
  },
  {
    "id": "use-of-color",
    "wcag": "1.4.1",
    "title": "Không chỉ dùng màu sắc để truyền tải thông tin (Use of Color)",
    "level": "A",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo màu sắc không phải là phương tiện trực quan duy nhất để truyền tải thông tin, chỉ báo hành động, gợi ý phản hồi hoặc phân biệt các phần tử trên giao diện.",
    "why": "Người mù màu hoặc suy giảm thị lực không thể phân biệt được các trạng thái hoặc thông tin chỉ được truyền đạt qua sự khác biệt về màu sắc.",
    "how": [
      "Luôn kết hợp màu sắc với các yếu tố trực quan khác như biểu tượng, hoa văn, nhãn chữ hoặc gạch chân để phân biệt thông tin.",
      "Trong biểu đồ, sử dụng thêm hoa văn (pattern) hoặc nhãn trực tiếp bên cạnh màu sắc."
    ],
    "do": "Liên kết trong đoạn văn vừa có màu xanh vừa được gạch chân, trường lỗi vừa viền đỏ vừa có biểu tượng cảnh báo và dòng chữ mô tả lỗi.",
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
    "do": "Video giới thiệu tự động phát nhưng mặc định ở chế độ tắt tiếng (Muted), người dùng cần bấm mới phát âm thanh.",
    "dont": "Phát nhạc nền ầm ĩ ngay khi mở trang web mà không có nút tạm dừng."
  },
  {
    "id": "contrast-minimum",
    "wcag": "1.4.3",
    "title": "Độ tương phản văn bản tối thiểu (Contrast - Minimum)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo độ tương phản tối thiểu giữa màu chữ và màu nền đạt tỷ lệ 4.5:1 đối với văn bản cỡ thường, và 3:1 đối với văn bản lớn (từ 18pt hoặc 14pt in đậm trở lên).",
    "why": "Người suy giảm thị lực hoặc người dùng trong môi trường ánh sáng mạnh cần độ tương phản đủ cao để đọc được nội dung trên màn hình.",
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
    "title": "Phóng to cỡ chữ (Resize Text)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo văn bản có thể được phóng to lên đến 200% mà không bị mất nội dung hoặc chức năng, không cần sử dụng các công nghệ hỗ trợ.",
    "why": "Người suy giảm thị lực thường sử dụng tính năng phóng to chữ của trình duyệt để đọc nội dung, và giao diện cần hoạt động bình thường khi chữ lớn hơn.",
    "how": [
      "Sử dụng đơn vị kích thước tương đối (rem, em, %) thay vì đơn vị tuyệt đối (px) cho cỡ chữ.",
      "Thiết kế bố cục linh hoạt tự co giãn khi người dùng phóng to chữ bằng trình duyệt (Ctrl/Cmd + Plus)."
    ],
    "do": "Trang web hiển thị bình thường, văn bản xuống dòng tự nhiên khi người dùng phóng to trình duyệt lên 200%.",
    "dont": "Văn bản bị cắt cụt, đè chồng lên nhau hoặc tràn ra ngoài khung chứa khi người dùng phóng to cỡ chữ."
  },
  {
    "id": "images-of-text",
    "wcag": "1.4.5",
    "title": "Hình ảnh chứa chữ (Images of Text)",
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
    "title": "Độ tương phản văn bản nâng cao (Contrast - Enhanced)",
    "level": "AAA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo độ tương phản tối thiểu giữa văn bản thường và nền là 7:1, và văn bản lớn là 4.5:1.",
    "why": "Giúp người dùng bị suy giảm thị lực nặng có thể đọc nội dung trực tiếp mà không cần bật phần mềm hỗ trợ phóng to màn hình.",
    "how": [
      "Sử dụng màu chữ tối hơn hoặc nền sáng hơn để đạt tỷ lệ tương phản cực cao.",
      "Thiết kế một bộ chuyển đổi độ tương phản cao (High Contrast Mode) riêng cho giao diện nếu không muốn đổi bảng màu gốc."
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
    "why": "Người dùng máy trợ thính hoặc người suy giảm thính lực khó lọc được giọng nói nếu có tiếng ồn nền lớn.",
    "how": [
      "Bàn giao tài liệu thiết kế âm thanh yêu cầu lọc bỏ hoàn toàn tạp âm và nhạc nền trong các video bài giảng/hướng dẫn."
    ],
    "do": "Video hướng dẫn chỉ có tiếng nói thuyết minh trong môi trường hoàn toàn yên tĩnh.",
    "dont": "Phát nhạc nền sôi động lồng dưới lời thuyết minh của chuyên gia."
  },
  {
    "id": "visual-presentation",
    "wcag": "1.4.8",
    "title": "Trình bày trực quan văn bản tùy biến (Visual Presentation)",
    "level": "AAA",
    "category": "visual",
    "isNew22": false,
    "desc": "Cung cấp khả năng tùy biến văn bản cho người dùng: đổi màu chữ/nền, giới hạn chiều rộng đoạn văn dưới 80 ký tự, căn lề trái (không căn đều hai bên), và điều chỉnh giãn dòng.",
    "why": "Người dùng mắc chứng khó đọc (dyslexia) hoặc suy giảm thị lực cần cấu trúc chữ thưa và không căn đều hai bên để tránh nhầm dòng.",
    "how": [
      "Thiết kế đoạn văn căn lề trái (hoặc phải tùy ngôn ngữ), không dùng căn đều hai bên (Justify).",
      "Đảm bảo khoảng cách dòng tối thiểu 1.5 lần cỡ chữ, và giãn cách đoạn văn gấp 1.5 lần giãn cách dòng."
    ],
    "do": "Giao diện bài viết blog có khoảng rộng chữ tối đa 650px và căn lề trái tự nhiên.",
    "dont": "Thiết kế căn đều hai bên (Justify) tạo ra nhiều 'khoảng trắng dọc' gây nhức mắt cho người đọc."
  },
  {
    "id": "images-of-text-no-exception",
    "wcag": "1.4.9",
    "title": "Không sử dụng hình ảnh chứa chữ (Images of Text - No Exception)",
    "level": "AAA",
    "category": "visual",
    "isNew22": false,
    "desc": "Không được sử dụng hình ảnh chứa chữ trừ khi đó là biểu trưng (logo) hoặc thương hiệu.",
    "why": "Chữ trên ảnh sẽ bị mờ vỡ khi phóng to và trình đọc màn hình hoàn toàn không thể đọc trực tiếp được.",
    "how": [
      "Sử dụng CSS để thiết kế chữ đè lên ảnh thay vì vẽ chữ trực tiếp vào ảnh trong Photoshop/Figma."
    ],
    "do": "Banner dùng text thật dựng bằng HTML/CSS đè lên trên ảnh nền.",
    "dont": "Tạo banner quảng cáo chứa thông tin khuyến mãi dạng ảnh JPG đính kèm."
  },
  {
    "id": "reflow",
    "wcag": "1.4.10",
    "title": "Bố cục co giãn không cuộn ngang (Reflow)",
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
    "dont": "Trang web xuất hiện thanh cuộn ngang bắt buộc khi phóng to 400%, người dùng phải cuộn qua lại để đọc hết mỗi dòng chữ."
  },
  {
    "id": "non-text-contrast",
    "wcag": "1.4.11",
    "title": "Độ tương phản phi văn bản (Non-text Contrast)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo các thành phần giao diện (nút bấm, ô nhập liệu, biểu tượng) và các đồ họa thông tin quan trọng (biểu đồ, sơ đồ) có độ tương phản tối thiểu 3:1 so với màu nền liền kề.",
    "why": "Người suy giảm thị lực cần nhìn rõ viền nút bấm, viền ô nhập liệu và biểu đồ để phân biệt các thành phần tương tác và hiểu dữ liệu trực quan.",
    "how": [
      "Kiểm tra tỷ lệ tương phản của viền nút bấm, viền ô nhập, biểu tượng hành động và các phần tử đồ họa so với nền xung quanh đạt tối thiểu 3:1.",
      "Đảm bảo trạng thái focus, hover và active của các phần tử tương tác cũng đạt tỷ lệ tương phản 3:1."
    ],
    "do": "Ô nhập liệu có viền xám đậm (#767676) trên nền trắng đạt tương phản 4.5:1, biểu tượng tìm kiếm màu đậm rõ ràng.",
    "dont": "Ô nhập liệu chỉ có viền xám nhạt (#E0E0E0) gần như hòa lẫn với nền trắng, người dùng khó nhận diện vị trí nhập."
  },
  {
    "id": "text-spacing",
    "wcag": "1.4.12",
    "title": "Giãn cách văn bản tùy biến (Text Spacing)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Đảm bảo giao diện không bị lỗi hiển thị khi người dùng điều chỉnh tăng giãn cách dòng, giãn cách đoạn văn, giãn cách chữ và giãn cách từ.",
    "why": "Người dùng có vấn đề về đọc thường sử dụng stylesheet cá nhân để giãn rộng chữ giúp dễ đọc hơn.",
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
    "title": "Nội dung xuất hiện khi Hover/Focus (Content on Hover or Focus)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Nội dung phụ xuất hiện khi hover chuột hoặc focus (như tooltips, menu thả xuống) phải tắt được (dismissible), di chuột lên được (hoverable), và tồn tại lâu dài (persistent).",
    "why": "Đảm bảo người dùng sử dụng kính lúp hoặc bị run tay có thể đọc và tương tác với nội dung phụ mà không sợ nó tự động biến mất.",
    "how": [
      "Thiết kế cách tắt nội dung phụ bằng phím Escape.",
      "Cho phép con trỏ chuột di chuyển trực tiếp lên vùng chứa nội dung phụ vừa hiện ra."
    ],
    "do": "Menu con hiển thị và giữ nguyên trạng thái khi người dùng rê chuột từ nút chính vào menu con.",
    "dont": "Tooltip tự biến mất sau vài giây hoặc tự đóng khi con trỏ lệch 1px khỏi nút chính."
  },
  {
    "id": "keyboard-operable",
    "wcag": "2.1.1",
    "title": "Điều hướng bằng bàn phím (Keyboard)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Tất cả các chức năng tương tác đều có thể vận hành được chỉ bằng bàn phím (không cần dùng chuột).",
    "why": "Người mù, người liệt tay hoặc suy giảm vận động sử dụng bàn phím hoặc công cụ mô phỏng bàn phím để tương tác.",
    "how": [
      "Thiết kế các nút bấm, menu, link bằng các thẻ tương tác tiêu chuẩn.",
      "Đảm bảo các trạng thái focus trực quan rõ ràng đối với từng phần tử tương tác."
    ],
    "do": "Người dùng có thể Tab đến nút 'Mua ngay' và ấn Enter để thực hiện hành động.",
    "dont": "Thiết kế một bản đồ kéo thả tùy biến bằng JavaScript mà hoàn toàn không có cách nào dùng phím Tab và phím mũi tên để chọn vị trí."
  },
  {
    "id": "no-keyboard-trap",
    "wcag": "2.1.2",
    "title": "Không kẹt bàn phím (No Keyboard Trap)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Đảm bảo tiêu điểm bàn phím (focus) không bị 'kẹt' lại ở bất kỳ phần tử nào trên trang mà không thể thoát ra bằng phím di chuyển thông thường.",
    "why": "Người dùng chỉ sử dụng bàn phím sẽ bị khóa cứng trên trang và không thể tắt/thoát nếu rơi vào bẫy kẹt focus.",
    "how": [
      "Khi thiết kế hộp thoại (modal popup), đảm bảo nút Đóng (Close) luôn có thể chọn được bằng cách nhấn phím Tab hoặc ESC để đóng modal."
    ],
    "do": "Nhấn phím ESC tự động đóng modal và trả focus lại cho phần tử kích hoạt trước đó.",
    "dont": "Mở hộp thoại khảo sát đè lên giao diện chính mà không có cách nào dùng phím Tab để chuyển đến nút đóng."
  },
  {
    "id": "keyboard-no-exception",
    "wcag": "2.1.3",
    "title": "Điều hướng bàn phím tuyệt đối (Keyboard - No Exception)",
    "level": "AAA",
    "category": "interaction",
    "isNew22": false,
    "desc": "Tất cả mọi chức năng của trang web phải điều hướng được bằng bàn phím mà không có bất kỳ ngoại lệ nào.",
    "why": "Loại bỏ hoàn toàn các rào cản tương tác đối với người dùng không thể sử dụng chuột.",
    "how": [
      "Thiết kế các thao tác phức tạp nhất (vẽ đồ họa, kéo thả phần tử) đều có bảng điều khiển phím phụ trợ đi kèm."
    ],
    "do": "Trình chỉnh sửa ảnh cho phép dùng phím mũi tên và phím tắt để căn lề ảnh chính xác.",
    "dont": "Cho phép vẽ tự do trên màn hình bằng chuột nhưng không có giải pháp bàn phím thay thế."
  },
  {
    "id": "character-key-shortcuts",
    "wcag": "2.1.4",
    "title": "Phím tắt ký tự đơn (Character Key Shortcuts)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Nếu thiết kế phím tắt chỉ sử dụng một phím ký tự đơn (ví dụ nhấn 'm' để tắt tiếng), phải cho phép người dùng tắt phím tắt đó hoặc thêm phím bổ trợ (như Ctrl/Cmd).",
    "why": "Người dùng sử dụng phần mềm đọc giọng nói có thể vô tình kích hoạt hàng loạt phím tắt khi họ đọc văn bản.",
    "how": [
      "Cung cấp màn hình cấu hình phím tắt cho phép tắt bỏ các phím tắt đơn lẻ.",
      "Khuyến nghị sử dụng tổ hợp phím có phím điều khiển (Ctrl, Alt, Cmd) thay vì dùng một ký tự đơn."
    ],
    "do": "Thiết kế phím tắt chuyển trang là Ctrl + Shift + Mũi tên phải.",
    "dont": "Định nghĩa phím 'S' để bắt đầu tìm kiếm mà không cho phép vô hiệu hóa."
  },
  {
    "id": "timing-adjustable",
    "wcag": "2.2.1",
    "title": "Điều chỉnh thời gian giới hạn (Timing Adjustable)",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Cung cấp tùy chọn cho phép người dùng tắt, điều chỉnh hoặc kéo dài thời gian giới hạn của một phiên làm việc (session).",
    "why": "Người khuyết tật vận động hoặc nhận thức cần nhiều thời gian hơn để đọc tài liệu và điền biểu mẫu.",
    "how": [
      "Trước khi hết hạn phiên làm việc 2 phút, hiển thị một hộp thoại cảnh báo cho phép kéo dài thời gian bằng cách nhấn một nút bấm đơn giản."
    ],
    "do": "Hiển thị thông báo: 'Phiên của bạn sắp hết hạn sau 2 phút. Bấm nút Kéo Dài để tiếp tục'.",
    "dont": "Tự động đăng xuất người dùng đang điền dở tờ khai thanh toán mà không có cảnh báo trước."
  },
  {
    "id": "pause-stop-hide",
    "wcag": "2.2.2",
    "title": "Tạm dừng, dừng, ẩn nội dung động (Pause, Stop, Hide)",
    "level": "A",
    "category": "media",
    "isNew22": false,
    "desc": "Đối với các nội dung tự động di chuyển, nhấp nháy hoặc cuộn kéo dài hơn 5 giây (như banner quảng cáo chạy, carousel), phải có nút tạm dừng hoặc ẩn đi.",
    "why": "Chữ chuyển động liên tục gây mất tập trung nghiêm trọng cho người dùng mắc hội chứng giảm chú ý (ADHD) hoặc gây khó khăn cho người dùng screen reader.",
    "how": [
      "Thiết kế nút Tạm dừng (Pause) trực quan hiển thị rõ ràng trên các slider/carousel tự động chạy.",
      "Tự động dừng hoạt ảnh cuộn sau 5 giây nếu người dùng không tương tác."
    ],
    "do": "Carousel tự chạy có nút Pause/Play nổi bật ở góc dưới.",
    "dont": "Thiết kế dải chữ chạy tin tức (ticker) chuyển động liên tục ở chân trang mà không có cách nào dừng lại."
  },
  {
    "id": "no-timing",
    "wcag": "2.2.3",
    "title": "Không giới hạn thời gian (No Timing)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Thiết kế các tác vụ không chứa bất kỳ giới hạn thời gian nào, ngoại trừ các sự kiện trực tiếp không thể thay đổi thời gian (như đấu giá).",
    "why": "Giúp người dùng hoàn thành công việc ở tốc độ của riêng họ mà không gặp bất kỳ áp lực căng thẳng nào.",
    "how": [
      "Loại bỏ hoàn toàn các bộ đếm ngược thời gian trong các biểu mẫu đăng ký hoặc bài kiểm tra phi thực tế."
    ],
    "do": "Bài thi trắc nghiệm trực tuyến cho phép người học lưu lại tiến trình và hoàn thành bất cứ khi nào họ muốn.",
    "dont": "Giới hạn thời gian 15 phút để đọc một trang điều khoản chính sách dài dằng dặc."
  },
  {
    "id": "interruptions",
    "wcag": "2.2.4",
    "title": "Trì hoãn các nội dung gián đoạn (Interruptions)",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Cho phép người dùng tắt hoặc trì hoãn các cảnh báo gián đoạn đột ngột (như popup quảng cáo, thông báo cập nhật hệ thống), trừ trường hợp khẩn cấp.",
    "why": "Popup bất ngờ xuất hiện gây rối loạn định hướng cho người dùng khiếm thị hoặc người khuyết tật nhận thức.",
    "how": [
      "Cung cấp tùy chọn cấu hình: 'Chế độ không làm phiền' giúp chặn mọi thông báo popup phụ."
    ],
    "do": "Popup cập nhật phần mềm có nút chọn 'Nhắc tôi sau 1 ngày'.",
    "dont": "Tự động nhảy ra popup khảo sát giữa lúc người dùng đang thực hiện thanh toán giao dịch."
  },
  {
    "id": "re-authenticating",
    "wcag": "2.2.5",
    "title": "Lưu dữ liệu khi đăng nhập lại (Re-authenticating)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Nếu phiên làm việc hết hạn và bắt buộc đăng nhập lại, đảm bảo dữ liệu người dùng đã điền dở trong biểu mẫu được bảo toàn và gửi đi bình thường sau khi đăng nhập.",
    "why": "Giúp người dùng không bị mất công sức nhập lại toàn bộ thông tin dài khi phiên đăng nhập bị ngắt giữa chừng.",
    "how": [
      "Thiết kế cơ chế lưu trữ tạm thời dữ liệu biểu mẫu trên máy khách (client-side) hoặc máy chủ trước khi chuyển tiếp người dùng sang trang đăng nhập."
    ],
    "do": "Sau khi đăng nhập lại, biểu mẫu khai báo thuế tự động tải lại đầy đủ các trường thông tin đã điền trước đó.",
    "dont": "Xóa sạch toàn bộ form và bắt người dùng điền lại từ bước 1 sau khi đăng nhập lại thành công."
  },
  {
    "id": "timeouts-warning",
    "wcag": "2.2.6",
    "title": "Cảnh báo hết hạn phiên làm việc (Timeouts)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Thông báo trước cho người dùng về thời gian hết hạn của phiên hoạt động và nguy cơ mất dữ liệu nếu họ không tương tác tiếp.",
    "why": "Giúp người dùng chủ động lưu lại tiến trình làm việc trước khi bị ngắt kết nối đột ngột.",
    "how": [
      "Thiết kế thông báo hiển thị thời hạn còn lại ngay từ khi mở trang (ví dụ: 'Phiên đăng nhập này có hiệu lực trong 30 phút')."
    ],
    "do": "Hiển thị dòng chữ nhỏ ở thanh trạng thái: 'Phiên làm việc sẽ tự động kết thúc vào lúc 15:30'.",
    "dont": "Đăng xuất người dùng một cách im lặng và xóa sạch dữ liệu giỏ hàng mà không báo trước."
  },
  {
    "id": "three-flashes",
    "wcag": "2.3.1",
    "title": "Tránh nội dung nhấp nháy mạnh (Three Flashes or Below Threshold)",
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
    "title": "Không có nội dung nhấp nháy (Three Flashes)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Đảm bảo trang web hoàn toàn không chứa bất kỳ nội dung nào nhấp nháy quá 3 lần trong 1 giây mà không có bất kỳ ngoại lệ nào.",
    "why": "Loại bỏ hoàn toàn rủi ro gây co giật cho tất cả người dùng nhạy cảm với ánh sáng.",
    "how": [
      "Nghiêm cấm sử dụng các hiệu ứng nhấp nháy tần suất cao trên toàn bộ trang."
    ],
    "do": "Các hiệu ứng chuyển đổi trạng thái (transitions) hoạt động mượt mà và dịu mắt.",
    "dont": "Nhúng video chứa các cảnh chớp đèn strobe sáng mạnh liên tục."
  },
  {
    "id": "animation-from-interactions",
    "wcag": "2.3.3",
    "title": "Tắt hoạt ảnh chuyển động (Animation from Interactions)",
    "level": "AAA",
    "category": "visual",
    "isNew22": false,
    "desc": "Cung cấp tùy chọn tắt tất cả hoạt ảnh chuyển động được kích hoạt bởi sự tương tác của người dùng, trừ khi hoạt ảnh đó là thiết yếu đối với chức năng.",
    "why": "Hoạt ảnh cuộn trang hoặc chuyển động 3D phức tạp có thể gây chóng mặt, buồn nôn cho người mắc hội chứng tiền đình.",
    "how": [
      "Hỗ trợ truy vấn media query `@media (prefers-reduced-motion)` trong CSS để tắt hoạt ảnh khi người dùng yêu cầu trên hệ điều hành.",
      "Thiết kế nút tắt hoạt ảnh trực tiếp trên trang web."
    ],
    "do": "Khi chế độ giảm chuyển động được bật, các hiệu ứng trượt mượt chuyển thành hiệu ứng ẩn hiện (fade-in) tức thì.",
    "dont": "Bắt buộc người dùng xem hiệu ứng cuộn trang parallax giật cục làm mỏi mắt."
  },
  {
    "id": "bypass-blocks",
    "wcag": "2.4.1",
    "title": "Bỏ qua các khối nội dung lặp lại (Bypass Blocks)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Cung cấp cơ chế cho phép người dùng bàn phím bỏ qua các khối nội dung lặp lại (như thanh menu chính) để đi thẳng đến nội dung chính.",
    "why": "Người dùng bàn phím không phải nhấn phím Tab hàng chục lần qua tất cả các liên kết menu ở mỗi lần tải trang.",
    "how": [
      "Thiết kế liên kết ẩn 'Bỏ qua và đi đến nội dung chính' (Skip to content) xuất hiện đầu tiên khi người dùng nhấn Tab lần đầu khi tải trang.",
      "Cấu trúc trang rõ ràng bằng các phần tử HTML5 landmark."
    ],
    "do": "Nhấn phím Tab đầu tiên hiện nút 'Chuyển nhanh đến nội dung chính' ở đầu trang.",
    "dont": "Bắt người dùng Tab qua 50 danh mục sản phẩm trước khi tiếp cận được bài viết chính."
  },
  {
    "id": "page-titled",
    "wcag": "2.4.2",
    "title": "Tiêu đề trang mô tả rõ ràng (Page Titled)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo mỗi trang web đều có một tiêu đề trang độc nhất, mô tả chính xác nội dung hoặc mục đích của trang đó.",
    "why": "Giúp người dùng khiếm thị nhận biết ngay lập tức họ đang ở trang nào khi chuyển đổi giữa các thẻ trình duyệt.",
    "how": [
      "Thiết kế tiêu đề trang động thay đổi theo nội dung hiển thị (ví dụ: 'Giỏ hàng | Antigravity' thay vì chỉ để tên thương hiệu)."
    ],
    "do": "Tiêu đề thẻ trình duyệt hiển thị: 'Thanh toán đơn hàng #12345 - Antigravity Store'.",
    "dont": "Tất cả các trang con trong website đều dùng chung một tiêu đề cố định: 'Trang chủ'."
  },
  {
    "id": "focus-order",
    "wcag": "2.4.3",
    "title": "Thứ tự nhận tiêu điểm bàn phím (Focus Order)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo thứ tự di chuyển tiêu điểm khi dùng phím Tab qua các phần tử tương tác là tự nhiên và logic.",
    "why": "Giúp người dùng bàn phím điều hướng qua các form và menu theo trình tự mong đợi, tránh bị nhảy lộn xộn.",
    "how": [
      "Sắp xếp thứ tự các phần tử tương tác trong mã nguồn HTML tương đồng với thứ tự hiển thị trực quan trên màn hình.",
      "Tránh dùng thuộc tính `tabindex` dương (như `tabindex=\"1\"`) vì nó phá vỡ thứ tự focus mặc định của trình duyệt."
    ],
    "do": "Thứ tự Tab đi từ ô nhập Họ tên -> ô Email -> ô Mật khẩu -> nút Gửi.",
    "dont": "Nhấn Tab nhảy từ ô Họ tên xuống nút Gửi, rồi nhấn Tab tiếp mới quay lại ô nhập Email."
  },
  {
    "id": "link-purpose-context",
    "wcag": "2.4.4",
    "title": "Mục đích liên kết trong ngữ cảnh (Link Purpose)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Mục đích của mỗi liên kết phải được xác định rõ thông qua chữ viết của chính liên kết đó, hoặc qua câu văn chứa nó.",
    "why": "Người khiếm thị có thể hiểu được đích đến của đường link mà không cần đọc toàn bộ trang.",
    "how": [
      "Tránh viết các liên kết dạng 'Xem thêm' hoặc 'Bấm vào đây' chung chung.",
      "Nếu bắt buộc, hãy dùng thuộc tính `aria-label` để bổ sung thông tin (ví dụ: `aria-label=\"Đọc thêm về sản phẩm ABC\"`)."
    ],
    "do": "Liên kết viết rõ ràng: 'Tải về mẫu đơn đăng ký thuế (PDF)'.",
    "dont": "Đoạn văn kết thúc bằng liên kết: 'Để biết thêm chi tiết, nhấp vào [đây]'."
  },
  {
    "id": "multiple-ways",
    "wcag": "2.4.5",
    "title": "Nhiều cách tiếp cận trang (Multiple Ways)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Cung cấp ít nhất hai cách khác nhau để tìm kiếm một trang web trong hệ thống (ví dụ: Thanh tìm kiếm, Sơ đồ trang web Sitemap, Menu phân cấp).",
    "why": "Người dùng khuyết tật nhận thức có thể thích dùng sitemap trực quan hơn là dùng menu đa cấp phức tạp.",
    "how": [
      "Thiết kế thanh tìm kiếm ở đầu trang và đồng thời cung cấp liên kết Sitemap ở chân trang (Footer)."
    ],
    "do": "Trang web có cả thanh tìm kiếm tổng thể và menu danh mục danh sách rõ ràng.",
    "dont": "Chỉ cung cấp menu thả xuống nhiều cấp và không có cách nào khác để tìm các trang ẩn bên trong."
  },
  {
    "id": "headings-labels",
    "wcag": "2.4.6",
    "title": "Tiêu đề và nhãn rõ ràng (Headings and Labels)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Các tiêu đề phần (headings) và nhãn biểu mẫu (labels) phải được viết rõ nghĩa, mô tả đúng chủ đề hoặc mục đích.",
    "why": "Giúp người dùng nhanh chóng lướt qua trang và hiểu đúng các khu vực nội dung mà không bị nhầm lẫn.",
    "how": [
      "Đặt tiêu đề phần ngắn gọn và phản ánh đúng nội dung phía sau.",
      "Tránh đặt nhãn ô nhập liệu mơ hồ (ví dụ: nhãn 'Thông tin' quá rộng, thay vào đó hãy ghi cụ thể 'Thông tin liên hệ')."
    ],
    "do": "Nhãn ô nhập ghi rõ: 'Họ và tên đệm', 'Tên riêng'. Tiêu đề phần ghi: 'Thông tin tài khoản'.",
    "dont": "Nhãn ô nhập chỉ ghi: 'Nhập thông tin tại đây'."
  },
  {
    "id": "focus-visible-standard",
    "wcag": "2.4.7",
    "title": "Hiển thị chỉ báo focus bàn phím (Focus Visible)",
    "level": "AA",
    "category": "visual",
    "isNew22": false,
    "desc": "Bất kỳ phần tử nhận focus nào đều phải hiển thị chỉ báo focus trực quan khi điều hướng bằng bàn phím.",
    "why": "Người dùng bàn phím cần biết rõ vị trí tương tác hiện tại của họ trên trang.",
    "how": [
      "Giữ nguyên viền focus mặc định hoặc thiết kế viền focus riêng có độ tương phản tối thiểu 3:1 so với nền."
    ],
    "do": "Vòng viền focus màu xanh lam bao quanh phần tử khi người dùng Tab qua.",
    "dont": "Đặt thuộc tính CSS `outline: none` mà không có chỉ báo focus thay thế."
  },
  {
    "id": "location",
    "wcag": "2.4.8",
    "title": "Chỉ báo vị trí trang hiện tại (Location)",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Cung cấp thông tin trực quan cho biết người dùng hiện đang ở đâu trong cấu trúc phân cấp của website (ví dụ: dùng Breadcrumbs).",
    "why": "Giúp người khuyết tật nhận thức hoặc người dùng bị lạc hướng dễ dàng định vị lại vị trí của họ.",
    "how": [
      "Thiết kế thanh điều hướng Breadcrumb ở phía trên nội dung trang con.",
      "Đánh dấu trạng thái 'Active' của trang hiện tại trên thanh menu chính."
    ],
    "do": "Hiển thị: 'Trang chủ > Sản phẩm > Điện thoại > iPhone 15' trên thanh điều hướng.",
    "dont": "Trang web sâu nhiều cấp nhưng không có chỉ dẫn nào cho biết đang ở chuyên mục nào."
  },
  {
    "id": "link-purpose-link-only",
    "wcag": "2.4.9",
    "title": "Mục đích liên kết độc lập (Link Purpose - Link Only)",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo mục đích của mỗi liên kết có thể được hiểu rõ chỉ bằng chính dòng chữ trong đường link đó (không cần dựa vào ngữ cảnh xung quanh).",
    "why": "Cho phép người dùng khiếm thị duyệt danh sách liên kết một cách nhanh chóng và chính xác nhất.",
    "how": [
      "Không bao giờ dùng chữ 'Xem thêm' làm text của link. Phải ghi rõ: 'Xem thêm thông tin về sản phẩm X'."
    ],
    "do": "Văn bản liên kết ghi: 'Đọc hướng dẫn cài đặt phần mềm Antigravity'.",
    "dont": "Đoạn văn chứa liên kết: 'Nhấp vào [liên kết này] để xem tài liệu hướng dẫn'."
  },
  {
    "id": "section-headings-enhanced",
    "wcag": "2.4.10",
    "title": "Phân chia phần bằng tiêu đề (Section Headings)",
    "level": "AAA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Sử dụng tiêu đề phần để tổ chức tất cả các khối nội dung lớn trên trang.",
    "why": "Giúp phân tách trực quan các phần nội dung rõ ràng, cải thiện trải nghiệm đọc cho tất cả mọi người.",
    "how": [
      "Đặt các thẻ H2, H3 làm tiêu đề cho mỗi khu vực bài viết, sản phẩm hoặc biểu mẫu trên trang."
    ],
    "do": "Các khối nội dung được chia bằng tiêu đề H2 rõ nghĩa như: 'Tính năng chính', 'Ý kiến khách hàng'.",
    "dont": "Trang thông tin dài hàng trang giấy chỉ có chữ thường viết liền mạch mà không được phân chia bằng tiêu đề."
  },
  {
    "id": "focus-not-obscured-minimum",
    "wcag": "2.4.11",
    "title": "Focus không bị che khuất tối thiểu (Focus Not Obscured - Minimum)",
    "level": "AA",
    "category": "visual",
    "isNew22": true,
    "desc": "Khi một thành phần nhận focus bàn phím, nó không được bị che khuất hoàn toàn bởi nội dung cố định (như header dính, quảng cáo nổi).",
    "why": "Người dùng bàn phím cần nhìn thấy ít nhất một phần của phần tử nhận focus để biết mình đang ở đâu.",
    "how": [
      "Sử dụng `scroll-margin-top` trong CSS để tránh phần tử bị khuất dưới Sticky Header khi cuộn Tab."
    ],
    "do": "Viền focus hiển thị rõ phía dưới chân của Sticky Header khi người dùng Tab qua.",
    "dont": "Thanh header cố định che hoàn toàn ô nhập liệu nhận focus hiện tại."
  },
  {
    "id": "focus-not-obscured-enhanced",
    "wcag": "2.4.12",
    "title": "Focus không bị che khuất hoàn toàn (Focus Not Obscured - Enhanced)",
    "level": "AAA",
    "category": "visual",
    "isNew22": true,
    "desc": "Đảm bảo 100% diện tích của thành phần nhận focus không bị che khuất bởi bất kỳ nội dung nào khác trên màn hình.",
    "why": "Tối ưu hóa khả năng quan sát tiêu điểm bàn phím cho người dùng suy giảm thị lực.",
    "how": [
      "Tính toán khoảng cách an toàn, thiết kế cơ chế tự động đẩy popup hoặc ẩn banner nổi khi tiêu điểm bàn phím di chuyển vào vùng bị khuất."
    ],
    "do": "Popup chatbot tự động thu nhỏ lại khi người dùng Tab qua các nút hành động nằm ngay phía sau chatbot.",
    "dont": "Chatbot nằm đè và che khuất hoàn toàn nút bấm nhận focus ở góc phải màn hình."
  },
  {
    "id": "focus-appearance-enhanced",
    "wcag": "2.4.13",
    "title": "Hình thức chỉ báo Focus nâng cao (Focus Appearance)",
    "level": "AAA",
    "category": "visual",
    "isNew22": true,
    "desc": "Đảm bảo chỉ báo focus có kích thước tối thiểu tương đương đường viền dày 2px bao quanh phần tử và có độ tương phản tối thiểu 3:1.",
    "why": "Người suy giảm thị lực nặng có thể dễ dàng nhìn thấy tiêu điểm mà không phải dò tìm căng thẳng.",
    "how": [
      "Thiết kế chỉ báo focus là một đường viền đậm màu sắc tương phản cao bao quanh hoàn toàn phần tử."
    ],
    "do": "Nút bấm có viền focus màu xanh neon dày 2px bao quanh bên ngoài khi nhận tiêu điểm.",
    "dont": "Chỉ đổi nhẹ bóng đổ (box-shadow) mờ nhạt của nút khi focus bàn phím."
  },
  {
    "id": "pointer-gestures",
    "wcag": "2.5.1",
    "title": "Giải pháp cho cử chỉ phức tạp (Pointer Gestures)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Mọi cử chỉ tương tác phức tạp (như vuốt swipe, chụm ngón tay pinch, vẽ đường) phải có giải pháp thay thế bằng các thao tác chạm đơn giản (như tap, bấm nút).",
    "why": "Người dùng sử dụng các thiết bị trợ giúp (chuột bằng đầu, thiết bị một chạm) hoặc người bị run tay không thể thực hiện các vuốt chính xác.",
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
    "title": "Hủy bỏ tương tác khi chạm (Pointer Cancellation)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Các sự kiện tương tác kích hoạt bằng chạm/nhấp chuột phải được kích hoạt ở sự kiện nhấc lên (mouseup / touchend), cho phép người dùng hủy bỏ hành động bằng cách di ngón tay ra ngoài trước khi nhấc lên.",
    "why": "Ngăn ngừa việc vô tình kích hoạt nhầm nút bấm khi người dùng lỡ tay chạm vào màn hình.",
    "how": [
      "Thiết kế các nút bấm tương tác kích hoạt khi nhấc chuột/tay lên (click), không kích hoạt khi vừa nhấn xuống (mousedown)."
    ],
    "do": "Người dùng bấm nhầm nút 'Hủy đơn hàng', di chuột ra ngoài nút rồi mới nhấc tay ra thì hành động không bị kích hoạt.",
    "dont": "Hành động thanh toán lập tức kích hoạt ngay khi ngón tay vừa chạm xuống (mousedown) trên nút."
  },
  {
    "id": "label-in-name",
    "wcag": "2.5.3",
    "title": "Nhãn hiển thị khớp tên lập trình (Label in Name)",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Đối với các thành phần có chứa văn bản hiển thị trực quan, tên lập trình ẩn (accessible name) của nó phải chứa chính văn bản đó.",
    "why": "Người dùng sử dụng điều khiển bằng giọng nói có thể gọi đúng tên nút hiển thị trên màn hình để kích hoạt.",
    "how": [
      "Nếu nút ghi chữ 'Tìm kiếm', đảm bảo nhãn ẩn `aria-label` của nó cũng chứa chữ 'Tìm kiếm' chứ không đặt tên khác như 'SearchBtn'."
    ],
    "do": "Nút bấm hiển thị 'Gửi email', mã lập trình tương ứng có `aria-label=\"Gửi email đăng ký của bạn\"`.",
    "dont": "Nút bấm hiển thị chữ 'OK' nhưng mã lập trình ẩn lại đặt `aria-label=\"Chấp nhận điều khoản và thanh toán\"`."
  },
  {
    "id": "motion-actuation",
    "wcag": "2.5.4",
    "title": "Tương tác kích hoạt bằng chuyển động (Motion Actuation)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Các hành động kích hoạt bằng cách lắc, xoay hoặc nghiêng thiết bị phải có nút bấm thay thế trực quan trên màn hình và có thể tắt được cảm biến chuyển động.",
    "why": "Người dùng đặt điện thoại cố định trên bàn hoặc người bị khuyết tật vận động không thể lắc thiết bị để thực hiện tác vụ.",
    "how": [
      "Nếu có tính năng lắc để hoàn tác (Shake to Undo), hãy thiết kế thêm nút 'Hoàn tác' (Undo) trực tiếp trên màn hình.",
      "Cung cấp tùy chọn trong phần cài đặt để tắt phản hồi chuyển động."
    ],
    "do": "Thiết kế nút 'Undo' hiển thị rõ trên thanh công cụ soạn thảo.",
    "dont": "Chức năng hoàn tác chỉ kích hoạt duy nhất bằng cách lắc mạnh điện thoại."
  },
  {
    "id": "target-size-enhanced",
    "wcag": "2.5.5",
    "title": "Kích thước vùng tương tác nâng cao (Target Size)",
    "level": "AAA",
    "category": "interaction",
    "isNew22": false,
    "desc": "Đảm bảo diện tích vùng tương tác tối thiểu là 44x44 CSS pixels, ngoại trừ các liên kết nội dòng hoặc lý do đặc thù.",
    "why": "Giúp người dùng bị run tay hoặc sử dụng màn hình cảm ứng nhỏ có thể dễ dàng nhấn trúng đích mà không bị bấm nhầm.",
    "how": [
      "Thiết kế tất cả các icon chức năng, checkbox và nút bấm có khoảng đệm tối thiểu đạt kích thước 44x44px."
    ],
    "do": "Biểu tượng giỏ hàng có kích thước hiển thị 24x24px nhưng diện tích bấm hoạt động rộng 44x44px.",
    "dont": "Thiết kế các nút bấm nhỏ nằm san sát nhau với kích thước chỉ 20x20px."
  },
  {
    "id": "concurrent-input-mechanisms",
    "wcag": "2.5.6",
    "title": "Hỗ trợ nhiều phương thức nhập liệu (Concurrent Input)",
    "level": "AAA",
    "category": "interaction",
    "isNew22": false,
    "desc": "Trang web không được hạn chế người dùng sử dụng bất kỳ phương thức nhập liệu nào có sẵn trên thiết bị (bàn phím, chuột, màn hình cảm ứng, bút stylus, điều khiển giọng nói).",
    "why": "Người dùng có thể chuyển đổi linh hoạt giữa việc chạm màn hình và sử dụng bàn phím ngoài tùy thuộc vào tình trạng sức khỏe của họ.",
    "how": [
      "Không viết code chặn cảm ứng chạm khi phát hiện thiết bị có kết nối chuột.",
      "Đảm bảo giao diện phản hồi tốt với mọi loại thiết bị ngoại vi."
    ],
    "do": "Người dùng máy tính bảng lai có thể vừa chạm màn hình vừa gõ bàn phím vật lý để điền form.",
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
    "why": "Nhiều người dùng khuyết tật vận động không thể thực hiện thao tác kéo giữ chuột ổn định trên quãng đường dài.",
    "how": [
      "Thiết kế thêm các nút di chuyển (ví dụ: mũi tên lên/xuống) cho các mục trong danh sách có thể sắp xếp lại."
    ],
    "do": "Cung cấp nút 'Lên' và 'Xuống' bên cạnh mỗi thẻ công việc để sắp xếp thứ tự công việc.",
    "dont": "Thiết kế bảng Kanban chỉ cho phép kéo thả thẻ để chuyển cột mà không có tùy chọn menu nào."
  },
  {
    "id": "target-size-minimum",
    "wcag": "2.5.8",
    "title": "Kích thước vùng tương tác tối thiểu (Target Size - Minimum)",
    "level": "AA",
    "category": "interaction",
    "isNew22": true,
    "desc": "Vùng tương tác phải đạt tối thiểu 24x24 CSS pixels, hoặc có khoảng cách đệm an toàn để tránh bị bấm chồng lấn.",
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
    "title": "Khai báo ngôn ngữ của trang (Language of Page)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo ngôn ngữ chính của trang web được khai báo đúng trong mã nguồn (ví dụ: thuộc tính `<html lang=\"vi\">`).",
    "why": "Trình đọc màn hình dựa vào khai báo này để phát âm đúng ngữ điệu và ngôn ngữ của văn bản.",
    "how": [
      "Đưa yêu cầu khai báo thuộc tính `lang` tương ứng vào tài liệu thiết kế hệ thống (Design System)."
    ],
    "do": "Mã HTML có thuộc tính `<html lang=\"vi\">` cho trang tiếng Việt.",
    "dont": "Bỏ qua thuộc tính lang khiến trình đọc màn hình dùng tiếng Anh để đọc chữ tiếng Việt."
  },
  {
    "id": "language-of-parts",
    "wcag": "3.1.2",
    "title": "Khai báo ngôn ngữ cho từng phần (Language of Parts)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Khai báo ngôn ngữ riêng biệt cho các đoạn văn hoặc cụm từ viết bằng ngôn ngữ khác với ngôn ngữ chính của trang.",
    "why": "Trình đọc màn hình có thể chuyển giọng đọc chuẩn xác khi gặp một cụm từ tiếng nước ngoài giữa câu.",
    "how": [
      "Đánh dấu rõ ràng các từ mượn, câu trích dẫn tiếng nước ngoài để lập trình viên bọc thẻ thích hợp (ví dụ: `<span lang=\"en\">`)."
    ],
    "do": "Đoạn văn viết: 'Chúng tôi hướng tới chuẩn tiếp cận <span lang=\"en\">Accessibility</span> trên web.'",
    "dont": "Viết đoạn văn song ngữ lẫn lộn mà không khai báo thuộc tính lang cho phần dịch ngoại ngữ."
  },
  {
    "id": "unusual-words",
    "wcag": "3.1.3",
    "title": "Giải nghĩa các từ ngữ đặc biệt (Unusual Words)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp cơ chế định nghĩa hoặc giải nghĩa các từ ngữ chuyên ngành, thuật ngữ, biệt ngữ, tiếng lóng hoặc từ ngữ mang nghĩa bóng.",
    "why": "Người khuyết tật trí tuệ hoặc người dùng phổ thông có thể dễ dàng hiểu được các thuật ngữ phức tạp.",
    "how": [
      "Thiết kế thuật ngữ đi kèm liên kết chú giải (Tooltip giải nghĩa) hoặc trang Glossary tổng hợp từ điển thuật ngữ."
    ],
    "do": "Từ chuyên ngành có gạch chân nét đứt, khi hover chuột hiện Tooltip giải thích định nghĩa ngắn.",
    "dont": "Sử dụng hàng loạt thuật ngữ viết tắt chuyên môn y học phức tạp mà không có giải thích."
  },
  {
    "id": "abbreviations",
    "wcag": "3.1.4",
    "title": "Giải nghĩa các từ viết tắt (Abbreviations)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp định nghĩa đầy đủ cho các từ viết tắt hoặc cụm từ viết tắt chữ đầu (acronyms) ở lần xuất hiện đầu tiên.",
    "why": "Giúp người đọc và trình đọc màn hình hiểu đúng nghĩa của từ viết tắt đó.",
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
    "title": "Mức độ dễ đọc của văn bản (Reading Level)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Nếu văn bản yêu cầu trình độ đọc hiểu cao hơn trung học cơ sở, hãy cung cấp thêm một phiên bản tóm tắt giản lược hoặc giải thích bằng hình ảnh trực quan.",
    "why": "Người dùng mắc chứng khó đọc hoặc suy giảm nhận thức có thể nắm bắt được nội dung cốt lõi của các tài liệu pháp lý phức tạp.",
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
    "title": "Hướng dẫn phát âm từ ngữ mơ hồ (Pronunciation)",
    "level": "AAA",
    "category": "media",
    "isNew22": false,
    "desc": "Cung cấp cách phát âm cụ thể đối với những từ dễ gây hiểu nhầm nếu không có cách phát âm (như từ đồng chữ dị âm).",
    "why": "Trình đọc màn hình và người dùng có thể hiểu sai hoàn toàn ngữ cảnh nếu phát âm sai từ đó.",
    "how": [
      "Sử dụng các ký tự phiên âm quốc tế hoặc file âm thanh phát âm đính kèm bên cạnh từ mơ hồ."
    ],
    "do": "Thiết kế ký hiệu loa nhỏ phát âm thanh phát âm chuẩn bên cạnh tên thương hiệu nước ngoài.",
    "dont": "Sử dụng các từ đồng âm phức tạp mà không có bất kỳ chỉ dẫn phát âm nào."
  },
  {
    "id": "on-focus",
    "wcag": "3.2.1",
    "title": "Không tự động thay đổi ngữ cảnh khi nhận focus (On Focus)",
    "level": "A",
    "category": "interaction",
    "isNew22": false,
    "desc": "Việc di chuyển focus (bấm Tab) đến một phần tử tương tác không được phép tự động kích hoạt hành động thay đổi ngữ cảnh (như tự mở tab mới, tự gửi biểu mẫu).",
    "why": "Người dùng khiếm thị điều hướng bàn phím sẽ cực kỳ hoang mang nếu trang web tự động chuyển hướng chỉ vì họ lỡ Tab qua một ô nhập.",
    "how": [
      "Đảm bảo các hành động thay đổi ngữ cảnh chỉ xảy ra khi người dùng chủ động nhấn nút hoặc phím Enter.",
      "Tránh kích hoạt hành động mở popup chỉ bằng việc focus."
    ],
    "do": "Tab qua ô nhập điện thoại hiển thị viền xanh bình thường.",
    "dont": "Chỉ vừa nhấn Tab vào ô nhập điện thoại thì trang web tự động chuyển hướng sang trang mới."
  },
  {
    "id": "on-input",
    "wcag": "3.2.2",
    "title": "Không thay đổi ngữ cảnh đột ngột khi nhập liệu (On Input)",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Thay đổi cài đặt của bất kỳ ô nhập liệu nào (như tích chọn checkbox, chọn một mục trong dropdown) không được tự động gây ra thay đổi ngữ cảnh lớn, trừ khi người dùng đã được báo trước.",
    "why": "Giúp người dùng kiểm soát được giao diện mà không gặp bất ngờ gây gián đoạn công việc.",
    "how": [
      "Nếu việc chọn một mục trong dropdown tự động chuyển trang, hãy ghi rõ văn bản cảnh báo bên cạnh dropdown.",
      "Tốt nhất là thiết kế thêm nút 'Đi tiếp' (Submit) bên cạnh để người dùng nhấn chọn thay vì tự động kích hoạt."
    ],
    "do": "Chọn phương thức thanh toán thẻ tín dụng hiển thị thêm form nhập thẻ ở ngay bên dưới một cách tự nhiên.",
    "dont": "Tích chọn một checkbox đồng ý điều khoản thì trang web tự động chuyển hướng ngay sang trang khác."
  },
  {
    "id": "consistent-navigation",
    "wcag": "3.2.3",
    "title": "Hệ thống điều hướng nhất quán (Consistent Navigation)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Các cơ chế điều hướng lặp lại trên nhiều trang (như thanh menu chính, menu chân trang Footer) phải xuất hiện theo cùng một thứ tự và vị trí tương đối.",
    "why": "Người dùng có thể hình thành thói quen sử dụng và biết chính xác nơi tìm các liên kết mà không phải làm quen lại từ đầu ở mỗi trang con.",
    "how": [
      "Giữ nguyên thứ tự các nút trên thanh Header (ví dụ: Trang chủ, Sản phẩm, Liên hệ) ở tất cả các trang.",
      "Sử dụng chung một Layout mẫu điều hướng cho toàn hệ thống."
    ],
    "do": "Thanh điều hướng chính có cùng thiết kế và vị trí trên tất cả các trang của website.",
    "dont": "Trang chủ có menu nằm ngang ở đầu trang, nhưng sang trang bài viết menu lại chuyển thành dạng dọc bên trái."
  },
  {
    "id": "consistent-identification",
    "wcag": "3.2.4",
    "title": "Nhận diện thành phần nhất quán (Consistent Identification)",
    "level": "AA",
    "category": "navigation",
    "isNew22": false,
    "desc": "Các thành phần giao diện có cùng một chức năng trên toàn bộ website phải được gắn nhãn và thiết kế ký hiệu nhất quán.",
    "why": "Tránh gây bối rối cho người dùng khuyết tật nhận thức khi gặp các ký hiệu khác nhau cho cùng một tác vụ.",
    "how": [
      "Sử dụng cùng một biểu tượng (icon) chiếc kính lúp cho chức năng 'Tìm kiếm' ở mọi trang.",
      "Nhất quán trong cách đặt tên nhãn nút bấm (ví dụ: cùng dùng chữ 'Lưu' thay vì chỗ dùng 'Lưu', chỗ dùng 'Cập nhật')."
    ],
    "do": "Biểu tượng thùng rác luôn đại diện cho hành động 'Xóa' trên toàn bộ ứng dụng.",
    "dont": "Sử dụng biểu tượng phong bì cho nút 'Liên hệ' ở trang này nhưng lại dùng cho nút 'Nhận thư tin tức' ở trang khác."
  },
  {
    "id": "change-on-request",
    "wcag": "3.2.5",
    "title": "Thay đổi ngữ cảnh chỉ khi yêu cầu (Change on Request)",
    "level": "AAA",
    "category": "interaction",
    "isNew22": false,
    "desc": "Đảm bảo mọi thay đổi ngữ cảnh (mở cửa sổ mới, chuyển trang, cập nhật nội dung tự động) chỉ được kích hoạt bởi hành động chủ động của người dùng.",
    "why": "Người dùng khiếm thị hoặc khuyết tật nhận thức có thể bị mất kiểm soát hoàn toàn nếu giao diện tự động thay đổi ngoài ý muốn.",
    "how": [
      "Tắt bỏ các popup quảng cáo tự nhảy ra theo thời gian.",
      "Không tự động chuyển trang khi người dùng vừa hoàn thành điền ô nhập."
    ],
    "do": "Trang web chỉ cập nhật dữ liệu mới khi người dùng nhấn nút 'Tải lại dữ liệu'.",
    "dont": "Tự động mở ra một tab trình duyệt mới giới thiệu sản phẩm mà người dùng không hề bấm vào liên kết nào."
  },
  {
    "id": "consistent-help-standard",
    "wcag": "3.2.6",
    "title": "Đặt thông tin trợ giúp nhất quán (Consistent Help)",
    "level": "A",
    "category": "navigation",
    "isNew22": true,
    "desc": "Nếu trang cung cấp các hình thức trợ giúp, chúng phải được đặt ở cùng một vị trí tương đối trên mọi trang.",
    "why": "Giúp người dùng dễ dàng tìm thấy sự trợ giúp khi gặp khó khăn tại bất kỳ bước nào của quy trình.",
    "how": [
      "Thiết kế liên kết 'Trợ giúp' hoặc biểu tượng chat hỗ trợ nằm ở một góc cố định trên mọi trang."
    ],
    "do": "Nút chat hỗ trợ luôn cố định ở góc dưới bên phải màn hình trên toàn hệ thống.",
    "dont": "Trang này chatbot nằm ở góc phải, trang khác lại di chuyển lên thanh menu chính."
  },
  {
    "id": "error-identification",
    "wcag": "3.3.1",
    "title": "Nhận diện lỗi nhập liệu (Error Identification)",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Khi phát hiện lỗi nhập liệu tự động, phần tử bị lỗi phải được chỉ rõ bằng trực quan và thông báo lỗi phải được mô tả bằng văn bản cho người dùng.",
    "why": "Người khiếm thị hoặc người khuyết tật nhận thức cần biết chính xác trường nào bị lỗi và lỗi đó là gì để sửa đúng chỗ.",
    "how": [
      "Thiết kế trạng thái lỗi rõ ràng cho ô nhập liệu: viền đổi màu đỏ, biểu tượng cảnh báo và dòng chữ mô tả lỗi cụ thể hiển thị ngay bên dưới ô.",
      "Đảm bảo thông báo lỗi có thể được trình đọc màn hình đọc lên (sử dụng thuộc tính `aria-describedby` hoặc `aria-live`)."
    ],
    "do": "Ô nhập Email đổi viền đỏ kèm thông báo rõ ràng: 'Vui lòng nhập địa chỉ email hợp lệ (ví dụ: ten@email.com)'.",
    "dont": "Chỉ đổi viền ô nhập sang màu đỏ mà không hiển thị bất kỳ dòng chữ nào giải thích lỗi."
  },
  {
    "id": "labels-or-instructions",
    "wcag": "3.3.2",
    "title": "Nhãn hoặc hướng dẫn cho ô nhập liệu (Labels or Instructions)",
    "level": "A",
    "category": "form",
    "isNew22": false,
    "desc": "Cung cấp nhãn (labels) hoặc hướng dẫn rõ ràng cho các ô nhập liệu yêu cầu người dùng nhập dữ liệu.",
    "why": "Người khiếm thị sử dụng trình đọc màn hình cần nghe nhãn để hiểu ô nhập liệu yêu cầu thông tin gì; người khuyết tật nhận thức cần hướng dẫn rõ ràng để điền đúng.",
    "how": [
      "Thiết kế nhãn hiển thị rõ ràng, cố định bên ngoài ô nhập (không chỉ dùng placeholder biến mất khi gõ).",
      "Cung cấp hướng dẫn bổ sung về định dạng dữ liệu bắt buộc (ví dụ: 'Định dạng: DD/MM/YYYY') và đánh dấu rõ ràng các trường bắt buộc (*)."
    ],
    "do": "Ô nhập ngày sinh có nhãn cố định 'Ngày sinh *' phía trên và gợi ý định dạng 'DD/MM/YYYY' hiển thị bên dưới.",
    "dont": "Ô nhập chỉ có placeholder 'Nhập thông tin...' biến mất khi người dùng bắt đầu gõ, khiến họ quên mình đang điền gì."
  },
  {
    "id": "error-suggestions",
    "wcag": "3.3.3",
    "title": "Gợi ý cách khắc phục lỗi biểu mẫu (Error Suggestion)",
    "level": "AA",
    "category": "form",
    "isNew22": false,
    "desc": "Khi phát hiện lỗi nhập liệu, cung cấp văn bản gợi ý cách sửa lỗi cụ thể cho người dùng (trừ khi ảnh hưởng đến bảo mật).",
    "why": "Giúp người khuyết tật nhận thức hoặc người dùng phổ thông biết cách sửa lỗi nhanh chóng mà không cần đoán.",
    "how": [
      "Thay vì ghi 'Lỗi nhập liệu', hãy viết cụ thể: 'Mật khẩu phải bao gồm ít nhất 1 chữ in hoa và 1 ký số'."
    ],
    "do": "Hiển thị gợi ý: 'Vui lòng nhập định dạng ngày sinh DD/MM/YYYY'.",
    "dont": "Chỉ hiển thị dòng chữ cảnh báo chung chung: 'Dữ liệu không hợp lệ'."
  },
  {
    "id": "error-prevention-legal",
    "wcag": "3.3.4",
    "title": "Ngăn ngừa lỗi đối với giao dịch pháp lý, tài chính (Error Prevention)",
    "level": "AA",
    "category": "form",
    "isNew22": false,
    "desc": "Đối với các trang web thực hiện giao dịch tài chính, pháp lý hoặc gửi dữ liệu quan trọng, phải cho phép người dùng kiểm tra lại thông tin, sửa lỗi hoặc hủy giao dịch trước khi gửi đi.",
    "why": "Người dùng khuyết tật dễ gặp sai sót khi nhập liệu; việc cho phép hoàn tác hoặc xem lại giúp ngăn chặn các thiệt hại nghiêm trọng.",
    "how": [
      "Thiết kế bước 'Xác nhận thông tin' hiển thị tóm tắt toàn bộ dữ liệu đã điền trước khi nhấn nút thanh toán/gửi.",
      "Cung cấp nút 'Hủy bỏ' hoặc cơ chế 'Hoàn tác' giao dịch trong một khoảng thời gian."
    ],
    "do": "Quy trình chuyển tiền có bước hiển thị thông tin người nhận và số tiền để người dùng ấn xác nhận.",
    "dont": "Thực hiện gửi đơn hàng và trừ tiền ngay lập tức khi người dùng vừa điền xong form mà không qua bước xác nhận."
  },
  {
    "id": "help-context-sensitive",
    "wcag": "3.3.5",
    "title": "Cung cấp trợ giúp theo ngữ cảnh (Help)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Cung cấp trợ giúp chi tiết theo ngữ cảnh cho từng trường nhập liệu phức tạp (như tooltip giải nghĩa, văn bản hướng dẫn đi kèm).",
    "why": "Giúp người dùng hiểu rõ mục đích của các câu hỏi phức tạp hoặc định dạng bắt buộc mà không cần rời khỏi trang.",
    "how": [
      "Thiết kế biểu tượng dấu hỏi chấm tròn nhỏ bên cạnh nhãn trường; khi nhấn vào hiển thị giải thích chi tiết."
    ],
    "do": "Trường mã bưu chính có nút '?' hiển thị mô tả: 'Mã bưu chính gồm 6 chữ số đại diện cho tỉnh/thành của bạn'.",
    "dont": "Yêu cầu nhập mã số thuế cá nhân mà không giải thích cách tìm mã số đó ở đâu."
  },
  {
    "id": "error-prevention-all",
    "wcag": "3.3.6",
    "title": "Ngăn ngừa lỗi cho tất cả biểu mẫu (Error Prevention - All)",
    "level": "AAA",
    "category": "form",
    "isNew22": false,
    "desc": "Đảm bảo cơ chế kiểm tra lại dữ liệu và xác nhận được áp dụng cho mọi biểu mẫu nhập liệu trên website (không giới hạn ở tài chính/pháp lý như 3.3.4).",
    "why": "Tạo sự an tâm tuyệt đối cho người dùng khi gửi bất kỳ thông tin nào lên hệ thống.",
    "how": [
      "Thiết kế hộp thoại xác nhận cho tất cả các loại form (kể cả form liên hệ hoặc gửi khảo sát)."
    ],
    "do": "Hiển thị hộp thoại hỏi lại: 'Bạn có chắc chắn muốn gửi ý kiến phản hồi này không?' trước khi gửi biểu mẫu.",
    "dont": "Đăng tải bài viết blog ngay lập tức sau khi nhấn Enter mà không cho phép xem trước hoặc sửa đổi."
  },
  {
    "id": "redundant-entry-standard",
    "wcag": "3.3.7",
    "title": "Tránh nhập liệu lặp lại (Redundant Entry)",
    "level": "A",
    "category": "form",
    "isNew22": true,
    "desc": "Tự động điền hoặc cung cấp tùy chọn chọn lại thông tin đã nhập trước đó trong cùng một quy trình.",
    "why": "Giúp người dùng khuyết tật vận động hoặc nhận thức tiết kiệm thời gian và giảm mệt mỏi.",
    "how": [
      "Thiết kế nút tích chọn: 'Địa chỉ thanh toán trùng với địa chỉ giao hàng'."
    ],
    "do": "Form tự động lấy tên và số điện thoại đăng ký tài khoản điền sẵn vào form đặt hàng.",
    "dont": "Bắt người dùng điền lại thông tin cá nhân ở mỗi bước của quy trình đăng ký dịch vụ gồm 3 bước."
  },
  {
    "id": "accessible-auth-minimum",
    "wcag": "3.3.8",
    "title": "Xác thực tiếp cận tối thiểu (Accessible Authentication)",
    "level": "AA",
    "category": "form",
    "isNew22": true,
    "desc": "Không yêu cầu các bài kiểm tra nhận thức (giải toán, giải đố CAPTCHA) trong quy trình xác thực/đăng nhập mà không có giải pháp thay thế.",
    "why": "Nhiều người dùng gặp khó khăn lớn về trí nhớ hoặc nhận thức không thể giải được các câu đố để đăng nhập.",
    "how": [
      "Hỗ trợ các trình quản lý mật khẩu tự động điền.",
      "Cho phép copy-paste mật khẩu và mã xác thực OTP.",
      "Cung cấp đăng nhập sinh trắc học hoặc liên kết đăng nhập qua email (Magic Link)."
    ],
    "do": "Đăng nhập nhanh bằng tài khoản Google/Facebook hoặc hỗ trợ quét vân tay.",
    "dont": "Bắt buộc người dùng giải bài toán phép tính cộng trừ để hoàn tất đăng nhập."
  },
  {
    "id": "accessible-auth-enhanced",
    "wcag": "3.3.9",
    "title": "Xác thực tiếp cận nâng cao (Accessible Authentication - Enhanced)",
    "level": "AAA",
    "category": "form",
    "isNew22": true,
    "desc": "Quy trình xác thực hoàn toàn không được yêu cầu bài kiểm tra nhận thức, kể cả các hình thức nhận diện hình ảnh hoặc nội dung cá nhân (không có ngoại lệ như 3.3.8).",
    "why": "Đảm bảo trải nghiệm đăng nhập không có rào cản nhận thức cho mọi đối tượng.",
    "how": [
      "Thiết kế quy trình đăng nhập cực kỳ đơn giản sử dụng liên kết Magic Link gửi qua email hoặc mã bảo mật vật lý."
    ],
    "do": "Đăng nhập bằng cách nhấp vào liên kết xác nhận gửi về email của người dùng.",
    "dont": "Yêu cầu người dùng chọn tất cả các bức ảnh có chứa xe buýt để chứng minh không phải robot."
  },
  {
    "id": "name-role-value",
    "wcag": "4.1.2",
    "title": "Tên, Vai trò và Giá trị của thành phần (Name, Role, Value)",
    "level": "A",
    "category": "navigation",
    "isNew22": false,
    "desc": "Đảm bảo tất cả các thành phần giao diện tùy biến (như nút tự vẽ, tab tùy biến) đều được thiết kế rõ ràng về Tên (Name), Vai trò (Role) và Trạng thái/Giá trị (Value) để công nghệ hỗ trợ nhận diện được.",
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
    "title": "Thông báo trạng thái động (Status Messages)",
    "level": "AA",
    "category": "form",
    "isNew22": false,
    "desc": "Đảm bảo các thông báo trạng thái mới xuất hiện động trên trang (như thông báo 'Đã lưu thành công', 'Giỏ hàng đã cập nhật') được trình đọc màn hình thông báo cho người dùng mà không cần di chuyển focus đến đó.",
    "why": "Giúp người dùng khiếm thị biết các thay đổi đang diễn ra trên trang mà không bị mất vị trí tương tác hiện tại.",
    "how": [
      "Định nghĩa các vùng thông báo động sử dụng thuộc tính `aria-live=\"polite\"` hoặc `role=\"status\"`."
    ],
    "do": "Thông báo 'Đã thêm sản phẩm vào giỏ hàng' hiển thị ở góc màn hình và được trình đọc màn hình tự động đọc lên.",
    "dont": "Hiển thị thông báo trạng thái cập nhật thành công một cách im lặng khiến người mù không biết thao tác của họ đã hoàn tất chưa."
  }
];