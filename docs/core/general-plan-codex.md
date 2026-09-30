# Kế hoạch và bộ đặc tả use case cốt lõi

## Tóm tắt

Bộ tài liệu trong `docs/core` tổng hợp các quyết định đã chốt và ý tưởng phù hợp từ tài liệu hiện có. Sản phẩm được định vị là **nền tảng cộng đồng tại Việt Nam để báo cáo có cấu trúc và thảo luận về các hiện tượng được người dùng cho là bất thường**, gồm hiện tượng bầu trời/UFO/UAP, tâm linh kỳ bí, tự nhiên và nhóm chưa xác định.

Đã rà soát và bổ sung bản đặc tả để duyệt ngày 26/09/2026:

- [Quy ước nghiệp vụ cốt lõi](00-quy-uoc-cot-loi.md): kết quả rà soát, quyết định hiện có, quy tắc chung và danh sách đề xuất cần duyệt.
- [UC-REPORT-01 — Đăng báo cáo hiện tượng](01-dang-bao-cao.md): dữ liệu đầu vào, luồng đăng, luồng thay thế/lỗi và tiêu chí nghiệm thu.
- [UC-MAP-01 — Khám phá báo cáo trên bản đồ](02-kham-pha-ban-do.md): bộ lọc, marker/cụm, dữ liệu công khai và tiêu chí nghiệm thu.

Các giới hạn số lượng/kích thước tệp, mức làm mờ vị trí, thời gian lọc mặc định và quy tắc bổ sung được ghi là **đề xuất** trong quy ước, chưa mặc nhiên được xem là người dùng đã chốt. Bộ này đặc tả hai chức năng cốt lõi của sản phẩm tốt nghiệp; các chức năng liên quan được liệt kê để đặc tả tiếp.

Tài liệu tập trung đặc tả:

1. `UC-REPORT-01 – Đăng báo cáo hiện tượng`;
2. `UC-MAP-01 – Khám phá báo cáo trên bản đồ`.

## Nội dung và quyết định chính

### 1. Phạm vi và mô hình chung

- Dùng thuật ngữ `Report – Báo cáo`, tránh đồng nhất với bài viết tự do.
- Bỏ hoàn toàn `Event`, merge/unmerge và cơ chế tự tạo Event.
- Mỗi Report tồn tại độc lập và tự động có đúng một thread để cộng đồng trả lời.
- Đề xuất hai loại thread dùng chung diễn đàn: Report có phần đầu cấu trúc; discussion là chủ đề tự do, không tự tạo marker. Chỉ Report đủ dữ liệu tối thiểu và công khai mới tham gia dữ liệu bản đồ.
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
  - Lõi chung bắt buộc: nguồn báo cáo, tiêu đề, mô tả, thời gian quan sát, vị trí người quan sát và phân loại.
  - Lõi chung tùy chọn: vị trí hiện tượng, số người quan sát, thời lượng, điều kiện quan sát và media. Các trường chuyên biệt dưới đây cũng tùy chọn.
  - Bầu trời: màu sắc, hình dạng, hướng nhìn, hướng di chuyển, độ sáng, âm thanh và thời lượng.
  - Tâm linh: giác quan ghi nhận, biểu hiện được quan sát, thời lượng, số lần lặp lại và ảnh hưởng vật lý nếu có.
  - Tự nhiên: môi trường xảy ra, phạm vi, diễn biến, thời lượng, tác động và số đo nếu có.
- Chấp nhận hai nguồn Report:
  - Người đăng trực tiếp quan sát;
  - Người đăng lại từ người khác hoặc nguồn bên ngoài, bắt buộc ghi rõ nguồn và được gắn nhãn.
- Chuyện kể chung, truyền thuyết và chủ đề không gắn với một lần quan sát cụ thể được đăng thành discussion thread thay vì Report.

### 3. `UC-REPORT-01 – Đăng báo cáo`

Tài liệu chi tiết mô tả actor, tiền điều kiện, hậu điều kiện, luồng chính, luồng thay thế, lỗi và tiêu chí nghiệm thu:

- Mobile là kênh chính; web hỗ trợ nhập báo cáo cũ và tải tệp.
- Lưu cả hai vị trí: vị trí người quan sát bắt buộc, vị trí hiện tượng tùy chọn. Vị trí người quan sát có thể là điểm hoặc khu vực gần đúng; tọa độ GPS chính xác không bắt buộc.
- Với báo cáo gián tiếp, dùng vị trí người quan sát ban đầu hoặc thiết bị ghi nhận, không lấy vị trí hiện tại của người đăng lại. Không tự thay thế bằng vị trí hiện tượng.
- Người dùng được xem trước mức vị trí sẽ công khai.
- Media không bắt buộc.
- Mỗi media phân biệt cách tiếp nhận (ghi bằng ứng dụng/thư viện/web), nguồn do người dùng khai báo (tự ghi/người khác/nguồn bên ngoài) và vai trò (hiện trường/lời kể/đối chiếu). Các thuộc tính này độc lập với nguồn trực tiếp/gián tiếp của Report.
- Với media ghi trực tiếp, thu thập metadata khả dụng như thời gian, tọa độ và sai số, hướng thiết bị, ISO, phơi sáng, tiêu cự, zoom, độ phân giải, framerate và codec.
- Giữ tệp gốc, tạo hash sau khi tiếp nhận và tách metadata đo được khỏi dữ liệu người dùng khai báo hoặc hệ thống suy luận.
- Tệp gốc có quyền truy cập riêng; tệp, thumbnail và metadata công khai không được làm lộ GPS gốc. Thiếu metadata không tự chặn việc đăng nếu dữ liệu lõi và tệp hợp lệ.
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
- Đề xuất marker chính luôn đại diện cho vị trí người quan sát. Vị trí hiện tượng hiển thị riêng trong chi tiết, không tạo marker thứ hai cho cùng Report.
- Vị trí công khai:
  - Dùng tọa độ đã giảm độ chính xác nếu hệ thống có GPS;
  - Dùng điểm đại diện của khu vực nếu chỉ biết khu vực;
  - Luôn hiển thị nhãn độ chính xác, không trình bày điểm đại diện như tọa độ thật.
- Marker được gom cụm theo mức zoom để xử lý nhiều Report tại cùng khu vực; các Report không bị hợp nhất.
- Bộ lọc gồm thời gian quan sát, nhóm hiện tượng, loại quan sát, nguồn trực tiếp/gián tiếp, có media hay không và trạng thái mở/khóa trả lời. Chưa lọc theo kết luận phân tích vì quy trình này cần đặc tả riêng.
- Report chỉ nhớ ngày/khoảng thời gian được lọc theo khoảng giao nhau và giữ nhãn mức chính xác; không dùng ngày đăng thay thời gian quan sát.
- Người dùng có thể tìm tỉnh/thành, di chuyển bản đồ để tải dữ liệu theo vùng nhìn, mở cụm, xem thẻ tóm tắt và chuyển đến report thread.
- Danh sách kết quả có phân trang; marker/cụm vẫn thể hiện toàn bộ tập khớp trong vùng nhìn, không chỉ trang hiện tại. Cụm trùng điểm tại mức zoom tối đa mở danh sách thành viên.
- Marker dùng nhóm hiện tượng và mức chính xác vị trí để trình bày; không dùng màu marker như điểm tin cậy.
- Bao gồm trạng thái rỗng, lỗi tải bản đồ, mất quyền vị trí hiện tại và Report không còn công khai.

## Khái niệm dữ liệu và quan hệ

- `Report`: nguồn báo cáo, phân loại, nội dung, thời gian, vị trí người quan sát, vị trí hiện tượng tùy chọn, mức chính xác và trạng thái công khai.
- `ReportMedia`: loại media, nguồn thu thập, tệp gốc, metadata và hash.
- `ObservationClassification`: nhóm và loại do Admin quản lý.
- `ClassificationProposal`: tên đề xuất, người đề xuất và số người đề xuất.
- `Thread`: gồm loại `REPORT` liên kết một-một với Report và loại `DISCUSSION` cho chủ đề tự do. Đây là mô hình nghiệp vụ, chưa buộc cách chia bảng database.
- `DiscussionReportLink`: chủ đề tự do dẫn chiếu nhiều Report mà không xác nhận chúng thuộc cùng một sự kiện.
- `PublicMapPoint`: tọa độ người quan sát đã giảm độ chính xác hoặc điểm đại diện khu vực, tách khỏi tọa độ gốc.

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
- Kiểm tra liên kết tài liệu nội bộ, định dạng Markdown và khoảng trắng. Các tiêu chí nghiệm thu là đầu vào kiểm thử khi triển khai, không phải tuyên bố đã kiểm thử một hệ thống đang chạy.

## Giới hạn được ghi rõ

- Không triển khai Event, merge/unmerge hoặc tự xác nhận các Report cùng một sự kiện.
- Không dùng AI để kết luận hiện tượng là thật, giả hoặc siêu nhiên.
- Không suy ra khoảng cách, độ cao hay vận tốc thật khi dữ liệu không đủ.
- Không coi reaction, reputation hoặc metadata là bằng chứng xác nhận tính đúng đắn.
- FAIR được trình bày như nguyên tắc quản trị dữ liệu, không phải một chuẩn JSON và không bắt buộc công khai tọa độ nhạy cảm.
- Các tính năng điểm uy tín, đánh giá chuyên gia, xuất dữ liệu nghiên cứu và thuật toán gợi ý Report liên quan được ghi thành hướng mở rộng, không nằm trong hai use case cốt lõi.
