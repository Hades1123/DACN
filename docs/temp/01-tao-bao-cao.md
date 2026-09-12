# Use Case: Tạo báo cáo

## Actor

- Registered User đã xác thực tài khoản.
- Guest User không được phép tạo báo cáo.

## Mô tả

Cho phép người dùng đã đăng ký tạo báo cáo về một hiện tượng đã quan sát được.

## Nội dung báo cáo

| Nhóm       | Trường              | Bắt buộc | Ghi chú                                         |
| ---------- | ------------------- | -------- | ----------------------------------------------- |
| Nội dung   | Tiêu đề             | ✅       | Khoảng 10–150 ký tự                             |
|            | Mô tả               | ✅       | Khoảng 50–2000 ký tự                            |
| Quan trắc  | Thời điểm bắt đầu   | ✅       | Thời điểm bắt đầu quan sát                      |
|            | Duration            | ⚪       | Có thể không xác định chính xác                 |
|            | Số người quan sát   | ✅       | Mặc định là 1                                   |
| Vị trí     | Tọa độ lat/lng      | ✅       | Có thể chọn trên map hoặc lấy từ GPS            |
|            | Địa điểm mô tả      | ⚪       | Ví dụ: “gần cầu Rồng, Đà Nẵng”                  |
| Hiện tượng | Hướng quan sát      | ⚪       | Hướng người dùng nhìn thấy hiện tượng           |
|            | Hướng di chuyển     | ⚪       | Nếu hiện tượng có chuyển động                   |
|            | Đặc điểm hiện tượng | ⚪       | Có thể structured một phần như shape, color,... |
| Bằng chứng | Ảnh                 | ⚪       | Có thể có metadata                              |
|            | Video               | ⚪       | Có thể có metadata                              |
|            | Ghi âm              | ⚪       | Có thể có metadata                              |

## Ghi chú thiết kế ban đầu

- Thời gian và vị trí nên có thêm thông tin về **độ chính xác / mức độ ước lượng**. (VD: ước lượng, chưa rõ, chính xác,...)
- Ảnh, video, ghi âm có thể được mô hình thành entity `Evidence` riêng.
- File evidence nên được lưu ở external/object storage như S3, Cloudinary,...; database lưu thông tin tham chiếu (public id, key,...).
- Metadata ảnh có thể quan tâm đến:
  - `DateTimeOriginal` (có thể không đáng tin cậy do có thể bị chỉnh sửa bởi tool)
  - GPS nếu có (chưa xác thực đc gps có không, hình như phải cho phép truy cập vị trí gì đó,...)
  - camera/device information
- Metadata chỉ mang tính hỗ trợ, không được xem là hoàn toàn đáng tin cậy.
