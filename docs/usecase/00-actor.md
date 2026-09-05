## Các Actor trong hệ thống

Hệ thống gồm 4 actor chính:

### 1. Guest / Viewer

Người dùng chưa đăng nhập.

Có thể:

- Xem bản đồ.
- Xem Event công khai.
- Xem Report công khai.
- Tìm kiếm và duyệt nội dung.

### 2. User

Người dùng đã đăng ký.

Có thể:

- Tạo Report.
- Theo dõi Event.
- Xem và quản lý Report của mình.
- Đề xuất hoặc thực hiện liên kết Report của mình với Event phù hợp.
- Nhận Notification liên quan đến Report và Event đang theo dõi.

### 3. Moderator

Phụ trách xử lý nội dung và các vấn đề nghiệp vụ.

Có thể:

- Kiểm duyệt Report.
- Xử lý Report bị báo cáo.
- Xử lý tranh chấp liên kết.
- Gỡ các liên kết sai.
- Xử lý việc merge Event.
- Can thiệp vào các trường hợp bất thường liên quan đến Event và Report.

### 4. Admin

Phụ trách quản trị hệ thống.

Có thể:

- Quản lý tài khoản người dùng.
- Quản lý Category.
- Quản lý phân quyền.
- Quản lý cấu hình hệ thống.
- Thực hiện toàn bộ quyền của Moderator khi cần.

### Nguyên tắc phân quyền

```text
Guest < User < Moderator < Admin
```

Trong đó:

> **Moderator xử lý nội dung và nghiệp vụ. Admin quản trị hệ thống và có thể kế thừa quyền của Moderator.**
