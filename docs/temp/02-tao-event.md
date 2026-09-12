# Event

## 1. Ý tưởng ban đầu và lý do thay đổi

### Ý tưởng ban đầu

Ban đầu, Event chỉ được tạo khi có **ít nhất 2 Report được xác định là cùng một hiện tượng**.

Dự kiến luồng:

```text
Report A + Report B
        ↓
Hai người dùng xác nhận
        ↓
Tạo Event
```

### Vấn đề

Cách này phát sinh nhiều vấn đề:

- Nếu chỉ có một người quan sát thì Report đó **không bao giờ có Event**.
- Khi có 3, 4 hoặc nhiều Report, việc yêu cầu các bên xác nhận lẫn nhau trở nên phức tạp.
- Khó xác định cần bao nhiêu người đồng ý để thêm Report vào Event.
- Khi Event được tạo từ nhiều Report, khó quyết định lấy **title, thời gian và địa điểm của Report nào**.
- Làm nghiệp vụ tạo Event phụ thuộc quá nhiều vào quá trình xác nhận giữa người dùng.

### Hướng thay đổi

Mỗi Report khi được tạo sẽ có một Event tương ứng ngay từ đầu.

```text
Create Report A
      ↓
Create Event A
      ↓
Event A
└── Report A
```

Sau này nếu phát hiện các Report thuộc cùng một hiện tượng thì mới xử lý việc liên kết chúng.

---

## 2. Cách hình thành Event

Mỗi Report mới sẽ tạo một Event.

Event ban đầu:

```text
Event X
└── Report A
```

Như vậy:

- Một người duy nhất quan sát vẫn có Event.
- Event có thể xuất hiện ngay trên bản đồ.
- Không cần chờ một Report thứ hai.

---

## 3. Liên kết Report với Event

Khi một Report mới hoặc Event mới có khả năng mô tả cùng hiện tượng với một Event đã tồn tại, hệ thống có thể đề xuất liên kết.

Ví dụ:

```text
Event X
└── Report A

Event Y
└── Report B
```

Hệ thống phát hiện A và B có:

- Category giống hoặc tương thích.
- Thời gian quan sát gần nhau.
- Vị trí quan sát phù hợp.
- Một số đặc điểm quan sát tương đồng.

Hệ thống tạo:

```text
Link Suggestion

Report B → Event X
```

### Ai có thể tạo đề xuất?

Có hai nguồn:

**Hệ thống**

Tự động phát hiện các Event/Report có khả năng liên quan và tạo suggestion.

**Người dùng**

Người dùng khi xem một Event có thể chọn:

```text
"Báo cáo của tôi có thể thuộc sự kiện này"
```

để gửi yêu cầu liên kết.

### Ai quyết định liên kết?

Không cần Moderator xác nhận mọi liên kết.

Luồng đề xuất:

```text
System tìm các Event có khả năng liên quan
        ↓
Gợi ý cho người tạo Report
        ↓
User quyết định liên kết Report của mình vào Event
```

Hệ thống có thể dựa trên:

```text
Category
+ thời gian
+ khoảng cách
+ đặc điểm quan sát
```

để lọc các Event phù hợp.

Moderator chỉ cần can thiệp khi:

- Có tranh chấp về liên kết.
- Có người báo cáo liên kết sai.
- Cần gỡ hoặc điều chỉnh liên kết.

Nguyên tắc chung:

```text
System gợi ý → User quyết định → Moderator xử lý tranh chấp
```

### Khi liên kết được chấp nhận

Ví dụ ban đầu:

```text
Event X
└── Report A

Event Y
└── Report B
```

Sau khi xác định Report B thuộc Event X:

```text
Event X
├── Report A
└── Report B
```

Event Y lúc này không còn Report nên được chuyển sang trạng thái không hoạt động hoặc lưu lại để phục vụ lịch sử.

Như vậy việc liên kết không cần yêu cầu A và B phải xác nhận lẫn nhau.

---

## 4. Category

Mỗi Report phải chọn một **Category**.

Category:

- Được Admin tạo và quản lý.
- Người dùng chỉ được chọn từ danh sách có sẵn.
- Đại diện cho loại hiện tượng.

Ví dụ:

```text
Vật thể bay không xác định
Ánh sáng bất thường
Hiện tượng khí quyển
```

Category cũng được sử dụng để chuẩn hóa Event.

---

## 5. Tên Event

Không lấy trực tiếp `title` của Report và không phụ thuộc vào AI.

Tên Event được sinh tự động:

```text
[Category] — [Địa điểm] — [Thời gian]
```

Ví dụ:

```text
Vật thể bay không xác định — Đà Nẵng, Việt Nam — 21:05–21:12
```

`Report.title` vẫn là tiêu đề tự do do người dùng nhập.

---

## 6. Thời gian Event

Event lưu khoảng thời gian:

```text
occurred_from
occurred_to
```

Nếu chỉ có một Report:

```text
occurred_from = occurred_to = observed_at
```

Nếu có nhiều Report:

```text
A: 21:05
B: 21:08
C: 21:12

Event:
21:05 → 21:12
```

Thông tin Event được tính lại khi Report được thêm hoặc gỡ.

---

## 7. Địa điểm Event

Mỗi Report vẫn lưu tọa độ quan sát riêng.

Event lưu:

```text
country
admin_level_1
representative_lat
representative_lng
```

Địa danh hiển thị ưu tiên:

```text
Country + đơn vị hành chính cấp ngay dưới Country
```

Ví dụ:

```text
Việt Nam — Đà Nẵng
Japan — Tokyo
United States — California
```

---

## 8. Tọa độ Event

Nếu Event chỉ có một Report:

```text
Event location = Report location
```

Nếu Event có nhiều Report, hệ thống tính một vị trí đại diện:

```text
Report A ─┐
Report B ─┼─> Representative Location
Report C ─┘
```

`representative_lat/lng` chỉ dùng để đại diện cho Event trên bản đồ.

Tọa độ quan sát chính xác vẫn được giữ trong từng Report.

---

## 9. Hiển thị trên Map

Map mặc định hiển thị **Event** thay vì từng Report.

```text
Event X ●
├── Report A
├── Report B
└── Report C
```

Mỗi Event chỉ có một marker đại diện.

Điều này giúp bản đồ sạch và hạn chế nhiều marker cùng biểu diễn một hiện tượng.

---

## 10. Dữ liệu Event

```text
Event
- id
- category_id
- title
- country
- admin_level_1
- representative_lat
- representative_lng
- occurred_from
- occurred_to
- status
- created_at
- updated_at
```

Các thông tin tổng hợp như `title`, thời gian và vị trí có thể được tính lại khi thành phần Report của Event thay đổi.

Có một điểm đáng chú ý trong thiết kế mới: **Report nào cũng sinh Event**, nên việc “link Report B vào Event A” thực chất sẽ làm Event ban đầu của B trở nên rỗng. Phần lifecycle của Event rỗng này nên chốt riêng sau.
