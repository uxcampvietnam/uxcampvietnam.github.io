// --- DỮ LIỆU 4 BỘ CHECKLIST HEURISTIC (ĐÃ DỊCH & LÀM GIÀU) ---
const HEURISTIC_DATA = {
  "nielsen": {
    "title": "Nielsen's Heuristics",
    "categories": [
      {
        "id": 1,
        "name": "Visibility of system status",
        "criteria": [
          {
            "id": 1,
            "title": "Nếu hệ thống load lâu (trên 3s), cần hiển thị loader để user biết",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "title": "Nếu loading dài (trên 15s) thì hệ thống phải báo tiến độ load, thời gian còn lại cho user.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "title": "User cần biết mình đang ở đâu trên toàn hệ thống (ở đâu trên màn hình, màn nào, sitemap...).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "title": "Khi di chuyển qua lại giữa nhiều màn hình, dùng label ngữ cảnh, menu map hoặc marker/breadcrumbs để user định hướng.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "title": "Thông báo rõ cho user khi chuyển hướng màn hình hoặc thay đổi luồng đi (journey) để giữ mạch liền mạch.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 6,
            "title": "Hiển thị thông báo rõ ràng khi hoàn thành task thành công.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 7,
            "title": "Sau khi user xong một task, báo rõ họ có thể làm gì tiếp theo.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 8,
            "title": "Mọi màn hình cần có tiêu đề rõ ràng, mô tả đúng nội dung trang.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 9,
            "title": "Các UI element (button, input, search...) cần có style phân biệt rõ các trạng thái (hover, active, focus, disabled...).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 10,
            "title": "Animation cần mượt mà, có mục đích rõ ràng, không làm chậm app hay gây phân tâm.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 11,
            "title": "Menu cần highlight rõ item đang được chọn.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 12,
            "title": "Thuật ngữ trên menu cần dễ hiểu và gần gũi với nghiệp vụ của user.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 13,
            "title": "Dùng chung một bộ icon nhất quán về style trên toàn hệ thống.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 14,
            "title": "Hiển thị rõ trạng thái của icon (ví dụ: đã chọn, chưa chọn, bị khóa...).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 15,
            "title": "Menu, thông báo, error message cần đặt ở vị trí cố định và có style nhất quán.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 16,
            "title": "Popup báo lỗi phải hiển thị vị trí lỗi để user dễ tìm.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 17,
            "title": "Khi được chọn nhiều tùy chọn, menu hoặc modal cần hiển thị rõ item nào có thể click chọn.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 18,
            "title": "Hiển thị rõ những tùy chọn đã được chọn trong menu hoặc modal.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 19,
            "title": "Icon đang chọn cần hiển thị nổi bật so với các icon chưa chọn xung quanh.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 20,
            "title": "Hiển thị rõ cách để user bỏ chọn (deselect).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 2,
        "name": "Match between system and real world",
        "criteria": [
          {
            "id": 1,
            "title": "Thiết kế hệ thống phù hợp với thói quen và trải nghiệm thực tế ngoài đời của user.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 2,
            "title": "Đặt thanh điều hướng (navigation) ở vị trí quen thuộc với user.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 3,
            "title": "Các thành phần UI và chỉ dẫn tương tác phải dễ hiểu, đúng ý nghĩa (ví dụ: kính lúp cho tìm kiếm).",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 4,
            "title": "Dùng ngôn ngữ tự nhiên, từ ngữ quen thuộc với user thay vì thuật ngữ kỹ thuật khó hiểu.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 5,
            "title": "Hành vi của hệ thống phải tương đồng với thế giới thực (phân biệt rõ: xóa vĩnh viễn và ẩn/loại bỏ).",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 6,
            "title": "Tự động thực hiện các thao tác hiển nhiên mà không bắt user phải confirm.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 7,
            "title": "Tự động làm các phần việc cơ bản (tự điền ký hiệu tiền tệ, mã quốc gia, định dạng phân tách phần nghìn 9,999,999).",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 8,
            "title": "Tự động thêm ký hiệu tiền tệ và số thập phân khi nhập số tiền.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 9,
            "title": "Ẩn các chi tiết vận hành kỹ thuật bên trong hệ thống để tránh làm user hoang mang.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 10,
            "title": "Các tính năng và hành động cần hiển thị phù hợp theo ngữ cảnh (ví dụ: nút Save bị disable nếu không có thay đổi).",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 11,
            "title": "Nội dung (copywriting) dễ hiểu, lịch sự, tránh dùng từ viết tắt, từ lóng kỹ thuật nếu không giải thích.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 12,
            "title": "Sắp xếp thứ tự các mục trong menu logic nhất đối với user.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 13,
            "title": "Các trường nhập liệu liên quan hoặc phụ thuộc nhau cần được hiển thị trên cùng một màn hình.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 14,
            "title": "Sử dụng màu sắc đúng theo quy ước chung của user (ví dụ: xanh lá là OK, đỏ là nguy hiểm).",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 15,
            "title": "Từ ngữ trong thông báo hành động phải khớp chính xác với hành động thực tế cần làm.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 16,
            "title": "Trong form nhập liệu, dùng các từ ngữ nghiệp vụ quen thuộc với user.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 17,
            "title": "Các câu hỏi trong luồng tương tác hỏi-đáp phải ngắn gọn, dễ hiểu.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 18,
            "title": "Nhóm các mục menu vào các category logic, dễ đoán.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 19,
            "title": "Ngôn ngữ lệnh (command) cần dùng từ ngữ của user, tránh biệt ngữ lập trình.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 20,
            "title": "Tên lệnh phải cụ thể, trực quan, không chung chung.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 21,
            "title": "Tự động căn chỉnh khoảng trắng đầu/cuối khi nhập số thập phân.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 22,
            "title": "Menu GUI cần chỉ rõ cho user biết cách kích hoạt hoặc chạy lệnh.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          }
        ]
      },
      {
        "id": 3,
        "name": "User control and freedom",
        "criteria": [
          {
            "id": 1,
            "title": "Cho phép user dễ dàng truy cập và xem thông tin cá nhân của họ.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "title": "Màu sắc nút bấm thể hiện đúng hậu quả hành động (ví dụ: nút OK màu xanh, nút hủy/xóa màu đỏ).",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "title": "Cung cấp phản hồi kịp thời (thanh tiến trình, thông báo trạng thái) khi user thực hiện thanh toán.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 4,
            "title": "Cung cấp nút Undo, Cancel hoặc yêu cầu confirm trước khi thực hiện hành động không thể hoàn tác.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 5,
            "title": "Cho phép undo nhiều bước nếu hệ thống hỗ trợ quay lại lịch sử.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 6,
            "title": "Cho phép user dừng/hủy các tác vụ đang chạy giữa chừng.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 7,
            "title": "Popup confirm cần rõ nghĩa, nút bấm thể hiện đúng hành động (ví dụ: nút 'Xóa tài khoản' thay vì chỉ 'OK').",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 8,
            "title": "Khi task hoàn thành, hệ thống cần đợi user confirm trước khi chuyển tiếp hoặc xử lý tiếp.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 9,
            "title": "Cho phép user gõ nhanh phím tắt để di chuyển qua các menu lồng nhau.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 10,
            "title": "Hỗ trợ Undo ở nhiều cấp độ: từng ký tự, từng trường nhập, và toàn bộ form.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 11,
            "title": "Cho phép user nhân bản (copy) và chỉnh sửa dữ liệu cũ để tiết kiệm thời gian nhập liệu.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 12,
            "title": "Cung cấp phím tắt (shortcut) song song với việc click chuột trên menu.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 13,
            "title": "Thiết kế menu nông và rộng (nhiều mục) tốt hơn là menu sâu nhiều cấp.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 14,
            "title": "Cho phép dùng phím tab/mũi tên để di chuyển qua lại giữa các trường trong popup hoặc modal.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 15,
            "title": "Trong form nhiều trang, cho phép user tự do quay lại trang trước để sửa thông tin.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 16,
            "title": "Trong luồng hỏi-đáp, cho phép user quay lại câu hỏi trước hoặc nhảy sang câu tiếp theo.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 17,
            "title": "Đảm bảo không mất dữ liệu của user kể cả khi gặp lỗi hệ thống hoặc do user thao tác sai.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      },
      {
        "id": 4,
        "name": "Consistency and standards",
        "criteria": [
          {
            "id": 1,
            "title": "Hiển thị rõ đường dẫn (breadcrumbs) hoặc highlight menu để user biết mình đang ở đâu và làm sao quay lại.",
            "desc": "",
            "why": "",
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
            "title": "Hệ thống điều hướng (navigation) phải nhất quán, trực quan, ưu tiên cấu trúc menu rộng và nông.",
            "desc": "",
            "why": "",
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
            "title": "Sắp xếp luồng đi hợp lý, đưa các action quan trọng lên vị trí dễ tương tác nhất.",
            "desc": "",
            "why": "",
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
            "title": "Chia nhỏ quy trình phức tạp thành các bước rõ ràng; báo trước cho user số bước và thời gian ước tính.",
            "desc": "",
            "why": "",
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
            "title": "Cấu trúc menu phải tương thích hoàn toàn với quy trình thực hiện task của user.",
            "desc": "",
            "why": "",
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
            "title": "Bố cục và các component UI (tiêu đề, chân trang, nút bấm) phải đồng nhất trên mọi màn hình.",
            "desc": "",
            "why": "",
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
            "title": "Căn lề tiêu đề menu nhất quán (luôn căn trái hoặc căn giữa).",
            "desc": "",
            "why": "",
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
            "title": "Cung cấp nút Home hoặc lối tắt quay lại trang bắt đầu luôn cố định trên UI.",
            "desc": "",
            "why": "",
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
            "title": "Dùng các component tiêu chuẩn phổ biến (giỏ hàng, nút logout, lịch sử giao dịch) đúng vị trí quen thuộc.",
            "desc": "",
            "why": "",
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
            "title": "Tránh dùng các từ khác nhau cho cùng một chức năng (ví dụ: lúc dùng 'Gửi', lúc dùng 'Submit').",
            "desc": "",
            "why": "",
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
            "title": "Nhất quán về thiết kế và hiệu ứng hover/active của tất cả các nút CTA trên toàn hệ thống.",
            "desc": "",
            "why": "",
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
            "title": "Cho phép user truy cập nhanh thông tin quan trọng qua nhiều đường dẫn khác nhau thay vì bắt đi qua nhiều bước.",
            "desc": "",
            "why": "",
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
            "title": "Tránh viết hoa toàn bộ chữ (ALL CAPS) trong các văn bản dài trên màn hình.",
            "desc": "",
            "why": "",
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
            "title": "Đặt hướng dẫn sử dụng (help text) ở một vị trí cố định, nhất quán trên các trang.",
            "desc": "",
            "why": "",
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
            "title": "Dùng label trường nhập liệu thống nhất giữa các form (ví dụ: luôn dùng 'Họ và tên').",
            "desc": "",
            "why": "",
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
            "title": "Căn trái cho danh sách chữ, căn phải cho danh sách số để dễ đọc.",
            "desc": "",
            "why": "",
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
            "title": "Đặt label ở bên trái của trường nhập đơn, hoặc phía trên đối với danh sách lựa chọn.",
            "desc": "",
            "why": "",
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
            "title": "Chỉ dùng các hiệu ứng gây chú ý mạnh (âm thanh, hiệu ứng nhấp nháy) cho cảnh báo cực kỳ quan trọng.",
            "desc": "",
            "why": "",
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
            "title": "Quy ước âm thanh: âm nhẹ cho phản hồi thành công, âm sắc rõ/lớn cho cảnh báo lỗi nghiêm trọng.",
            "desc": "",
            "why": "",
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
            "title": "Giới hạn tối đa 4 màu chủ đạo trong thiết kế giao diện (chỉ dùng màu phụ khi thực sự cần thiết).",
            "desc": "",
            "why": "",
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
            "title": "Cung cấp bảng chú thích (legend) nếu biểu đồ dùng nhiều màu sắc khác nhau.",
            "desc": "",
            "why": "",
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
            "title": "Quy định định dạng dữ liệu (date, số điện thoại) thống nhất trên toàn app.",
            "desc": "",
            "why": "",
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
            "title": "Trong form nhiều trang, giữ nguyên tiêu đề và đánh số trang tuần tự (ví dụ: Trang 1/3).",
            "desc": "",
            "why": "",
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
            "title": "Tooltip hoặc hướng dẫn nhập liệu phải chi tiết, bổ ích hơn là chỉ lặp lại label của trường.",
            "desc": "",
            "why": "",
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
            "title": "Đưa thông tin quan trọng nhất lên đầu câu thông báo hoặc hướng dẫn.",
            "desc": "",
            "why": "",
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
            "title": "Đặt tên hành động (action) nhất quán trên tất cả các nút gợi ý của hệ thống.",
            "desc": "",
            "why": "",
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
            "title": "Tên của lựa chọn trong menu phải trùng khớp với tiêu đề của trang đích khi click vào.",
            "desc": "",
            "why": "",
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
        "name": "Error prevention",
        "criteria": [
          {
            "id": 1,
            "title": "Thiết lập các ràng buộc (constraints) để chủ động ngăn user nhập sai dữ liệu ngay từ đầu.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 2,
            "title": "Điền sẵn các giá trị mặc định thông minh, hiển thị ví dụ mẫu trong placeholder và giới hạn độ dài ký tự.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 3,
            "title": "Nếu phát hiện trường lỗi, tự động focus hoặc highlight trường đó để user biết sửa.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 4,
            "title": "Giải thích rõ định dạng yêu cầu của từng trường và validate dữ liệu thời gian thực (real-time).",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 5,
            "title": "Nếu tìm kiếm không có kết quả, gợi ý từ khóa liên quan hoặc cách sửa truy vấn.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 6,
            "title": "Yêu cầu confirm bằng popup/modal trước khi user thực hiện hành động phá hủy dữ liệu (xóa, hủy...).",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 7,
            "title": "Sử dụng định dạng ngày tháng, tiền tệ... phù hợp với văn hóa của user mục tiêu.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 8,
            "title": "Phân biệt rõ ràng giữa trường bắt buộc (required) và trường tùy chọn (optional).",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 9,
            "title": "Dùng ký tự gợi ý trực quan (ví dụ: dấu gạch ngang) để biểu thị độ dài/cấu trúc chuỗi yêu cầu.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 10,
            "title": "Thiết lập hệ thống không phân biệt chữ hoa chữ thường (case-insensitive) khi nhập liệu nếu có thể.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 11,
            "title": "Sử dụng đúng loại nút bấm đại diện cho đúng hành động tương ứng.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 12,
            "title": "Cung cấp các lựa chọn rõ ràng, không mâu thuẫn trong các hộp thoại confirm.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 13,
            "title": "Sử dụng giá trị mặc định hợp lý trong form hoặc modal để giảm thao tác nhập liệu.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 14,
            "title": "Sử dụng âm thanh cảnh báo lỗi tinh tế, không chói tai.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 15,
            "title": "Viết thông báo lỗi lịch sự, mang tính xây dựng, chỉ cách khắc phục thay vì đổ lỗi cho user.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 16,
            "title": "Tránh dùng dấu chấm than (!) trong thông báo lỗi để không tạo cảm giác đe dọa user.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 17,
            "title": "Viết lời nhắc (prompt) ngắn gọn, rõ nghĩa, đi thẳng vào vấn đề.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 18,
            "title": "Thông báo lỗi cần chỉ rõ mức độ nghiêm trọng của lỗi.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 19,
            "title": "Chỉ ra nguyên nhân gây lỗi trong nội dung thông báo lỗi.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 20,
            "title": "Hướng dẫn cụ thể các bước user cần làm để sửa lỗi.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 21,
            "title": "Cung cấp các mức độ chi tiết thông báo lỗi khác nhau cho user mới và user chuyên nghiệp.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 22,
            "title": "Đặt các nút nguy hiểm (như Xóa hết) cách xa các nút dùng thường xuyên để tránh click nhầm.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 23,
            "title": "Hiển thị số ký tự tối đa được phép nhập trực tiếp trên form.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          }
        ]
      },
      {
        "id": 6,
        "name": "Recognition rather than recall",
        "criteria": [
          {
            "id": 1,
            "title": "Hiển thị các đề xuất cá nhân hóa dựa trên lịch sử hoạt động trước đó của user.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "title": "Dùng khoảng trắng và ký hiệu để phân biệt rõ câu hỏi, hướng dẫn và ô nhập liệu của user.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "title": "Sắp xếp menu điều hướng logic theo mô hình tinh thần của user để giảm tải ghi nhớ.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 4,
            "title": "Cho phép sửa đổi thông tin trực tiếp tại nơi hiển thị hoặc cung cấp link dẫn thẳng tới trang chỉnh sửa.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 5,
            "title": "Đảm bảo định dạng hiển thị dữ liệu khớp hoàn toàn với định dạng lúc nhập liệu.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 6,
            "title": "Hiển thị cách tính toán giá trị/kết quả rõ ràng nếu nó phụ thuộc vào nhiều biến số.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 7,
            "title": "Hỗ trợ lịch sử thao tác gần đây (lịch sử tìm kiếm, file đã mở) và lưu tạm thời (yêu thích, bookmark).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 8,
            "title": "Dùng tooltip, hướng dẫn nhanh từng bước (walkthrough) để giải thích các tính năng mới.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 9,
            "title": "Định dạng các thông tin gợi ý rõ ràng, có cấu trúc tốt để dễ quét bằng mắt.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 10,
            "title": "Làm mờ (gray out) hoặc ẩn hoàn toàn các tính năng, phím chức năng không khả dụng ở trạng thái hiện tại.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 11,
            "title": "Nhóm các mục liên quan vào từng khu vực riêng biệt có tiêu đề phân biệt rõ ràng.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 12,
            "title": "Menu GUI phải thể hiện trực quan những mục nào có thể click chọn.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      },
      {
        "id": 7,
        "name": "Flexibility and efficiency of use",
        "criteria": [
          {
            "id": 1,
            "title": "Dự đoán hành động tiếp theo của user dựa trên lịch sử thao tác gần nhất.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 2,
            "title": "Cung cấp các phím tắt (shortcut), macro hoặc tính năng thiết lập nhanh cho user chuyên nghiệp.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 3,
            "title": "Tự động ghi nhớ trạng thái cuối cùng của user (cài đặt, vị trí cuộn, file mở gần nhất).",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 4,
            "title": "Cho phép lưu bản nháp form để nhập tiếp sau nếu form quá dài.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 5,
            "title": "Thiết kế luồng tạo và xác minh tài khoản nhanh gọn, không đòi hỏi quá nhiều thông tin bảo mật không cần thiết.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 6,
            "title": "Thông báo rõ khi user hoàn thành mục tiêu, hỗ trợ quay lại các bước trước đó dễ dàng.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 7,
            "title": "Cho phép tắt các tooltip hoặc hướng dẫn làm quen (tutorial) sau khi user đã hiểu tính năng.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 8,
            "title": "Thiết kế các tác vụ phổ biến cực kỳ đơn giản; chỉ yêu cầu thao tác phức tạp cho kết quả chuyên sâu.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 9,
            "title": "Sắp xếp các tùy chọn theo tần suất sử dụng (đưa các mục dùng nhiều lên đầu).",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 10,
            "title": "Tự động điền số 0 ở đầu nếu định dạng yêu cầu nhập số có số 0.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          }
        ]
      },
      {
        "id": 8,
        "name": "Aesthetic and minimalist design",
        "criteria": [
          {
            "id": 1,
            "title": "Nhóm thông tin và chức năng liên quan lại với nhau để tránh làm rối mắt.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 2,
            "title": "Đảm bảo độ tương phản màu tốt và dùng kiểu chữ (typography) phân cấp rõ ràng (H1-H6) để dễ đọc.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 3,
            "title": "Thiết kế layout tập trung vào luồng công việc chính, thông tin trình bày ngắn gọn, dễ quét (dùng gạch đầu dòng, highlight link).",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 4,
            "title": "Chỉ hiển thị thông tin thực sự cần thiết, loại bỏ các chi tiết thừa thãi.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 5,
            "title": "Thiết kế form tinh gọn, bố cục hợp lý để user hoàn thành nhanh chóng.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 6,
            "title": "Dùng icon quen thuộc, dễ hiểu và có mục đích rõ ràng.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 7,
            "title": "Hạn chế viết tắt; thiết kế bảng biểu vừa vặn với chiều ngang màn hình.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 8,
            "title": "Nội dung ngắn gọn, súc tích, tránh các văn bản chào mừng dài dòng hoặc quảng cáo rườm rà.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 9,
            "title": "Popup, modal xuất hiện ở vị trí nổi bật, không bị che khuất hoặc cắt nội dung trên mọi thiết bị.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 10,
            "title": "Hình ảnh và đồ họa phải phục vụ trực tiếp cho mục tiêu nội dung, tránh dùng ảnh trang trí vô nghĩa.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 11,
            "title": "Chỉ hiển thị những thông tin trực tiếp quyết định hành động tiếp theo của user trên màn hình.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 12,
            "title": "Các icon trong cùng một nhóm phải khác biệt rõ ràng về mặt hình ảnh và khái niệm.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 13,
            "title": "Sử dụng nét vẽ rõ ràng, hình khối đơn giản để thiết kế icon dễ nhận diện.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 14,
            "title": "Thiết kế icon có độ tương phản tốt so với màu nền xung quanh.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 15,
            "title": "Tiêu đề của màn hình nhập liệu ngắn gọn, dễ hiểu, phân biệt rõ với các phần khác.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 16,
            "title": "Lời nhắc nhở nên viết dưới dạng khẳng định chủ động để khuyến khích hành động.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 17,
            "title": "Dùng dropdown menu cho các trường nhập có danh sách tùy chọn giới hạn rõ ràng.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          }
        ]
      },
      {
        "id": 9,
        "name": "Help users recognize, diagnose, and recover from errors",
        "criteria": [
          {
            "id": 1,
            "title": "Khi có lỗi, tự động focus vào trường lỗi và gợi ý cách khắc phục cụ thể.",
            "desc": "",
            "why": "",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp link trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến user không biết sửa thế nào."
          },
          {
            "id": 2,
            "title": "Thông báo lỗi viết bằng ngôn ngữ đơn giản, lịch sự, không đổ lỗi cho user.",
            "desc": "",
            "why": "",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp link trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến user không biết sửa thế nào."
          },
          {
            "id": 3,
            "title": "Đặt thông báo lỗi ngay cạnh trường bị lỗi và giữ nguyên các giá trị đúng đã nhập trước đó.",
            "desc": "",
            "why": "",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp link trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến user không biết sửa thế nào."
          },
          {
            "id": 4,
            "title": "Tránh timeout đột ngột làm mất dữ liệu của user; cảnh báo trước khi hết phiên làm việc.",
            "desc": "",
            "why": "",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp link trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến user không biết sửa thế nào."
          },
          {
            "id": 5,
            "title": "Cung cấp nút xem chi tiết lỗi kỹ thuật khi cần, nhưng thông điệp chính vẫn phải dễ hiểu.",
            "desc": "",
            "why": "",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp link trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến user không biết sửa thế nào."
          },
          {
            "id": 6,
            "title": "Hỗ trợ Undo/hoàn tác cho các thao tác lỡ tay xóa hoặc sửa dữ liệu quan trọng.",
            "desc": "",
            "why": "",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp link trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến user không biết sửa thế nào."
          }
        ]
      },
      {
        "id": 10,
        "name": "Help and documentation",
        "criteria": [
          {
            "id": 1,
            "title": "Cung cấp trợ giúp theo ngữ cảnh (contextual help) ngay tại vị trí tính năng để user không phải rời luồng làm việc.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 2,
            "title": "Tài liệu hướng dẫn dễ tìm, phân loại theo tác vụ của user và hỗ trợ tìm kiếm từ khóa nhanh chóng.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 3,
            "title": "Hiển thị trợ giúp dạng slide-out panel hoặc overlay để user vừa đọc vừa thao tác tiếp được.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 4,
            "title": "Cung cấp thông tin liên hệ hỗ trợ trực tiếp (hotline, email, chat) rõ ràng.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 5,
            "title": "Cung cấp hướng dẫn từng bước (FAQ) cho các tác vụ quan trọng và phổ biến nhất.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 6,
            "title": "Giải thích thêm về chức năng của menu item nếu tên gọi chưa thực sự rõ nghĩa.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 7,
            "title": "Đặt nút Trợ giúp ở vị trí dễ thấy trên giao diện.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 8,
            "title": "Thiết kế giao diện trang Trợ giúp nhất quán về UI/UX với ứng dụng chính.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 9,
            "title": "Cho phép chuyển đổi dễ dàng giữa nội dung trợ giúp và màn hình làm việc.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 10,
            "title": "Có lối ra rõ ràng để quay lại màn hình làm việc từ trang Trợ giúp.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 11,
            "title": "Giữ nguyên trạng thái làm việc dang dở của user sau khi họ mở xem tài liệu trợ giúp.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          }
        ]
      },
      {
        "id": 11,
        "name": "Accessibility",
        "criteria": [
          {
            "id": 1,
            "title": "Giới hạn lượng thông tin hiển thị vừa phải tại một thời điểm để tránh quá tải.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 2,
            "title": "Kích thước các nút bấm/điều khiển cảm ứng đủ lớn (tối thiểu 26-37px) và có khoảng cách đệm (padding) tối thiểu 10px.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 3,
            "title": "Đặt label phía trên trường nhập liệu tương ứng để dễ quét thông tin.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 4,
            "title": "Cử chỉ cảm ứng (swipe, pinch...) đơn giản, dễ thực hiện bằng một tay.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 5,
            "title": "Cung cấp cách thao tác thay thế cho các cử chỉ phức tạp.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 6,
            "title": "Kích hoạt hành động khi user nhả ngón tay ra (sự kiện touchup) chứ không phải lúc vừa chạm xuống.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 7,
            "title": "Cho phép tắt các tính năng kích hoạt bằng cách lắc hoặc nghiêng thiết bị để tránh vô tình thao tác.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 8,
            "title": "Hiển thị hướng dẫn trực quan hoặc văn bản mô tả cách thực hiện các cử chỉ cảm ứng.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 9,
            "title": "Đánh dấu trực quan rõ ràng các phần tử có thể tương tác được.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 10,
            "title": "Nhóm các phần tử tương tác liên quan lại với nhau về mặt trực quan.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 11,
            "title": "Cung cấp hướng dẫn bằng chữ rõ ràng cho các thao tác phức tạp.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 12,
            "title": "Tự động hiển thị đúng loại bàn phím ảo tương ứng (bàn phím số cho trường nhập số).",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 13,
            "title": "Phương thức nhập liệu đơn giản, dễ dự đoán.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 14,
            "title": "Đảm bảo mọi tính năng trên màn hình cảm ứng có thể thao tác bằng bàn phím hoặc thiết bị hỗ trợ khác.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 15,
            "title": "Cho phép phóng to cỡ chữ lên ít nhất 200% mà giao diện không bị vỡ bố cục.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 16,
            "title": "Hỗ trợ xoay ngang/dọc màn hình mượt mà không làm mất trạng thái dữ liệu.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 17,
            "title": "Layout trang nhất quán và dễ dự đoán trên toàn hệ thống.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 18,
            "title": "Cấu trúc tiêu đề (H1-H6) phân cấp rõ ràng theo logic nội dung.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 19,
            "title": "Mọi menu, điều khiển, link phải tương thích với cả chuột, cảm ứng và phím tab.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 20,
            "title": "Cung cấp alt text đầy đủ cho tất cả hình ảnh/đồ họa mang tính thông tin.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 21,
            "title": "Văn bản thường phải đạt tỷ lệ tương phản tối thiểu 4.5:1 so với nền.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 22,
            "title": "Văn bản lớn (từ 18px trở lên) phải đạt tỷ lệ tương phản tối thiểu 3:1 so với nền.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 23,
            "title": "Không truyền tải thông tin chỉ bằng màu sắc (ví dụ: cần thêm icon hoặc text lỗi kèm theo màu đỏ).",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 24,
            "title": "Tránh dùng hình ảnh chứa chữ (image of text) trừ khi thực sự cần thiết.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 25,
            "title": "Không dùng hình nền để truyền tải thông tin quan trọng vì screen reader không đọc được.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          }
        ]
      }
    ]
  },
  "gerhardt": {
    "title": "Cognitive Engineering (Gerhardt-Powals)",
    "categories": [
      {
        "id": 1,
        "name": "Automate unwanted workload",
        "criteria": [
          {
            "id": 1,
            "title": "Tự động hóa các tác vụ lặp đi lặp lại để tiết kiệm thời gian cho user.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 2,
            "title": "Đưa các chức năng dùng nhiều ra ngoài để truy cập nhanh với ít lượt click nhất.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 3,
            "title": "Dùng autocomplete/autofill hiệu quả cho các trường thông tin cơ bản (email, địa chỉ, lịch sử tìm kiếm).",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 4,
            "title": "Thiết lập mặc định thông minh cho các tùy chọn phổ biến nhất.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 5,
            "title": "Cá nhân hóa giao diện dựa trên hành vi và tùy chọn của user.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 6,
            "title": "Tự động tính toán các con số phức tạp (thuế, phí giao hàng, mã giảm giá).",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 7,
            "title": "Tự động ẩn/hiển thị các trường form linh hoạt dựa trên dữ liệu user vừa nhập.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 8,
            "title": "Ghi nhớ các tùy chọn cá nhân của user cho lần sử dụng sau.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 9,
            "title": "Tự động gửi email/thông báo đẩy ngay khi có cập nhật quan trọng hoặc hoàn tất giao dịch.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 10,
            "title": "Gợi ý thông minh (sản phẩm liên quan, tự động sửa từ khóa tìm kiếm sai).",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          }
        ]
      },
      {
        "id": 2,
        "name": "Reduce primary memory load",
        "criteria": [
          {
            "id": 1,
            "title": "Thiết kế các nút bấm và thông tin cốt lõi nổi bật, dễ phân biệt bằng mắt.",
            "desc": "",
            "why": "",
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
            "title": "Cấu trúc nội dung phân cấp rõ ràng (dùng tiêu đề, danh sách dạng bullet).",
            "desc": "",
            "why": "",
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
            "title": "Dùng chữ đậm, màu sắc tương phản và biểu tượng giúp quét nhanh nội dung.",
            "desc": "",
            "why": "",
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
            "title": "Tránh viết các đoạn văn dài; chia nhỏ thông tin thành các khối nội dung ngắn.",
            "desc": "",
            "why": "",
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
            "title": "Nhóm các mục liên quan trực quan để user dễ nhận biết.",
            "desc": "",
            "why": "",
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
            "title": "Thiết kế nút CTA (Kêu gọi hành động) nổi bật nhất trên trang.",
            "desc": "",
            "why": "",
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
            "title": "Bố trí layout theo quy luật đọc hình chữ F hoặc chữ Z của mắt.",
            "desc": "",
            "why": "",
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
            "title": "Đặt menu và icon điều hướng ở các vị trí tiêu chuẩn quen thuộc.",
            "desc": "",
            "why": "",
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
            "title": "Đặt thanh tìm kiếm ở vị trí dễ thấy và dễ truy cập nhất.",
            "desc": "",
            "why": "",
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
            "title": "Sử dụng hiệu ứng hover, shadow hoặc chuyển màu tinh tế để biểu thị phần tử có thể click.",
            "desc": "",
            "why": "",
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
        "name": "Minimize cognitive load",
        "criteria": [
          {
            "id": 1,
            "title": "Phản hồi trực quan tức thì ngay khi user click nút hoặc submit form.",
            "desc": "",
            "why": "",
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
            "title": "Viết thông báo lỗi cụ thể, dễ hiểu và hướng dẫn cách sửa lỗi chi tiết.",
            "desc": "",
            "why": "",
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
            "title": "Hiển thị thông báo thành công rõ ràng sau khi user hoàn thành task quan trọng.",
            "desc": "",
            "why": "",
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
            "title": "Cung cấp tooltip hoặc help text nội tuyến cho các trường nhập liệu phức tạp.",
            "desc": "",
            "why": "",
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
            "title": "Validate thông tin và báo lỗi ngay khi user đang gõ thay vì đợi submit form.",
            "desc": "",
            "why": "",
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
            "title": "Hiển thị popup confirm trước khi thực hiện hành động nguy hiểm không thể hoàn tác.",
            "desc": "",
            "why": "",
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
            "title": "Nhất quán hệ thống màu sắc cho thông báo trạng thái (xanh lá = thành công, đỏ = lỗi).",
            "desc": "",
            "why": "",
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
            "title": "Chỉ dùng placeholder làm ví dụ minh họa, không dùng thay thế cho label của trường.",
            "desc": "",
            "why": "",
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
            "title": "Đảm bảo mọi phần tử click được (button, link, card) hiển thị rõ tính năng click.",
            "desc": "",
            "why": "",
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
            "title": "Hiển thị skeleton loader hoặc thanh tiến trình nếu trang tải nội dung chậm.",
            "desc": "",
            "why": "",
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
        "name": "Integrate information",
        "criteria": [
          {
            "id": 1,
            "title": "Đặt các thông tin liên quan cạnh nhau để user dễ dàng so sánh.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 2,
            "title": "Dùng biểu đồ hoặc đồ thị trực quan để tóm tắt các tập dữ liệu lớn.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 3,
            "title": "Highlight hoặc dùng mã màu cho các chỉ số quan trọng cần lưu ý.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 4,
            "title": "Thiết kế Dashboard hiển thị toàn bộ chỉ số cốt lõi ngay khi truy cập.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 5,
            "title": "Nhóm dữ liệu logic trên cùng một màn hình thay vì chia nhỏ sang nhiều trang.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 6,
            "title": "Cho phép click vào số liệu tóm tắt để xem chi tiết bên trong.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 7,
            "title": "Cung cấp ngữ cảnh so sánh cho các con số (ví dụ: '+10% so với tuần trước').",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 8,
            "title": "Hỗ trợ phân trang (pagination) hoặc thu gọn bảng dài để dễ điều hướng.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 9,
            "title": "Tối ưu hiển thị bảng biểu và dữ liệu lớn trên màn hình di động.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          },
          {
            "id": 10,
            "title": "Đặt thông tin đối chiếu (như giá trước và sau giảm) song song thay vì ở hai trang khác nhau.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp tính năng autocomplete (autofill) các thông tin cơ bản từ hồ sơ user.",
              "Tự động tính toán các giá trị tổng, thuế, hoặc chuyển đổi đơn vị tiền tệ thời gian thực.",
              "Gộp các nguồn dữ liệu có liên quan vào cùng một UI thay vì bắt user mở nhiều tab."
            ],
            "do": "autocomplete tỉnh/thành phố và quận/huyện tương ứng ngay khi user nhập mã bưu chính.",
            "dont": "Bắt user tự tính nhẩm số tiền được giảm giá dựa trên mã code rồi gõ tay kết quả vào ô thanh toán."
          }
        ]
      },
      {
        "id": 5,
        "name": "Context-sensitive display",
        "criteria": [
          {
            "id": 1,
            "title": "Chủ động ẩn các thông tin chưa cần thiết để giữ giao diện sạch sẽ.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 2,
            "title": "Cá nhân hóa nội dung hiển thị theo vị trí, sở thích hoặc trạng thái của user.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 3,
            "title": "Ẩn hoặc disable các tính năng không khả dụng ở ngữ cảnh hiện tại.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 4,
            "title": "Chỉ hiển thị tooltip khi thực sự cần giải thích, tránh lạm dụng gây rối mắt.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 5,
            "title": "Cung cấp hướng dẫn nhanh (tour hướng dẫn) cho user mới truy cập lần đầu.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 6,
            "title": "Thay đổi giao diện hoặc gợi ý dựa trên các hành động trước đó của user.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 7,
            "title": "Sử dụng progressive disclosure (chỉ hiển thị chi tiết khi user click xem thêm).",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 8,
            "title": "Loại bỏ hoàn toàn quảng cáo hoặc menu gây xao nhãng trong các luồng quan trọng (như thanh toán).",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 9,
            "title": "Ưu tiên xếp hạng kết quả tìm kiếm theo mức độ liên quan tốt nhất.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 10,
            "title": "Ẩn các lựa chọn không liên quan (ví dụ: không hiển thị chọn đơn vị vận chuyển đối với sản phẩm số).",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          }
        ]
      },
      {
        "id": 6,
        "name": "Visual clarity and flow",
        "criteria": [
          {
            "id": 1,
            "title": "Hướng dẫn user rõ ràng qua từng bước của quy trình làm việc nhiều bước.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "title": "Đánh số thứ tự các bước trong quy trình dài để user biết mình đang ở đâu.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "title": "Dùng tín hiệu trực quan (mũi tên, highlight) để định hướng sự chú ý của mắt.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "title": "Hiển thị chỉ báo tiến trình (progress bar) khi thực hiện các tác vụ mất thời gian (upload file).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "title": "Gợi ý rõ ràng bước tiếp theo cần làm sau khi user hoàn thành task hiện tại.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 6,
            "title": "Thiết kế hiệu ứng chuyển trang mượt mà, tránh chuyển đổi đột ngột gây mất định hướng.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 7,
            "title": "Sử dụng walkthrough hướng dẫn nhanh giao diện cho user mới.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 8,
            "title": "Highlight rõ thanh điều hướng hiện tại để user luôn biết vị trí của mình.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 9,
            "title": "Đặt tên nút hành động rõ ràng về chức năng tiếp theo (ví dụ: 'Đi đến thanh toán').",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 10,
            "title": "Sử dụng breadcrumbs trong các quy trình duyệt web nhiều cấp.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 7,
        "name": "Reduce workload",
        "criteria": [
          {
            "id": 1,
            "title": "Thiết kế các icon và UI element quen thuộc, dễ hiểu ngay lập tức.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "title": "Loại bỏ hoàn toàn các tính năng dư thừa làm loãng giao diện.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "title": "Hiển thị trực quan thông tin cần dùng thay vì bắt user nhớ lại thông tin từ trang trước.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 4,
            "title": "Giới hạn số lượng lựa chọn hiển thị cùng lúc để user dễ đưa ra quyết định nhanh.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 5,
            "title": "Giải thích ngắn gọn cho các tính năng lạ hoặc thuật ngữ chuyên sâu.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 6,
            "title": "Chia các luồng công việc phức tạp thành các nhiệm vụ nhỏ dễ xử lý.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 7,
            "title": "Thiết kế giao diện sao cho user không cần ghi nhớ thông tin giữa các màn hình.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 8,
            "title": "Ứng dụng AI hoặc tự động điền để giảm tối đa công sức nhập tay của user.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 9,
            "title": "Cung cấp cổng trợ giúp nhanh ngay cạnh các tác vụ phức tạp.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 10,
            "title": "Tự động điền trước các thông tin đã biết (tên, email, địa chỉ đăng ký) vào form.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      },
      {
        "id": 8,
        "name": "Readability and clarity",
        "criteria": [
          {
            "id": 1,
            "title": "Đảm bảo cỡ chữ đủ lớn để đọc rõ ràng (tối thiểu 16px trên mobile).",
            "desc": "",
            "why": "",
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
            "title": "Thiết lập khoảng cách dòng (line-height) hợp lý (tối thiểu 1.5 lần cỡ chữ).",
            "desc": "",
            "why": "",
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
            "title": "Sử dụng màu chữ có độ tương phản cao với nền (tránh chữ xám nhạt trên nền trắng).",
            "desc": "",
            "why": "",
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
            "title": "Sử dụng thống nhất một bộ phông chữ (font family) trên toàn bộ các trang.",
            "desc": "",
            "why": "",
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
            "title": "Không giấu thông tin quan trọng bên trong các khối văn bản dài.",
            "desc": "",
            "why": "",
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
            "title": "Chia các đoạn văn dài thành các câu ngắn hoặc gạch đầu dòng dễ đọc.",
            "desc": "",
            "why": "",
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
            "title": "Phân biệt rõ ràng tiêu đề (heading), tiêu đề phụ (subheading) và nội dung.",
            "desc": "",
            "why": "",
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
            "title": "Thiết kế style của link khác biệt hoàn toàn so với văn bản thông thường (ví dụ: đổi màu, gạch chân).",
            "desc": "",
            "why": "",
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
            "title": "Đảm bảo text hiển thị tốt và tự co giãn chuẩn trên mọi kích thước màn hình.",
            "desc": "",
            "why": "",
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
            "title": "Viết nội dung đơn giản, ngắn gọn, dễ hiểu đối với đại đa số user.",
            "desc": "",
            "why": "",
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
        "name": "Consistency",
        "criteria": [
          {
            "id": 1,
            "title": "Đặt thanh điều hướng ở cùng một vị trí cố định trên tất cả các trang.",
            "desc": "",
            "why": "",
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
            "title": "Nhất quán về kiểu dáng của nút bấm, icon và phông chữ trên toàn app.",
            "desc": "",
            "why": "",
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
            "title": "Đồng nhất thiết kế cho các thông báo trạng thái (thành công, lỗi, cảnh báo).",
            "desc": "",
            "why": "",
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
            "title": "Đặt các nút hành động ở vị trí cố định quen thuộc (ví dụ: nút chính bên phải, nút phụ bên trái).",
            "desc": "",
            "why": "",
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
        "name": "User control",
        "criteria": [
          {
            "id": 1,
            "title": "Hỗ trợ Undo nhanh cho các thao tác lỡ tay xóa hoặc sửa dữ liệu.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "title": "Cho phép user tự do tùy chỉnh cài đặt tài khoản và giao diện dễ dàng.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "title": "Cho phép user tắt tính năng tự động và chuyển sang thao tác thủ công khi muốn.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 4,
            "title": "Tự động lưu (autosave) dữ liệu biểu mẫu quan trọng để tránh mất bài khi mất kết nối.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 5,
            "title": "Cho phép user khôi phục dữ liệu đã xóa hoặc reset cài đặt về mặc định.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 6,
            "title": "Cung cấp cho user quyền quản lý bảo mật và chia sẻ dữ liệu cá nhân rõ ràng.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 7,
            "title": "Luôn có nút Hủy (Cancel) hoặc Thoát (Exit) rõ ràng để thoát luồng làm việc bất cứ lúc nào.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 8,
            "title": "Cho phép user xem trước (preview) kết quả trước khi nhấn nút xác nhận cuối cùng.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      }
    ]
  },
  "shneiderman": {
    "title": "Shneiderman's Eight Golden Rules",
    "categories": [
      {
        "id": 1,
        "name": "Visibility",
        "criteria": [
          {
            "id": 1,
            "title": "Hiển thị sẵn các component chính (button, form, menu) mà không bắt user click thêm.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "title": "Đặt thông tin quan trọng ở vị trí trung tâm, dễ đập vào mắt user.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "title": "Phân biệt rõ nút bấm, link liên kết với văn bản thường bằng màu sắc và viền.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "title": "Dùng kích thước và màu sắc để phân cấp rõ nút hành động chính và nút phụ.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "title": "Sử dụng hiệu ứng hover hoặc animation nhẹ để báo hiệu phần tử có thể tương tác.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 2,
        "name": "Informative feedback",
        "criteria": [
          {
            "id": 1,
            "title": "Mọi tương tác của user phải nhận được phản hồi trực quan tức thì từ hệ thống.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "title": "Các nút bấm và icon phải thay đổi trạng thái trực quan (như chìm xuống) khi click.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "title": "Hiển thị thông báo trạng thái (lỗi, thành công) ngay tại vị trí vừa xảy ra tương tác.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "title": "Hiển thị rõ các trạng thái xử lý hệ thống (đang tải, đang lưu, đang gửi).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "title": "Validate dữ liệu form trực tiếp trong thời gian thực thay vì đợi nhấn nút gửi.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 3,
        "name": "Logical hierarchy",
        "criteria": [
          {
            "id": 1,
            "title": "Sắp xếp bố cục trang thống nhất, gọn gàng và có tổ chức logic.",
            "desc": "",
            "why": "",
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
            "title": "Đặt label sát cạnh trường nhập tương ứng để tránh nhầm lẫn.",
            "desc": "",
            "why": "",
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
            "title": "Cấu trúc thông tin phân cấp rõ ràng bằng heading, thẻ div và khoảng trắng.",
            "desc": "",
            "why": "",
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
            "title": "Phân chia rõ ranh giới các phần nội dung khác nhau trên trang bằng đường kẻ hoặc màu nền.",
            "desc": "",
            "why": "",
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
        "name": "Consistency",
        "criteria": [
          {
            "id": 1,
            "title": "Nhất quán về thiết kế (nút, phông chữ, màu sắc, icon) trên tất cả các trang.",
            "desc": "",
            "why": "",
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
            "title": "Đặt tên chức năng, hành động trên nút đồng nhất trong toàn bộ hệ thống.",
            "desc": "",
            "why": "",
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
            "title": "Sử dụng một định dạng và vị trí nhất quán để hiển thị các thông báo lỗi.",
            "desc": "",
            "why": "",
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
        "name": "Error tolerance",
        "criteria": [
          {
            "id": 1,
            "title": "Tự động sửa các lỗi chính tả nhỏ của user khi có thể (ví dụ: tự thêm http hoặc www vào URL).",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 2,
            "title": "Luôn có tính năng Undo cho các thao tác quan trọng.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 3,
            "title": "Yêu cầu xác nhận lần hai trước khi user thực hiện hành động không thể hoàn tác.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          }
        ]
      },
      {
        "id": 6,
        "name": "Reusability",
        "criteria": [
          {
            "id": 1,
            "title": "Sử dụng lại các layout, UI pattern quen thuộc để giảm thời gian làm quen cho user.",
            "desc": "",
            "why": "",
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
            "title": "Tuân thủ các quy chuẩn thiết kế phổ biến (menu hamburger ở góc, giỏ hàng ở góc phải).",
            "desc": "",
            "why": "",
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
            "title": "Lưu trữ lịch sử nhập liệu gần đây để hỗ trợ autocomplete cho user.",
            "desc": "",
            "why": "",
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
        "name": "Minimize cognitive load",
        "criteria": [
          {
            "id": 1,
            "title": "Chia nhỏ quy trình làm việc phức tạp thành các bước nhỏ, dễ quản lý.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "title": "Loại bỏ các thông tin, hình ảnh không cần thiết để giữ giao diện sạch sẽ.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "title": "Đánh dấu nổi bật thông tin cốt lõi để user không phải mất công tìm kiếm.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 4,
            "title": "Cung cấp phím tắt (shortcut) cho các thao tác lặp đi lặp lại.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      },
      {
        "id": 8,
        "name": "Readability",
        "criteria": [
          {
            "id": 1,
            "title": "Tối ưu hóa kích thước chữ, khoảng cách dòng và độ tương phản màu để tối đa hóa độ dễ đọc.",
            "desc": "",
            "why": "",
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
            "title": "Dùng ngôn ngữ đơn giản, tránh các thuật ngữ chuyên môn sâu nếu không cần thiết.",
            "desc": "",
            "why": "",
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
            "title": "Tách các khối văn bản dài thành các đoạn văn ngắn.",
            "desc": "",
            "why": "",
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
            "title": "Dùng độ đậm nhạt của chữ (font-weight) để phân cấp thông tin chính phụ.",
            "desc": "",
            "why": "",
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
        "name": "Learnability",
        "criteria": [
          {
            "id": 1,
            "title": "Thiết kế giao diện trực quan, dễ hiểu ngay cả đối với user truy cập lần đầu.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 2,
            "title": "Cung cấp tooltip, hướng dẫn nhanh ( onboarding) cho các tính năng mới.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 3,
            "title": "Đặt các action hay dùng ở các vị trí dễ đoán nhất trên màn hình.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          },
          {
            "id": 4,
            "title": "Thiết kế cử chỉ vuốt chạm và phím tắt đơn giản, dễ học và dễ nhớ.",
            "desc": "",
            "why": "",
            "how": [
              "Đặt link đến trang trợ giúp hoặc trung tâm hỗ trợ (Help Center) ở vị trí dễ thấy như Header hoặc Footer.",
              "Sử dụng các tooltip hoặc biểu tượng dấu hỏi nhỏ giải thích trực tiếp tại các thuật ngữ phức tạp.",
              "Thiết kế tài liệu dạng câu hỏi thường gặp (FAQ) ngắn gọn, có chức năng tìm kiếm từ khóa."
            ],
            "do": "Đặt biểu tượng dấu hỏi chấm nhỏ bên cạnh label \"Mã CVV\" giải thích rõ: \"3 chữ số ở mặt sau thẻ tín dụng\".",
            "dont": "Bắt user tải xuống tệp hướng dẫn sử dụng PDF dài 50 trang để tự tìm hiểu cách thiết lập tài khoản."
          }
        ]
      },
      {
        "id": 10,
        "name": "Accessibility",
        "criteria": [
          {
            "id": 1,
            "title": "Thiết kế các nút bấm đủ to để dễ dàng click/chạm chính xác.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 2,
            "title": "Đảm bảo mọi văn bản đều có thể được đọc bởi screen reader.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 3,
            "title": "Độ tương phản màu chữ đạt chuẩn để hỗ trợ user bị mù màu.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 4,
            "title": "Hỗ trợ điều hướng hoàn toàn bằng bàn phím (phím tab) thay vì bắt buộc dùng chuột.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          },
          {
            "id": 5,
            "title": "Cung cấp các điều khiển chạm lớn thân thiện với người dùng mobile.",
            "desc": "",
            "why": "",
            "how": [
              "Đảm bảo độ tương phản (contrast) màu sắc giữa văn bản và nền đạt tiêu chuẩn tối thiểu 4.5:1.",
              "Thiết kế vùng bấm (touch target) đủ rộng, tối thiểu 24x24px (khuyến nghị 44x44px) để tránh bấm nhầm.",
              "Cấu trúc trang web theo chuẩn Semantic HTML để tương thích tốt với Screen Reader."
            ],
            "do": "Sử dụng chữ màu đen trên nền trắng có độ tương phản (contrast) cao, và các nút bấm có kích thước vùng bấm 44x44px.",
            "dont": "Đặt chữ màu xám nhạt trên nền trắng sữa khiến user có thị lực kém không thể đọc được."
          }
        ]
      },
      {
        "id": 11,
        "name": "Affordance",
        "criteria": [
          {
            "id": 1,
            "title": "Các nút bấm cần có hiệu ứng nổi (shadow, hover) để thể hiện rõ có thể click được.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi hover qua các link hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi hover.",
            "dont": "Đặt link văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến user không biết đó là link bấm được."
          },
          {
            "id": 2,
            "title": "Đánh dấu trực quan các phần tử có thể kéo thả (drag and drop) so với nội dung tĩnh.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi hover qua các link hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi hover.",
            "dont": "Đặt link văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến user không biết đó là link bấm được."
          },
          {
            "id": 3,
            "title": "Thiết kế các ô nhập liệu (input) có đường viền rõ ràng và ví dụ gợi ý bên trong.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi hover qua các link hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi hover.",
            "dont": "Đặt link văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến user không biết đó là link bấm được."
          }
        ]
      },
      {
        "id": 12,
        "name": "Logical mapping",
        "criteria": [
          {
            "id": 1,
            "title": "Các nút điều khiển phải vận hành đúng theo logic suy nghĩ tự nhiên của user.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 2,
            "title": "Hiệu ứng chuyển động (animation) phải mượt mà và tuân theo quy luật vật lý thực tế.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          },
          {
            "id": 3,
            "title": "Tính năng cuộn trang (scroll) hoạt động tự nhiên, không bị giật lag trên mọi thiết bị.",
            "desc": "",
            "why": "",
            "how": [
              "Tránh sử dụng thuật ngữ kỹ thuật chuyên ngành hoặc mã lỗi hệ thống khó hiểu.",
              "Sắp xếp thông tin theo trình tự logic tự nhiên (ví dụ: ngày/tháng/năm hoặc quy trình mua hàng chuẩn).",
              "Sử dụng các biểu tượng có ý nghĩa trực quan quen thuộc (như hình ngôi nhà cho trang chủ, giỏ hàng cho mua sắm)."
            ],
            "do": "Dùng từ \"Thanh toán\" và biểu tượng thẻ tín dụng cho bước trả tiền của đơn hàng.",
            "dont": "Hiển thị thông báo lỗi lập trình dạng \"SQL Exception: Constraint integrity check failed (0x004F)\" cho user cuối."
          }
        ]
      },
      {
        "id": 13,
        "name": "Constraints",
        "criteria": [
          {
            "id": 1,
            "title": "Disable hoặc ẩn đi các tính năng chưa khả dụng để tránh user click nhầm.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi hover qua các link hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi hover.",
            "dont": "Đặt link văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến user không biết đó là link bấm được."
          },
          {
            "id": 2,
            "title": "Dẫn dắt user đi qua các bước logic thay vì hiển thị tất cả tùy chọn cùng lúc gây ngợp.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi hover qua các link hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi hover.",
            "dont": "Đặt link văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến user không biết đó là link bấm được."
          },
          {
            "id": 3,
            "title": "Chỉ kích hoạt nút Gửi khi user đã hoàn thành việc điền các trường bắt buộc.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng hiệu ứng bóng đổ nhẹ hoặc bo góc để làm nổi bật các thành phần bấm được.",
              "Giới hạn hoặc khóa các thao tác không được phép (ví dụ: không cho nhập chữ vào ô số điện thoại).",
              "Hiển thị con trỏ chuột dạng bàn tay (pointer) khi hover qua các link hoặc nút."
            ],
            "do": "Thiết kế nút bấm nổi hẳn lên so với mặt nền nhờ hiệu ứng đổ bóng mờ và thay đổi màu khi hover.",
            "dont": "Đặt link văn bản có màu đen giống hệt chữ thường và không có gạch chân, khiến user không biết đó là link bấm được."
          }
        ]
      },
      {
        "id": 14,
        "name": "Flexibility",
        "criteria": [
          {
            "id": 1,
            "title": "Cho phép user tùy chỉnh giao diện (chế độ tối/sáng, thay đổi cỡ chữ).",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 2,
            "title": "Hỗ trợ nhiều phương thức tương tác song song (bàn phím, chuột, cảm ứng).",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 3,
            "title": "Thiết kế giao diện hỗ trợ tốt cho cả người dùng mới và chuyên gia sử dụng lâu năm.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          }
        ]
      },
      {
        "id": 15,
        "name": "Reversibility",
        "criteria": [
          {
            "id": 1,
            "title": "Cung cấp nút Undo để dễ dàng sửa chữa các sai sót thao tác.",
            "desc": "",
            "why": "",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp link trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến user không biết sửa thế nào."
          },
          {
            "id": 2,
            "title": "Khi có lỗi xảy ra, chỉ rõ cách tự sửa lỗi thay vì chỉ thông báo lỗi chung chung.",
            "desc": "",
            "why": "",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp link trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến user không biết sửa thế nào."
          },
          {
            "id": 3,
            "title": "Tích hợp tính năng tự động lưu (autosave) để ngăn ngừa mất mát dữ liệu.",
            "desc": "",
            "why": "",
            "how": [
              "Viết thông báo lỗi bằng ngôn ngữ tự nhiên, giải thích rõ nguyên nhân và cách sửa.",
              "Đánh dấu đỏ trực quan vùng bị lỗi kèm theo văn bản hướng dẫn cụ thể ngay bên dưới trường đó.",
              "Cung cấp link trực tiếp để khắc phục (ví dụ: nút \"Đặt lại mật khẩu\" khi nhập sai mật khẩu)."
            ],
            "do": "Thông báo lỗi: \"Mật khẩu phải chứa ít nhất 8 ký tự. Vui lòng thêm ký tự và thử lại.\"",
            "dont": "Hiển thị thông báo lỗi lập trình chung chung: \"Lỗi 0x80070057: Tham số không hợp lệ\" khiến user không biết sửa thế nào."
          }
        ]
      },
      {
        "id": 16,
        "name": "Memorability",
        "criteria": [
          {
            "id": 1,
            "title": "Quy trình làm việc trực quan, dễ nhớ kể cả khi user không sử dụng app trong thời gian dài.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "title": "Dùng các biểu tượng tiêu chuẩn để tăng độ quen thuộc và khả năng ghi nhớ giao diện.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "title": "Cung cấp danh sách các mục đã xem gần đây để truy cập nhanh lại.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      },
      {
        "id": 17,
        "name": "Efficiency",
        "criteria": [
          {
            "id": 1,
            "title": "Đảm bảo cả user mới và user lâu năm đều có thể tìm đường và thao tác thoải mái.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 2,
            "title": "Cung cấp phím tắt và tự động hóa thao tác cho user thường xuyên sử dụng hệ thống.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          }
        ]
      },
      {
        "id": 18,
        "name": "User control",
        "criteria": [
          {
            "id": 1,
            "title": "Thiết kế luồng điều hướng thông suốt, đảm bảo user di chuyển tự do và không bị kẹt.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "title": "Cho phép user bỏ qua (skip) các bước không thực sự cần thiết trong quy trình.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "title": "Luôn có nút Thoát (Exit) rõ ràng để dừng quy trình bất cứ lúc nào.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      },
      {
        "id": 19,
        "name": "Minimalism",
        "criteria": [
          {
            "id": 1,
            "title": "Ưu tiên hiển thị các phần tử cốt lõi trước, các tùy chọn nâng cao nên được ẩn đi.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 2,
            "title": "Nội dung văn bản ngắn gọn, súc tích, đi thẳng vào vấn đề.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          },
          {
            "id": 3,
            "title": "Loại bỏ hoàn toàn các yếu tố gây xao nhãng để giữ giao diện gọn gàng.",
            "desc": "",
            "why": "",
            "how": [
              "Sử dụng khoảng trắng (whitespace) rộng rãi để phân tách các khối nội dung và tạo nhịp thở thị giác.",
              "Ứng dụng nguyên lý hiển thị lũy tiến (progressive disclosure) để ẩn bớt chức năng nâng cao khi chưa cần.",
              "Sử dụng hệ thống lưới (grid layout) gọn gàng để căn chỉnh cấu trúc UI."
            ],
            "do": "Trang chủ tìm kiếm của Google chỉ có duy nhất ô tìm kiếm và hai nút bấm chính giữa màn hình trắng sạch.",
            "dont": "Nhồi nhét đầy các banner quảng cáo nhấp nháy, tin tức chạy chữ và popup khuyến mãi đè lên bài viết chính."
          }
        ]
      },
      {
        "id": 20,
        "name": "Confirmation",
        "criteria": [
          {
            "id": 1,
            "title": "Yêu cầu confirm rõ ràng trước khi thực hiện các hành động không thể hoàn tác (như xóa tài khoản).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 2,
            "title": "Hiển thị thông báo thành công rõ ràng sau khi hoàn tất các giao dịch quan trọng.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 3,
            "title": "Cho phép user review (xem lại) toàn bộ thông tin đăng ký/đặt hàng trước khi gửi.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
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
    "title": "Weinschenk & Barker Classification",
    "categories": [
      {
        "id": 1,
        "name": "Consistency",
        "criteria": [
          {
            "id": 1,
            "title": "Đảm bảo các nút bấm, biểu tượng và bố cục nhất quán trên toàn bộ các trang.",
            "desc": "",
            "why": "",
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
            "title": "Nhất quán cấu trúc thanh điều hướng ở tất cả các mục.",
            "desc": "",
            "why": "",
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
            "title": "Sử dụng đồng nhất màu sắc và kiểu chữ trên toàn bộ website/app.",
            "desc": "",
            "why": "",
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
            "title": "Sử dụng thuật ngữ thống nhất trên toàn app (ví dụ: dùng 'Giỏ hàng' thay vì đổi thành 'Giỏ mua sắm' ở trang khác).",
            "desc": "",
            "why": "",
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
            "title": "Thiết kế phong cách nút bấm và link liên kết đồng bộ.",
            "desc": "",
            "why": "",
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
            "title": "Hiển thị thông báo lỗi ở định dạng và vị trí nhất quán trên toàn bộ giao diện.",
            "desc": "",
            "why": "",
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
            "title": "Nhất quán khoảng cách căn lề giữa các thành phần UI.",
            "desc": "",
            "why": "",
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
            "title": "Popup confirm và thông báo hệ thống phải sử dụng chung một layout mẫu.",
            "desc": "",
            "why": "",
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
            "title": "Kích thước vùng bấm chạm (touch target) của nút nhất quán trên cả bản mobile và desktop.",
            "desc": "",
            "why": "",
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
        "name": "Shortcuts",
        "criteria": [
          {
            "id": 1,
            "title": "Cung cấp các tổ hợp phím tắt (shortcut) cho user thành thạo (ví dụ: Ctrl + S để lưu nhanh).",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 2,
            "title": "Hỗ trợ các cử chỉ vuốt chạm (swipe) tiện lợi trên thiết bị di động.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 3,
            "title": "Cung cấp danh mục các tính năng hay dùng hoặc file mở gần đây để truy cập nhanh.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 4,
            "title": "Tích hợp tính năng tự động hoàn thành (autocomplete) trong thanh tìm kiếm và form nhập liệu.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 5,
            "title": "Cho phép user tự thiết lập phím tắt cá nhân cho các lệnh thường dùng.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 6,
            "title": "Hiển thị gợi ý phím tắt tương ứng khi user hover chuột vào nút bấm.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 7,
            "title": "Hỗ trợ ra lệnh bằng giọng nói hoặc phím tắt nâng cao cho chuyên gia.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          },
          {
            "id": 8,
            "title": "Ưu tiên hiển thị mặc định các lựa chọn dựa trên lịch sử thói quen của user.",
            "desc": "",
            "why": "",
            "how": [
              "Hỗ trợ các shortcut bàn phím thông dụng (ví dụ: Ctrl/Cmd + Enter để gửi, ESC để đóng).",
              "Cung cấp tính năng autocomplete (autofill) và lưu thông tin biểu mẫu cho lần sau.",
              "Cho phép kéo thả (drag and drop) hoặc thao tác vuốt nhanh trên mobile."
            ],
            "do": "Cho phép user thành thạo nhấn shortcut \"N\" để tạo nhanh một ghi chú mới từ bất kỳ đâu trên ứng dụng.",
            "dont": "Bắt buộc user phải rê chuột qua 3 lớp menu khác nhau để thực hiện một tác vụ cực kỳ phổ biến."
          }
        ]
      },
      {
        "id": 3,
        "name": "Feedback",
        "criteria": [
          {
            "id": 1,
            "title": "Phản hồi trực quan hoặc âm thanh tức thì ngay khi user thực hiện thao tác.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 2,
            "title": "Hiển thị chỉ báo loading trực tiếp trên nút bấm nếu tác vụ mất thời gian xử lý.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 3,
            "title": "Viết thông báo thành công rõ ràng để user yên tâm (ví dụ: 'Tải file lên thành công').",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 4,
            "title": "Thông báo lỗi phải chỉ rõ nguyên nhân và gợi ý giải pháp xử lý cụ thể.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 5,
            "title": "Dùng animation hoặc tương tác vi mô để thông báo thay đổi trạng thái của hệ thống.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 6,
            "title": "Hiển thị tích xanh/đỏ validate trực tiếp trên ô nhập liệu ngay khi user đang gõ.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 7,
            "title": "Hiển thị hiệu ứng hover rõ nét khi di chuột qua các nút bấm và link liên kết.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          },
          {
            "id": 8,
            "title": "Hiển thị màn hình/popup xác nhận sau khi user hoàn thành task quan trọng (như đặt hàng thành công).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị thông báo trạng thái hoặc loader ngay khi hệ thống xử lý tác vụ.",
              "Cung cấp thông tin tiến trình cụ thể đối với các tác vụ mất nhiều thời gian (trên 3 giây).",
              "Thay đổi trạng thái trực quan của các phần tử tương tác (active, disabled, hover) rõ ràng."
            ],
            "do": "Hiển thị thanh tiến trình \"Đang xuất tệp... 60% (còn khoảng 15 giây)\" khi user bấm xuất báo cáo nặng.",
            "dont": "Màn hình đứng yên không phản hồi hoặc chỉ xoay vòng vô tận mà không đưa ra chỉ số thời gian ước tính."
          }
        ]
      },
      {
        "id": 4,
        "name": "Closure",
        "criteria": [
          {
            "id": 1,
            "title": "Thông báo rõ ràng cho user khi họ đã hoàn thành xong một task.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 2,
            "title": "Kết thúc quy trình thanh toán hoặc gửi form bằng một trang xác nhận trực quan.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 3,
            "title": "Gửi email hoặc thông báo đẩy xác nhận tự động ngay sau các giao dịch quan trọng.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 4,
            "title": "Hiển thị thanh tiến trình (progress bar) cho các quy trình nhiều bước.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 5,
            "title": "Cung cấp trang tóm tắt kết quả kèm nút tải xuống khi hoàn tất xuất báo cáo.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 6,
            "title": "Gợi ý hành động logic tiếp theo cho user sau khi họ kết thúc quy trình hiện tại.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
              "Cung cấp thông tin hướng dẫn về các bước tiếp theo cần thực hiện sau khi hoàn thành tác vụ.",
              "Đưa ra phản hồi rõ ràng bằng âm thanh hoặc hiệu ứng hình ảnh nhẹ nhàng khi kết thúc quy trình."
            ],
            "do": "Hiển thị trang chúc mừng \"Đặt hàng thành công!\" kèm mã đơn hàng và nút \"Quay lại cửa hàng\".",
            "dont": "Sau khi bấm nút thanh toán, hệ thống chỉ tải lại trang chủ mà không đưa ra bất kỳ thông báo hay biên lai nào."
          },
          {
            "id": 7,
            "title": "Đặt tên nút ở bước cuối quy trình rõ nghĩa (ví dụ: 'Hoàn tất' thay vì nút 'Tiếp tục').",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị màn hình hoặc popup/modal xác nhận thành công (Success state) kèm theo tóm tắt giao dịch.",
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
        "name": "Error prevention",
        "criteria": [
          {
            "id": 1,
            "title": "Validate định dạng dữ liệu trực tiếp để ngăn user nhập ký tự không hợp lệ (ví dụ: chặn nhập chữ vào ô số điện thoại).",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 2,
            "title": "Đánh dấu rõ ràng các trường bắt buộc phải điền.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 3,
            "title": "Yêu cầu confirm bằng hộp thoại trước khi thực hiện hành động xóa hoặc hủy.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 4,
            "title": "Cung cấp tính năng Undo hoặc khôi phục dữ liệu nhanh.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 5,
            "title": "Cung cấp tooltip giải thích cho các trường thông tin phức tạp.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 6,
            "title": "Validate định dạng email/mật khẩu trực tiếp ngay khi đang nhập form.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 7,
            "title": "Đặt ra các ràng buộc mật khẩu rõ ràng (độ dài tối thiểu, ký tự đặc biệt).",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 8,
            "title": "Dùng ngôn ngữ dễ hiểu cho thông báo lỗi, tránh dùng mã lỗi lập trình.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          },
          {
            "id": 9,
            "title": "Chỉ dẫn chi tiết cách sửa lỗi ngay trong câu thông báo lỗi.",
            "desc": "",
            "why": "",
            "how": [
              "Vô hiệu hóa (disable) các nút gửi biểu mẫu cho đến khi tất cả các trường bắt buộc đã được điền đúng định dạng.",
              "Cung cấp gợi ý định dạng (như lịch chọn ngày, định dạng số điện thoại tự động phân tách) để tránh nhập sai.",
              "Yêu cầu xác nhận (Confirmation) hai lần đối với các hành động có tính hủy hoại cao (như xóa tài khoản, hủy dự án)."
            ],
            "do": "Hiển thị lịch chọn ngày thông minh chỉ cho phép chọn ngày trong tương lai khi user đặt vé máy bay.",
            "dont": "Cho phép user nhập tự do ngày tháng rồi sau khi bấm nút gửi mới báo lỗi \"Sai định dạng YYYY-MM-DD\"."
          }
        ]
      },
      {
        "id": 6,
        "name": "Reversibility",
        "criteria": [
          {
            "id": 1,
            "title": "Cho phép dễ dàng Undo (hoàn tác) hoặc Redo hành động vừa thực hiện.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "title": "Lưu trữ dữ liệu đã xóa vào thùng rác tạm thời để user có thể khôi phục khi cần.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "title": "Hiển thị popup confirm trước khi chạy các lệnh không thể đảo ngược.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 4,
            "title": "Cho phép khôi phục cài đặt cũ nếu user thay đổi cài đặt giao diện.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 5,
            "title": "Lưu trạng thái phiên làm việc (session state) để tránh mất dữ liệu khi mất kết nối mạng đột ngột.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 6,
            "title": "Tự động lưu bản nháp form để tránh mất bài viết khi vô tình đóng tab.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 7,
            "title": "Luôn hiển thị nút Hủy (Cancel) ở tất cả các bước trong quy trình nhập liệu.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 8,
            "title": "Cho phép chỉnh sửa dữ liệu đã gửi nếu phát hiện sai sót.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      },
      {
        "id": 7,
        "name": "Control",
        "criteria": [
          {
            "id": 1,
            "title": "Thiết kế để user cảm thấy làm chủ giao diện thay vì bị hệ thống ép buộc luồng đi.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 2,
            "title": "Hạn chế tối đa các popup bất ngờ gây xao nhãng hoặc cản trở thao tác.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 3,
            "title": "Luôn cung cấp lối thoát (nút Exit/Cancel) rõ ràng ở mọi tác vụ.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 4,
            "title": "Cho phép cá nhân hóa giao diện (đổi theme tối/sáng, chỉnh size chữ).",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 5,
            "title": "Không bao giờ thực hiện hành động không thể đảo ngược mà không cảnh báo trước.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 6,
            "title": "Đảm bảo luồng điều hướng đi đúng kỳ vọng của user, không tự động chuyển hướng màn hình đột ngột.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 7,
            "title": "Dẫn dắt trải nghiệm một cách tự nhiên, tránh ép buộc user theo một kịch bản cứng nhắc.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          },
          {
            "id": 8,
            "title": "Cung cấp quyền tắt/bật các đề xuất tự động từ hệ thống.",
            "desc": "",
            "why": "",
            "how": [
              "Cung cấp nút \"Hủy bỏ\" (Cancel) hoặc \"Quay lại\" (Back) dễ thấy trên mọi biểu mẫu hoặc luồng công việc.",
              "Hỗ trợ tính năng \"undo\" (Undo) đối với các hành động quan trọng như xóa dữ liệu.",
              "Cho phép user thoát khỏi các màn hình popup, modal hoặc overlay bằng cách bấm phím ESC hoặc bấm ra ngoài."
            ],
            "do": "Hiển thị banner \"Đã chuyển email vào Thùng rác\" kèm nút \"undo\" ở góc dưới màn hình.",
            "dont": "Bắt user hoàn thành toàn bộ luồng đăng ký 5 bước mà không cho phép quay lại chỉnh sửa thông tin ở bước 1."
          }
        ]
      },
      {
        "id": 8,
        "name": "Reduce memory load",
        "criteria": [
          {
            "id": 1,
            "title": "Hiển thị sẵn các tính năng cốt lõi trên thanh menu thay vì giấu sâu bên trong.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 2,
            "title": "Hiển thị tooltip giải thích nhanh khi hover qua các nút chức năng.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 3,
            "title": "Không bắt user ghi nhớ thông tin giữa các màn hình (ví dụ: tự động copy địa chỉ giao hàng sang địa chỉ thanh toán).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 4,
            "title": "Cung cấp breadcrumbs hoặc sơ đồ hướng dẫn cho các quy trình nghiệp vụ phức tạp.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 5,
            "title": "Giữ label trường nhập luôn hiển thị (tránh dùng placeholder thay thế cho label).",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 6,
            "title": "Lưu lịch sử tìm kiếm và thông tin nhập liệu cũ để user truy cập nhanh khi cần.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 7,
            "title": "Cung cấp hướng dẫn từng bước rõ ràng cho các luồng nghiệp vụ khó.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 8,
            "title": "Cho phép dễ dàng truy cập lịch sử hoạt động gần đây của user.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          },
          {
            "id": 9,
            "title": "Cung cấp nhật ký hoạt động (activity log) trực quan để user dễ tra cứu lại.",
            "desc": "",
            "why": "",
            "how": [
              "Hiển thị các thông tin gợi ý hoặc lịch sử tìm kiếm gần đây ngay trong ô nhập liệu.",
              "Giữ cho các label (labels) và hướng dẫn luôn hiển thị rõ ràng khi user đang điền biểu mẫu.",
              "Sử dụng biểu tượng minh họa đi kèm với văn bản để giúp nhận diện nhanh chóng chức năng."
            ],
            "do": "Hiển thị danh sách sản phẩm đã xem gần đây ở trang giỏ hàng để user không cần quay lại tìm kiếm.",
            "dont": "Bắt user phải ghi nhớ mã giảm giá từ trang trước và gõ lại chính xác vào ô nhập liệu ở trang sau."
          }
        ]
      }
    ]
  }
};
