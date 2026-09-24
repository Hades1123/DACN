# Kế hoạch viết tài liệu use case cốt lõi

## Tóm tắt

Tạo file `docs/Ke-hoach-use-case-cot-loi.md`, tổng hợp các quyết định đã chốt và ý tưởng phù hợp từ tài liệu hiện có. Tài liệu định vị sản phẩm là **nền tảng cộng đồng tại Việt Nam để báo cáo có cấu trúc và thảo luận về các hiện tượng được người dùng cho là bất thường**, gồm hiện tượng bầu trời/UFO/UAP, tâm linh kỳ bí, tự nhiên và nhóm chưa xác định.

Tài liệu tập trung đặc tả:

1. `UC-REPORT-01 – Đăng báo cáo hiện tượng`;
2. `UC-MAP-01 – Khám phá báo cáo trên bản đồ`.

## Nội dung và quyết định chính

### 1. Phạm vi và mô hình chung

- Dùng thuật ngữ `Report – Báo cáo`, tránh đồng nhất với bài viết tự do.
- Bỏ hoàn toàn `Event`, merge/unmerge và cơ chế tự tạo Event.
- Mỗi Report tồn tại độc lập và tự động có đúng một thread để cộng đồng trả lời.
- Trang chủ theo mô hình diễn đàn VOZ, danh sách có phân trang; không có feed infinite scroll.
- Guest được xem Report, thread và bản đồ công khai; User đã đăng nhập mới được tạo Report và trả lời.
- Report được công khai ngay sau kiểm tra dữ liệu cơ bản, sau đó Moderator hậu kiểm.
- Không tính điểm “độ thật” từ reaction, uy tín người dùng hoặc số bằng chứng.

### 2. Phân loại và dữ liệu Report

- Kho phân loại do Admin quản lý theo hai cấp:
  - Nhóm lớn: `Bầu trời/không trung`, `Tâm linh/kỳ bí`, `Tự nhiên/môi trường`, `Khác/chưa xác định`.
  - Loại quan sát chi tiết thuộc từng nhóm.
- Người dùng chọn `Khác/chưa xác định` và gửi đề xuất khi kho chưa có loại phù hợp; đề xuất không tự trở thành phân loại chính thức.
- Biểu mẫu dùng **lõi chung cộng nhánh chuyên biệt**:
  - Lõi chung: nguồn báo cáo, tiêu đề, mô tả, thời gian quan sát, khu vực, phân loại, số người quan sát và media.
  - Bầu trời: màu sắc, hình dạng, hướng nhìn, hướng di chuyển, độ sáng, âm thanh và thời lượng.
  - Tâm linh: giác quan ghi nhận, biểu hiện được quan sát, thời lượng, số lần lặp lại và ảnh hưởng vật lý nếu có.
  - Tự nhiên: môi trường xảy ra, phạm vi, diễn biến, thời lượng, tác động và số đo nếu có.
- Chấp nhận hai nguồn Report:
  - Người đăng trực tiếp quan sát;
  - Người đăng lại từ người khác hoặc nguồn bên ngoài, bắt buộc ghi rõ nguồn và được gắn nhãn.
- Chuyện kể chung, truyền thuyết và chủ đề không gắn với một lần quan sát cụ thể được đăng thành discussion thread thay vì Report.

### 3. `UC-REPORT-01 – Đăng báo cáo`

Tài liệu sẽ mô tả actor, tiền điều kiện, hậu điều kiện, luồng chính, luồng thay thế và tiêu chí nghiệm thu:

- Mobile là kênh chính; web hỗ trợ nhập báo cáo cũ và tải tệp.
- Khu vực quan sát ở cấp tỉnh/quận hoặc địa điểm gần đúng là bắt buộc; tọa độ GPS chính xác là tùy chọn.
- Người dùng được xem trước mức vị trí sẽ công khai.
- Media không bắt buộc.
- Phân biệt media:
  - Ghi trực tiếp bằng ứng dụng;
  - Tải từ thư viện;
  - Tải từ web;
  - Tư liệu từ nguồn bên ngoài.
- Với media ghi trực tiếp, thu thập metadata khả dụng như thời gian, tọa độ và sai số, hướng thiết bị, ISO, phơi sáng, tiêu cự, zoom, độ phân giải, framerate và codec.
- Giữ tệp gốc, tạo hash sau khi tiếp nhận và tách metadata đo được khỏi dữ liệu người dùng khai báo hoặc hệ thống suy luận.
- Không tuyên bố media “đã xác thực”, “không chỉnh sửa” hoặc Report là thật.
- Sau khi đăng thành công:
  - Tạo một Report;
  - Tạo một report thread tương ứng;
  - Công khai Report trên diễn đàn;
  - Đưa Report vào dữ liệu bản đồ với vị trí đã làm mờ;
  - Không tạo Event.
- Xử lý rõ các trường hợp từ chối quyền GPS/camera, thiếu metadata, tải tệp lỗi, vị trí chỉ có cấp khu vực, phân loại chưa phù hợp và dữ liệu nguồn gián tiếp chưa đầy đủ.

### 4. `UC-MAP-01 – Khám phá bản đồ`

- Bản đồ mở cho Guest và User, mặc định hiển thị Việt Nam và dữ liệu gần đây.
- Chỉ hiển thị Report công khai, chưa bị ẩn hoặc xóa.
- Vị trí công khai:
  - Dùng tọa độ đã giảm độ chính xác nếu hệ thống có GPS;
  - Dùng điểm đại diện của khu vực nếu chỉ biết tỉnh/quận;
  - Luôn hiển thị nhãn độ chính xác, không trình bày điểm đại diện như tọa độ thật.
- Marker được gom cụm theo mức zoom để xử lý nhiều Report tại cùng khu vực; các Report không bị hợp nhất.
- Bộ lọc gồm thời gian, nhóm hiện tượng, loại quan sát, nguồn trực tiếp/gián tiếp, có media hay không và trạng thái thảo luận.
- Người dùng có thể tìm tỉnh/thành, di chuyển bản đồ để tải dữ liệu theo vùng nhìn, mở cụm, xem thẻ tóm tắt và chuyển đến report thread.
- Danh sách kết quả cạnh bản đồ có phân trang hoặc giới hạn rõ ràng, không dùng infinite scroll.
- Marker dùng nhóm hiện tượng và mức chính xác vị trí để trình bày; không dùng màu marker như điểm tin cậy.
- Bao gồm trạng thái rỗng, lỗi tải bản đồ, mất quyền vị trí hiện tại và Report không còn công khai.

## Kiểu dữ liệu và quan hệ sẽ mô tả

- `Report`: nguồn báo cáo, phân loại, nội dung, thời gian, vị trí, mức chính xác, trạng thái công khai.
- `ReportMedia`: loại media, nguồn thu thập, tệp gốc, metadata và hash.
- `ObservationClassification`: nhóm và loại do Admin quản lý.
- `ClassificationProposal`: tên đề xuất, người đề xuất và số người đề xuất.
- `ReportThread`: quan hệ một-một với Report.
- `DiscussionThread`: chủ đề chung, có thể dẫn chiếu nhiều Report mà không xác nhận chúng thuộc cùng một sự kiện.
- `PublicMapPoint`: tọa độ đã làm mờ hoặc điểm đại diện khu vực, tách khỏi tọa độ gốc.

## Kiểm tra tài liệu và tiêu chí hoàn thành

- Hai use case có đầy đủ actor, điều kiện, luồng chính, luồng thay thế, lỗi và tiêu chí nghiệm thu.
- Mỗi trường trong biểu mẫu được ghi rõ bắt buộc, tùy chọn và áp dụng cho nhóm hiện tượng nào.
- Kiểm tra các tình huống:
  - Báo cáo trực tiếp bằng camera mobile;
  - Báo cáo gián tiếp có nguồn;
  - Đăng khi từ chối GPS;
  - Đăng không có media;
  - Chọn `Khác/chưa xác định`;
  - Media không có metadata;
  - Report tạo đúng một thread;
  - Bản đồ làm mờ vị trí;
  - Nhiều Report gần nhau được cluster nhưng không bị gộp;
  - Bộ lọc trả đúng nhóm hiện tượng;
  - Report bị Moderator ẩn biến mất khỏi bản đồ công khai.
- Chạy kiểm tra Markdown và `git diff --check` sau khi tạo file.

## Giới hạn được ghi rõ

- Không triển khai Event, merge/unmerge hoặc tự xác nhận các Report cùng một sự kiện.
- Không dùng AI để kết luận hiện tượng là thật, giả hoặc siêu nhiên.
- Không suy ra khoảng cách, độ cao hay vận tốc thật khi dữ liệu không đủ.
- Không coi reaction, reputation hoặc metadata là bằng chứng xác nhận tính đúng đắn.
- FAIR được trình bày như nguyên tắc quản trị dữ liệu, không phải một chuẩn JSON và không bắt buộc công khai tọa độ nhạy cảm.
- Các tính năng điểm uy tín, đánh giá chuyên gia, xuất dữ liệu nghiên cứu và thuật toán gợi ý Report liên quan được ghi thành hướng mở rộng, không nằm trong hai use case cốt lõi.
