# Prototype diễn đàn Dị thường

Mở `index.html` bằng trình duyệt. Không cần build hoặc cài thư viện. Có thể chạy qua HTTP:

```bash
python3 -m http.server 8000 --directory frontend
```

Sau đó mở `http://localhost:8000`.

## Luồng nên xem

1. **Diễn đàn → Ba báo cáo đốm sáng ở Đà Nẵng**: chủ đề riêng có bài mở đầu, tóm tắt hiện tại, ba báo cáo dẫn chiếu và trả lời kèm sơ đồ đối chiếu.
2. Mở một báo cáo dẫn chiếu: xem dữ liệu có cấu trúc và luồng trả lời của chính báo cáo. Nút **Mở chủ đề có báo cáo này** điền sẵn liên kết trong biểu mẫu chủ đề mới.
3. **Tạo nội dung → Mở chủ đề thảo luận**: chọn mục đích, viết câu hỏi, chọn nhiều báo cáo, đính kèm tệp và đăng.
4. **Tạo nội dung → Báo cáo một hiện tượng**: chọn nhóm để thấy các trường khác nhau, chọn nguồn gián tiếp để thấy yêu cầu nguồn, nhập vị trí người quan sát và vị trí hiện tượng tùy chọn.
5. Trả lời, trích dẫn, đính kèm ảnh, đánh dấu hữu ích, lưu, theo dõi và sửa tóm tắt ở chủ đề của Minh Anh.
6. **Bản đồ**: lọc theo nhóm, mở cụm Đà Nẵng, chọn báo cáo và chuyển về luồng trao đổi. Báo cáo mới xuất hiện trên bản đồ mẫu; chủ đề thảo luận không xuất hiện.

## Phạm vi

- Đây là phương án giao diện để thảo luận, chưa phải nghiệp vụ đã chốt hay sản phẩm có backend.
- HTML/CSS/JavaScript thuần, giao diện thích ứng desktop/mobile. CSS nội bộ chạy không cần Tailwind hay CDN. Font Be Vietnam Pro là tùy chọn từ Google Fonts; không có mạng sẽ dùng font hệ thống.
- Tên người, quan sát, ảnh bằng CSS, sơ đồ và số liệu đều là minh họa, không phải bằng chứng thật.
- Bản đồ bằng SVG/CSS chỉ minh họa bố cục, không theo tỷ lệ địa lý, chưa định vị/geocode/pan/zoom. Báo cáo mới có marker minh họa; chưa có thuật toán gom cụm địa lý thật.
- Dữ liệu chữ lưu trong `localStorage` của trình duyệt, khóa `di-thuong-prototype-v1`. Nếu trình duyệt chặn lưu, thao tác vẫn chạy trong phiên. **Đặt lại dữ liệu** khôi phục ví dụ ban đầu.
- Tệp không tải lên server. Chỉ tên/loại tệp được lưu; ảnh có xem trước bằng object URL trong phiên hiện tại. Tải lại trang sẽ mất nội dung ảnh đã chọn.
- Tài khoản mẫu là Minh Anh. Theo dõi, báo vi phạm và lượt hữu ích là thao tác cục bộ, chưa có thông báo hay kiểm duyệt thật.
- Chưa có camera, GPS, metadata, làm mờ tọa độ, bảo vệ tệp gốc hoặc xác thực bằng chứng. Prototype chỉ nhận tên khu vực, không thu tọa độ chính xác.
- Tóm tắt do tác giả mẫu chỉnh sửa là **đề xuất giao diện**, chưa thể hiện quy trình xác nhận chuyên gia. Không có điểm tin cậy hoặc kết luận tự động.

## Tệp

- `index.html`: khung trang.
- `styles.css`: thiết kế, responsive, các hình minh họa.
- `app.js`: dữ liệu mẫu, điều hướng, biểu mẫu và tương tác.
