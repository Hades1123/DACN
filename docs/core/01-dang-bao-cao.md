# UC-REPORT-01 — Đăng báo cáo hiện tượng

> Bản đặc tả để duyệt ngày 26/09/2026. Áp dụng cùng [Quy ước cốt lõi](00-quy-uoc-cot-loi.md). Các mặc định D01–D10 trong tài liệu đó là đề xuất, chưa phải quyết định đã được chủ đề tài xác nhận.

## 1. Thông tin use case

| Thuộc tính | Nội dung |
| --- | --- |
| Mục tiêu | Ghi nhận một lần quan sát thành Report có cấu trúc; mở thread trả lời và cung cấp dữ liệu cho bản đồ |
| Actor chính | User đã đăng nhập và có quyền đăng |
| Thành phần hỗ trợ | Dịch vụ vị trí/bản đồ, thiết bị camera/microphone, lưu trữ và xử lý media |
| Kích hoạt | User chọn “Tạo báo cáo” từ điều hướng, diễn đàn hoặc bản đồ |
| Nền tảng | Mobile là chính; web hỗ trợ form và tải tệp có sẵn |
| Phạm vi | Đăng mới; không bao gồm sửa/xóa, tạo chủ đề tự do, viết reply hoặc ra kết luận về hiện tượng |
| Ưu tiên | Cốt lõi |

Trên mobile, form có thể chia bước hoặc mở toàn màn hình; trên web có thể dùng modal rộng. Đây là một luồng nghiệp vụ, không buộc mọi trường phải nằm trong một modal dài. Không bắt mở camera ngay khi vào form.

## 2. Tiền điều kiện

1. User đã đăng nhập; tài khoản không bị hạn chế quyền đăng.
2. Hệ thống có kho phân loại đang hoạt động, bao gồm lựa chọn “Khác/chưa xác định”.
3. Khi gửi, thiết bị kết nối được dịch vụ đăng Report. Không bắt buộc cấp quyền GPS, camera hoặc microphone để mở và điền form.

## 3. Hậu điều kiện

### Thành công

- Có đúng một Report trạng thái `PUBLIC`, tác giả là User hiện tại và có mã định danh ổn định.
- Có đúng một thread loại `REPORT`, trạng thái trả lời ban đầu `OPEN`; phần đầu lấy từ dữ liệu Report.
- Report có vị trí người quan sát và bản công khai của vị trí; vị trí hiện tượng chỉ tồn tại khi được cung cấp.
- Mọi tệp được giữ trong lần gửi đều đã tiếp nhận, kiểm tra và có bản công khai an toàn; metadata thu thập được có nguồn rõ ràng.
- Report xuất hiện trong diễn đàn và đủ điều kiện vào dữ liệu bản đồ. Việc có nhìn thấy ngay trên map hay không còn phụ thuộc bộ lọc, vùng nhìn và thời gian quan sát.
- User được chuyển đến report thread, có hành động “Xem trên bản đồ”. Không tạo Event hoặc điểm thật/giả.

### Không thành công

- Không có Report công khai thiếu thread hoặc thiếu dữ liệu bắt buộc; không có marker mồ côi.
- Dữ liệu đã nhập còn trong phiên form để sửa hoặc gửi lại. Không cam kết khôi phục sau khi xóa dữ liệu ứng dụng/đóng trình duyệt nếu chưa có chức năng lưu nháp riêng.
- Tệp chuẩn bị chưa gắn với Report không có URL công khai và được dọn theo chính sách lưu tạm.
- Lỗi trả kết quả sau khi máy chủ đã lưu phải được đối chiếu lại bằng mã lần gửi, không coi là lý do tạo Report mới.

## 4. Luồng chính

| Bước | Người dùng | Hệ thống |
| --- | --- | --- |
| 1 | Chọn “Tạo báo cáo” | Kiểm tra phiên đăng nhập/quyền đăng; mở form và mô tả ngắn Report cần có thời gian, vị trí quan sát |
| 2 | Chọn nguồn trực tiếp hoặc gián tiếp | Hiện trường nguồn bắt buộc nếu là gián tiếp |
| 3 | Chọn nhóm và loại quan sát | Hiện các trường lõi và nhánh tương ứng; cho tìm trong kho phân loại |
| 4 | Nhập tiêu đề, mô tả điều ghi nhận, thời gian và các thông tin mình biết | Kiểm tra định dạng, hỗ trợ giờ/ngày/khoảng thời gian; không buộc nhập suy đoán |
| 5 | Cung cấp vị trí người quan sát bằng vị trí thiết bị, chọn điểm hoặc chọn khu vực; xác nhận đúng thời điểm quan sát | Lưu cách cung cấp, mức chính xác và tính vị trí công khai; không mặc nhiên dùng GPS hiện tại cho báo cáo cũ |
| 6 | Bổ sung vị trí hiện tượng nếu biết | Hiện nhãn “Vị trí hiện tượng”, cho đánh dấu ước lượng; không tự điền từ vị trí người quan sát |
| 7 | Nhập đặc điểm nhánh, số người quan sát, thời lượng hoặc điều kiện quan sát nếu biết | Lưu giá trị khai báo; trường bỏ trống giữ trạng thái chưa cung cấp |
| 8 | Chụp/quay/ghi âm trong app hoặc đính kèm tệp; có thể bỏ qua bước này | Xin quyền đúng lúc cần; nhận tệp, xác định cách tiếp nhận, thu metadata khả dụng; hỏi nguồn và vai trò tư liệu |
| 9 | Chọn “Xem trước” | Hiển thị nội dung công khai, thời gian với mức chính xác, nhãn nguồn, vị trí đã giảm chi tiết, media và các mục còn thiếu |
| 10 | Kiểm tra bản công khai, sửa nếu cần rồi chọn “Đăng báo cáo” | Cấp mã lần gửi, khóa thao tác gửi trùng trong UI; kiểm tra quyền và dữ liệu ở máy chủ |
| 11 | Theo dõi tiến trình nếu có media | Hoàn tất xử lý mọi tệp được giữ trong lần gửi; nếu lỗi, chuyển luồng E03; lưu Report và thread nhất quán cùng dữ liệu bản đồ |
| 12 | Xem Report vừa đăng | Thông báo thành công, mở report thread; cho xem bản đồ tại vị trí công khai của Report |

Kiểm tra kỹ thuật ở bước 11 không phải duyệt nội dung thủ công. Report không có media được đăng ngay sau kiểm tra dữ liệu. Report có media cần hoàn tất xử lý tệp đã chọn trước khi công khai theo đề xuất trong bản này.

## 5. Dữ liệu người dùng nhập

### 5.1. Trường lõi

| Trường | Mức bắt buộc | Quy tắc và cách hiển thị |
| --- | --- | --- |
| Nguồn Report | Có | Trực tiếp quan sát hoặc đăng lại/gián tiếp; không suy ra từ cách tải media |
| Tiêu đề | Có | Đề xuất 10–200 ký tự; người dùng đặt, không tự tạo tên Event |
| Mô tả quan sát | Có | Đề xuất 30–10.000 ký tự; gợi ý mô tả điều thấy/nghe/ghi nhận; trình bày an toàn khi có định dạng |
| Nhóm và loại chính | Có | Một loại thuộc một nhóm đang hoạt động; dùng loại chưa xác định khi không phù hợp |
| Thời gian quan sát | Có | Giờ cụ thể, ngày hoặc khoảng thời gian; giữ múi giờ và cờ ước lượng; tuân thủ mục 5.2 của quy ước |
| Vị trí người quan sát | Có | Điểm hoặc khu vực có thể định vị trên bản đồ; có nhãn nguồn và mức chính xác; không bắt buộc GPS |
| Vị trí hiện tượng | Không | Điểm/khu vực, mức ước lượng và mô tả căn cứ nếu có; không bắt suy đoán vật thể ở xa |
| Mức công khai vị trí | Có giá trị mặc định | Theo D04; xem trước được, có thể chọn công khai ở cấp khu vực rộng hơn |
| Thời lượng | Không | Số dương kèm đơn vị hoặc “đang tiếp diễn”; không biết thì bỏ trống |
| Số người quan sát | Không | Số nguyên dương nếu biết; không tính người xem lại video là nhân chứng tại hiện trường |
| Điều kiện quan sát | Không | Ví dụ trong nhà/ngoài trời, mưa, thiếu sáng, qua kính; do người dùng khai báo |
| Media | Không | 0–10 tệp theo D07; ảnh, video hoặc âm thanh; giới hạn và định dạng hiển thị trước khi chọn |
| Phỏng đoán cá nhân | Không | Tách khỏi mô tả quan sát, hiển thị rõ là ý kiến người đăng; không phải kết luận hệ thống |

Không yêu cầu nhập công khai danh tính người quan sát ban đầu. Trường nguồn có thể mô tả “người quen cung cấp” và hoàn cảnh tiếp nhận, không ép khai số điện thoại hay địa chỉ cá nhân.

### 5.2. Nguồn gián tiếp

| Trường | Mức bắt buộc | Quy tắc |
| --- | --- | --- |
| Loại nguồn | Có khi gián tiếp | Bài báo/trang web, mạng xã hội, người cung cấp trực tiếp, nguồn khác |
| Tên hoặc mô tả nguồn | Có khi gián tiếp | Đủ để người đọc hiểu thông tin đến từ đâu; không chấp nhận chỉ ghi “Internet” |
| Đường dẫn | Có khi nguồn online còn truy cập được | URL hợp lệ; không tự tải nội dung từ URL trong use case này |
| Lý do thiếu URL/thông tin nguồn | Có nếu nguồn online không còn URL | Ví dụ bài đã xóa; hiển thị “Nguồn do người đăng khai báo, không có liên kết truy cập” |
| Vị trí người quan sát ban đầu | Có | Chấp nhận khu vực gần đúng nếu nguồn cho biết; vị trí người đăng lại không thay thế trường này |
| Thời gian quan sát theo nguồn | Có | Không lấy ngày bài báo được xuất bản làm ngày quan sát nếu nguồn không nói vậy |

Đây là đề xuất tiếp nhận nguồn gián tiếp. Kiểm tra cấu trúc không đồng nghĩa hệ thống đã xác minh nguồn; trường hợp khai báo mơ hồ hoặc sai sự thật do Moderator xử lý sau đăng.

### 5.3. Trường theo nhóm hiện tượng

Các trường dưới đây đều **tùy chọn**, trừ nhóm/loại chính ở phần lõi. Form ưu tiên lựa chọn ngắn và “không rõ”; không bắt người dùng đo đạc để được đăng.

| Nhóm | Trường | Cách ghi nhận |
| --- | --- | --- |
| Bầu trời/không trung | Màu sắc; hình dạng; số vật thể/đốm sáng | Danh sách gợi ý kèm mô tả khác; số lượng là số nguyên dương hoặc không rõ |
| Bầu trời/không trung | Hướng nhìn; hướng di chuyển | Hướng địa lý/độ khi biết, hoặc mô tả như trái sang phải; hai trường có ý nghĩa khác nhau |
| Bầu trời/không trung | Độ sáng; âm thanh; kiểu chuyển động | Mô tả cảm nhận, đứng yên/di chuyển thẳng/đổi hướng/không rõ; không suy ra vận tốc thật |
| Tâm linh/kỳ bí | Cách ghi nhận | Nhìn, nghe, cảm nhận, thiết bị ghi lại; có thể chọn nhiều |
| Tâm linh/kỳ bí | Biểu hiện; bối cảnh; dấu vết hoặc ảnh hưởng quan sát được | Mô tả cụ thể; nhãn nhóm không xác nhận nguyên nhân siêu nhiên |
| Tâm linh/kỳ bí | Có lặp lại không; số lần nếu biết | Gắn với lần quan sát đang báo cáo; các lần ở ngày/địa điểm khác có thể tạo Report khác |
| Tự nhiên/môi trường | Môi trường; phạm vi; diễn biến | Ví dụ trên mặt nước, xuất hiện theo vùng; phạm vi có thể mô tả bằng chữ |
| Tự nhiên/môi trường | Tác động; số đo bổ sung | Nếu có số đo: giá trị, đơn vị và cách đo/nguồn; phân biệt ước lượng với dụng cụ đo |
| Khác/chưa xác định | Đặc điểm bổ sung | Văn bản tùy chọn, dùng thời gian/vị trí/mô tả lõi để tra cứu |

Khi đổi nhóm, hệ thống thông báo các trường nhánh không còn áp dụng. Dữ liệu đã nhập được giữ trong phiên form để khôi phục nếu đổi lại, nhưng không gửi nhầm các trường ẩn của nhóm cũ vào Report mới.

### 5.4. Từng tệp và dữ liệu tự ghi nhận

| Dữ liệu | Ai cung cấp | Bắt buộc/điều kiện |
| --- | --- | --- |
| Chú thích tệp | User | Tùy chọn |
| Người tạo/nguồn và vai trò tư liệu | User | Có cho mỗi tệp; nguồn người khác phải có mô tả nguồn |
| Cách tiếp nhận | Hệ thống | Có; không cho đổi nhãn tệp thư viện thành “ghi trong ứng dụng” |
| Loại tệp thực tế, kích thước, hash, thời gian tiếp nhận | Máy chủ | Có sau khi nhận hoàn tất; không chỉ tin phần mở rộng hoặc giá trị client gửi |
| Thời gian ghi, thiết bị, thông số camera/audio/video | Thiết bị/tệp | Chỉ khi khả dụng; ghi rõ nguồn và trạng thái thiếu |
| GPS/hướng cảm biến và sai số | Thiết bị/tệp | Chỉ khi có dữ liệu; lưu riêng khỏi các giá trị khai báo |
| Tệp công khai, thumbnail, metadata công khai | Hệ thống | Được xử lý trước khi công khai, tuân thủ D05 |

Giá trị cảm biến chỉ là dữ liệu thiết bị cung cấp. Thông số khoảng cách, độ cao hoặc tốc độ thật của vật thể không được hệ thống tự điền từ một ảnh/video. Đọc metadata thất bại không đồng nghĩa media giả và không tự chặn Report nếu tệp vẫn xử lý an toàn được.

## 6. Luồng thay thế

| Mã | Điểm rẽ | Luồng và kết quả |
| --- | --- | --- |
| A01 | Bước 1, chưa đăng nhập | Chuyển đăng nhập; thành công quay lại form. Hủy đăng nhập thì chưa tạo Report |
| A02 | Bước 3, thiếu loại phù hợp | Chọn loại chưa xác định, nhập đề xuất nếu muốn; Report vẫn đăng được. Đề xuất gửi Admin theo chức năng riêng, không tự thêm loại hoặc chờ duyệt |
| A03 | Bước 4, không nhớ giờ | Chọn ngày/khoảng, đánh dấu ước lượng; không gán giờ 00:00 như một quan sát chính xác |
| A04 | Bước 5, từ chối GPS/không có GPS | Chọn điểm hoặc khu vực bằng tay. Cần có vị trí quan sát hợp lệ mới tiếp tục |
| A05 | Bước 5, chỉ biết khu vực | Lưu mã/tên khu vực, dùng điểm đại diện với nhãn “chỉ biết khu vực”; không bịa tọa độ gốc |
| A06 | Bước 8, không có media hoặc từ chối camera/microphone | Cho tải tệp sẵn có hoặc tiếp tục không media; không ảnh hưởng điều kiện đăng nếu phần lõi đủ |
| A07 | Bước 8, dùng web | Cho tải tệp; nhãn tải qua web. Không hứa thu cảm biến tại thời điểm quan sát từ một tệp tải sau đó |
| A08 | Bước 8–9, metadata khác khai báo | Hiển thị điểm khác biệt, cho sửa phần khai báo hoặc giữ kèm giải thích tùy chọn; lưu nguyên metadata, không tự kết luận gian lận |
| A09 | Bước 4–5, không đủ thời gian/vị trí người quan sát | Chưa cho đăng Report; hướng dẫn bổ sung hoặc chuyển sang tạo chủ đề tự do. Chỉ chuyển khi User chủ động chọn, mang theo nội dung phù hợp; không tự xuất bản |
| A10 | Bước 9, phát hiện vị trí riêng tư trong nội dung | User sửa mô tả/chú thích hoặc gỡ tệp trước khi gửi; xem lại bản công khai |
| A11 | Bất kỳ bước nhập nào, hủy | Nếu có dữ liệu chưa gửi, hỏi có rời form không; xác nhận thì thoát, không công khai gì |
| A12 | Bước 10, bấm gửi nhiều lần hoặc thử lại sau timeout | Dùng cùng mã lần gửi để tra kết quả; trả Report đã tạo nếu có, không tạo thêm thread/marker |

## 7. Luồng lỗi

| Mã | Lỗi | Phản hồi và cách phục hồi |
| --- | --- | --- |
| E01 | Thiếu trường, ngày kết thúc trước bắt đầu, thời điểm tương lai, tọa độ ngoài giới hạn | Chỉ rõ trường sai; giữ dữ liệu còn lại; sửa rồi gửi lại |
| E02 | Phiên hết hạn hoặc quyền đăng bị thu hồi trước khi gửi | Yêu cầu đăng nhập lại hoặc thông báo tài khoản không được đăng; không tạo nội dung công khai |
| E03 | Upload gián đoạn, tệp quá giới hạn, định dạng/codec không xử lý được hoặc xử lý bản công khai thất bại | Chỉ rõ tệp lỗi; cho thử lại/thay/gỡ. Chỉ đăng khi mọi tệp được giữ đã sẵn sàng; không âm thầm bỏ tệp lỗi |
| E04 | Không đọc được metadata hoặc cảm biến không hỗ trợ | Gắn nhãn không có dữ liệu tương ứng; tiếp tục nếu xử lý tệp và phần lõi hợp lệ |
| E05 | Bản đồ nền/geocoding lỗi | Cho chọn khu vực từ danh mục nếu còn hoạt động; nếu không thể xác nhận bất kỳ vị trí hợp lệ nào thì giữ form và cho thử lại |
| E06 | Loại quan sát vừa ngừng hoạt động | Tải lại danh mục, yêu cầu chọn loại đang hoạt động/chưa xác định; giữ nội dung đã nhập |
| E07 | Lưu Report/thread thất bại | Không để trạng thái công khai một phần; giữ mã lần gửi để kiểm tra và thử lại |
| E08 | Máy chủ lưu thành công nhưng client không nhận phản hồi | Client đối chiếu mã lần gửi; mở Report đã có nếu tìm thấy. Trong lúc chưa xác định kết quả, không tự tạo lần gửi mới |
| E09 | Vượt giới hạn gửi của hệ thống | Thông báo thời điểm có thể thử lại, giữ form; giới hạn chống spam được cấu hình riêng |

## 8. Quy tắc nghiệp vụ

| Mã | Quy tắc |
| --- | --- |
| BR-R01 | Một lần gửi thành công tạo một Report và một report thread; thao tác retry của cùng lần gửi không tạo bản sao |
| BR-R02 | Một Report đại diện một lần quan sát; các người dùng khác báo cùng hiện tượng vẫn có Report riêng |
| BR-R03 | Vị trí người quan sát bắt buộc; GPS chính xác và vị trí hiện tượng tùy chọn |
| BR-R04 | Media và trường nhánh không bắt buộc; độ đầy đủ không được biến thành điểm thật/giả |
| BR-R05 | Không tự chuyển nguồn trực tiếp/gián tiếp dựa trên việc dùng camera hay tải tệp |
| BR-R06 | Tạo nội dung công khai sau kiểm tra kỹ thuật; không có bước Admin duyệt trước |
| BR-R07 | Không tạo Event, không đề nghị gộp Report trong luồng đăng; gợi ý Report liên quan chưa thuộc use case này |
| BR-R08 | Dữ liệu private không xuất hiện trong API công khai, tệp công khai, thumbnail hay lịch sử công khai |
| BR-R09 | Tọa độ chính xác chỉ dùng theo quyền; truy vấn public map dùng dữ liệu vị trí công khai nhất quán |
| BR-R10 | Một loại phân loại chính thuộc kho Admin; đề xuất loại mới không chặn việc đăng |
| BR-R11 | User chỉ sửa trường khai báo trong form, không sửa metadata gốc hoặc nhãn tiếp nhận để tạo cảm giác tệp được hệ thống xác minh |
| BR-R12 | Chưa triển khai suy luận khoảng cách, vận tốc, chân giả hoặc nguyên nhân siêu nhiên trong bước đăng |

## 9. Tiêu chí nghiệm thu

Đây là kịch bản kiểm thử cho triển khai sau này, chưa phải kết quả test một ứng dụng đã có.

| Mã | Tình huống | Kết quả mong đợi |
| --- | --- | --- |
| AC-R01 | User nhập đủ lõi, không media, không trường nhánh | Đăng thành công; một Report `PUBLIC`, một thread `OPEN` |
| AC-R02 | Từ chối GPS nhưng chọn khu vực quan sát | Đăng thành công; vị trí công khai có nhãn khu vực; không có GPS giả |
| AC-R03 | Để trống vị trí người quan sát nhưng có vị trí hiện tượng | Bị yêu cầu bổ sung vị trí người quan sát |
| AC-R04 | Báo cáo gián tiếp từ nguồn online | Yêu cầu nguồn và thông tin quan sát; hiển thị gián tiếp; không lấy GPS người đăng lại |
| AC-R05 | Báo cáo trực tiếp có video tự quay và ảnh báo chí tham khảo | Mỗi tệp có nguồn, vai trò riêng; Report vẫn giữ nguồn trực tiếp |
| AC-R06 | Ghi trong app nhưng không có ISO/hướng thiết bị | Đăng được nếu các điều kiện khác hợp lệ; metadata thiếu không hiện là 0 |
| AC-R07 | Upload tệp chứa GPS chính xác | GPS gốc chỉ xem theo quyền; API/ảnh/video/thumbnail công khai không tiết lộ tọa độ gốc |
| AC-R08 | Chỉ nhớ ngày, chọn múi giờ | Hiển thị đúng “chỉ nhớ ngày”; map lọc theo ngày đó, không theo ngày đăng |
| AC-R09 | Thiếu loại phù hợp | Chọn chưa xác định và đề xuất loại mới; đăng không chờ Admin |
| AC-R10 | Một trong nhiều tệp lỗi | Chưa công khai Report; User thử lại hoặc chủ động gỡ tệp, sau đó gửi thành công |
| AC-R11 | Bấm gửi hai lần/timeout sau commit | Tra cùng mã lần gửi trả về cùng một Report/thread |
| AC-R12 | Lưu thread lỗi | Không có Report hay marker công khai một phần |
| AC-R13 | Camera ở hiện trường A, đăng lại sau khi về B | User xác nhận A; hệ thống không thay bằng GPS hiện tại B |
| AC-R14 | Đổi nhóm sau khi nhập trường nhánh | Chỉ trường nhánh hiện tại được gửi; đổi lại trong phiên có thể khôi phục dữ liệu đã nhập |
| AC-R15 | Hai người báo cùng hiện tượng | Hai Report riêng; bản đồ có thể gom cụm hiển thị nhưng không hợp nhất |
| AC-R16 | Report có thời gian cách đây hơn 30 ngày | Đăng được; “Xem trên bản đồ” mở Report đó với bộ lọc phù hợp, không báo đăng lỗi vì bộ lọc mặc định |
| AC-R17 | Tệp gốc có quyền truy cập nhưng Report bị Moderator ẩn | Người không có quyền không xem được thread/media qua URL cũ; kiểm duyệt không bị vượt qua bởi link từ trang đăng thành công |
| AC-R18 | Nội dung không biết thời gian hoặc khu vực quan sát | Không đăng Report; có đường sang tạo discussion, không tự tạo marker |

## 10. Điểm bàn giao cho thiết kế

Thiết kế UI cần có form lõi + nhánh, chọn hai vị trí có nhãn khác nhau, xem trước bản công khai, trạng thái từng tệp và tiến trình gửi. Thiết kế API/database cần bảo đảm liên kết một-một Report–thread, xử lý gửi trùng, tách dữ liệu private/public và lưu mức chính xác thời gian/vị trí. Chọn framework, SDK bản đồ và camera thuộc bước thiết kế kỹ thuật sau khi duyệt nghiệp vụ.
