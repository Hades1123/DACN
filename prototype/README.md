# Prototype diễn đàn Dị thường

Mở `landing.html` để xem trang giới thiệu, hoặc `index.html` để đi thẳng vào diễn đàn và địa cầu tổng quan. Không cần build hoặc cài thư viện. **Để thử đầy đủ bản đồ đường phố và địa hình, nên chạy qua HTTP:**

```bash
python3 -m http.server 8000 --directory prototype
```

Sau đó mở `http://localhost:8000/landing.html`.

Đường phố chỉ được yêu cầu khi chạy qua HTTP/HTTPS, để trình duyệt gửi Referer đúng với yêu cầu của nguồn tile. Không có tải tile hàng loạt hoặc tính năng tải đường phố để dùng ngoại tuyến.

## Luồng nên xem

1. **Diễn đàn → Ba báo cáo đốm sáng ở Đà Nẵng**: chủ đề riêng có bài mở đầu, tóm tắt hiện tại, ba báo cáo dẫn chiếu và trả lời kèm sơ đồ đối chiếu.
2. Mở một báo cáo dẫn chiếu: xem dữ liệu có cấu trúc và luồng trả lời của chính báo cáo. Nút **Mở chủ đề có báo cáo này** điền sẵn liên kết trong biểu mẫu chủ đề mới.
3. **Tạo nội dung → Mở chủ đề thảo luận**: chọn mục đích, viết câu hỏi, chọn nhiều báo cáo, đính kèm tệp và đăng.
4. **Tạo nội dung → Báo cáo một hiện tượng**: chọn nhóm để thấy các trường khác nhau, chọn nguồn gián tiếp để thấy yêu cầu nguồn, nhập vị trí người quan sát và vị trí hiện tượng tùy chọn.
5. Trả lời, trích dẫn, đính kèm ảnh, đánh dấu hữu ích, lưu, theo dõi và sửa tóm tắt ở chủ đề của Minh Anh.
6. **Bản đồ**: xoay/zoom địa cầu, chuyển Trái Đất 3D / Địa hình 3D / 2D, mở cụm để xem các báo cáo độc lập, định vị báo cáo và mở luồng trao đổi. Báo cáo mới có marker khi chọn **Điểm khu vực trên bản đồ** trong form; chưa chọn điểm vẫn xem được trong danh sách. Chủ đề thảo luận không có marker.

## Phạm vi

- Đây là phương án giao diện để thảo luận, chưa phải nghiệp vụ đã chốt hay sản phẩm có backend.
- HTML/CSS/JavaScript thuần, giao diện thích ứng desktop/mobile. CSS nội bộ chạy không cần Tailwind hay CDN. Font Be Vietnam Pro là tùy chọn từ Google Fonts; không có mạng sẽ dùng font hệ thống.
- Tên người, quan sát, ảnh bằng CSS, sơ đồ và số liệu đều là minh họa, không phải bằng chứng thật.
- Bản đồ WebGL bằng MapLibre GL JS 5.6.2, có dữ liệu địa lý Natural Earth lưu local, pan/zoom/xoay, globe projection và cluster theo mức zoom. Các tọa độ báo cáo là điểm đại diện khu vực minh họa, chưa lấy GPS thật. Xem [nguồn dữ liệu](assets/maps/SOURCES.md).
- Địa cầu và lớp địa lý tổng quan chạy không cần dịch vụ bên ngoài sau khi tải các tệp local; WebGL phải được trình duyệt hỗ trợ. Đường phố OpenStreetMap và độ cao Mapterhorn cần mạng. Chế độ địa hình phóng đại độ cao 1,25×, có thông báo khi không tải được dữ liệu. Khi WebGL không khả dụng, danh sách báo cáo vẫn đọc được.
- Dữ liệu chữ lưu trong `localStorage` của trình duyệt, khóa `di-thuong-prototype-v1`. Nếu trình duyệt chặn lưu, thao tác vẫn chạy trong phiên. **Đặt lại dữ liệu** khôi phục ví dụ ban đầu.
- Tệp không tải lên server. Chỉ tên/loại tệp được lưu; ảnh có xem trước bằng object URL trong phiên hiện tại. Tải lại trang sẽ mất nội dung ảnh đã chọn.
- Tài khoản mẫu là Minh Anh. Theo dõi, báo vi phạm và lượt hữu ích là thao tác cục bộ, chưa có thông báo hay kiểm duyệt thật.
- Chưa có camera, GPS, metadata, làm mờ tọa độ, bảo vệ tệp gốc hoặc xác thực bằng chứng. Prototype chỉ nhận tên khu vực, không thu tọa độ chính xác.
- Tóm tắt do tác giả mẫu chỉnh sửa là **đề xuất giao diện**, chưa thể hiện quy trình xác nhận chuyên gia. Không có điểm tin cậy hoặc kết luận tự động.

## Tệp

- `index.html`: khung trang.
- `landing.html`, `landing.css`, `landing.js`: trang giới thiệu sản phẩm, giao diện responsive và menu mobile.
- `styles.css`: thiết kế, responsive, các hình minh họa.
- `theme.css`: phong cách navy/cyan, vật liệu tối, các lớp cảnh và giao diện.
- `DESIGN.md`: hướng thiết kế và cách tổ chức các lớp.
- `app.js`: dữ liệu mẫu, điều hướng, biểu mẫu và tương tác.
- `map.js`: khởi tạo/hủy WebGL map, camera 3D/2D, marker, cluster, popup và lớp tile online.
- `map.css`: cỡ chữ lớn hơn cho toàn bộ prototype và giao diện bản đồ.
- `vendor/maplibre`: bản thư viện cố định và giấy phép.
- `assets/maps/world-land.js`: dữ liệu địa lý local; dùng JavaScript để mở HTML trực tiếp cũng nạp được.
- `assets/logo.png`: logo ở thanh đầu trang và favicon.
- `assets/logo-ui.webp`: bản logo nhỏ cho giao diện landing page; giữ nguyên thiết kế logo gốc.
- `assets/bg-1.png`: banner diễn đàn và nhóm bầu trời / không trung.
- `assets/bg-2.png`: banner nhóm tâm linh / kỳ bí. Hai ảnh nền dùng để trang trí, không gắn vào báo cáo như bằng chứng.
- `assets/bg-natural.png`: banner nhóm tự nhiên / môi trường.
- `assets/bg-other.png`: banner nhóm khác / chưa xác định.
- `assets/map-preview.png`: ảnh chụp giao diện địa cầu của chính prototype dùng trên trang giới thiệu.
- Các bản `.webp` dùng khi hiển thị để giảm dung lượng tải; ảnh `.png` gốc vẫn được giữ lại.
- `assets/foreground-frame.png`: tiền cảnh trong suốt, đá/cành khô và sương cyan ở mép dưới. Tạo bằng công cụ imagegen, chỉ dùng trang trí.

## Giao diện nhiều lớp

Cảnh nền, lớp tối, ánh sáng/sương, texture và tiền cảnh được ghép riêng bằng CSS. Cảnh toàn màn hình và banner chuyển theo nhóm: bầu trời, tâm linh/kỳ bí, tự nhiên/môi trường và khác/chưa xác định. Các lớp trang trí không nhận chuột và không chặn nút; trên mobile giảm độ nổi của tiền cảnh, bỏ texture nhiễu. Landing page, diễn đàn, biểu mẫu và bản đồ dùng chung phong cách tối.
