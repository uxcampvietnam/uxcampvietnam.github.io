// --- DỮ LIỆU 4 BỘ CHECKLIST HEURISTIC (ĐÃ DỊCH & LÀM GIÀU) ---
const HEURISTIC_DATA = {
  "nielsen": {
    "title": "10 Nguyên tắc Heuristics của Nielsen",
    "categories": [
      {
        "id": 1,
        "name": "Trạng thái hệ thống hiển thị rõ ràng",
        "criteria": [
          {
            "id": 1,
            "text_en": "If the system processes a request for more than 3 seconds, is the loader displayed & is there a hint of how much time the processing will take?",
            "text": "Nếu hệ thống xử lý yêu cầu trong hơn 3 giây, trình tải có được hiển thị không và có gợi ý về thời gian xử lý sẽ mất không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "text_en": "If there are observable delays (greater than fifteen seconds) in the system’s response time, is the user kept informed of the system's progress?",
            "text": "Nếu có độ trễ có thể quan sát được (lớn hơn mười lăm giây) trong thời gian phản hồi của hệ thống, người dùng có được thông báo về tiến trình của hệ thống không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "text_en": "The user is aware of their current position within the user journey. Progress and response notifications (progress icon, transparent dialogues)?",
            "text": "Người dùng biết vị trí hiện tại của họ trong hành trình của người dùng. Thông báo tiến trình và phản hồi (biểu tượng tiến trình, hộp thoại minh bạch)?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "text_en": "If users must navigate between multiple screens, does the system use context labels, menu maps, and place markers as navigational aids?",
            "text": "Nếu người dùng phải điều hướng giữa nhiều màn hình, hệ thống có sử dụng nhãn ngữ cảnh, bản đồ menu và điểm đánh dấu địa điểm làm công cụ hỗ trợ điều hướng không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "text_en": "The user is notified about changes in their user journey (e.g. the user is not redirected through screens and the seamless flow is being preserved)?",
            "text": "Người dùng có được thông báo về những thay đổi trong hành trình người dùng của họ (ví dụ: người dùng không được chuyển hướng qua các màn hình và luồng liền mạch vẫn được giữ nguyên)?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 6,
            "text_en": "There is a clear feedback when a task has been completed successfully?",
            "text": "Có phản hồi rõ ràng khi một nhiệm vụ đã được hoàn thành thành công?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 7,
            "text_en": "After the user completes an action (or group of actions), does the feedback indicate that the next group of actions can be started?",
            "text": "Sau khi người dùng hoàn thành một hành động (hoặc nhóm hành động), phản hồi có cho biết rằng nhóm hành động tiếp theo có thể được bắt đầu không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 8,
            "text_en": "Every screen start with a title that describes the page's content?",
            "text": "Mọi màn hình đều bắt đầu bằng tiêu đề mô tả nội dung của trang?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 9,
            "text_en": "System elements such as Buttons, search, inputs, and items have affordance for (different) states or traits (like active, focus, disable, unavailable)?",
            "text": "Các thành phần hệ thống như Nút, tìm kiếm, đầu vào và mục có đủ khả năng cho các trạng thái hoặc đặc điểm (khác nhau) (như hoạt động, tập trung, tắt, không khả dụng) không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 10,
            "text_en": "Animations are purposeful, consistent, they feed back about consequences, connect action with its result, don't distract user; and happen swiftly, not delaying or slowing product down?",
            "text": "Hoạt ảnh có mục đích, nhất quán, phản hồi về hậu quả, kết nối hành động với kết quả của nó, không làm người dùng mất tập trung; và diễn ra nhanh chóng, không làm trì hoãn hoặc làm chậm sản phẩm?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 11,
            "text_en": "Do GUI menus make obvious which item has been selected?",
            "text": "Các menu GUI có hiển thị rõ ràng mục nào đã được chọn không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 12,
            "text_en": "Is the menu-naming terminology consistent with the user's task domain?",
            "text": "Thuật ngữ đặt tên menu có phù hợp với miền nhiệm vụ của người dùng không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 13,
            "text_en": "Is there a consistent icon design scheme and stylistic treatment across the system?",
            "text": "Có sơ đồ thiết kế biểu tượng nhất quán và phong cách xử lý trên toàn hệ thống không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 14,
            "text_en": "Is the current status of an icon clearly indicated?",
            "text": "Trạng thái hiện tại của biểu tượng có được chỉ rõ rõ ràng không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 15,
            "text_en": "Do menu instructions, prompts, and error messages all appear in the same place(s) and have the same stylistic appearance?",
            "text": "Các hướng dẫn menu, lời nhắc và thông báo lỗi có xuất hiện ở cùng một nơi và có cùng kiểu dáng không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 16,
            "text_en": "If pop-up windows are used to display error messages, do they allow the user to see the field in error?",
            "text": "Nếu cửa sổ bật lên được sử dụng để hiển thị thông báo lỗi, chúng có cho phép người dùng xem trường bị lỗi không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 17,
            "text_en": "If a user can select multiple options, Is there visual feedback in menus or dialog boxes about which choices are selectable?",
            "text": "Nếu người dùng có thể chọn nhiều tùy chọn, Có phản hồi trực quan nào trong menu hoặc hộp thoại về những lựa chọn có thể chọn không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 18,
            "text_en": "If multiple options can be selected in a menu or dialog box, is there visual feedback about which options are already selected?",
            "text": "Nếu có thể chọn nhiều tùy chọn trong menu hoặc hộp thoại, liệu có phản hồi trực quan về những tùy chọn đã được chọn không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 19,
            "text_en": "Is a single, selected icon clearly visible when surrounded by unselected icons?",
            "text": "Một biểu tượng đã chọn có hiển thị rõ ràng khi được bao quanh bởi các biểu tượng không được chọn không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 20,
            "text_en": "Do GUI menus make obvious whether deselection is possible?",
            "text": "Các menu GUI có làm rõ liệu có thể bỏ chọn không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 2,
        "name": "Tương thích giữa hệ thống và thế giới thực",
        "criteria": [
          {
            "id": 1,
            "text_en": "The System matches the user's expectations and prior experiences with real-world systems (e.g.there are no incomprehensible, unnatural actions driven by technical constraints, like assigning person to user, filling all organization data before sending the order).",
            "text": "Hệ thống phù hợp với kỳ vọng và trải nghiệm trước đây của người dùng với các hệ thống trong thế giới thực (ví dụ: không có hành động khó hiểu, không tự nhiên nào do các ràng buộc kỹ thuật, như chỉ định người cho người dùng, điền tất cả dữ liệu của tổ chức trước khi gửi đơn đặt hàng).",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 2,
            "text_en": "The navigation is in a familiar location for users.",
            "text": "Điều hướng nằm ở vị trí quen thuộc với người dùng.",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 3,
            "text_en": "All system elements (UI elements and interaction prompts) matches user experience and expectations and clearly represent their meaning (e.g. the search icon represented by a magnifying glass).",
            "text": "Tất cả các thành phần hệ thống (thành phần giao diện người dùng và lời nhắc tương tác) đều phù hợp với trải nghiệm và mong đợi của người dùng, đồng thời thể hiện rõ ràng ý nghĩa của chúng (ví dụ: biểu tượng tìm kiếm được biểu thị bằng kính lúp).",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 4,
            "text_en": "The system speak users' language with familiar words, phrases, and concepts rather than system-oriented terms (e.g. Metaphors unambiguously reveal their meaning).",
            "text": "Hệ thống nói ngôn ngữ của người dùng bằng các từ, cụm từ và khái niệm quen thuộc thay vì các thuật ngữ hướng đến hệ thống (ví dụ: Phép ẩn dụ bộc lộ rõ ​​ràng ý nghĩa của chúng).",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 5,
            "text_en": "System matches real World actions meaning and behavior (e.g. delete is not the same as remove. Create is different from add or permit)?",
            "text": "Hệ thống khớp với ý nghĩa và hành vi của các hành động trong Thế giới thực (ví dụ: xóa không giống với xóa. Tạo khác với thêm hoặc cho phép)?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 6,
            "text_en": "Obvious actions are performed automatically, without user prior confirmation?",
            "text": "Các hành động rõ ràng được thực hiện tự động mà không cần xác nhận trước của người dùng?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 7,
            "text_en": "The system do essential part of the work for users (e.g. offers ready currency signs, country mobile codes, division of numbers into threes (9,999,999))?",
            "text": "Hệ thống thực hiện một phần công việc thiết yếu cho người dùng (ví dụ: cung cấp các ký hiệu tiền tệ sẵn sàng, mã di động quốc gia, chia số thành ba (9,999,999))?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 8,
            "text_en": "Does the system automatically enter a dollar sign and decimal for monetary entries?",
            "text": "Hệ thống có tự động nhập ký hiệu đô la và số thập phân để nhập tiền không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 9,
            "text_en": "Details or the software’s internal workings (that user has no control over) are not exposed to the user (both by system errors or nomenclature)?",
            "text": "Thông tin chi tiết hoặc hoạt động nội bộ của phần mềm (người dùng đó không có quyền kiểm soát) không được hiển thị cho người dùng (cả do lỗi hệ thống hoặc danh pháp)?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 10,
            "text_en": "Features and actions are context related (e. g, disabled action for locked layer or saving disabled for already saved changes)?",
            "text": "Các tính năng và hành động có liên quan đến ngữ cảnh (ví dụ: hành động bị vô hiệu hóa đối với lớp bị khóa hoặc việc lưu bị vô hiệu hóa đối với các thay đổi đã lưu)?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 11,
            "text_en": "Copywriting is appropriate (level of formality and understandable (level of argon) to end users (e.g. All abbreviations, acronyms, technical terms, or jargon, are clearly explained)?",
            "text": "Viết quảng cáo có phù hợp không (mức độ trang trọng và dễ hiểu (mức độ argon) đối với người dùng cuối (ví dụ: Tất cả các từ viết tắt, từ viết tắt, thuật ngữ kỹ thuật hoặc biệt ngữ đều được giải thích rõ ràng)?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 12,
            "text_en": "Are menu choices ordered in the most logical way, given the user, the item names, and the task variables?",
            "text": "Các lựa chọn menu có được sắp xếp theo cách hợp lý nhất cho người dùng, tên mục và các biến tác vụ không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 13,
            "text_en": "Do related and interdependent fields appear on the same screen?",
            "text": "Các trường liên quan và phụ thuộc lẫn nhau có xuất hiện trên cùng một màn hình không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 14,
            "text_en": "Do the selected colors correspond to common expectations about color codes?",
            "text": "Các màu được chọn có tương ứng với những mong đợi chung về mã màu không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 15,
            "text_en": "When prompts imply a necessary action, are the words in the message consistent with that action?",
            "text": "Khi lời nhắc ám chỉ một hành động cần thiết, các từ trong thông báo có nhất quán với hành động đó không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 16,
            "text_en": "On data entry screens, are tasks described in terminology familiar to users?",
            "text": "Trên màn hình nhập dữ liệu, các tác vụ được mô tả bằng thuật ngữ có quen thuộc với người dùng không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 17,
            "text_en": "For question and answer interfaces, are questions stated in clear, simple language?",
            "text": "Đối với giao diện hỏi đáp, các câu hỏi có được trình bày bằng ngôn ngữ đơn giản, rõ ràng không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 18,
            "text_en": "Do menu choices fit logically into categories that have readily understood meanings?",
            "text": "Các lựa chọn thực đơn có phù hợp một cách hợp lý với các danh mục có ý nghĩa dễ hiểu không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 19,
            "text_en": "Does the command language employ user jargon and avoid computer jargon?",
            "text": "Ngôn ngữ lệnh có sử dụng biệt ngữ của người dùng và tránh biệt ngữ máy tính không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 20,
            "text_en": "Are command names specific rather than general?",
            "text": "Tên lệnh có cụ thể hơn là chung chung không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 21,
            "text_en": "Does the system automatically enter leading or trailing spaces to align decimal points6",
            "text": "Hệ thống có tự động nhập dấu cách đầu hoặc cuối để căn chỉnh dấu thập phân6",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 22,
            "text_en": "Do GUI menus offer activation: that is, make obvious how to say now do it?",
            "text": "Các menu GUI có cung cấp kích hoạt không: nghĩa là nói rõ ràng cách nói bây giờ làm điều đó?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          }
        ]
      },
      {
        "id": 3,
        "name": "Quyền kiểm soát và tự do của người dùng",
        "criteria": [
          {
            "id": 1,
            "text_en": "The user has access to their personal information?",
            "text": "Người dùng có quyền truy cập vào thông tin cá nhân của họ?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "text_en": "The consequences of actions is reflected by the UI appearance (e.g. Ok button is green not red)?",
            "text": "Hậu quả của hành động được phản ánh qua giao diện người dùng (ví dụ: nút Ok có màu xanh lá cây chứ không phải màu đỏ)?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "text_en": "The system provides proper feedback (e.g. progress indicators or messages) when needed (e.g. during checkout)?",
            "text": "Hệ thống có cung cấp phản hồi thích hợp (ví dụ: chỉ báo tiến trình hoặc thông báo) khi cần (ví dụ: trong quá trình thanh toán)?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 4,
            "text_en": "It is obvious to users how to undo, change options, or cancel actions; or they are at least given the opportunity to confirm irreversible actions before committing?",
            "text": "Người dùng có thể thấy rõ cách hoàn tác, thay đổi tùy chọn hoặc hủy hành động; hoặc ít nhất họ cũng có cơ hội xác nhận những hành động không thể thay đổi trước khi cam kết?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 5,
            "text_en": "If the system allows users to reverse their actions, is there a retracing mechanism to allow for multiple undos?",
            "text": "Nếu hệ thống cho phép người dùng đảo ngược hành động của họ, liệu có cơ chế truy nguyên nào cho phép thực hiện nhiều thao tác hoàn tác không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 6,
            "text_en": "Can users cancel out of operations in progress?",
            "text": "Người dùng có thể hủy các hoạt động đang diễn ra không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 7,
            "text_en": "Pop-ups message is clear and user knows what each action means (e.g. he knows he is cancelling or 'OKing')?",
            "text": "Thông báo bật lên rõ ràng và người dùng biết từng hành động có ý nghĩa gì (ví dụ: anh ấy biết mình đang hủy hoặc 'OK')?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 8,
            "text_en": "When a user's task is complete, does the system wait for a signal from the user before processing?",
            "text": "Khi tác vụ của người dùng hoàn thành, hệ thống có chờ tín hiệu từ người dùng trước khi xử lý không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 9,
            "text_en": "Can users type-ahead in a system with many nested menus?",
            "text": "Người dùng có thể gõ trước trong một hệ thống có nhiều menu lồng nhau không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 10,
            "text_en": "Is there an undo function at the level of a single action, a data entry, and a complete group of actions?",
            "text": "Có chức năng hoàn tác ở cấp độ một hành động, một mục nhập dữ liệu và một nhóm hành động hoàn chỉnh không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 11,
            "text_en": "Can users reduce data entry time by copying and modifying existing data?",
            "text": "Người dùng có thể giảm thời gian nhập dữ liệu bằng cách sao chép và sửa đổi dữ liệu hiện có không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 12,
            "text_en": "If the system uses a pointing device, do users have the option of either clicking on menu items or using a keyboard shortcut?",
            "text": "Nếu hệ thống sử dụng thiết bị trỏ, người dùng có tùy chọn nhấp vào các mục menu hoặc sử dụng phím tắt không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 13,
            "text_en": "Are menus broad (many items on a menu) rather than deep (many menu levels)?",
            "text": "Các menu có rộng (nhiều mục trên một menu) thay vì sâu (nhiều cấp độ menu) không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 14,
            "text_en": "Can users move forward and backward between fields or dialog box options?",
            "text": "Người dùng có thể di chuyển tiến và lùi giữa các trường hoặc tùy chọn hộp thoại không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 15,
            "text_en": "If the system has multipage data entry screens, can users move backward and forward among all the pages in the set?",
            "text": "Nếu hệ thống có màn hình nhập dữ liệu nhiều trang, người dùng có thể di chuyển lùi và tiến giữa tất cả các trang trong bộ không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 16,
            "text_en": "If the system uses a question and answer interface, can users go back to previous questions or skip forward to later questions?",
            "text": "Nếu hệ thống sử dụng giao diện hỏi đáp, người dùng có thể quay lại câu hỏi trước hoặc chuyển sang câu hỏi sau không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 17,
            "text_en": "The system ensures that work is not lost (either by the user or system error)?",
            "text": "Hệ thống có đảm bảo rằng công việc không bị mất (do lỗi của người dùng hoặc hệ thống)?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      },
      {
        "id": 4,
        "name": "Nhất quán và tuân thủ tiêu chuẩn",
        "criteria": [
          {
            "id": 1,
            "text_en": "The current user's location within the system and the path they are taking are clearly displayed (e.g. breadcrumb, highlighted menu item). The user understands how to return, where he will be driven in the next screen, and how to exit?",
            "text": "Vị trí của người dùng hiện tại trong hệ thống và đường dẫn họ đang đi được hiển thị rõ ràng (ví dụ: đường dẫn, mục menu được đánh dấu). Người dùng hiểu cách quay lại, nơi anh ta sẽ được đưa đến trong màn hình tiếp theo và cách thoát ra?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 2,
            "text_en": "The navigation scheme (e.g. menu) is easy to find, intuitive and consistent. The navigation system is broad and shallow (many items on a menu) rather than deep (many menu levels, nested items)?",
            "text": "Sơ đồ điều hướng (ví dụ: menu) rất dễ tìm, trực quan và nhất quán. Hệ thống điều hướng rộng và nông (nhiều mục trên một menu) chứ không sâu (nhiều cấp độ menu, các mục lồng nhau)?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 3,
            "text_en": "Navigation choices are ordered in the most logical task-oriented manner. Important actions are close at hand?",
            "text": "Các lựa chọn điều hướng được sắp xếp theo cách định hướng nhiệm vụ hợp lý nhất. Những hành động quan trọng đã gần kề?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 4,
            "text_en": "Complex actions are broken down into well-defined and logical steps. The user is aware of how long it will take to complete a procedure and how much data he must enter?",
            "text": "Các hành động phức tạp được chia thành các bước hợp lý và được xác định rõ ràng. Người dùng biết sẽ mất bao lâu để hoàn thành một quy trình và mình phải nhập bao nhiêu dữ liệu?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 5,
            "text_en": "Does the menu structure match the task structure?",
            "text": "Cấu trúc menu có phù hợp với cấu trúc nhiệm vụ không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 6,
            "text_en": "The system employs consistent feature placement and interface element design across views (e.g. for headings, the system employs a consistent design standard)?",
            "text": "Hệ thống sử dụng vị trí tính năng nhất quán và thiết kế thành phần giao diện trên các chế độ xem (ví dụ: đối với tiêu đề, hệ thống sử dụng tiêu chuẩn thiết kế nhất quán)?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 7,
            "text_en": "Are menu titles either centered or left-justified?",
            "text": "Tiêu đề menu có được căn giữa hay căn trái không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 8,
            "text_en": "The user can quickly return to the main screen or a specific start point as navigation is persistent and always at hand?",
            "text": "Người dùng có thể nhanh chóng quay lại màn hình chính hoặc một điểm bắt đầu cụ thể vì điều hướng liên tục và luôn trong tầm tay?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 9,
            "text_en": "The system contains elements or features that are common, externally standard, and domain-specific (shopping cart, log-out, history of instalments)?",
            "text": "Hệ thống có chứa các thành phần hoặc tính năng phổ biến, tiêu chuẩn bên ngoài và dành riêng cho từng miền (giỏ hàng, đăng xuất, lịch sử trả góp)?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 10,
            "text_en": "There are no redundant or similar features or components (e.g., Submit, Save, Send), nor do different words, symbols, or actions mean the same thing?",
            "text": "Không có tính năng hoặc thành phần dư thừa hoặc tương tự (ví dụ: Gửi, Lưu, Gửi), cũng như các từ, ký hiệu hoặc hành động khác nhau có nghĩa giống nhau không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 11,
            "text_en": "The system employs a consistent design standard for all controls and call to actions (CTA) on the screen?",
            "text": "Hệ thống có sử dụng tiêu chuẩn thiết kế nhất quán cho tất cả các điều khiển và lời kêu gọi hành động (CTA) trên màn hình không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 12,
            "text_en": "The user is led directly to the desired screen rather than having to navigate to it. Important information can be accessed via multiple links (multi-lateral access)?",
            "text": "Người dùng được dẫn thẳng đến màn hình mong muốn thay vì phải điều hướng đến màn hình đó. Thông tin quan trọng có thể được truy cập thông qua nhiều liên kết (truy cập đa bên)?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 13,
            "text_en": "Has a heavy use of all uppercase letters on a screen been avoided?",
            "text": "Đã tránh được việc sử dụng nhiều chữ in hoa trên màn hình chưa?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 14,
            "text_en": "Do on-line instructions appear in a consistent location across screens?",
            "text": "Các hướng dẫn trực tuyến có xuất hiện ở một vị trí nhất quán trên các màn hình không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 15,
            "text_en": "Are field labels consistent from one data entry screen to another?",
            "text": "Nhãn trường có nhất quán từ màn hình nhập dữ liệu này sang màn hình nhập dữ liệu khác không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 16,
            "text_en": "Are fields and labels left-justified for alpha lists and right-justified for numeric lists?",
            "text": "Các trường và nhãn có được căn trái cho danh sách alpha và căn phải cho danh sách số không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 17,
            "text_en": "Do field labels appear to the left of single fields and above list fields?",
            "text": "Nhãn trường có xuất hiện ở bên trái của các trường đơn lẻ và các trường danh sách phía trên không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 18,
            "text_en": "Are attention-getting techniques (sound, micro-interactions, etc) used only for exceptional conditions or for time-dependent information?",
            "text": "Có phải các kỹ thuật thu hút sự chú ý (âm thanh, tương tác vi mô, v.v.) chỉ được sử dụng trong các điều kiện đặc biệt hoặc cho thông tin phụ thuộc vào thời gian?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 19,
            "text_en": "Sound: soft tones for regular positive feedback, harsh for rare critical conditions",
            "text": "Âm thanh: âm thanh nhẹ nhàng cho phản hồi tích cực thường xuyên, gay gắt cho các điều kiện quan trọng hiếm gặp",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 20,
            "text_en": "Color: up to four (additional colors for occasional use only)",
            "text": "Màu sắc: tối đa bốn (màu bổ sung chỉ thỉnh thoảng sử dụng)",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 21,
            "text_en": "Is a legend provided if color codes are numerous or not obvious in meaning?",
            "text": "Chú giải có được cung cấp nếu mã màu có nhiều hoặc không có ý nghĩa rõ ràng không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 22,
            "text_en": "Is the structure of a data entry value consistent from screen to screen?",
            "text": "Cấu trúc của giá trị nhập dữ liệu có nhất quán giữa các màn hình không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 23,
            "text_en": "If the system has multipage data entry screens, do all pages have the same title and sequential page number?",
            "text": "Nếu hệ thống có màn hình nhập dữ liệu nhiều trang, tất cả các trang có cùng tiêu đề và số trang tuần tự không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 24,
            "text_en": "Do field-level help provide more information than a restatement of the field name?",
            "text": "Trợ giúp cấp trường có cung cấp nhiều thông tin hơn việc trình bày lại tên trường không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 25,
            "text_en": "Is the most important information placed at the beginning of the prompt?",
            "text": "Thông tin quan trọng nhất có được đặt ở đầu lời nhắc không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 26,
            "text_en": "Are user actions named consistently across all prompts in the system?",
            "text": "Hành động của người dùng có được đặt tên nhất quán trên tất cả lời nhắc trong hệ thống không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 27,
            "text_en": "Does the structure of menu choice names match their corresponding menu titles?",
            "text": "Cấu trúc của tên lựa chọn menu có khớp với tiêu đề menu tương ứng của chúng không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          }
        ]
      },
      {
        "id": 5,
        "name": "Chủ động phòng chống lỗi",
        "criteria": [
          {
            "id": 1,
            "text_en": "The system uses constraints to prevent the user from making mistakes?",
            "text": "Hệ thống sử dụng các ràng buộc để ngăn người dùng mắc lỗi?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 2,
            "text_en": "To avoid incorrect actions, the system guides the user with suggestions. Fields in data entry screens contain default values (or hints, examples, or model answers to demonstrate expected input) and display the data structure and field length when appropriate?",
            "text": "Để tránh những hành động không chính xác, hệ thống sẽ hướng dẫn người dùng những gợi ý. Các trường trong màn hình nhập dữ liệu chứa các giá trị mặc định (hoặc gợi ý, ví dụ hoặc câu trả lời mẫu để thể hiện thông tin đầu vào dự kiến) và hiển thị cấu trúc dữ liệu cũng như độ dài trường khi thích hợp?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 3,
            "text_en": "If an error is detected in a data entry field, does the system place the cursor in that field or highlight the error?",
            "text": "Nếu phát hiện lỗi trong trường nhập dữ liệu, hệ thống có đặt con trỏ vào trường đó hay đánh dấu lỗi không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 4,
            "text_en": "The labelling of form fields clearly explains what entries are desired and Inputs are validated prior to submitting?",
            "text": "Việc gắn nhãn các trường biểu mẫu giải thích rõ ràng những mục nào được mong muốn và Thông tin đầu vào được xác thực trước khi gửi?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 5,
            "text_en": "If no search results are returned, the system offers ideas or options for improvement the query?",
            "text": "Nếu không có kết quả tìm kiếm nào được trả về, hệ thống có đưa ra ý tưởng hay phương án nào để cải thiện truy vấn không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 6,
            "text_en": "The system prompts the user with confirmation before destructive actions?",
            "text": "Hệ thống nhắc nhở người dùng xác nhận trước hành động phá hoại?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 7,
            "text_en": "Data formats follow appropriate cultural conventions (e.g. miles for UK, YYYY/MM/DD)?",
            "text": "Định dạng dữ liệu tuân theo các quy ước văn hóa phù hợp (ví dụ: số dặm đối với Vương quốc Anh, YYYY/MM/DD)?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 8,
            "text_en": "Required and optional form field are clearly indicated?",
            "text": "Trường biểu mẫu bắt buộc và tùy chọn được chỉ định rõ ràng?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 9,
            "text_en": "Have dots or underscores been used to indicate field length?",
            "text": "Dấu chấm hoặc dấu gạch dưới có được sử dụng để biểu thị độ dài trường không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 10,
            "text_en": "Are data inputs case-blind whenever possible?",
            "text": "Dữ liệu đầu vào có phân biệt chữ hoa chữ thường bất cứ khi nào có thể không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 11,
            "text_en": "The system displays appropriate buttons affordance for performing actions?",
            "text": "Hệ thống hiển thị các nút thích hợp để thực hiện hành động?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 12,
            "text_en": "When a user must choose between multiple options (as in a dialogue box), the options are obvious?",
            "text": "Khi người dùng phải chọn giữa nhiều tùy chọn (như trong hộp thoại), các tùy chọn có rõ ràng không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 13,
            "text_en": "Do fields in data entry screens and dialog boxes contain default values when appropriate?",
            "text": "Các trường trong màn hình nhập dữ liệu và hộp thoại có chứa các giá trị mặc định khi thích hợp không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 14,
            "text_en": "Is sound used to signal an error?",
            "text": "Âm thanh có được dùng để báo hiệu lỗi không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 15,
            "text_en": "Are prompts and error messages stated constructively and worded in such a way that the system bears responsibility rather than the user and suggests that the user is in control?",
            "text": "Các lời nhắc và thông báo lỗi có được trình bày mang tính xây dựng và được diễn đạt theo cách mà hệ thống chịu trách nhiệm thay vì người dùng và gợi ý rằng người dùng có quyền kiểm soát không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 16,
            "text_en": "Do error messages avoid the use of exclamation points?",
            "text": "Các thông báo lỗi có tránh sử dụng dấu chấm than không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 17,
            "text_en": "Are prompts brief and unambiguous?",
            "text": "Lời nhắc có ngắn gọn và rõ ràng không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 18,
            "text_en": "Do error messages inform the user of the error's severity?",
            "text": "Thông báo lỗi có thông báo cho người dùng về mức độ nghiêm trọng của lỗi không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 19,
            "text_en": "Do error messages suggest the cause of the problem?",
            "text": "Các thông báo lỗi có gợi ý nguyên nhân của sự cố không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 20,
            "text_en": "Do error messages indicate what action the user needs to take to correct the error?",
            "text": "Các thông báo lỗi có cho biết người dùng cần thực hiện hành động nào để sửa lỗi không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 21,
            "text_en": "If the system supports both novice and expert users, are multiple levels of error-message detail available?",
            "text": "Nếu hệ thống hỗ trợ cả người dùng mới và người dùng chuyên nghiệp thì có sẵn nhiều cấp độ chi tiết thông báo lỗi không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 22,
            "text_en": "Are the function keys that can cause the most serious consequences located far away from low consequence and high-use keys?",
            "text": "Các phím chức năng có thể gây ra hậu quả nghiêm trọng nhất có nằm cách xa các phím có tác dụng thấp và có mức độ sử dụng cao không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 23,
            "text_en": "Do data entry screens and dialog boxes indicate the number of character spaces available in a field?",
            "text": "Màn hình và hộp thoại nhập dữ liệu có cho biết số khoảng trống ký tự có sẵn trong một trường không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          }
        ]
      },
      {
        "id": 6,
        "name": "Nhận diện thay vì nhớ lại (Giảm tải trí nhớ)",
        "criteria": [
          {
            "id": 1,
            "text_en": "The user presented with customized content based on previous actions (e.g. When adding a product to the cart, the suggested products listed below are related to the product in the cart or to previously viewed items)?",
            "text": "Người dùng trình bày nội dung tùy chỉnh dựa trên các hành động trước đó (ví dụ: Khi thêm sản phẩm vào giỏ hàng, các sản phẩm được đề xuất liệt kê bên dưới có liên quan đến sản phẩm trong giỏ hàng hoặc với các mặt hàng đã xem trước đó)?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "text_en": "For question and answer interfaces, are visual cues and white space used to distinguish questions, prompts, instructions, and user input?",
            "text": "Đối với giao diện hỏi đáp, các dấu hiệu trực quan và khoảng trắng có được sử dụng để phân biệt các câu hỏi, lời nhắc, hướng dẫn và thông tin đầu vào của người dùng không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "text_en": "The user presented with navigational items that reduce cognitive load and aids recall (e.g. Based on users’ mental models certain items can be grouped in more than one category)?",
            "text": "Người dùng đã trình bày các mục điều hướng giúp giảm tải nhận thức và hỗ trợ thu hồi (ví dụ: Dựa trên mô hình tinh thần của người dùng, một số mục nhất định có thể được nhóm thành nhiều danh mục)?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 4,
            "text_en": "The system's data is modifiable where it is displayed or leads to a place where it can be modified?",
            "text": "Dữ liệu của hệ thống có thể sửa đổi được ở nơi nó được hiển thị hay dẫn đến nơi có thể sửa đổi được?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 5,
            "text_en": "The system makes use of consistent between data entry and data display?",
            "text": "Hệ thống sử dụng sự thống nhất giữa nhập liệu và hiển thị dữ liệu?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 6,
            "text_en": "The system presents interrelated information derived from the computation of several dependencies in a clear and understandable manner (e.g. price of item if depends on format, size, delivery; booking if depends on number of guests; prediction if depends on price ad time span)?",
            "text": "Hệ thống trình bày thông tin có liên quan với nhau bắt nguồn từ việc tính toán một số phụ thuộc một cách rõ ràng và dễ hiểu (ví dụ: giá của mặt hàng nếu phụ thuộc vào hình thức, kích thước, cách giao hàng; đặt phòng nếu phụ thuộc vào số lượng khách; dự đoán nếu phụ thuộc vào khoảng thời gian quảng cáo giá)?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 7,
            "text_en": "The system supports history (of user file manipulations, operations, search queries, and last visit) or a type of temporary storage (favourites, wish-list)?",
            "text": "Hệ thống hỗ trợ lịch sử (thao tác tệp người dùng, thao tác, truy vấn tìm kiếm và lần truy cập gần đây nhất) hoặc một loại lưu trữ tạm thời (yêu thích, danh sách mong muốn)?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 8,
            "text_en": "The system's UI direct manipulation is simple. Tips progressive disclosure and good gestural affordances explain the UI. Tooltips describe features and assist users in understanding the purpose of a presented screen?",
            "text": "Thao tác trực tiếp UI của hệ thống rất đơn giản. Mẹo tiết lộ lũy tiến và khả năng chi trả cử chỉ tốt sẽ giải thích về giao diện người dùng. Chú giải công cụ mô tả các tính năng và hỗ trợ người dùng hiểu mục đích của màn hình được trình bày?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 9,
            "text_en": "Have prompts been formatted using white space, justification, and visual cues for easy scanning?",
            "text": "Lời nhắc có được định dạng bằng khoảng trắng, căn lề và dấu hiệu trực quan để dễ dàng quét không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 10,
            "text_en": "Does the system gray out or delete labels of currently inactive soft function keys?",
            "text": "Hệ thống có chuyển sang màu xám hoặc xóa nhãn của các phím chức năng mềm hiện không hoạt động không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 11,
            "text_en": "Have items been grouped into logical zones, and have headings been used to distinguish between zones?",
            "text": "Các mục đã được nhóm thành các vùng hợp lý chưa và các tiêu đề đã được sử dụng để phân biệt giữa các vùng chưa?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 12,
            "text_en": "Do GUI menus offer affordance: that is, make obvious where selection is possible?",
            "text": "Các menu GUI có cung cấp đủ khả năng chi trả không: nghĩa là làm rõ nơi nào có thể lựa chọn?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      },
      {
        "id": 7,
        "name": "Linh hoạt và hiệu quả sử dụng",
        "criteria": [
          {
            "id": 1,
            "text_en": "The system anticipates and prompts the user's likely next action (recently performed actions memory)?",
            "text": "Hệ thống dự đoán và nhắc nhở hành động tiếp theo của người dùng (bộ nhớ hành động được thực hiện gần đây)?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 2,
            "text_en": "Is the user presented with shortcuts to end goals?",
            "text": "Người dùng có được cung cấp các phím tắt để đạt được mục tiêu cuối cùng không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 3,
            "text_en": "The system remembers user's setting, last location, previously opened documents?",
            "text": "Hệ thống ghi nhớ cài đặt của người dùng, vị trí cuối cùng, tài liệu đã mở trước đó?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 4,
            "text_en": "For data entry screens with many fields or in which source documents may be incomplete, can users save a partially filled screen?",
            "text": "Đối với màn hình nhập liệu có nhiều trường hoặc trong đó tài liệu nguồn có thể chưa đầy đủ, người dùng có thể lưu màn hình chỉ lấp đầy một phần không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 5,
            "text_en": "The system allows for restricted access, account creation and verification ease - yet not compromising on security?",
            "text": "Hệ thống cho phép truy cập hạn chế, dễ dàng tạo và xác minh tài khoản - nhưng vẫn không ảnh hưởng đến bảo mật?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 6,
            "text_en": "The system clearly communicates to the user the completion of the goal, divides it into steps, allows for reversibility, and does not have any lateral break-paths?",
            "text": "Hệ thống thông báo rõ ràng cho người dùng về việc hoàn thành mục tiêu, chia thành các bước, cho phép đảo ngược và không có bất kỳ đường dẫn đột phá nào?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 7,
            "text_en": "The system disposed of tooltips that explain features and help user understand purpose of the view?",
            "text": "Hệ thống loại bỏ các chú giải công cụ giải thích các tính năng và giúp người dùng hiểu mục đích của chế độ xem?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 8,
            "text_en": "The task complexity of the system correlates with the outcome (common and obvious tasks are easy to perform, complex results may require more sophisticated actions but users effort is awarded by valuable outcome)?",
            "text": "Độ phức tạp của nhiệm vụ của hệ thống tương quan với kết quả (nhiệm vụ phổ biến và rõ ràng thì dễ thực hiện, kết quả phức tạp có thể yêu cầu những hành động phức tạp hơn nhưng nỗ lực của người dùng sẽ được đền đáp bằng kết quả có giá trị)?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 9,
            "text_en": "The system gives attention to probable rather than possible. Options are arranged by the frequency and probability of use?",
            "text": "Hệ thống chú ý đến khả năng xảy ra hơn là khả năng. Các lựa chọn được sắp xếp theo tần suất và xác suất sử dụng?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 10,
            "text_en": "Does the system automatically enter leading zeros?",
            "text": "Hệ thống có tự động nhập số 0 đứng đầu không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          }
        ]
      },
      {
        "id": 8,
        "name": "Thẩm mỹ và tối giản thiết kế",
        "criteria": [
          {
            "id": 1,
            "text_en": "The system clusters related information and functions?",
            "text": "Các cụm hệ thống liên quan đến thông tin và chức năng?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 2,
            "text_en": "The text and content of the system are legible, thanks to good typography and visual contrast (e.g. context uses intuitive headlines structure such as H1-H6, body)?",
            "text": "Văn bản và nội dung của hệ thống có dễ đọc nhờ kiểu chữ tốt và độ tương phản hình ảnh tốt (ví dụ: ngữ cảnh sử dụng cấu trúc tiêu đề trực quan như H1-H6, nội dung)?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 3,
            "text_en": "The system's layout aids in concentrating attention on work flow. Concise information structure designed for scanning (content includes highlighted hyperlinks, meaningful subheadings, bulleted lists, and a summary/call to action)?",
            "text": "Cách bố trí của hệ thống hỗ trợ tập trung sự chú ý vào quy trình làm việc. Cấu trúc thông tin ngắn gọn được thiết kế để quét (nội dung bao gồm các siêu liên kết được đánh dấu, các tiêu đề phụ có ý nghĩa, danh sách có dấu đầu dòng và phần tóm tắt/kêu gọi hành động)?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 4,
            "text_en": "The system provides relevant information that is not excessive in quantity or layout?",
            "text": "Hệ thống cung cấp thông tin liên quan nhưng không thừa về số lượng hay bố cục?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 5,
            "text_en": "The system displays all forms in an easy-to-understand and fill-in format?",
            "text": "Hệ thống hiển thị tất cả các biểu mẫu theo dạng thức dễ hiểu và dễ điền?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 6,
            "text_en": "The system's user interface is designed in such a way that the user understands what all of the icons mean and why they are included in the design?",
            "text": "Giao diện người dùng của hệ thống được thiết kế sao cho người dùng hiểu được ý nghĩa của tất cả các biểu tượng và tại sao chúng lại được đưa vào thiết kế?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 7,
            "text_en": "The system's abbreviations are limited (in labels or tables). Tables fitt into screens and remain legible?",
            "text": "Chữ viết tắt của hệ thống bị hạn chế (trong nhãn hoặc bảng). Bảng vừa với màn hình và vẫn dễ đọc?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 8,
            "text_en": "The copywriting for the system is concise, with no unnecessary instructions, welcome notes, or aggressive advertisement boasting?",
            "text": "Bản sao chép cho hệ thống ngắn gọn, không có hướng dẫn không cần thiết, ghi chú chào mừng hoặc quảng cáo rầm rộ?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 9,
            "text_en": "The system's pop-ups and dialogue boxes with settings appear in prominent locations, fit to the page, and are not cropped (regardless of viewport)?",
            "text": "Cửa sổ bật lên và hộp thoại của hệ thống có cài đặt xuất hiện ở vị trí nổi bật, vừa với trang và không bị cắt (bất kể chế độ xem)?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 10,
            "text_en": "The visuals of the system (graphics or photos) support the primary goals of users or the company (the message is conveyed by consistent images look and feel, there are no redundant and meaningless graphics)?",
            "text": "Hình ảnh của hệ thống (đồ họa hoặc hình ảnh) hỗ trợ các mục tiêu chính của người dùng hoặc công ty (thông điệp được truyền tải bằng giao diện hình ảnh nhất quán, không có đồ họa thừa và vô nghĩa)?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 11,
            "text_en": "Is only (and all) information essential to decision making displayed on the screen?",
            "text": "Có phải chỉ (và tất cả) thông tin cần thiết cho việc ra quyết định được hiển thị trên màn hình?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 12,
            "text_en": "Are all icons in a set visually and conceptually distinct?",
            "text": "Tất cả các biểu tượng trong một bộ có khác biệt về mặt hình ảnh và khái niệm không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 13,
            "text_en": "Have large objects, bold lines, and simple areas been used to distinguish icons?",
            "text": "Các vật thể lớn, đường nét đậm và các vùng đơn giản có được sử dụng để phân biệt các biểu tượng không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 14,
            "text_en": "Does each icon stand out from its background?",
            "text": "Mỗi biểu tượng có nổi bật so với nền của nó không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 15,
            "text_en": "Does each data entry screen have a short, simple, clear, distinctive title?",
            "text": "Mỗi màn hình nhập liệu có tiêu đề ngắn gọn, đơn giản, rõ ràng, dễ phân biệt không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 16,
            "text_en": "Are prompts expressed in the affirmative, and do they use the active voice?",
            "text": "Những lời nhắc nhở có được thể hiện dưới dạng khẳng định và chúng có sử dụng thể chủ động không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 17,
            "text_en": "Are there pop-up or pull-down menus within data entry fields that have many, but well-defined, entry options?",
            "text": "Có các menu bật lên hoặc kéo xuống trong các trường nhập dữ liệu có nhiều tùy chọn nhập nhưng được xác định rõ ràng không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          }
        ]
      },
      {
        "id": 9,
        "name": "Hỗ trợ nhận biết, chẩn đoán và khắc phục lỗi",
        "criteria": [
          {
            "id": 1,
            "text_en": "The system's allows for error correction (e.g. when a form is incomplete, focusing on the location where correction is required) by focusing on, proposing solutions, or linking to where to modify error causes?",
            "text": "Hệ thống cho phép sửa lỗi (ví dụ: khi biểu mẫu chưa đầy đủ, tập trung vào vị trí cần sửa) bằng cách tập trung, đề xuất giải pháp hoặc liên kết đến đâu để sửa lỗi?",
            "desc": "Hỗ trợ người dùng nhận biết, chẩn đoán và khắc phục lỗi một cách dễ dàng và lịch sự.",
            "why": "Khi lỗi xảy ra, người dùng cần giải pháp khắc phục nhanh chóng và dễ hiểu thay vì cảm thấy bối rối hoặc bị đổ lỗi.",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp liên kết trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến người dùng không biết sửa thế nào."
          },
          {
            "id": 2,
            "text_en": "The system's error messages are clear, written in simple language with a neutral tone, and do not blame the user for the error?",
            "text": "Các thông báo lỗi của hệ thống rõ ràng, được viết bằng ngôn ngữ đơn giản với giọng điệu trung tính và không đổ lỗi cho người dùng về lỗi?",
            "desc": "Hỗ trợ người dùng nhận biết, chẩn đoán và khắc phục lỗi một cách dễ dàng và lịch sự.",
            "why": "Khi lỗi xảy ra, người dùng cần giải pháp khắc phục nhanh chóng và dễ hiểu thay vì cảm thấy bối rối hoặc bị đổ lỗi.",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp liên kết trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến người dùng không biết sửa thế nào."
          },
          {
            "id": 3,
            "text_en": "The systems are clear, easy to identify, and appear in the proper location (e.g. adjacent to data entry field, adjacent to form, etc.) Not erasing previously entered correct values?",
            "text": "Hệ thống rõ ràng, dễ nhận biết và xuất hiện ở vị trí thích hợp (ví dụ: liền kề trường nhập dữ liệu, liền kề biểu mẫu, v.v.) Không xóa các giá trị đúng đã nhập trước đó?",
            "desc": "Hỗ trợ người dùng nhận biết, chẩn đoán và khắc phục lỗi một cách dễ dàng và lịch sự.",
            "why": "Khi lỗi xảy ra, người dùng cần giải pháp khắc phục nhanh chóng và dễ hiểu thay vì cảm thấy bối rối hoặc bị đổ lỗi.",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp liên kết trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến người dùng không biết sửa thế nào."
          },
          {
            "id": 4,
            "text_en": "When necessary, the system displays important information on the screen, and there are no abrupt time-outs that force the user to act quickly?",
            "text": "Khi cần thiết, hệ thống có hiển thị các thông tin quan trọng trên màn hình và không có hiện tượng time-out đột ngột buộc người dùng phải hành động nhanh chóng?",
            "desc": "Hỗ trợ người dùng nhận biết, chẩn đoán và khắc phục lỗi một cách dễ dàng và lịch sự.",
            "why": "Khi lỗi xảy ra, người dùng cần giải pháp khắc phục nhanh chóng và dễ hiểu thay vì cảm thấy bối rối hoặc bị đổ lỗi.",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp liên kết trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến người dùng không biết sửa thế nào."
          },
          {
            "id": 5,
            "text_en": "When necessary, the system provides the user with access to details about error messages. Error messages explain what happened and what action the user must take?",
            "text": "Khi cần thiết, hệ thống sẽ cung cấp cho người dùng quyền truy cập vào thông tin chi tiết về các thông báo lỗi. Thông báo lỗi giải thích điều gì đã xảy ra và người dùng phải thực hiện hành động gì?",
            "desc": "Hỗ trợ người dùng nhận biết, chẩn đoán và khắc phục lỗi một cách dễ dàng và lịch sự.",
            "why": "Khi lỗi xảy ra, người dùng cần giải pháp khắc phục nhanh chóng và dễ hiểu thay vì cảm thấy bối rối hoặc bị đổ lỗi.",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp liên kết trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến người dùng không biết sửa thế nào."
          },
          {
            "id": 6,
            "text_en": "The system allows the user to undo/reverse destructive actions?",
            "text": "Hệ thống cho phép người dùng hoàn tác/đảo ngược các hành động phá hoại?",
            "desc": "Hỗ trợ người dùng nhận biết, chẩn đoán và khắc phục lỗi một cách dễ dàng và lịch sự.",
            "why": "Khi lỗi xảy ra, người dùng cần giải pháp khắc phục nhanh chóng và dễ hiểu thay vì cảm thấy bối rối hoặc bị đổ lỗi.",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp liên kết trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến người dùng không biết sửa thế nào."
          }
        ]
      },
      {
        "id": 10,
        "name": "Trợ giúp và tài liệu hướng dẫn",
        "criteria": [
          {
            "id": 1,
            "text_en": "The system provides contextual assistance to assist the user in learning more about a feature in his task flow?",
            "text": "Hệ thống cung cấp hỗ trợ theo ngữ cảnh để hỗ trợ người dùng tìm hiểu thêm về một tính năng trong luồng nhiệm vụ của mình?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 2,
            "text_en": "The system provides help in an easy-to-find format and organises it into cases (user tasks), allowing the user to easily sift through threads?",
            "text": "Hệ thống cung cấp trợ giúp ở dạng dễ tìm và sắp xếp thành từng trường hợp (tác vụ của người dùng), cho phép người dùng dễ dàng sàng lọc các chủ đề?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 3,
            "text_en": "The system provides online assistance in a way that does not impede users (i.e. they can resume work where they left off after accessing help)?",
            "text": "Hệ thống cung cấp hỗ trợ trực tuyến theo cách không cản trở người dùng (tức là họ có thể tiếp tục công việc ở nơi họ đã dừng lại sau khi truy cập trợ giúp)?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 4,
            "text_en": "The system presents the user with other channels of communication to enquire assistance to reach their goal (e.g. telephone or email address for assistance)?",
            "text": "Hệ thống cung cấp cho người dùng các kênh liên lạc khác để yêu cầu hỗ trợ nhằm đạt được mục tiêu của họ (ví dụ: điện thoại hoặc địa chỉ email để được hỗ trợ)?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 5,
            "text_en": "The system provides step-by-step instructions (in the form of FAQs) to assist users in completing the most critical tasks?",
            "text": "Hệ thống cung cấp hướng dẫn từng bước (dưới dạng Câu hỏi thường gặp) để hỗ trợ người dùng hoàn thành các nhiệm vụ quan trọng nhất?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 6,
            "text_en": "If menu items are ambiguous, does the system provide additional explanatory information when an item is selected?",
            "text": "Nếu các mục menu không rõ ràng, hệ thống có cung cấp thêm thông tin giải thích khi chọn một mục không?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 7,
            "text_en": "Is the help function visible; for example, a key labeled HELP or a special menu?",
            "text": "Chức năng trợ giúp có hiển thị không; ví dụ: phím có nhãn TRỢ GIÚP hoặc menu đặc biệt?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 8,
            "text_en": "Is the help system interface (navigation, presentation, and conversation) consistent with the navigation, presentation, and conversation interfaces of the application it supports?",
            "text": "Giao diện hệ thống trợ giúp (điều hướng, trình bày và hội thoại) có nhất quán với giao diện điều hướng, trình bày và hội thoại của ứng dụng mà nó hỗ trợ không?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 9,
            "text_en": "Can users easily switch between help and their work?",
            "text": "Người dùng có thể dễ dàng chuyển đổi giữa trợ giúp và công việc của họ không?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 10,
            "text_en": "Is it easy to access and return from the help system?",
            "text": "Có dễ dàng truy cập và quay lại từ hệ thống trợ giúp không?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 11,
            "text_en": "Can users resume work where they left off after accessing help?",
            "text": "Người dùng có thể tiếp tục công việc ở nơi họ đã dừng lại sau khi truy cập trợ giúp không?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          }
        ]
      },
      {
        "id": 11,
        "name": "Khả năng tiếp cận bình đẳng (Accessibility)",
        "criteria": [
          {
            "id": 1,
            "text_en": "The amount of content displayed at a time is reasonable?",
            "text": "Lượng nội dung hiển thị tại một thời điểm có hợp lý không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 2,
            "text_en": "Buttons and controls are large enough to view and select by touch (26 - 37 px in the smallest dimension and margins of at least 10px around each button)?",
            "text": "Các nút và điều khiển có đủ lớn để xem và chọn bằng cách chạm (26 - 37 px ở kích thước nhỏ nhất và lề ít nhất 10px xung quanh mỗi nút)?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 3,
            "text_en": "Form fields are positioned bellow their labels?",
            "text": "Các trường biểu mẫu được định vị bên dưới nhãn của chúng?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 4,
            "text_en": "Touchscreen gestures are simple to perform?",
            "text": "Cử chỉ trên màn hình cảm ứng có đơn giản để thực hiện?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 5,
            "text_en": "Multiple or alternate forms f gestures are available?",
            "text": "Có sẵn nhiều hình thức hoặc hình thức cử chỉ thay thế?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 6,
            "text_en": "Touch control activate upon release (up event, not initial touch (down event)?",
            "text": "Kích hoạt điều khiển cảm ứng khi thả ra (sự kiện lên, không phải lần chạm ban đầu (sự kiện xuống)?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 7,
            "text_en": "Functionality triggered by shaking, tilting, or moving the device can be disabled?",
            "text": "Chức năng được kích hoạt bằng cách lắc, nghiêng hoặc di chuyển thiết bị có thể bị vô hiệu hóa không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 8,
            "text_en": "On-screen indicators and accessible text shows how to use gestures?",
            "text": "Các chỉ báo trên màn hình và văn bản có thể truy cập hiển thị cách sử dụng cử chỉ?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 9,
            "text_en": "On-screen indicators and accessible text shows that elements are actionable?",
            "text": "Các chỉ báo trên màn hình và văn bản có thể truy cập cho thấy các phần tử có thể thực hiện được?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 10,
            "text_en": "Actionable elements are grouped intuitively?",
            "text": "Các yếu tố có thể hành động được nhóm lại một cách trực quan?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 11,
            "text_en": "Clear, text-based instructions are provided for complex interaction?",
            "text": "Hướng dẫn rõ ràng, dựa trên văn bản được cung cấp cho các tương tác phức tạp?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 12,
            "text_en": "Is the virtual keyboard set to the required data entry type?",
            "text": "Bàn phím ảo có được đặt ở kiểu nhập dữ liệu được yêu cầu không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 13,
            "text_en": "Methods for data entry are simple and predictable?",
            "text": "Phương pháp nhập dữ liệu đơn giản và có thể dự đoán được?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 14,
            "text_en": "Is touchscreen content compatible with keyboards and other input devices?",
            "text": "Nội dung trên màn hình cảm ứng có tương thích với bàn phím và các thiết bị đầu vào khác không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 15,
            "text_en": "Is it possible to resize text by at least 200 percent without using assistive technology?",
            "text": "Có thể thay đổi kích thước văn bản ít nhất 200 phần trăm mà không cần sử dụng công nghệ hỗ trợ không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 16,
            "text_en": "Is it possible to switch between portrait and landscape screen orientations?",
            "text": "Có thể chuyển đổi giữa hướng màn hình dọc và ngang không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 17,
            "text_en": "Page layout is consistent and predictable?",
            "text": "Bố cục trang có nhất quán và có thể dự đoán được không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 18,
            "text_en": "Headings and subsequent content are logical and hierarchical?",
            "text": "Các tiêu đề và nội dung tiếp theo có hợp lý và có thứ bậc không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 19,
            "text_en": "Menus, controls, and links work with touch and keyboard?",
            "text": "Menu, điều khiển và liên kết hoạt động với cảm ứng và bàn phím?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 20,
            "text_en": "Graphical content has an accessible text alternative?",
            "text": "Nội dung đồ họa có văn bản thay thế có thể truy cập được không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 21,
            "text_en": "Most text has a contrast ratio of at least 4.5:1 for normal text (less than 18 point or 14 point bold)?",
            "text": "Hầu hết văn bản có tỷ lệ tương phản ít nhất là 4,5:1 đối với văn bản thông thường (dưới 18 điểm hoặc in đậm 14 điểm)?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 22,
            "text_en": "Most text has a contrast ratio of at least 3:1 for large text (at least 18 point or 14 point bold)?",
            "text": "Hầu hết văn bản có tỷ lệ tương phản ít nhất là 3:1 đối với văn bản lớn (ít nhất 18 điểm hoặc in đậm 14 điểm)?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 23,
            "text_en": "Information and meaning (like an error) is not conveyed only by color?",
            "text": "Thông tin và ý nghĩa (như một lỗi) không chỉ được truyền tải bằng màu sắc?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 24,
            "text_en": "Images of text are avoided?",
            "text": "Hình ảnh của văn bản được tránh?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 25,
            "text_en": "Background images are not used to convey information (as background images are not available to assistive technology)?",
            "text": "Hình nền không được sử dụng để truyền tải thông tin (vì hình nền không có sẵn cho công nghệ hỗ trợ)?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          }
        ]
      }
    ]
  },
  "gerhardt": {
    "title": "Nguyên tắc Kỹ thuật Nhận thức (Gerhardt-Powals)",
    "categories": [
      {
        "id": 1,
        "name": "Tự động hóa các công việc lặp lại",
        "criteria": [
          {
            "id": 1,
            "text_en": "Does the system automate repetitive tasks to save users time?",
            "text": "Hệ thống có tự động hóa các tác vụ lặp đi lặp lại để tiết kiệm thời gian cho người dùng không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 2,
            "text_en": "Are frequently used actions accessible with fewer clicks/taps?",
            "text": "Các hành động được sử dụng thường xuyên có thể truy cập được với ít lần nhấp/chạm hơn không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 3,
            "text_en": "Is autofill used effectively (e.g., name, email, address, past searches)?",
            "text": "Tính năng tự động điền có được sử dụng hiệu quả không (ví dụ: tên, email, địa chỉ, tìm kiếm trước đây)?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 4,
            "text_en": "Are smart defaults provided (e.g., select the most common options by default)?",
            "text": "Các giá trị mặc định thông minh có được cung cấp không (ví dụ: chọn các tùy chọn phổ biến nhất theo mặc định)?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 5,
            "text_en": "Does the system learn user behavior and personalize accordingly?",
            "text": "Hệ thống có tìm hiểu hành vi của người dùng và cá nhân hóa cho phù hợp không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 6,
            "text_en": "Are complex calculations done automatically (e.g., tax, discounts, currency conversion)?",
            "text": "Các phép tính phức tạp có được thực hiện tự động (ví dụ: thuế, chiết khấu, chuyển đổi tiền tệ) không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 7,
            "text_en": "Are form fields dynamically adjusted based on user inputs (e.g., hide irrelevant fields)?",
            "text": "Các trường biểu mẫu có được điều chỉnh linh hoạt dựa trên thông tin đầu vào của người dùng không (ví dụ: ẩn các trường không liên quan)?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 8,
            "text_en": "Does the system remember user preferences for future interactions?",
            "text": "Hệ thống có ghi nhớ tùy chọn của người dùng cho các tương tác trong tương lai không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 9,
            "text_en": "Are confirmation emails or push notifications automated where necessary?",
            "text": "Email xác nhận hoặc thông báo đẩy có được tự động hóa khi cần thiết không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 10,
            "text_en": "Are AI-powered suggestions provided (e.g., recommended products, auto-correct search queries)?",
            "text": "Các đề xuất do AI cung cấp có được cung cấp không (ví dụ: các sản phẩm được đề xuất, truy vấn tìm kiếm tự động sửa)?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          }
        ]
      },
      {
        "id": 2,
        "name": "Tạo điều kiện quét thông tin trực quan",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are important elements (buttons, key info) visually distinct?",
            "text": "Các yếu tố quan trọng (nút, thông tin chính) có khác biệt về mặt trực quan không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 2,
            "text_en": "Is content structured with clear hierarchy (H1, H2, bullet points, etc.)?",
            "text": "Nội dung có được cấu trúc với hệ thống phân cấp rõ ràng (H1, H2, dấu đầu dòng, v.v.) không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 3,
            "text_en": "Are scan-friendly techniques used (bold, color, icons, whitespace)?",
            "text": "Các kỹ thuật thân thiện với việc quét có được sử dụng (đậm, màu sắc, biểu tượng, khoảng trắng) không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 4,
            "text_en": "Are long paragraphs split into smaller sections for readability?",
            "text": "Các đoạn văn dài có được chia thành các phần nhỏ hơn để dễ đọc không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 5,
            "text_en": "Are related items grouped together for quick recognition?",
            "text": "Các mục liên quan có được nhóm lại với nhau để nhận biết nhanh không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 6,
            "text_en": "Are CTA (Call-to-Action) buttons prominent and easily identifiable?",
            "text": "Các nút CTA (Kêu gọi hành động) có nổi bật và dễ nhận biết không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 7,
            "text_en": "Is F-pattern or Z-pattern layout used to match natural reading flow?",
            "text": "Bố cục kiểu F hoặc kiểu Z có được sử dụng để phù hợp với luồng đọc tự nhiên không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 8,
            "text_en": "Are icons and labels placed where users expect them to be?",
            "text": "Các biểu tượng và nhãn có được đặt ở nơi người dùng mong đợi không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 9,
            "text_en": "Is search functionality prominent and accessible?",
            "text": "Chức năng tìm kiếm có nổi bật và dễ tiếp cận không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 10,
            "text_en": "Are hover effects, shadows, or color changes used to indicate interactivity?",
            "text": "Các hiệu ứng di chuột, bóng hoặc thay đổi màu sắc có được sử dụng để biểu thị tính tương tác không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          }
        ]
      },
      {
        "id": 3,
        "name": "Giảm thiểu sự mơ hồ cho người dùng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Is immediate feedback provided for user actions (e.g., button press, form submission)?",
            "text": "Phản hồi ngay lập tức có được cung cấp cho hành động của người dùng (ví dụ: nhấn nút, gửi biểu mẫu) không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 2,
            "text_en": "Are error messages specific, helpful, and action-oriented? (e.g., “Password must be at least 8 characters” instead of “Invalid password”)",
            "text": "Thông báo lỗi có cụ thể, hữu ích và hướng tới hành động không? (ví dụ: “Mật khẩu phải có ít nhất 8 ký tự” thay vì “Mật khẩu không hợp lệ”)",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 3,
            "text_en": "Are success messages shown after completing important actions?",
            "text": "Thông báo thành công có được hiển thị sau khi hoàn thành các hành động quan trọng không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 4,
            "text_en": "Are tooltips or inline hints provided for complex fields?",
            "text": "Chú giải công cụ hoặc gợi ý nội tuyến có được cung cấp cho các trường phức tạp không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 5,
            "text_en": "Are form validation errors shown as the user types rather than after submission?",
            "text": "Lỗi xác thực biểu mẫu có được hiển thị dưới dạng loại người dùng thay vì sau khi gửi không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 6,
            "text_en": "Are potential irreversible actions confirmed? (e.g., “Are you sure you want to delete this?”)",
            "text": "Các hành động tiềm ẩn không thể thay đổi được đã được xác nhận chưa? (ví dụ: “Bạn có chắc chắn muốn xóa mục này không?”)",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 7,
            "text_en": "Do system notifications (success, error, warning) follow a consistent color scheme?",
            "text": "Các thông báo hệ thống (thành công, lỗi, cảnh báo) có tuân theo bảng màu nhất quán không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 8,
            "text_en": "Are placeholders in input fields used only when necessary and not replacing labels?",
            "text": "Phần giữ chỗ trong trường nhập liệu chỉ được sử dụng khi cần thiết và không thay thế nhãn phải không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 9,
            "text_en": "Are interactive elements clearly clickable (buttons, links, cards, etc.)?",
            "text": "Các yếu tố tương tác có thể nhấp vào được rõ ràng không (nút, liên kết, thẻ, v.v.)?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 10,
            "text_en": "Are skeleton loaders or progress indicators displayed for slow-loading content?",
            "text": "Trình tải khung hoặc chỉ báo tiến trình có được hiển thị khi nội dung tải chậm không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          }
        ]
      },
      {
        "id": 4,
        "name": "Tổng hợp dữ liệu thông minh",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are related data points displayed together for easy comparison?",
            "text": "Các điểm dữ liệu liên quan có được hiển thị cùng nhau để dễ so sánh không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 2,
            "text_en": "Are tooltips, graphs, or charts used to summarize large datasets?",
            "text": "Chú giải công cụ, đồ thị hoặc biểu đồ có được sử dụng để tóm tắt các tập dữ liệu lớn không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 3,
            "text_en": "Are important metrics highlighted or color-coded for quick insights?",
            "text": "Các số liệu quan trọng có được đánh dấu hoặc mã màu để có thông tin chi tiết nhanh chóng không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 4,
            "text_en": "Are dashboards designed to provide key insights at a glance?",
            "text": "Trang tổng quan có được thiết kế để cung cấp thông tin chi tiết quan trọng trong nháy mắt không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 5,
            "text_en": "Is data grouped logically instead of being scattered across multiple screens?",
            "text": "Dữ liệu có được nhóm một cách hợp lý thay vì bị phân tán trên nhiều màn hình không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 6,
            "text_en": "Can users drill down into more details from summarized data?",
            "text": "Người dùng có thể đi sâu vào chi tiết hơn từ dữ liệu tóm tắt không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 7,
            "text_en": "Are numerical values contextualized (e.g., “+12% from last month” instead of just a number)?",
            "text": "Các giá trị số có được ngữ cảnh hóa không (ví dụ: “+12% so với tháng trước” thay vì chỉ là một con số)?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 8,
            "text_en": "Are lengthy tables paginated or collapsible for easier navigation?",
            "text": "Các bảng dài có được phân trang hoặc thu gọn để điều hướng dễ dàng hơn không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 9,
            "text_en": "Are large datasets optimized for mobile viewing?",
            "text": "Các tập dữ liệu lớn có được tối ưu hóa để xem trên thiết bị di động không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 10,
            "text_en": "Are data comparisons (e.g., last year vs. this year) shown side by side instead of separate screens?",
            "text": "Các so sánh dữ liệu (ví dụ: năm ngoái so với năm nay) có được hiển thị cạnh nhau thay vì các màn hình riêng biệt không?",
            "desc": "Tự động hóa các tác vụ lặp lại và tích hợp dữ liệu thông minh để giảm tải cho người dùng.",
            "why": "Giúp người dùng hoàn thành nhiệm vụ nhanh hơn bằng cách để hệ thống thực hiện các công việc tính toán hoặc nhập liệu tự động.",
            "how": [
              "Cung cấp tính năng tự động điền (autofill) các thông tin cơ bản từ hồ sơ người dùng.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một giao diện thay vì bắt người dùng mở nhiều tab."
            ],
            "do": "Tự động điền tỉnh/thành phố và quận/huyện tương ứng ngay khi người dùng nhập mã bưu chính.",
            "dont": "Bắt người dùng tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          }
        ]
      },
      {
        "id": 5,
        "name": "Dùng ngữ cảnh để tối giản giao diện",
        "criteria": [
          {
            "id": 1,
            "text_en": "Is unnecessary information hidden when it's not relevant?",
            "text": "Thông tin không cần thiết có bị ẩn đi khi nó không liên quan không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 2,
            "text_en": "Is content personalized based on user behavior, location, or preferences?",
            "text": "Nội dung có được cá nhân hóa dựa trên hành vi, vị trí hoặc sở thích của người dùng không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 3,
            "text_en": "Are irrelevant options disabled or removed from UI dynamically?",
            "text": "Các tùy chọn không liên quan có bị vô hiệu hóa hoặc bị xóa khỏi giao diện người dùng một cách linh hoạt không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 4,
            "text_en": "Are contextual tooltips provided only when needed?",
            "text": "Chú giải công cụ theo ngữ cảnh chỉ được cung cấp khi cần thiết phải không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 5,
            "text_en": "Are onboarding tips or guided tours offered for first-time users?",
            "text": "Các mẹo giới thiệu hoặc chuyến tham quan có hướng dẫn có được cung cấp cho người dùng lần đầu không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 6,
            "text_en": "Does the system adjust based on previous user actions?",
            "text": "Hệ thống có điều chỉnh dựa trên hành động của người dùng trước đó không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 7,
            "text_en": "Are progressive disclosures used (show more info only when needed)?",
            "text": "Các tiết lộ lũy tiến có được sử dụng không (chỉ hiển thị thêm thông tin khi cần thiết)?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 8,
            "text_en": "Are distractions minimized during focused tasks (e.g., checkout process, form filling)?",
            "text": "Những phiền nhiễu có được giảm thiểu trong các nhiệm vụ tập trung (ví dụ: quy trình thanh toán, điền biểu mẫu) không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 9,
            "text_en": "Are search results prioritized based on relevance to user queries?",
            "text": "Kết quả tìm kiếm có được ưu tiên dựa trên mức độ liên quan đến truy vấn của người dùng không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 10,
            "text_en": "Are unnecessary choices hidden (e.g., don’t show shipping options for digital products)?",
            "text": "Các lựa chọn không cần thiết có bị ẩn không (ví dụ: không hiển thị tùy chọn giao hàng cho các sản phẩm kỹ thuật số)?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          }
        ]
      },
      {
        "id": 6,
        "name": "Tạo luồng chuyển động trực quan liên tục",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are users guided step by step in multi-step workflows?",
            "text": "Người dùng có được hướng dẫn từng bước trong quy trình làm việc nhiều bước không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "text_en": "Are numbered steps provided for long processes?",
            "text": "Các bước được đánh số có được cung cấp cho các quy trình dài không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "text_en": "Are visual cues (arrows, highlights, animations) used to guide attention?",
            "text": "Các tín hiệu trực quan (mũi tên, điểm nổi bật, hình ảnh động) có được sử dụng để hướng dẫn sự chú ý không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "text_en": "Is a progress indicator displayed for long actions (e.g., file uploads, checkout process)?",
            "text": "Chỉ báo tiến trình có được hiển thị cho các hành động dài (ví dụ: tải tệp lên, quy trình thanh toán) không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "text_en": "Is next-step guidance provided after completing a task? (e.g., “Now upload your profile picture”)",
            "text": "Hướng dẫn bước tiếp theo có được cung cấp sau khi hoàn thành nhiệm vụ không? (ví dụ: “Bây giờ hãy tải ảnh hồ sơ của bạn lên”)",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 6,
            "text_en": "Are page transitions smooth (not abrupt or confusing)?",
            "text": "Quá trình chuyển đổi trang có suôn sẻ không (không đột ngột hoặc khó hiểu)?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 7,
            "text_en": "Are tooltips or instructional overlays used to onboard new users?",
            "text": "Chú giải công cụ hoặc lớp phủ hướng dẫn có được sử dụng để giới thiệu người dùng mới không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 8,
            "text_en": "Are navigation paths clearly marked (so users don’t feel lost)?",
            "text": "Đường dẫn điều hướng có được đánh dấu rõ ràng không (để người dùng không cảm thấy lạc lõng)?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 9,
            "text_en": "Do buttons clearly indicate their function (e.g., “Next” instead of “Continue”)?",
            "text": "Các nút có chỉ rõ chức năng của chúng không (ví dụ: “Tiếp theo” thay vì “Tiếp tục”)?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 10,
            "text_en": "Are breadcrumbs used in multi-page processes?",
            "text": "Breadcrumbs có được sử dụng trong quy trình nhiều trang không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 7,
        "name": "Giảm thiểu tải nhận thức trí não",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are icons and interface elements designed to be intuitive?",
            "text": "Các biểu tượng và thành phần giao diện có được thiết kế trực quan không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "text_en": "Are unnecessary features or distractions removed?",
            "text": "Các tính năng không cần thiết hoặc phiền nhiễu có bị loại bỏ không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "text_en": "Is frequently used information kept visible (instead of requiring memory recall)?",
            "text": "Thông tin được sử dụng thường xuyên có được hiển thị (thay vì yêu cầu thu hồi bộ nhớ) không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 4,
            "text_en": "Are users presented with fewer, clearer choices instead of overwhelming them?",
            "text": "Người dùng có được đưa ra ít lựa chọn hơn, rõ ràng hơn thay vì khiến họ choáng ngợp không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 5,
            "text_en": "Are clear explanations provided for uncommon features?",
            "text": "Có giải thích rõ ràng cho những đặc điểm không phổ biến không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 6,
            "text_en": "Are complex workflows broken into smaller, manageable tasks?",
            "text": "Quy trình làm việc phức tạp có được chia thành các nhiệm vụ nhỏ hơn và dễ quản lý hơn không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 7,
            "text_en": "Are users not required to memorize things between screens?",
            "text": "Người dùng không bắt buộc phải ghi nhớ mọi thứ giữa các màn hình?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 8,
            "text_en": "Is AI or automation used to reduce manual effort?",
            "text": "AI hoặc tự động hóa có được sử dụng để giảm nỗ lực thủ công không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 9,
            "text_en": "Are users guided through rare or complex tasks using helper UI?",
            "text": "Người dùng có được hướng dẫn thực hiện các tác vụ hiếm hoặc phức tạp bằng giao diện người dùng trợ giúp không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 10,
            "text_en": "Are form fields pre-populated whenever possible?",
            "text": "Các trường biểu mẫu có được điền trước bất cứ khi nào có thể không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      },
      {
        "id": 8,
        "name": "Đảm bảo tính dễ đọc và rõ nét",
        "criteria": [
          {
            "id": 1,
            "text_en": "Is the font size large enough for easy reading (16px+ for mobile)?",
            "text": "Kích thước phông chữ có đủ lớn để dễ đọc không (16px+ cho thiết bị di động)?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 2,
            "text_en": "Is line spacing sufficient (at least 1.5x line height)?",
            "text": "Khoảng cách dòng có đủ không (chiều cao dòng ít nhất là 1,5 lần)?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 3,
            "text_en": "Are colors chosen for high contrast (avoid light gray text on white background)?",
            "text": "Màu sắc có được chọn để có độ tương phản cao không (tránh văn bản màu xám nhạt trên nền trắng)?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 4,
            "text_en": "Are fonts consistent across all screens?",
            "text": "Phông chữ có nhất quán trên tất cả các màn hình không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 5,
            "text_en": "Is essential information not hidden in long paragraphs?",
            "text": "Thông tin cần thiết không bị ẩn giấu trong những đoạn văn dài sao?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 6,
            "text_en": "Are text-heavy sections broken into bullet points or short sentences?",
            "text": "Các phần có nhiều văn bản có được chia thành các dấu đầu dòng hoặc các câu ngắn không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 7,
            "text_en": "Are headings, subheadings, and body text clearly distinct?",
            "text": "Các tiêu đề, tiêu đề phụ và văn bản nội dung có khác biệt rõ ràng không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 8,
            "text_en": "Are hyperlink styles visually distinct from normal text?",
            "text": "Các kiểu siêu liên kết có khác biệt về mặt trực quan với văn bản thông thường không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 9,
            "text_en": "Is text readable on all screen sizes (mobile, tablet, desktop)?",
            "text": "Văn bản có thể đọc được trên mọi kích thước màn hình (di động, máy tính bảng, máy tính để bàn) không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 10,
            "text_en": "Is content written in simple, plain language?",
            "text": "Nội dung có được viết bằng ngôn ngữ đơn giản, dễ hiểu không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          }
        ]
      },
      {
        "id": 9,
        "name": "Nhất quán thiết kế",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are navigation elements placed in the same locations across all pages?",
            "text": "Các thành phần điều hướng có được đặt ở cùng một vị trí trên tất cả các trang không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 2,
            "text_en": "Are buttons, icons, and fonts consistent in style?",
            "text": "Các nút, biểu tượng và phông chữ có nhất quán về kiểu dáng không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 3,
            "text_en": "Are success, error, and warning messages styled consistently?",
            "text": "Các thông báo thành công, lỗi và cảnh báo có được tạo kiểu nhất quán không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 4,
            "text_en": "Are action buttons always in the same position (e.g., Submit on right, Cancel on left)?",
            "text": "Các nút hành động có luôn ở cùng một vị trí không (ví dụ: Gửi ở bên phải, Hủy ở bên trái)?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          }
        ]
      },
      {
        "id": 10,
        "name": "Hỗ trợ quyền kiểm soát của người dùng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Can users undo accidental actions? (e.g., undo delete)",
            "text": "Người dùng có thể hoàn tác các hành động vô tình không? (ví dụ: hoàn tác xóa)",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "text_en": "Can users customize their settings easily?",
            "text": "Người dùng có thể tùy chỉnh cài đặt của họ một cách dễ dàng không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "text_en": "Are users allowed to manually override automation if needed?",
            "text": "Người dùng có được phép ghi đè tự động hóa theo cách thủ công nếu cần không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 4,
            "text_en": "Is auto-save enabled for forms and important inputs?",
            "text": "Tính năng tự động lưu có được bật cho các biểu mẫu và thông tin đầu vào quan trọng không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 5,
            "text_en": "Can users recover lost data or reset settings?",
            "text": "Người dùng có thể khôi phục dữ liệu bị mất hoặc đặt lại cài đặt không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 6,
            "text_en": "Are users given control over permissions and data privacy?",
            "text": "Người dùng có được cấp quyền kiểm soát quyền và quyền riêng tư dữ liệu không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 7,
            "text_en": "Is there a way to exit or cancel actions easily?",
            "text": "Có cách nào để thoát hoặc hủy hành động một cách dễ dàng không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 8,
            "text_en": "Can users preview changes before finalizing them?",
            "text": "Người dùng có thể xem trước các thay đổi trước khi hoàn thiện chúng không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      }
    ]
  },
  "shneiderman": {
    "title": "8 Quy tắc Vàng của Shneiderman",
    "categories": [
      {
        "id": 1,
        "name": "Khả năng hiển thị trực quan",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are key elements (buttons, forms, menus) immediately visible without extra clicks?",
            "text": "Các thành phần chính (nút, biểu mẫu, menu) có hiển thị ngay lập tức mà không cần nhấp chuột thêm không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "text_en": "Is important information placed in a logical and noticeable position?",
            "text": "Thông tin quan trọng có được đặt ở vị trí hợp lý và dễ nhận thấy không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "text_en": "Are buttons and links clearly differentiated from plain text?",
            "text": "Các nút và liên kết có được phân biệt rõ ràng với văn bản thuần túy không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "text_en": "Are primary actions more visually prominent than secondary actions?",
            "text": "Các hành động chính có nổi bật hơn các hành động phụ không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "text_en": "Are animations or hover effects used to highlight interactive elements?",
            "text": "Hoạt ảnh hoặc hiệu ứng di chuột có được sử dụng để làm nổi bật các yếu tố tương tác không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 2,
        "name": "Phản hồi thông tin tức thời",
        "criteria": [
          {
            "id": 1,
            "text_en": "Does every user action produce instant and clear feedback?",
            "text": "Mọi hành động của người dùng có tạo ra phản hồi ngay lập tức và rõ ràng không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "text_en": "Do buttons and interactive elements visually respond to clicks or taps?",
            "text": "Các nút và thành phần tương tác có phản hồi trực quan khi nhấp chuột hoặc nhấn không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "text_en": "Are errors and success messages clear and positioned near the relevant UI elements?",
            "text": "Các lỗi và thông báo thành công có rõ ràng và được đặt gần các thành phần giao diện người dùng có liên quan không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "text_en": "Are system processing states (loading, saving, submitting) indicated?",
            "text": "Các trạng thái xử lý hệ thống (tải, lưu, gửi) có được chỉ định không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "text_en": "Are form validation errors displayed in real-time instead of after submission?",
            "text": "Lỗi xác thực biểu mẫu có hiển thị trong thời gian thực thay vì sau khi gửi không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 3,
        "name": "Cấu trúc thông tin logic",
        "criteria": [
          {
            "id": 1,
            "text_en": "Is the layout consistent and logically organized?",
            "text": "Bố cục có nhất quán và được tổ chức hợp lý không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 2,
            "text_en": "Are related elements grouped together? (e.g., labels close to input fields)",
            "text": "Các yếu tố liên quan có được nhóm lại với nhau không? (ví dụ: nhãn gần trường nhập)",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 3,
            "text_en": "Is information hierarchically structured using headings, sections, and whitespace?",
            "text": "Thông tin có được cấu trúc theo thứ bậc bằng cách sử dụng các tiêu đề, phần và khoảng trắng không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 4,
            "text_en": "Are different sections clearly distinguishable?",
            "text": "Các phần khác nhau có được phân biệt rõ ràng không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          }
        ]
      },
      {
        "id": 4,
        "name": "Nhất quán thiết kế",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are UI components (buttons, typography, colors, icons) consistent across all screens?",
            "text": "Các thành phần giao diện người dùng (nút, kiểu chữ, màu sắc, biểu tượng) có nhất quán trên tất cả các màn hình không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 2,
            "text_en": "Are naming conventions for features, actions, and buttons uniform throughout the system?",
            "text": "Quy ước đặt tên cho các tính năng, hành động và nút có thống nhất trong toàn hệ thống không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 3,
            "text_en": "Are error messages displayed in a consistent format across different pages?",
            "text": "Thông báo lỗi có được hiển thị ở định dạng nhất quán trên các trang khác nhau không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          }
        ]
      },
      {
        "id": 5,
        "name": "Dung hòa sai sót của người dùng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are minor user errors automatically corrected when possible? (e.g., missing “www” in URLs)",
            "text": "Các lỗi nhỏ của người dùng có được tự động sửa chữa khi có thể không? (ví dụ: thiếu “www” trong URL)",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 2,
            "text_en": "Is there an Undo option for critical actions?",
            "text": "Có tùy chọn Hoàn tác cho các hành động quan trọng không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 3,
            "text_en": "Are users given a second chance before performing irreversible actions?",
            "text": "Người dùng có được trao cơ hội thứ hai trước khi thực hiện các hành động không thể thay đổi được không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          }
        ]
      },
      {
        "id": 6,
        "name": "Tái sử dụng mẫu thiết kế quen thuộc",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are commonly used patterns reused to reduce learning time?",
            "text": "Các mẫu thường được sử dụng có được sử dụng lại để giảm thời gian học không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 2,
            "text_en": "Are recognizable UI conventions followed? (e.g., hamburger menus, pagination, back button)",
            "text": "Các quy ước giao diện người dùng dễ nhận biết có được tuân theo không? (ví dụ: menu hamburger, phân trang, nút quay lại)",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 3,
            "text_en": "Is previous user input stored where applicable (e.g., autofill, recent searches)?",
            "text": "Dữ liệu nhập của người dùng trước đó có được lưu trữ ở nơi thích hợp không (ví dụ: tự động điền, tìm kiếm gần đây)?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          }
        ]
      },
      {
        "id": 7,
        "name": "Giảm thiểu tải nhận thức",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are complex workflows broken into smaller steps?",
            "text": "Quy trình công việc phức tạp có được chia thành các bước nhỏ hơn không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "text_en": "Are unnecessary elements removed to declutter the interface?",
            "text": "Các yếu tố không cần thiết có bị loại bỏ để làm gọn gàng giao diện không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "text_en": "Is critical information highlighted so users don’t have to search for it?",
            "text": "Thông tin quan trọng có được đánh dấu để người dùng không phải tìm kiếm nó không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 4,
            "text_en": "Are shortcuts provided to reduce repetitive tasks?",
            "text": "Các phím tắt có được cung cấp để giảm bớt các tác vụ lặp đi lặp lại không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      },
      {
        "id": 8,
        "name": "Độ dễ đọc và quét chữ",
        "criteria": [
          {
            "id": 1,
            "text_en": "Is text size, spacing, and contrast optimized for easy reading?",
            "text": "Kích thước văn bản, khoảng cách và độ tương phản có được tối ưu hóa để dễ đọc không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 2,
            "text_en": "Is jargon avoided in favor of plain and understandable language?",
            "text": "Có tránh sử dụng biệt ngữ để sử dụng ngôn ngữ đơn giản và dễ hiểu không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 3,
            "text_en": "Are long paragraphs broken into smaller, digestible chunks?",
            "text": "Các đoạn văn dài có được chia thành các đoạn nhỏ hơn để dễ tiêu hóa không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          },
          {
            "id": 4,
            "text_en": "Are font styles and weights used effectively to differentiate key information?",
            "text": "Kiểu và độ đậm của phông chữ có được sử dụng hiệu quả để phân biệt thông tin chính không?",
            "desc": "Tối ưu hóa khả năng quét thông tin trực quan, đảm bảo tính dễ đọc và cấu trúc thông tin rõ ràng.",
            "why": "Người dùng thường có thói quen quét lướt qua màn hình thay vì đọc từng từ; giao diện có cấu trúc tốt sẽ giúp họ tìm thông tin nhanh hơn.",
            "how": [
              "Sử dụng cỡ chữ và độ đậm nhạt (font-weight) khác nhau để phân biệt rõ tiêu đề và nội dung thường.",
              "Căn chỉnh văn bản gọn gàng, sử dụng danh sách dạng gạch đầu dòng để chia nhỏ các ý chính.",
              "Đảm bảo khoảng cách dòng (line-height) rộng rãi, dễ đọc, không bị dính chữ."
            ],
            "do": "Sử dụng tiêu đề cỡ chữ 24px in đậm, kết hợp với các đoạn văn ngắn 14px có khoảng cách dòng 1.5.",
            "dont": "Trình bày một khối văn bản dài dằng dặc không có tiêu đề phụ, không có khoảng cách đoạn và cỡ chữ quá nhỏ."
          }
        ]
      },
      {
        "id": 9,
        "name": "Khả năng dễ dàng học cách dùng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Is the interface easy for new users to understand?",
            "text": "Giao diện có dễ hiểu đối với người dùng mới không?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 2,
            "text_en": "Are tooltips, hints, or onboarding tutorials available for new users?",
            "text": "Chú giải công cụ, gợi ý hoặc hướng dẫn làm quen có sẵn cho người dùng mới không?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 3,
            "text_en": "Are commonly used actions placed in intuitive locations?",
            "text": "Các hành động thường được sử dụng có được đặt ở vị trí trực quan không?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 4,
            "text_en": "Are gestures and shortcuts easy to discover and remember?",
            "text": "Các cử chỉ và phím tắt có dễ dàng khám phá và ghi nhớ không?",
            "desc": "Cung cấp trợ giúp và tài liệu hướng dẫn sử dụng rõ ràng, dễ tìm kiếm khi cần.",
            "why": "Dù giao diện có trực quan đến đâu, người dùng vẫn cần tài liệu tham khảo khi thực hiện các tác vụ phức tạp hoặc gặp sự cố.",
            "how": [
              "Đặt liên kết đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh nhãn \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt người dùng tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          }
        ]
      },
      {
        "id": 10,
        "name": "Khả năng tiếp cận bình đẳng (Accessibility)",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are UI elements large enough for easy clicking/tapping?",
            "text": "Các thành phần trên giao diện người dùng có đủ lớn để dễ dàng nhấp/chạm không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 2,
            "text_en": "Can all text be read by screen readers?",
            "text": "Trình đọc màn hình có thể đọc được tất cả văn bản không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 3,
            "text_en": "Is color contrast high enough for colorblind users?",
            "text": "Độ tương phản màu có đủ cao cho người dùng mù màu không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 4,
            "text_en": "Can users navigate via keyboard shortcuts instead of a mouse?",
            "text": "Người dùng có thể điều hướng bằng phím tắt thay vì chuột không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          },
          {
            "id": 5,
            "text_en": "Are touch-friendly controls provided for mobile users?",
            "text": "Các điều khiển thân thiện với cảm ứng có được cung cấp cho người dùng di động không?",
            "desc": "Đảm bảo thiết kế công bằng, dễ tiếp cận cho mọi người dùng, kể cả người khuyết tật.",
            "why": "Khả năng tiếp cận là quyền cơ bản; tối ưu hóa giao diện giúp tất cả mọi người có thể sử dụng sản phẩm bình thường.",
            "how": [
              "Đảm bảo độ tương phản màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với trình đọc màn hình."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến người dùng có thị lực kém không thể đọc được."
          }
        ]
      },
      {
        "id": 11,
        "name": "Chỉ dẫn công năng trực quan (Affordance)",
        "criteria": [
          {
            "id": 1,
            "text_en": "Do interactive elements look clickable or tappable? (e.g., buttons with shadows, links underlined)",
            "text": "Các phần tử tương tác trông có thể nhấp vào hoặc chạm được không? (ví dụ: các nút có bóng, liên kết được gạch chân)",
            "desc": "Thiết kế các chỉ thị công năng trực quan và ràng buộc hợp lý để định hướng hành vi người dùng.",
            "why": "Gợi ý rõ ràng cách sử dụng phần tử thiết kế (nút thì phải trông như bấm được, liên kết thì phải có gạch chân hoặc đổi màu).",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi di chuột qua các liên kết hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi di chuột.",
            "dont": "Đặt liên kết văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến người dùng không biết đó là link bấm được."
          },
          {
            "id": 2,
            "text_en": "Are draggable elements visually distinct from static content?",
            "text": "Các phần tử có thể kéo có khác biệt về mặt trực quan với nội dung tĩnh không?",
            "desc": "Thiết kế các chỉ thị công năng trực quan và ràng buộc hợp lý để định hướng hành vi người dùng.",
            "why": "Gợi ý rõ ràng cách sử dụng phần tử thiết kế (nút thì phải trông như bấm được, liên kết thì phải có gạch chân hoặc đổi màu).",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi di chuột qua các liên kết hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi di chuột.",
            "dont": "Đặt liên kết văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến người dùng không biết đó là link bấm được."
          },
          {
            "id": 3,
            "text_en": "Do form fields have clear boundaries and input hints?",
            "text": "Các trường biểu mẫu có ranh giới và gợi ý đầu vào rõ ràng không?",
            "desc": "Thiết kế các chỉ thị công năng trực quan và ràng buộc hợp lý để định hướng hành vi người dùng.",
            "why": "Gợi ý rõ ràng cách sử dụng phần tử thiết kế (nút thì phải trông như bấm được, liên kết thì phải có gạch chân hoặc đổi màu).",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi di chuột qua các liên kết hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi di chuột.",
            "dont": "Đặt liên kết văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến người dùng không biết đó là link bấm được."
          }
        ]
      },
      {
        "id": 12,
        "name": "Ánh xạ logic (Sự tương ứng tự nhiên)",
        "criteria": [
          {
            "id": 1,
            "text_en": "Do UI controls behave in an expected manner?",
            "text": "Các điều khiển giao diện người dùng có hoạt động theo cách mong đợi không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 2,
            "text_en": "Are UI animations and transitions intuitive and aligned with real-world physics?",
            "text": "Hoạt ảnh và chuyển tiếp giao diện người dùng có trực quan và phù hợp với vật lý trong thế giới thực không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          },
          {
            "id": 3,
            "text_en": "Does scrolling behave naturally across devices?",
            "text": "Tính năng cuộn có hoạt động tự nhiên trên các thiết bị không?",
            "desc": "Sử dụng ngôn ngữ, ký hiệu và mô hình tinh thần gần gũi với thế giới thực của người dùng.",
            "why": "Giúp người dùng dễ dàng hiểu giao diện dựa trên những kinh nghiệm và thói quen thực tế ngoài đời của họ.",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho người dùng cuối."
          }
        ]
      },
      {
        "id": 13,
        "name": "Ràng buộc hành vi thao tác",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are unnecessary options disabled or hidden to prevent confusion?",
            "text": "Các tùy chọn không cần thiết có bị tắt hoặc ẩn đi để tránh nhầm lẫn không?",
            "desc": "Thiết kế các chỉ thị công năng trực quan và ràng buộc hợp lý để định hướng hành vi người dùng.",
            "why": "Gợi ý rõ ràng cách sử dụng phần tử thiết kế (nút thì phải trông như bấm được, liên kết thì phải có gạch chân hoặc đổi màu).",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi di chuột qua các liên kết hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi di chuột.",
            "dont": "Đặt liên kết văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến người dùng không biết đó là link bấm được."
          },
          {
            "id": 2,
            "text_en": "Are users guided through logical steps instead of being overwhelmed with choices?",
            "text": "Người dùng có được hướng dẫn qua các bước hợp lý thay vì bị choáng ngợp bởi các lựa chọn không?",
            "desc": "Thiết kế các chỉ thị công năng trực quan và ràng buộc hợp lý để định hướng hành vi người dùng.",
            "why": "Gợi ý rõ ràng cách sử dụng phần tử thiết kế (nút thì phải trông như bấm được, liên kết thì phải có gạch chân hoặc đổi màu).",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi di chuột qua các liên kết hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi di chuột.",
            "dont": "Đặt liên kết văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến người dùng không biết đó là link bấm được."
          },
          {
            "id": 3,
            "text_en": "Are actions limited based on context (e.g., disable the “Submit” button until all fields are completed)?",
            "text": "Các hành động có bị giới hạn dựa trên ngữ cảnh không (ví dụ: tắt nút “Gửi” cho đến khi tất cả các trường được hoàn thành)?",
            "desc": "Thiết kế các chỉ thị công năng trực quan và ràng buộc hợp lý để định hướng hành vi người dùng.",
            "why": "Gợi ý rõ ràng cách sử dụng phần tử thiết kế (nút thì phải trông như bấm được, liên kết thì phải có gạch chân hoặc đổi màu).",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi di chuột qua các liên kết hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi di chuột.",
            "dont": "Đặt liên kết văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến người dùng không biết đó là link bấm được."
          }
        ]
      },
      {
        "id": 14,
        "name": "Tính linh hoạt thích ứng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Can users customize their interface preferences?",
            "text": "Người dùng có thể tùy chỉnh tùy chọn giao diện của họ không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 2,
            "text_en": "Are different interaction modes available? (e.g., keyboard vs. touchscreen)",
            "text": "Các chế độ tương tác khác nhau có sẵn không? (ví dụ: bàn phím so với màn hình cảm ứng)",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 3,
            "text_en": "Does the interface support both novice and expert users?",
            "text": "Giao diện có hỗ trợ cả người dùng mới và người dùng chuyên nghiệp không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          }
        ]
      },
      {
        "id": 15,
        "name": "Khôi phục trạng thái nhanh chóng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Is there a way to undo mistakes easily?",
            "text": "Có cách nào để hoàn tác những sai lầm một cách dễ dàng?",
            "desc": "Hỗ trợ người dùng nhận biết, chẩn đoán và khắc phục lỗi một cách dễ dàng và lịch sự.",
            "why": "Khi lỗi xảy ra, người dùng cần giải pháp khắc phục nhanh chóng và dễ hiểu thay vì cảm thấy bối rối hoặc bị đổ lỗi.",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp liên kết trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến người dùng không biết sửa thế nào."
          },
          {
            "id": 2,
            "text_en": "Are users provided with error recovery solutions instead of just error messages?",
            "text": "Người dùng có được cung cấp giải pháp khắc phục lỗi thay vì chỉ thông báo lỗi không?",
            "desc": "Hỗ trợ người dùng nhận biết, chẩn đoán và khắc phục lỗi một cách dễ dàng và lịch sự.",
            "why": "Khi lỗi xảy ra, người dùng cần giải pháp khắc phục nhanh chóng và dễ hiểu thay vì cảm thấy bối rối hoặc bị đổ lỗi.",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp liên kết trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến người dùng không biết sửa thế nào."
          },
          {
            "id": 3,
            "text_en": "Are autosave features implemented to prevent data loss?",
            "text": "Các tính năng tự động lưu có được triển khai để ngăn ngừa mất dữ liệu không?",
            "desc": "Hỗ trợ người dùng nhận biết, chẩn đoán và khắc phục lỗi một cách dễ dàng và lịch sự.",
            "why": "Khi lỗi xảy ra, người dùng cần giải pháp khắc phục nhanh chóng và dễ hiểu thay vì cảm thấy bối rối hoặc bị đổ lỗi.",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp liên kết trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến người dùng không biết sửa thế nào."
          }
        ]
      },
      {
        "id": 16,
        "name": "Khả năng dễ ghi nhớ thao tác",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are important actions and workflows intuitive to recall after a long absence?",
            "text": "Các hành động và quy trình làm việc quan trọng có trực quan để bạn có thể nhớ lại sau một thời gian dài vắng bóng không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "text_en": "Are common icons and layouts used to reinforce familiarity?",
            "text": "Các biểu tượng và bố cục phổ biến có được sử dụng để củng cố sự quen thuộc không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "text_en": "Are previously viewed pages or recent actions easily accessible?",
            "text": "Các trang đã xem trước đây hoặc các hành động gần đây có dễ dàng truy cập được không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      },
      {
        "id": 17,
        "name": "Tính linh hoạt khi sử dụng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Can both first-time and expert users navigate the interface comfortably?",
            "text": "Cả người dùng lần đầu và người dùng chuyên nghiệp có thể điều hướng giao diện một cách thoải mái không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 2,
            "text_en": "Are power-user features (e.g., shortcuts, automation) available for frequent users?",
            "text": "Các tính năng dành cho người dùng thành thạo (ví dụ: phím tắt, tự động hóa) có sẵn cho người dùng thường xuyên không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          }
        ]
      },
      {
        "id": 18,
        "name": "Quyền kiểm soát của người dùng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Can users navigate back and forth without getting stuck?",
            "text": "Người dùng có thể điều hướng qua lại mà không bị kẹt không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "text_en": "Are users able to skip non-essential steps?",
            "text": "Người dùng có thể bỏ qua các bước không cần thiết không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "text_en": "Is there a clear way to exit a process at any time?",
            "text": "Có cách nào rõ ràng để thoát khỏi một quá trình bất cứ lúc nào không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      },
      {
        "id": 19,
        "name": "Sự tối giản và tinh gọn",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are only essential elements displayed at first, with advanced options hidden?",
            "text": "Có phải lúc đầu chỉ những phần tử thiết yếu được hiển thị còn các tùy chọn nâng cao bị ẩn đi không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 2,
            "text_en": "Is text concise and to the point?",
            "text": "Văn bản có ngắn gọn và đi thẳng vào vấn đề không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 3,
            "text_en": "Are unnecessary elements removed to avoid distraction?",
            "text": "Các yếu tố không cần thiết có bị loại bỏ để tránh bị phân tâm không?",
            "desc": "Tập trung thiết kế tối giản, loại bỏ thông tin thừa và tối ưu hóa khoảng trắng.",
            "why": "Mỗi chi tiết thừa thãi sẽ cạnh tranh sự chú ý với nội dung quan trọng, làm chậm tốc độ tiếp thu thông tin của người dùng.",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc giao diện."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          }
        ]
      },
      {
        "id": 20,
        "name": "Xác nhận hành động quan trọng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Do destructive actions require confirmation before execution?",
            "text": "Các hành động phá hoại có cần xác nhận trước khi thực hiện không?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 2,
            "text_en": "Are successful actions confirmed with a clear message?",
            "text": "Các hành động thành công có được xác nhận bằng một thông điệp rõ ràng không?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 3,
            "text_en": "Are users asked to review important decisions before finalizing them?",
            "text": "Người dùng có được yêu cầu xem xét các quyết định quan trọng trước khi hoàn tất chúng không?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          }
        ]
      }
    ]
  },
  "weinschenk": {
    "title": "Phân loại Tiêu chí Weinschenk & Barker",
    "categories": [
      {
        "id": 1,
        "name": "Nỗ lực duy trì sự nhất quán",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are buttons, icons, and layouts consistent across all pages/screens?",
            "text": "Các nút, biểu tượng và bố cục có nhất quán trên tất cả các trang/màn hình không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 2,
            "text_en": "Is navigation structure uniform across different sections?",
            "text": "Cấu trúc điều hướng có thống nhất giữa các phần khác nhau không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 3,
            "text_en": "Do color schemes and typography remain the same throughout the app/website?",
            "text": "Cách phối màu và kiểu chữ có giống nhau trong toàn bộ ứng dụng/trang web không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 4,
            "text_en": "Are labels and terminology consistent? (e.g., if you call it “Cart” on one page, don’t call it “Basket” on another)",
            "text": "Các nhãn và thuật ngữ có nhất quán không? (ví dụ: nếu bạn gọi nó là “Giỏ hàng” trên một trang, đừng gọi nó là “Giỏ” trên trang khác)",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 5,
            "text_en": "Are interactive elements (links, buttons) styled consistently?",
            "text": "Các yếu tố tương tác (liên kết, nút) có được tạo kiểu nhất quán không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 6,
            "text_en": "Are error messages displayed in the same format and position across different forms?",
            "text": "Các thông báo lỗi có được hiển thị ở cùng định dạng và vị trí trên các hình thức khác nhau không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 7,
            "text_en": "Is spacing and alignment uniform across UI elements?",
            "text": "Khoảng cách và căn chỉnh có thống nhất giữa các thành phần giao diện người dùng không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 8,
            "text_en": "Are confirmation dialogs and notifications formatted in a consistent manner?",
            "text": "Các hộp thoại xác nhận và thông báo có được định dạng nhất quán không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          },
          {
            "id": 9,
            "text_en": "Are touch targets (buttons, links) the same size across mobile and desktop versions?",
            "text": "Các mục tiêu cảm ứng (nút, liên kết) có cùng kích thước trên phiên bản dành cho thiết bị di động và máy tính để bàn không?",
            "desc": "Duy trì sự nhất quán về phong cách thiết kế, thuật ngữ và tuân thủ các quy chuẩn chung.",
            "why": "Sự nhất quán giúp giảm thiểu việc học lại từ đầu khi người dùng di chuyển giữa các trang hoặc các tính năng khác nhau.",
            "how": [
              "Sử dụng một hệ thống thiết kế (Design System) đồng bộ cho nút bấm, font chữ, màu sắc và icon.",
              "Đặt các thành phần điều hướng (Header, Sidebar, Search) ở vị trí cố định xuyên suốt hệ thống.",
              "Sử dụng thuật ngữ thống nhất trong toàn bộ ứng dụng (ví dụ: dùng duy nhất từ \"Giỏ hàng\" thay vì đổi thành \"Túi đồ\")."
            ],
            "do": "Tất cả các nút hành động chính (Primary Button) đều có màu xanh thương hiệu và góc bo 8px trên toàn app.",
            "dont": "Trang chủ dùng nút \"Mua ngay\", trang chi tiết dùng \"Thêm vào giỏ\", trang thanh toán lại dùng \"Đặt hàng\"."
          }
        ]
      },
      {
        "id": 2,
        "name": "Cung cấp phím tắt cho người dùng thường xuyên",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are keyboard shortcuts provided for power users? (e.g., Ctrl + S for saving)",
            "text": "Các phím tắt có được cung cấp cho người dùng thành thạo không? (ví dụ: Ctrl + S để lưu)",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 2,
            "text_en": "Are swipe gestures implemented for mobile users where applicable?",
            "text": "Cử chỉ vuốt có được triển khai cho người dùng di động nếu có không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 3,
            "text_en": "Can users quickly access frequently used features (e.g., Recent files in a document editor)?",
            "text": "Người dùng có thể truy cập nhanh các tính năng được sử dụng thường xuyên không (ví dụ: Tệp gần đây trong trình chỉnh sửa tài liệu)?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 4,
            "text_en": "Are predictive text or autocomplete features available in search and forms?",
            "text": "Văn bản dự đoán hoặc tính năng tự động hoàn thành có sẵn trong tìm kiếm và biểu mẫu không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 5,
            "text_en": "Can users customize their shortcuts or frequently used commands?",
            "text": "Người dùng có thể tùy chỉnh các phím tắt hoặc các lệnh thường dùng không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 6,
            "text_en": "Are tooltips or hints provided for shortcut keys?",
            "text": "Chú giải công cụ hoặc gợi ý có được cung cấp cho các phím tắt không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 7,
            "text_en": "Are voice commands or macros available for power users?",
            "text": "Lệnh thoại hoặc macro có sẵn cho người dùng thành thạo không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 8,
            "text_en": "Are default actions smartly prioritized based on past user behavior?",
            "text": "Các hành động mặc định có được ưu tiên một cách thông minh dựa trên hành vi của người dùng trong quá khứ không?",
            "desc": "Cung cấp các tính năng linh hoạt và phím tắt để phục vụ cả người dùng mới lẫn chuyên gia.",
            "why": "Cho phép người dùng tùy biến và tăng tốc độ thao tác khi họ đã quen thuộc với sản phẩm, nâng cao hiệu suất làm việc.",
            "how": [
              "Hỗ trợ các phím tắt bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng tự động điền (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên thiết bị di động."
            ],
            "do": "Cho phép người dùng thành thạo nhấn phím tắt \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc người dùng phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          }
        ]
      },
      {
        "id": 3,
        "name": "Cung cấp phản hồi đầy đủ thông tin",
        "criteria": [
          {
            "id": 1,
            "text_en": "Is immediate visual or auditory feedback given for every action?",
            "text": "Phản hồi trực quan hoặc thính giác có được đưa ra ngay lập tức cho mọi hành động không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "text_en": "Are buttons showing a loading indicator when an action takes time?",
            "text": "Các nút có hiển thị chỉ báo tải khi một hành động mất thời gian không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "text_en": "Are success messages clear and reassuring (e.g., “File uploaded successfully”)?",
            "text": "Thông báo thành công có rõ ràng và yên tâm không (ví dụ: “Tệp được tải lên thành công”)?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "text_en": "Do error messages explain what went wrong and suggest solutions?",
            "text": "Các thông báo lỗi có giải thích được sự cố và đề xuất giải pháp không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "text_en": "Are animations or microinteractions used to indicate state changes?",
            "text": "Hoạt ảnh hoặc tương tác vi mô có được sử dụng để biểu thị các thay đổi trạng thái không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 6,
            "text_en": "Are input fields showing validation feedback in real time (e.g., ✅/❌ for password strength)?",
            "text": "Các trường đầu vào có hiển thị phản hồi xác thực theo thời gian thực không (ví dụ: ✅/❌ về độ mạnh mật khẩu)?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 7,
            "text_en": "Is hover feedback provided for interactive elements like buttons and links?",
            "text": "Phản hồi khi di chuột có được cung cấp cho các phần tử tương tác như nút và liên kết không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 8,
            "text_en": "Are confirmation messages shown after completing important actions (e.g., order placed, email sent)?",
            "text": "Thông báo xác nhận có hiển thị sau khi hoàn thành các hành động quan trọng (ví dụ: đặt hàng, gửi email) không?",
            "desc": "Cung cấp phản hồi kịp thời và hiển thị rõ ràng trạng thái hoạt động của hệ thống.",
            "why": "Người dùng cần biết chuyện gì đang xảy ra để cảm thấy an tâm và không thực hiện thao tác lặp lại vô ích.",
            "how": [
              "Hiển thị thông báo trạng thái hoặc vòng xoay tải (loader) ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi người dùng bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 4,
        "name": "Thiết kế các hội thoại có điểm kết thúc rõ ràng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are users clearly informed when they have completed a task?",
            "text": "Người dùng có được thông báo rõ ràng khi họ đã hoàn thành một nhiệm vụ không?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 2,
            "text_en": "Do checkout or form submission processes end with a confirmation message?",
            "text": "Quá trình thanh toán hoặc gửi biểu mẫu có kết thúc bằng thông báo xác nhận không?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 3,
            "text_en": "Are emails or push notifications sent after major actions (e.g., booking confirmation, password change)?",
            "text": "Email hoặc thông báo đẩy có được gửi sau các hành động quan trọng (ví dụ: xác nhận đặt chỗ, thay đổi mật khẩu) không?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 4,
            "text_en": "Are progress indicators shown for multi-step processes?",
            "text": "Các chỉ báo tiến trình có được hiển thị cho các quy trình nhiều bước không?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 5,
            "text_en": "Are end-of-task summaries provided (e.g., “Your report is ready” with a download link)?",
            "text": "Các bản tóm tắt cuối nhiệm vụ có được cung cấp không (ví dụ: “Báo cáo của bạn đã sẵn sàng” kèm theo liên kết tải xuống)?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 6,
            "text_en": "Are users guided to the next logical step after completing a task?",
            "text": "Người dùng có được hướng dẫn đến bước hợp lý tiếp theo sau khi hoàn thành nhiệm vụ không?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 7,
            "text_en": "Are action buttons labeled clearly (e.g., “Finish” instead of “Continue” at the final step)?",
            "text": "Các nút hành động có được dán nhãn rõ ràng không (ví dụ: “Hoàn tất” thay vì “Tiếp tục” ở bước cuối cùng)?",
            "desc": "Thiết kế các bước kết thúc rõ ràng cho một chuỗi hành động và xác nhận kết quả.",
            "why": "Người dùng cần biết khi nào một nhiệm vụ đã hoàn thành xuất sắc để họ có thể yên tâm chuyển sang công việc tiếp theo.",
            "how": [
              "Hiển thị màn hình hoặc hộp thoại xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          }
        ]
      },
      {
        "id": 5,
        "name": "Chủ động phòng ngừa lỗi xảy ra",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are users prevented from entering invalid data? (e.g., no letters in a phone number field)",
            "text": "Người dùng có bị ngăn nhập dữ liệu không hợp lệ không? (ví dụ: không có chữ cái trong trường số điện thoại)",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 2,
            "text_en": "Are required fields clearly marked?",
            "text": "Các trường bắt buộc có được đánh dấu rõ ràng không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 3,
            "text_en": "Are destructive actions (delete, cancel) accompanied by a confirmation step?",
            "text": "Các hành động phá hoại (xóa, hủy) có kèm theo bước xác nhận không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 4,
            "text_en": "Are undo or rollback options available?",
            "text": "Các tùy chọn hoàn tác hoặc khôi phục có sẵn không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 5,
            "text_en": "Are tooltips or hints provided for complex fields?",
            "text": "Chú giải công cụ hoặc gợi ý có được cung cấp cho các trường phức tạp không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 6,
            "text_en": "Is real-time validation applied to forms (e.g., email format checked before submission)?",
            "text": "Việc xác thực theo thời gian thực có được áp dụng cho các biểu mẫu không (ví dụ: định dạng email được kiểm tra trước khi gửi)?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 7,
            "text_en": "Are clear constraints set (e.g., min/max character limits for usernames, password requirements)?",
            "text": "Có đặt các ràng buộc rõ ràng không (ví dụ: giới hạn ký tự tối thiểu/tối đa cho tên người dùng, yêu cầu mật khẩu)?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 8,
            "text_en": "Are errors explained in plain language instead of technical jargon?",
            "text": "Các lỗi có được giải thích bằng ngôn ngữ đơn giản thay vì thuật ngữ kỹ thuật không?",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 9,
            "text_en": "Are users guided through error recovery? (e.g., “Try resetting your password” for failed logins)",
            "text": "Người dùng có được hướng dẫn cách khắc phục lỗi không? (ví dụ: “Thử đặt lại mật khẩu của bạn” nếu đăng nhập không thành công)",
            "desc": "Thiết kế giao diện chủ động ngăn ngừa lỗi xảy ra thay vì chỉ hiển thị thông báo lỗi.",
            "why": "Phòng bệnh hơn chữa bệnh; loại bỏ các điều kiện dễ gây lỗi giúp tối ưu hóa thời gian và trải nghiệm của người dùng.",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi người dùng đặt vé máy bay.",
            "dont": "Cho phép người dùng nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          }
        ]
      },
      {
        "id": 6,
        "name": "Cho phép đảo ngược hành động dễ dàng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Can users undo or redo actions easily? (e.g., Undo for text editing, “Reopen closed tab” in browsers)",
            "text": "Người dùng có thể hoàn tác hoặc làm lại hành động một cách dễ dàng không? (ví dụ: Hoàn tác để chỉnh sửa văn bản, “Mở lại tab đã đóng” trong trình duyệt)",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "text_en": "Are delete actions reversible for a period (e.g., Trash folder before permanent deletion)?",
            "text": "Các hành động xóa có thể hoàn nguyên trong một khoảng thời gian không (ví dụ: thư mục Thùng rác trước khi xóa vĩnh viễn)?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "text_en": "Are confirmation dialogs provided before performing irreversible actions?",
            "text": "Các hộp thoại xác nhận có được cung cấp trước khi thực hiện các hành động không thể đảo ngược không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 4,
            "text_en": "Can users restore previous settings if they make changes?",
            "text": "Người dùng có thể khôi phục cài đặt trước đó nếu họ thực hiện thay đổi không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 5,
            "text_en": "Are session states saved so users don’t lose work accidentally?",
            "text": "Trạng thái phiên có được lưu để người dùng không vô tình bị mất công việc không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 6,
            "text_en": "Are drafts auto-saved in case of accidental closure?",
            "text": "Bản nháp có được tự động lưu trong trường hợp vô tình đóng không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 7,
            "text_en": "Is there a “Cancel” button available at every step in a process?",
            "text": "Có nút “Hủy” ở mỗi bước trong quy trình không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 8,
            "text_en": "Are users allowed to edit or modify submitted data if needed?",
            "text": "Người dùng có được phép chỉnh sửa hoặc sửa đổi dữ liệu đã gửi nếu cần không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      },
      {
        "id": 7,
        "name": "Hỗ trợ quyền kiểm soát chủ động của người dùng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Do users feel in control of the interface rather than the system controlling them?",
            "text": "Người dùng có cảm thấy mình đang kiểm soát giao diện hơn là hệ thống đang kiểm soát họ không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "text_en": "Are unexpected pop-ups or forced actions minimized?",
            "text": "Các cửa sổ bật lên bất ngờ hoặc các hành động bắt buộc có được giảm thiểu không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "text_en": "Do users have clear exit points in all tasks?",
            "text": "Người dùng có điểm thoát rõ ràng trong tất cả các nhiệm vụ không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 4,
            "text_en": "Can users customize the interface based on their preferences? (e.g., dark mode, font size)",
            "text": "Người dùng có thể tùy chỉnh giao diện dựa trên sở thích của mình không? (ví dụ: chế độ tối, cỡ chữ)",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 5,
            "text_en": "Are there no irreversible actions without prior warning?",
            "text": "Có hành động nào không thể đảo ngược mà không có cảnh báo trước không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 6,
            "text_en": "Are navigation paths predictable and free from unexpected redirects?",
            "text": "Các đường dẫn điều hướng có thể dự đoán được và không bị chuyển hướng không mong muốn không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 7,
            "text_en": "Do users feel like they are guiding the experience rather than being forced into certain flows?",
            "text": "Người dùng có cảm thấy như họ đang hướng dẫn trải nghiệm thay vì bị ép buộc vào một số luồng nhất định không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 8,
            "text_en": "Are AI-based suggestions optional, allowing users to make their own decisions?",
            "text": "Các đề xuất dựa trên AI có phải là tùy chọn, cho phép người dùng tự đưa ra quyết định không?",
            "desc": "Trao quyền kiểm soát cho người dùng, cho phép sửa sai và tự do điều hướng.",
            "why": "Người dùng thường vô tình bấm nhầm hoặc thay đổi ý định và họ cần một lối thoát khẩn cấp nhanh chóng mà không gây ức chế.",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"Hoàn tác\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép người dùng thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"Hoàn tác\" ở góc dưới màn hình.",
            "dont": "Bắt người dùng hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      },
      {
        "id": 8,
        "name": "Giảm tải bộ nhớ ngắn hạn cho người dùng",
        "criteria": [
          {
            "id": 1,
            "text_en": "Are important actions and options visible rather than hidden in menus?",
            "text": "Các hành động và tùy chọn quan trọng có hiển thị thay vì ẩn trong menu không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "text_en": "Are tooltips or helper texts available when users hover over options?",
            "text": "Chú giải công cụ hoặc văn bản trợ giúp có sẵn khi người dùng di chuột qua các tùy chọn không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "text_en": "Are users not required to memorize data between screens? (e.g., address copied automatically from shipping to billing)",
            "text": "Người dùng không bắt buộc phải ghi nhớ dữ liệu giữa các màn hình? (ví dụ: địa chỉ được sao chép tự động từ khâu vận chuyển sang khâu thanh toán)",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 4,
            "text_en": "Are breadcrumbs or navigation aids present for complex workflows?",
            "text": "Các đường dẫn hoặc công cụ hỗ trợ điều hướng có sẵn cho các quy trình làm việc phức tạp không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 5,
            "text_en": "Are field labels always visible (rather than disappearing when users start typing)?",
            "text": "Nhãn trường có luôn hiển thị (thay vì biến mất khi người dùng bắt đầu nhập) không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 6,
            "text_en": "Are past user inputs saved for easy reference? (e.g., recent searches, saved addresses)",
            "text": "Thông tin đầu vào của người dùng trước đây có được lưu lại để dễ dàng tham khảo không? (ví dụ: tìm kiếm gần đây, địa chỉ đã lưu)",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 7,
            "text_en": "Are step-by-step guides provided for complex workflows?",
            "text": "Hướng dẫn từng bước có được cung cấp cho quy trình công việc phức tạp không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 8,
            "text_en": "Are recent actions easily accessible in history or logs?",
            "text": "Các hành động gần đây có dễ dàng truy cập được trong lịch sử hoặc nhật ký không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 9,
            "text_en": "Are recent actions easily accessible in history or logs?",
            "text": "Các hành động gần đây có dễ dàng truy cập được trong lịch sử hoặc nhật ký không?",
            "desc": "Giảm thiểu tải nhớ cho người dùng bằng cách hiển thị rõ ràng thông tin và hướng dẫn trực quan.",
            "why": "Trí nhớ ngắn hạn của con người rất hạn chế; người dùng dễ dàng thao tác hơn khi họ có thể nhận diện thông tin trực tiếp thay vì cố nhớ lại.",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các nhãn (labels) và hướng dẫn luôn hiển thị rõ ràng khi người dùng đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để người dùng không cần quay lại tìm kiếm.",
            "dont": "Bắt người dùng phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      }
    ]
  }
};
