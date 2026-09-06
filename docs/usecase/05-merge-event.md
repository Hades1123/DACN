# Quyền đối với Event

## Nguyên tắc chung

> **Report thuộc về người dùng; Event thuộc về hệ thống.**

Event là một thực thể cấp hệ thống, được tổng hợp từ một hoặc nhiều Report và không thuộc quyền sở hữu của bất kỳ User nào.

## Quyền của User đối với Event

User có thể:

- Xem Event.
- Follow / Unfollow Event.
- Xem các Report thuộc Event.
- Thao tác với Report của chính mình theo quyền được phép.

User không thể:

- Sửa trực tiếp thông tin của Event.
- Thay đổi title, thời gian, địa điểm hoặc trạng thái của Event.
- Xóa Event.
- Tự merge hai Event.
- Tự unmerge Event.

Các thông tin tổng hợp của Event được hệ thống tính toán và cập nhật dựa trên các Report liên quan.

## Quyền merge Event

Việc merge hai Event là thao tác ảnh hưởng đến cấu trúc dữ liệu của hệ thống, các Report liên quan và những người đang follow Event.

Do đó:

- User không có quyền trực tiếp merge Event.
- Moderator là actor quyết định và thực hiện merge Event.
- Admin có thể can thiệp trong các trường hợp quản trị đặc biệt.

## Event sau khi merge

Event bị merge không bị xóa hoàn toàn mà được giữ lại để phục vụ lịch sử.

Ví dụ:

```text
Event B
status = MERGED
merged_into_event_id = Event A
```

Event A trở thành Event chính (`canonical event`).

Người dùng truy cập Event B sẽ được chuyển hướng sang Event A.

Các follower của Event B được chuyển sang Event A và loại bỏ follower bị trùng.

## Phân chia trách nhiệm

```text
User        → quản lý Report của mình, Follow Event
System      → quản lý dữ liệu tổng hợp của Event
Moderator   → xử lý merge và thay đổi cấu trúc Event
Admin       → quản trị hệ thống và can thiệp khi cần
```
