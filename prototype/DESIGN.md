# Hướng thiết kế: diễn đàn hồ sơ kỳ bí

## Rà soát và lựa chọn

Thiết kế trước dùng nền kem, xanh lá, thẻ bo 16px và banner ảnh riêng. Bố cục ba cột, phân loại, danh sách phân trang, báo cáo và chủ đề độc lập đã hoạt động. Đợt này thay ngôn ngữ thị giác theo ảnh tham khảo `image.png`, giữ điều hướng và các thao tác hiện có.

- Đối tượng: cộng đồng Việt Nam ghi nhận và trao đổi về các hiện tượng chưa rõ.
- Hướng: giao diện diễn đàn mang không khí game điều tra, cảnh nhiều lớp, nền navy, điểm nhấn cyan theo logo có sẵn.
- `DESIGN_VARIANCE: 4`: bố cục quen thuộc để đọc và tìm chủ đề.
- `MOTION_INTENSITY: 3`: phản hồi hover/focus/nhấn, không chuyển động liên tục khi đọc.
- `VISUAL_DENSITY: 6`: danh sách tương đối gọn, chữ nội dung vẫn có khoảng thở.
- HTML/CSS/JS thuần như prototype hiện tại. Đây là phong cách tùy chỉnh, không mô phỏng một thư viện thiết kế chính thức.

## Các lớp

1. `world-backdrop`: ảnh cảnh phủ viewport. Chuyển ảnh khi xem nhóm hoặc chủ đề tâm linh/kỳ bí.
2. `world-shade`: lớp tối để tách cảnh khỏi nội dung.
3. `world-haze`: ánh sáng/sương cyan bằng CSS.
4. `world-grain`: texture nhiễu nhẹ, cố định và không nhận pointer.
5. Giao diện: thẻ tối đủ đậm, viền mảnh, điểm nhấn cyan cho mục đang chọn và tiêu đề.
6. `world-foreground`: khung đá/cành/sương trong suốt, ở mép màn hình, không nhận pointer.

Thang z-index: cảnh 0, nội dung 1, tiền cảnh 2 trong cảnh, header 20, nút mobile 25, modal 40, toast 60, skip link 100.

`theme.css` chứa màu và vật liệu mới. `styles.css` tiếp tục giữ bố cục, responsive và cấu trúc thành phần. Giảm độ trong bằng `prefers-reduced-transparency`; tắt chuyển tiếp bằng `prefers-reduced-motion`. Trên mobile giảm độ nổi tiền cảnh và bỏ grain.

Các ảnh tạo không khí không được dùng như bằng chứng quan sát. Tóm tắt, ảnh báo cáo mẫu và sơ đồ vẫn mang nhãn minh họa.

## Cỡ chữ và bản đồ

`map.css` tăng cỡ chữ toàn ứng dụng: tiêu đề chủ đề 16px desktop/15px mobile, nội dung thảo luận 15px/14px, metadata 12px/11px, biểu mẫu mobile 16px. Các nút góc nhìn không ngắt dòng trên điện thoại.

Bản đồ là WebGL tương tác thật dùng MapLibre với ba góc nhìn: globe, địa hình nghiêng và 2D. Trang bản đồ dùng hai cột để tăng diện tích canvas. Các báo cáo có điểm khu vực được cluster theo zoom; không gộp dữ liệu báo cáo. Địa lý tổng quan được lưu local, đường phố và DEM tải online. Xem `assets/maps/SOURCES.md`.
