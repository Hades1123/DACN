## Cách hiển thị Report và Event

Report không nên được xem là đơn vị chính của trang Home giống bài đăng Facebook.

Thay vào đó, giao diện nên ưu tiên hiển thị theo **Event**, còn các Report nằm bên trong Event.

```text
Home / Map
    ↓
Event Card
    ↓
Event Detail
    ↓
Danh sách Report thuộc Event
```

### Event Card

Mỗi Event Card có thể hiển thị ngắn gọn:

```text
[Category]
Đà Nẵng, Việt Nam · 21:05–21:12

3 báo cáo liên quan
Độ tin cậy: Trung bình
+2 báo cáo mới

[Theo dõi] [Xem chi tiết]
```

### Thứ tự ưu tiên trên Home

Các Event có thể được ưu tiên theo thứ tự:

1. Event người dùng đang theo dõi và vừa có cập nhật.
2. Event mới hoặc đang diễn ra gần vị trí người dùng.
3. Event thuộc Category người dùng thường quan tâm.
4. Event đang có nhiều Report mới hoặc có mức độ hoạt động cao.
5. Các Event mới nhất.

Việc follow Event chủ yếu dùng để **cá nhân hóa feed**, không nhất thiết tạo notification cho mọi thay đổi.

Ví dụ:

```text
Event đang follow
+2 báo cáo mới
Cập nhật 10 phút trước
```

Event này có thể được đẩy lên cao hơn trên Home.

### Report bên trong Event

Khi người dùng mở Event, hệ thống mới hiển thị các Report liên quan.

```text
Report A
"Tôi thấy một đốm sáng di chuyển rất nhanh..."
Thời gian: ...
Vị trí quan sát: ...

Report B
"Vật thể xuất hiện về phía biển..."
Thời gian: ...
Vị trí quan sát: ...
```

Mỗi Report vẫn có trang chi tiết riêng để xem nội dung, thời gian, vị trí, evidence và các thông tin quan sát có cấu trúc.

### Nguyên tắc

> **Event là đơn vị chính để khám phá và theo dõi; Report là dữ liệu quan sát chi tiết bên trong Event.**

Cách này giúp Home, Map và tính năng Follow Event thống nhất với nhau, đồng thời tránh giao diện bị ngập bởi nhiều Report cùng mô tả một hiện tượng.
