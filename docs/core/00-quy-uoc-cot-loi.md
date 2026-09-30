# Quy ước nghiệp vụ cốt lõi

> Bản đặc tả để duyệt, cập nhật ngày 26/09/2026. Các mục ghi **Đề xuất** là lựa chọn thiết kế bổ sung, chưa được xem là quyết định đã được chủ đề tài chốt.

## 1. Kết quả rà soát

[Plan tổng hợp](general-plan-codex.md) đủ cơ sở để viết hai use case [Đăng báo cáo](01-dang-bao-cao.md) và [Khám phá bản đồ](02-kham-pha-ban-do.md). Cần bổ sung các quy tắc sau để hai use case không mâu thuẫn:

| Điểm cần hoàn thiện | Cách xử lý trong bản đặc tả |
| --- | --- |
| Plan chưa lưu quyết định mới về hai vị trí | Bắt buộc vị trí người quan sát; vị trí hiện tượng tùy chọn |
| Report và chủ đề tự do dễ bị hiểu là hai khu thảo luận riêng | Dùng chung diễn đàn và cơ chế trả lời; Report là một loại thread có phần đầu chứa dữ liệu cấu trúc |
| Chưa xác định marker đại diện cho điều gì | Đề xuất marker chính luôn biểu diễn vị trí người quan sát đã giảm độ chính xác |
| “Ghi trong app”, “tải từ web”, “nguồn bên ngoài” đang bị trộn thành một thuộc tính | Tách cách tiếp nhận tệp khỏi nguồn sở hữu/ghi nhận do người đăng khai báo |
| Giữ tệp gốc có thể làm lộ GPS dù marker đã làm mờ | Tệp gốc lưu riêng; bản công khai và metadata công khai phải loại thông tin vị trí riêng tư |
| “Trạng thái thảo luận” chưa có định nghĩa thống nhất | Tách trạng thái hiển thị Report, quyền trả lời thread và kết quả đánh giá |
| Chỉ nhớ ngày hoặc khoảng thời gian chưa có cách lọc | Lưu mức chính xác thời gian; lọc theo thời gian quan sát, không lấy ngày đăng thay thế |
| Các tài liệu cũ còn feed, Event và phạm vi chỉ có UFO | Dùng phạm vi hiện tại trong `docs/core`; tài liệu cũ là đầu vào tham khảo |

Đây là đặc tả hai chức năng cốt lõi trong sản phẩm tốt nghiệp dự kiến. Danh mục các chức năng còn phải đặc tả nằm ở mục 9; không xem hai use case này là toàn bộ sản phẩm hoàn chỉnh.

## 2. Quyết định đã có trong trao đổi và plan

- Nền tảng phục vụ cộng đồng tại Việt Nam, tiếp nhận các hiện tượng do người dùng cho là bất thường: bầu trời/UFO/UAP, tâm linh/kỳ bí, tự nhiên/môi trường và chưa xác định.
- Report là dữ liệu trung tâm; không có Event, merge/unmerge hoặc tự khẳng định nhiều Report cùng một sự việc.
- Diễn đàn theo chuyên mục, danh sách có phân trang; bỏ feed infinite scroll.
- Mỗi Report được công khai có đúng một report thread. Các phản hồi nằm ngay trong thread đó.
- Admin quản lý phân loại chính thức; người dùng có thể đề xuất phân loại còn thiếu.
- Tiếp nhận báo cáo trực tiếp và gián tiếp có khai báo nguồn; media không bắt buộc.
- Report hợp lệ được công khai sau kiểm tra kỹ thuật, không đợi duyệt thủ công; Moderator hậu kiểm.
- Mobile là kênh chính để ghi nhận tại hiện trường; web hỗ trợ đăng bằng tệp có sẵn, khám phá và quản trị.
- **Lưu hai vị trí: vị trí người quan sát bắt buộc, vị trí xảy ra hiện tượng tùy chọn.** Bắt buộc vị trí không đồng nghĩa bắt buộc cấp quyền GPS hoặc biết tọa độ chính xác.
- Không tính điểm thật/giả từ vote, danh tiếng hoặc số tệp đính kèm. Metadata và nhãn nguồn tệp chỉ cung cấp ngữ cảnh phân tích.

## 3. Phân biệt hai loại nội dung

**Đề xuất nghiệp vụ để duyệt:** Report mô tả một lần quan sát cụ thể và có tối thiểu mô tả, thời gian, vị trí người quan sát, phân loại và nguồn. Chủ đề tự do phục vụ hỏi đáp, chia sẻ kiến thức, chuyện kể hoặc phân tích chưa đủ dữ liệu của một Report.

| Thuộc tính | Report thread | Discussion thread |
| --- | --- | --- |
| Cách tạo | Biểu mẫu báo cáo có cấu trúc | Trình soạn chủ đề tự do |
| Phần đầu | Render từ dữ liệu Report | Tiêu đề và nội dung chủ đề |
| Thời gian và vị trí quan sát | Bắt buộc ở mức chính xác người đăng biết | Không bắt buộc |
| Marker trên bản đồ | Có khi Report công khai và phù hợp bộ lọc | Không tạo marker |
| Trả lời, trích dẫn, đính kèm | Cùng cơ chế diễn đàn | Cùng cơ chế diễn đàn |
| Liên kết nhiều Report | Không hợp nhất các Report | Có thể dẫn chiếu để so sánh, không tạo Event |

Ví dụ “Tôi nghe tiếng động lạ tại nhà vào tối ngày X” có thể là Report dù không có bản ghi âm. “Những truyền thuyết về ngôi nhà này” là discussion. Một video sưu tầm hoàn toàn không rõ thời gian hoặc vị trí người quay chưa đủ điều kiện đăng thành Report.

Với báo cáo gián tiếp, vị trí bắt buộc là nơi người quan sát ban đầu hoặc thiết bị ghi nhận đặt tại thời điểm đó. Không dùng vị trí hiện tại của người đăng lại. Nếu chỉ biết địa điểm hiện tượng mà không biết khu vực người quan sát, cần bổ sung nguồn hoặc đăng chủ đề tự do; không tự sao chép địa điểm hiện tượng sang vị trí quan sát.

Hệ thống hướng dẫn phân biệt nội dung và kiểm tra trường bắt buộc. Không dùng bộ phân loại tự động để khẳng định lời kể hợp lệ hay hiện tượng có thật. Moderator xử lý nội dung sai mục sau khi đăng theo use case kiểm duyệt riêng.

## 4. Actor và quyền liên quan

| Actor | Quyền trong hai use case |
| --- | --- |
| Guest | Khám phá bản đồ, xem Report/thread và media công khai |
| User | Quyền Guest; tạo Report khi đăng nhập và tài khoản được phép đăng |
| Tác giả Report | Là User sở hữu Report; xem dữ liệu riêng của Report do mình tạo |
| Moderator | Hậu kiểm, ẩn/khôi phục nội dung, khóa/mở trả lời theo quyền; không mặc nhiên có quyền xem GPS gốc |
| Admin | Quản lý phân loại, cấu hình và phân quyền; quyền dữ liệu nhạy cảm phải cấp riêng |

**Đề xuất quyền dữ liệu:** Guest/User khác chỉ xem bản công khai. Tác giả và người được cấp quyền xử lý dữ liệu nhạy cảm mới xem tọa độ gốc/tệp gốc; truy cập bởi nhân sự quản trị có ghi nhận người truy cập, thời điểm và lý do. Chức danh chuyên gia hoặc nhiều reaction không tự mở quyền này.

## 5. Quy ước không gian và thời gian

### 5.1. Vị trí

| Thành phần | Bắt buộc | Ý nghĩa |
| --- | --- | --- |
| `observer_location` | Có | Điểm hoặc khu vực của người quan sát/thiết bị ghi nhận lúc quan sát |
| `phenomenon_location` | Không | Điểm hoặc khu vực hiện tượng do người đăng cung cấp; có nhãn xác định/ước lượng và căn cứ |
| `public_observer_location` | Hệ thống tạo | Vị trí công khai dùng cho marker, thẻ Report và truy vấn bản đồ |
| `public_phenomenon_location` | Khi có vị trí hiện tượng | Bản giảm độ chính xác để hiển thị trong chi tiết Report |

Mỗi vị trí lưu cách cung cấp (`GPS`, chọn điểm, chọn khu vực, theo nguồn), mức chính xác và dữ liệu khu vực nếu có. Sai số GPS chỉ lưu khi thực sự có phép đo; điểm chọn tay không được gắn nhãn GPS chính xác. Danh mục địa phương dùng mã và tên từ nguồn dữ liệu được chọn khi triển khai, không buộc mô hình vào một cấu trúc cấp hành chính cố định.

GPS lúc đăng chỉ được dùng làm gợi ý. Người đăng phải xác nhận đó có phải nơi mình quan sát hay không, đặc biệt khi báo cáo chuyện đã xảy ra trước đó. Dữ liệu GPS trong tệp được lưu theo tệp; không âm thầm thay vị trí Report bằng vị trí của một tệp đính kèm.

**Đề xuất công khai:** nếu có điểm, dùng ô lưới cố định cạnh 2 km và marker ở tâm ô; nếu người dùng chọn riêng tư hơn hoặc chỉ biết khu vực thì dùng điểm đại diện khu vực. Nếu mức sai số đã biết lớn hơn ô lưới, dùng ô lớn hơn hoặc khu vực phù hợp. Không tạo cảm giác dữ liệu chính xác hơn thông tin gốc.

Điểm công khai và nhãn mức chính xác phải ổn định qua các lần tải. Không làm lệch ngẫu nhiên mỗi lần vì có thể suy ngược vị trí qua nhiều lần quan sát. Ô lưới chỉ giảm mức chi tiết tọa độ; không cam kết ẩn danh tuyệt đối. Giao diện phải phân biệt mức riêng tư công khai với sai số phép đo.

**Đề xuất marker:** bản đồ tổng quan chỉ dùng vị trí người quan sát. Vị trí hiện tượng có thể xem riêng trong chi tiết với nhãn rõ ràng, không tạo marker thứ hai làm tăng số lượng Report. Không suy ra tọa độ UFO từ hướng nhìn.

### 5.2. Thời gian

**Đề xuất:** hỗ trợ ngày giờ cụ thể, chỉ nhớ ngày và khoảng thời gian; có cờ “ước lượng”. Cần xác định được tối thiểu một ngày hoặc một khoảng thời gian có giới hạn. Không yêu cầu người dùng điền giờ giả để vượt qua form.

- Lưu thời gian quan sát tách biệt thời gian ghi tệp, thời gian máy chủ nhận tệp và thời gian đăng Report.
- Múi giờ mặc định `Asia/Ho_Chi_Minh`, có thể sửa khi nhập quan sát ở nơi khác. Hiển thị múi giờ khi xem giờ cụ thể.
- Ngày giờ cụ thể được lưu thành thời điểm; ngày/khoảng thời gian lưu thành khoảng tìm kiếm và giữ mức chính xác gốc.
- “Chỉ nhớ ngày D” tương ứng từ đầu ngày D đến trước đầu ngày D+1 theo múi giờ đã chọn. Nhãn hiển thị vẫn là “chỉ nhớ ngày”.
- Bộ lọc sử dụng thời gian quan sát. Một khoảng ước lượng khớp nếu giao với khoảng tìm kiếm; không hiển thị như khớp chính xác đến phút.
- Không chấp nhận thời điểm quan sát hoàn toàn trong tương lai. Ngày hiện tại vẫn hợp lệ khi người đăng chỉ nhớ ngày. Hiện tượng đang tiếp diễn dùng thời điểm bắt đầu, chưa cần thời điểm kết thúc.

## 6. Nguồn báo cáo, nguồn tệp và metadata

Nguồn Report (`trực tiếp`/`gián tiếp`) độc lập với các thuộc tính của từng tệp:

| Thuộc tính | Giá trị/ý nghĩa |
| --- | --- |
| Cách tiếp nhận tệp | Ghi trong ứng dụng, chọn thư viện mobile, tải qua web; hệ thống ghi nhận từ luồng tiếp nhận |
| Người tạo/nguồn tệp khai báo | Do mình ghi, do người khác cung cấp, nguồn bên ngoài; kèm nguồn khi không phải tự ghi |
| Vai trò tư liệu | Ghi nhận tại hiện trường, lời kể lại của nhân chứng, tư liệu minh họa/đối chiếu |

Ví dụ: “Tải qua web · Nguồn báo X · Tư liệu đối chiếu” là tổ hợp hợp lệ. Báo cáo trực tiếp vẫn có thể đính kèm ảnh tham khảo từ nguồn khác. Lời kể được thu âm hôm nay về việc xảy ra hôm trước phải có vai trò “lời kể lại”, không gắn nhãn âm thanh hiện trường.

Hệ thống giữ nguyên tệp đã tiếp nhận, tính hash sau khi nhận hoàn tất và tạo bản phục vụ công khai riêng. Hash hỗ trợ phát hiện thay đổi sau khi tiếp nhận, không chứng minh tệp chưa bị chỉnh sửa trước đó. Giá trị người dùng khai báo không ghi đè metadata gốc.

Metadata có thể thu thập gồm thời gian ghi, GPS và sai số, hãng/model thiết bị, camera, hướng thiết bị, ISO, phơi sáng, tiêu cự, zoom, độ phân giải, framerate và codec tùy tệp/thiết bị. Trường không lấy được lưu trạng thái thiếu hoặc không hỗ trợ, không gán số 0. Hướng đo một thời điểm không được trình bày như hướng của toàn bộ video.

**Đề xuất ranh giới công khai:** lọc metadata theo danh sách trường được phép, loại GPS gốc, địa chỉ chi tiết và định danh thiết bị nhạy cảm khỏi mọi bản ảnh/video/âm thanh, thumbnail và dữ liệu công khai. Link tải gốc phải kiểm tra quyền; việc ẩn GPS trên UI là chưa đủ. Mô tả, nguồn và hình ảnh có thể tự chứa địa chỉ, vì vậy bước xem trước cần nhắc tác giả kiểm tra thông tin mình sắp công khai.

## 7. Trạng thái và quan hệ dữ liệu

Các tên dưới đây là mô hình nghiệp vụ đề xuất, chưa bắt buộc cấu trúc bảng database.

| Khái niệm | Quy tắc |
| --- | --- |
| Report | Lưu nội dung quan sát, phân loại, nguồn, thời gian và hai vị trí |
| Thread | Một kiểu chung gồm `REPORT` và `DISCUSSION`; mỗi Report công khai có đúng một thread loại `REPORT` |
| Reply | Thuộc thread; dữ liệu quan sát đầu Report không bị sao chép thành bài viết tự do có thể sửa riêng |
| ReportMedia | Thuộc Report, có tệp gốc, bản công khai, nguồn, vai trò và metadata |
| ObservationClassification | Một nhóm và một loại chính cho mỗi Report; Admin quản lý; loại đã dùng có thể ngừng cho chọn mới nhưng không làm mất dữ liệu cũ |
| ClassificationProposal | Đề xuất của User; không tự thành loại chính thức và không chặn việc đăng |
| PublicMapPoint | Dữ liệu công khai suy ra từ vị trí người quan sát; không phải Event |
| DiscussionReportLink | Chủ đề tự do tham chiếu Report, không khẳng định cùng sự việc |

**Đề xuất trạng thái hiển thị Report:** `PUBLIC`, `HIDDEN`, `DELETED`. Dữ liệu form/tệp đang chuẩn bị chưa phải Report công khai. Đăng thành công tạo `PUBLIC`; Moderator có thể ẩn hoặc khôi phục; tác giả xóa theo use case riêng. Chỉ `PUBLIC` xuất hiện trong dữ liệu công khai.

**Đề xuất trạng thái trả lời thread:** `OPEN`, `LOCKED`. Thread bị khóa nhưng Report vẫn `PUBLIC` thì vẫn xuất hiện trên bản đồ. Report bị ẩn/xóa khiến trang report thread và media liên quan không còn truy cập công khai dù biết URL cũ; mở khóa thread không tự khôi phục Report bị ẩn.

Kết quả như “thiếu dữ liệu” hoặc “có giải thích khả dĩ” là đánh giá nội dung, không phải trạng thái khóa hay kiểm duyệt. Quy trình tóm tắt đánh giá chưa được đặc tả; không đưa bộ lọc kết luận này vào hai use case hiện tại.

## 8. Các đề xuất cần chủ đề tài duyệt

Các giá trị sau giúp bản đặc tả có thể kiểm thử. Có thể thay đổi sau khi duyệt mà không cần đổi mô hình Report.

| Mã | Đề xuất dùng trong bản đặc tả |
| --- | --- |
| D01 | Hai loại thread; chỉ Report đủ dữ liệu tối thiểu mới có marker |
| D02 | Một phân loại chính/Report; mỗi nhóm có lựa chọn chưa xác định; cho gửi đề xuất riêng |
| D03 | Quy tắc thời gian chính xác/ngày/khoảng và cờ ước lượng tại mục 5 |
| D04 | Marker theo người quan sát; giảm chi tiết bằng lưới 2 km hoặc khu vực; bảo vệ cả vị trí hiện tượng |
| D05 | Tệp gốc/GPS gốc theo quyền riêng; lọc metadata và tạo tệp công khai riêng |
| D06 | Tiêu đề 10–200 ký tự; mô tả 30–10.000 ký tự sau khi bỏ khoảng trắng đầu/cuối |
| D07 | Tối đa 10 tệp/Report, ảnh 20 MiB/tệp, video 200 MiB/tệp, âm thanh 50 MiB/tệp, tổng 500 MiB |
| D08 | Loại tệp ban đầu: JPEG/PNG/WebP, MP4/MOV, MP3/M4A/WAV; khả năng giải mã thực tế phải được kiểm tra; bổ sung HEIC sau thử nghiệm thiết bị |
| D09 | Bản đồ mặc định Việt Nam, 30 ngày lịch gần nhất gồm hôm nay theo giờ Việt Nam; danh sách 20 Report/trang |
| D10 | Trạng thái hiển thị và khóa thread theo mục 7; bản đồ chưa lọc theo kết luận phân tích |

## 9. Use case liên quan cần đặc tả tiếp

| Mã dự kiến | Use case | Hợp đồng tối thiểu với hai use case cốt lõi |
| --- | --- | --- |
| UC-AUTH-01 | Đăng nhập/quyền tài khoản | Xác định người đăng, quyền đăng và tình trạng bị hạn chế |
| UC-THREAD-01 | Xem và trả lời thread | Mở report thread từ map; reply có trích dẫn, đính kèm, phân trang và báo vi phạm |
| UC-DISCUSSION-01 | Tạo chủ đề tự do | Không tạo marker; có thể tham chiếu nhiều Report |
| UC-REPORT-02 | Sửa/bổ sung Report | Đề xuất giữ lịch sử, nhãn đã sửa; đồng bộ dữ liệu map và phần đầu thread |
| UC-REPORT-03 | Xóa Report | Đề xuất xóa mềm; gỡ khỏi mọi truy cập công khai; chính sách lưu giữ phải chốt riêng |
| UC-MOD-01 | Báo vi phạm và hậu kiểm | Ẩn/khôi phục Report, kiểm tra quyền khi đọc, xử lý cache công khai |
| UC-CATEGORY-01 | Quản lý/đề xuất phân loại | Kho chính thức do Admin quản lý, không tự thêm khi vượt ngưỡng lượt đề xuất |
| UC-REVIEW-01 | Tóm tắt thảo luận | Đề xuất giữ ý tưởng tổng hợp giả thuyết, nguồn và giới hạn; cần chốt người cập nhật và quy trình |

Ưu tiên tiếp theo: duyệt các D01–D10, đặc tả xem/trả lời và hậu kiểm, rồi thiết kế mô hình dữ liệu, luồng màn hình và API. Chức năng sửa/xóa phải được chốt trước khi hoàn thiện database; không suy ra toàn bộ chính sách từ bản đặc tả đăng mới.

## 10. Nguồn ý tưởng và phạm vi áp dụng

| Tài liệu trong repository | Phần sử dụng |
| --- | --- |
| [Gợi ý ban đầu của partner](../gemini-suggestion.md) | Thu thập có cấu trúc và vai trò mobile |
| [Gợi ý FAIR](../Goi-y-cau-truc-FAIR-Gemini.md) | Nguồn gốc dữ liệu, định danh và khả năng tái sử dụng; không dùng JSON mẫu nguyên trạng |
| [Đánh giá metadata](../Cac-thong-so-thiet-bi-codex.md) | Giới hạn thiết bị, sai số, giữ bản gốc, phân biệt phép đo và suy luận |
| [Định hướng mobile](../codex-suggestion.md) | Nhãn tiếp nhận tệp và phân biệt âm thanh hiện trường với lời kể |
| [Gợi ý diễn đàn của partner](../Goi-y-dien-dan-thao-luan-gemini.md) | Trả lời có tài liệu, nguồn và giả thuyết; chưa áp dụng tự kết luận từ vote |
| [Nghiên cứu VOZ](../VOZ-study-codex.md) | Chuyên mục, thread, phân trang; Report là phần đầu thread |

Các tài liệu dựa trên NASA là đầu vào cho thiết kế thu thập dữ liệu của nhánh bầu trời. Mở rộng sang tâm linh và tự nhiên là lựa chọn sản phẩm của nhóm; không trình bày như NASA xác nhận phạm vi này hoặc xác nhận hiện tượng siêu nhiên. FAIR được dùng như định hướng quản trị dữ liệu, không được hiểu là bắt buộc công khai toàn bộ GPS/tệp gốc.
