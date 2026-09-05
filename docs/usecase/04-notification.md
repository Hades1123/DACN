## Notification

Hệ thống vẫn có một khu vực Notification riêng, ví dụ biểu tượng chuông:

```text
🔔 3
```

Tuy nhiên không phải mọi thay đổi của Event đều tạo notification.

### 1. Thông báo liên quan trực tiếp đến Report của người dùng

Gửi notification khi có thay đổi ảnh hưởng trực tiếp đến Report của user, ví dụ:

- Report được liên kết vào một Event.
- Report bị gỡ khỏi Event.
- Có đề xuất liên kết liên quan đến Report.

- Report bị ẩn, từ chối hoặc yêu cầu chỉnh sửa
- .....

### 2. Thông báo lớn đối với Event đang Follow

Chỉ gửi notification khi Event có thay đổi quan trọng, ví dụ:

- Event thay đổi trạng thái.

- Event bị merge với Event khác.

### 3. Các cập nhật nhỏ

Những thay đổi thường xuyên như:

```text
+1 Report mới
+2 Evidence mới
Event vừa được cập nhật
```

không cần tạo notification riêng.

Thay vào đó, chúng được hiển thị trực tiếp trên Event Card trong Home Feed:

```text
+2 báo cáo mới
Cập nhật 20 phút trước
```

### Nguyên tắc

> **Feed dùng để thể hiện các cập nhật thường xuyên. Notification chỉ dành cho thay đổi liên quan trực tiếp đến người dùng hoặc thay đổi lớn của Event mà họ đang theo dõi.**
