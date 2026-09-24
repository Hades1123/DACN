> **Mỗi Report đồng thời mở ra một thread thảo luận. Report là nội dung có cấu trúc ở đầu thread; các bài trả lời nằm phía dưới theo kiểu diễn đàn.**

Như vậy không cần duy trì ba nơi riêng biệt là Report, comment trên feed và topic diễn đàn.

## 1. Những điểm nên học từ VOZ

VOZ tổ chức nội dung theo cấu trúc:

```text
Nhóm chuyên mục
└── Chuyên mục
    └── Thread
        └── Các bài trả lời
```

Trang chủ hiển thị:

- Danh sách chuyên mục;
- Số lượng chủ đề và bài viết;
- Chủ đề hoạt động gần nhất;
- Khu vực bài viết mới;
- Thread được ghim;
- Prefix như `thảo luận`, `thắc mắc`, `chú ý`.

Trong thread:

- Bài đầu tiên mở chủ đề;
- Các phản hồi hiển thị theo thời gian;
- Mỗi phản hồi có số thứ tự;
- Có trích dẫn, reaction, đính kèm;
- Phân trang thay vì infinite scroll;
- Thread có thể bị khóa. [Trang chủ VOZ](https://voz.vn/), [ví dụ một thread VOZ](https://voz.vn/t/sao-khoa-thread-report-f17-roi.1034799/)

---

# 2. Áp dụng vào dự án

## Report trở thành một loại thread đặc biệt

Khi người dùng tạo Report bằng biểu mẫu có cấu trúc, hệ thống tạo:

```text
Report
├── Thông tin quan sát
├── Vị trí và thời gian
├── Đặc điểm hiện tượng
├── Media và metadata
└── DiscussionThread
    ├── Bài trả lời #1
    ├── Bài trả lời #2
    └── ...
```

Phần đầu thread không phải một bài viết tự do. Nó được render từ dữ liệu `Report`.

Ví dụ:

```text
[ĐỐM SÁNG] Quan sát vật thể phát sáng tại Đà Nẵng

Trạng thái: Đang thảo luận
Thời gian quan sát: 21:05, 20/09/2026
Vị trí người quan sát: Quận Sơn Trà, Đà Nẵng
Hướng nhìn: Đông Bắc
Thời lượng: Khoảng 40 giây
Chuyển động: Di chuyển thẳng, sau đó đổi hướng
Media: 1 video ghi trực tiếp bằng ứng dụng

[Mở bản đồ] [Xem metadata] [Theo dõi thread]
```

Bên dưới là các bài trả lời giống VOZ:

```text
#1 Người dùng A:
Tôi thấy hiện tượng này khá giống máy bay khi nhìn từ xa.

#2 Người dùng B:
Tôi kiểm tra dữ liệu chuyến bay tại thời điểm đó...
[Đính kèm ảnh]

#3 Người báo cáo:
Lúc đó vật thể di chuyển theo hướng này...
```

---

# 3. Không cần comment riêng

Trong mô hình mới:

- Không có comment trên feed;
- Không có feed Report;
- Các phản hồi trong thread chính là nơi trao đổi;
- Phản hồi có thể chứa chữ, ảnh, video, tệp và đường dẫn;
- Có thể quote người khác;
- Có thể phân trang khi thread dài.

Điều này loại bỏ tình trạng:

- Comment ngắn nằm ở Report;
- Phân tích dài nằm ở diễn đàn;
- Cùng một cuộc thảo luận bị chia thành hai nơi.

Người dùng muốn nói vui, hỏi nhanh hay phân tích nghiêm túc đều trả lời trong thread. Các nội dung không phù hợp được xử lý bằng nội quy và kiểm duyệt.

---

# 4. Các loại thread

Hệ thống có hai loại thread chính.

## Report thread

Được tạo từ biểu mẫu báo cáo quan sát.

```text
thread_type = REPORT
report_id = ...
```

Bài đầu được tạo từ `Report`. Người dùng không thể biến nó thành một bài viết tự do.

## Discussion thread

Được tạo trực tiếp trong diễn đàn.

```text
thread_type = DISCUSSION
```

Dùng cho:

- Hỏi đáp về hiện tượng bầu trời;
- Phân biệt Starlink, máy bay và thiên thạch;
- Kỹ thuật quay vật thể ban đêm;
- Phân tích ảnh và video;
- So sánh nhiều Report;
- Thảo luận về phương pháp thu thập dữ liệu.

Discussion thread có thể liên kết với nhiều Report:

```text
DiscussionThread
└── linked_reports[]
```

Ví dụ:

> “Ba Report về đốm sáng ở Đà Nẵng tối 20/09 có liên quan hay không?”

Việc liên kết không khẳng định ba Report thuộc cùng một Event.

---

# 5. Cấu trúc chuyên mục đề xuất

```text
DIỄN ĐÀN

1. BÁO CÁO QUAN SÁT
   ├── Báo cáo mới
   ├── Đang được thảo luận
   ├── Có dữ liệu hình ảnh/video
   └── Thiếu dữ liệu cần bổ sung

2. PHÂN TÍCH VÀ ĐỐI CHIẾU
   ├── Phân tích hình ảnh và video
   ├── Máy bay, drone và vệ tinh
   ├── Thiên văn và khí tượng
   └── So sánh nhiều báo cáo

3. KIẾN THỨC VÀ KỸ THUẬT
   ├── Nhận dạng hiện tượng bầu trời
   ├── Kỹ thuật quan sát
   ├── Camera và cảm biến
   └── Xử lý dữ liệu

4. CỘNG ĐỒNG
   ├── Thảo luận chung
   ├── Hướng dẫn sử dụng
   └── Góp ý và thông báo
```

Tuy nhiên, “Báo cáo mới”, “Đang được thảo luận” và “Có video” nên là **bộ lọc hoặc mục ảo**, không phải các chuyên mục lưu Report riêng biệt. VOZ cũng có khái niệm mục ảo tổng hợp thread từ các nơi khác dựa trên prefix. [Giải thích mục ảo trên VOZ](https://voz.vn/t/cac-muc-cu-con-thieu-tai-thenextvoz.9838/)

Một Report chỉ tồn tại ở một nơi nhưng có thể xuất hiện trong nhiều danh sách lọc.

---

# 6. Trang chủ mới

Trang chủ không còn là dòng nội dung cuộn vô hạn. Nó có dạng bảng diễn đàn:

```text
BÁO CÁO QUAN SÁT
2.140 báo cáo · 18.620 phản hồi

Hoạt động gần nhất:
[Đốm sáng] Vật thể phát sáng tại Đà Nẵng
12 phản hồi · cập nhật 5 phút trước
```

Bên dưới có các khối:

- Report mới nhất;
- Thread vừa có phản hồi;
- Thread đang được theo dõi nhiều;
- Report gần vị trí người dùng;
- Chủ đề được ghim;
- Thông báo từ quản trị viên.

Các danh sách sử dụng:

- Phân trang;
- “Xem thêm” chuyển sang trang danh sách;
- Sắp xếp theo phản hồi mới nhất;
- Bộ lọc rõ ràng.

Không tải vô hạn.

---

# 7. Điều hướng mobile

```text
Diễn đàn | Mới nhất | Tạo báo cáo | Bản đồ | Cá nhân
```

## Diễn đàn

Danh sách chuyên mục giống trang chủ VOZ.

## Mới nhất

Danh sách có phân trang:

- Report mới;
- Thread mới;
- Thread vừa được trả lời;
- Nội dung từ các chuyên mục đang theo dõi.

## Tạo báo cáo

Mở camera và biểu mẫu quan sát có cấu trúc.

## Bản đồ

Hiển thị Report theo vị trí.

## Cá nhân

- Thread đang theo dõi;
- Report đã gửi;
- Bài trả lời;
- Thông báo;
- Bookmark.

---

# 8. Làm sao để thread đi đến kết quả?

VOZ giải quyết tốt hoạt động trao đổi, nhưng không tự tổng hợp kết luận. Dự án cần bổ sung một phần phía trên thread:

## Tóm tắt đánh giá hiện tại

```text
Trạng thái: Có lời giải thích khả dĩ

Giả thuyết hiện tại:
Có khả năng là chuyến bay VJ-xxx đi qua khu vực vào 21:04.

Dữ liệu hỗ trợ:
- Thời gian và hướng di chuyển tương đồng;
- Dữ liệu chuyến bay được đính kèm ở phản hồi #18;
- Hình dạng ánh sáng phù hợp.

Giới hạn:
Video không đủ rõ để xác nhận hoàn toàn.

Cập nhật bởi Moderator A lúc ...
[Xem lịch sử thay đổi]
```

Phần này do Moderator hoặc Reviewer cập nhật từ nội dung thread. Nó không được tạo tự động bằng số reaction.

Các trạng thái có thể là:

```text
NEW
UNDER_DISCUSSION
POSSIBLE_EXPLANATION
INSUFFICIENT_DATA
UNRESOLVED
CLOSED
```

---

# 9. Reaction

Có thể học VOZ ở việc reaction nằm trên từng bài trả lời. Tuy nhiên, reaction chỉ thể hiện phản ứng xã hội.

Có thể dùng:

- Hữu ích;
- Đồng ý;
- Cảm ơn;
- Cần thêm nguồn.

Không dùng tổng reaction để xác định Report thật hay giả.

# Phương án chốt lại

1. **Bỏ feed infinite scroll.**
2. Trang chủ chuyển thành **forum index giống VOZ**.
3. `Report` vẫn là dữ liệu trung tâm.
4. Mỗi Report có một thread thảo luận tương ứng.
5. Bài đầu thread được render từ dữ liệu Report.
6. Các bài trả lời thay thế hoàn toàn comment.
7. Discussion thread thông thường phục vụ chủ đề kiến thức hoặc phân tích nhiều Report.
8. Danh sách Report/thread dùng phân trang và được sắp xếp theo hoạt động mới nhất.
9. Bản đồ vẫn là một cách khám phá Report độc lập.
10. Thêm khu vực “Tóm tắt đánh giá hiện tại” để cuộc thảo luận có đầu ra.

Mô hình này sát với VOZ hơn, gọn hơn và phù hợp với dự án: **một diễn đàn chuyên biệt trong đó Report là một loại thread có dữ liệu quan sát được chuẩn hóa.**
