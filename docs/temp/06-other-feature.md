# Các vấn đề Event và Report cần xem xét tiếp

## Ưu tiên cao

### 1. Report sau khi đã thuộc Event

Cần làm rõ:

- User có được tự gỡ Report của mình khỏi Event không?
- Nếu User sửa Report khiến thời gian, vị trí hoặc Category không còn phù hợp với Event thì xử lý thế nào?
- Nếu Report bị xóa thì Event bị ảnh hưởng ra sao?
- Khi Report được thêm hoặc gỡ, Event có tự tính lại title, thời gian và vị trí hay không?

Đây là nhóm vấn đề nên chốt sớm vì ảnh hưởng trực tiếp đến quan hệ giữa Report và Event.

---

### 2. Event lifecycle

Cần xác định các trạng thái cơ bản của Event, ví dụ:

```text
ACTIVE
MERGED
INVALID / ARCHIVED
```

Không nhất thiết phải thiết kế quá nhiều trạng thái ngay từ đầu.

Mục tiêu chính là xác định Event sẽ ra sao khi:

- Không còn Report hợp lệ.
- Bị merge vào Event khác.
- Bị xác định là không hợp lệ.

---

## Có thể xem xét sau

### 3. Split Event

Trường hợp Moderator phát hiện một Event thực chất chứa nhiều hiện tượng khác nhau và cần tách các Report ra.

Đây là nghiệp vụ hợp lý nhưng chưa nhất thiết phải nằm trong phiên bản cốt lõi.

### 4. Privacy vị trí

Xem xét việc:

- Có hiển thị tọa độ chính xác của Report hay không.
- Có cần làm mờ hoặc giảm độ chính xác vị trí đối với người xem công khai hay không.

### 5. Category mismatch

Xử lý trường hợp Report muốn liên kết vào Event nhưng Category không giống nhau.

### 6. Duplicate Event Detection

Cần xác định sau cách hệ thống gợi ý hai Event có khả năng trùng nhau dựa trên:

```text
Category
+ thời gian
+ vị trí
+ đặc điểm quan sát
```

Chưa cần chốt thuật toán cụ thể ở giai đoạn use case.

### 7. Credibility và Evidence

Cần xem xét riêng:

- Evidence thuộc Report hay Event.
- Điểm tin cậy của Report.
- Điểm tin cậy tổng hợp của Event.
- Khi Report được thêm/gỡ thì điểm Event thay đổi thế nào.

Đây là phần quan trọng nhưng nên tách thành nhóm nghiệp vụ riêng thay vì trộn vào phần Event cơ bản.

---

## Ưu tiên cho buổi họp use case cốt lõi

Hiện tại chỉ cần tập trung vào:

```text
Create Report
→ Create Event
→ Link Report to Event
→ Follow Event
→ Merge Event
→ Quản lý Report đã liên kết
```

Các vấn đề nâng cao như Split Event, thuật toán phát hiện trùng, privacy và cách tính credibility có thể tiếp tục phân tích sau.
