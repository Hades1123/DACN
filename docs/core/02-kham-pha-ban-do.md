# UC-MAP-01 — Khám phá báo cáo trên bản đồ

> Bản đặc tả để duyệt ngày 26/09/2026. Áp dụng cùng [Quy ước cốt lõi](00-quy-uoc-cot-loi.md) và dữ liệu đầu ra của [Đăng báo cáo](01-dang-bao-cao.md). Các mặc định D01–D10 là đề xuất.

## 1. Thông tin use case

| Thuộc tính | Nội dung |
| --- | --- |
| Mục tiêu | Tìm Report theo vị trí quan sát, thời gian và phân loại; xem tóm tắt rồi mở thread thảo luận |
| Actor chính | Guest hoặc User |
| Thành phần hỗ trợ | Dịch vụ bản đồ nền/tìm địa danh, dịch vụ truy vấn Report công khai, vị trí thiết bị nếu người dùng yêu cầu |
| Kích hoạt | Chọn “Bản đồ”, “Xem trên bản đồ” từ Report hoặc mở liên kết đến Report trên bản đồ |
| Nền tảng | Mobile và web; mobile có bảng kết quả phía dưới, web có thể dùng bảng bên cạnh |
| Ưu tiên | Cốt lõi |
| Phạm vi | Tra cứu và điều hướng; không tạo Event, không chỉnh Report hoặc xác nhận nhiều Report cùng hiện tượng |

## 2. Điều kiện và kết quả

**Tiền điều kiện:** được truy cập chức năng công khai; có kết nối để tải dữ liệu mới. Đăng nhập và quyền vị trí hiện tại không phải điều kiện để xem bản đồ. Không có Report nào cũng là trạng thái hợp lệ.

**Hậu điều kiện thành công:** người dùng nhìn thấy các Report `PUBLIC` phù hợp vùng nhìn/bộ lọc qua marker/cụm và danh sách; có thể mở đúng report thread. Nội dung Report không thay đổi sau khi xem.

**Bảo đảm khi lỗi:** không mở quyền dữ liệu private; lỗi truy vấn không được trình bày như “không có báo cáo”. Trạng thái vùng nhìn và bộ lọc được giữ để thử lại.

## 3. Nội dung được hiển thị

| Nội dung | Có trên map không? | Quy tắc |
| --- | --- | --- |
| Report công khai, thread mở | Có nếu khớp truy vấn | Marker tại vị trí công khai của người quan sát |
| Report công khai, thread khóa | Có nếu khớp truy vấn | Gắn nhãn khóa trả lời; khóa không đồng nghĩa nội dung sai |
| Report bị ẩn hoặc xóa | Không | Không có marker, không tính vào cụm/tổng kết quả; URL cũ kiểm tra lại quyền |
| Form/tệp đang chuẩn bị đăng | Không | Chưa phải Report công khai |
| Discussion thread | Không | Có thể liên kết Report nhưng không tạo marker riêng |
| Report có thêm vị trí hiện tượng | Một Report/một marker chính | Không tăng số lượng vì có hai vị trí; xem vị trí hiện tượng trong chi tiết với nhãn riêng |

Bản đồ thể hiện **nơi người dùng hoặc thiết bị ghi nhận quan sát**, theo mức chi tiết được công khai. Không gọi marker là tọa độ chính xác của UFO hoặc nơi chắc chắn đã xảy ra hiện tượng.

## 4. Luồng chính

| Bước | Người dùng | Hệ thống |
| --- | --- | --- |
| 1 | Chọn “Bản đồ” | Mở vùng Việt Nam, hiển thị chú giải “Vị trí người quan sát” và bộ lọc mặc định |
| 2 | Chờ tải | Tải Report công khai trong vùng nhìn và 30 ngày lịch gần nhất gồm hôm nay theo giờ Việt Nam; hiển thị trạng thái đang tải |
| 3 | Quan sát kết quả | Hiển thị marker/cụm, số Report khớp, danh sách trang đầu; phân biệt vị trí gần đúng và điểm đại diện khu vực |
| 4 | Kéo/zoom hoặc tìm địa danh | Cập nhật vùng nhìn và truy vấn sau khi bản đồ dừng di chuyển; giữ các bộ lọc đã chọn |
| 5 | Đặt bộ lọc và chọn “Áp dụng” | Kiểm tra điều kiện, đưa danh sách về trang đầu; cập nhật marker, cụm, tổng và danh sách theo cùng một truy vấn |
| 6 | Chọn cụm Report | Phóng đến phạm vi cụm khi các điểm còn có thể tách; nếu trùng điểm hoặc đã zoom tối đa thì mở danh sách thành viên có phân trang |
| 7 | Chọn marker hoặc một Report trong danh sách | Hiện thẻ tóm tắt với nguồn, thời gian, phân loại, mức chính xác vị trí, media khả dụng và số phản hồi |
| 8 | Chọn “Xem báo cáo và thảo luận” | Kiểm tra Report còn công khai, mở đúng report thread |
| 9 | Quay lại bản đồ | Khôi phục vùng nhìn/bộ lọc; tải lại dữ liệu để phản ánh nội dung mới bị ẩn/xóa hoặc chỉnh sửa |

Không tự xin GPS ở bước 1. Chỉ xin quyền khi người dùng chọn “Vị trí của tôi”. Trình tự tải nền và Report có thể độc lập, nhưng lỗi từng phần phải có thông báo riêng.

## 5. Bộ lọc, tìm kiếm và sắp xếp

| Thành phần | Giá trị đề xuất | Cách hoạt động |
| --- | --- | --- |
| Thời gian quan sát | 30 ngày gần nhất / 7 ngày / tất cả / khoảng tùy chọn | Lọc theo thời gian quan sát, không theo ngày đăng; khoảng tùy chọn cho chọn ngày và giờ nếu cần |
| Nhóm hiện tượng | Một hoặc nhiều nhóm / tất cả | Bao gồm bầu trời, tâm linh, tự nhiên, khác |
| Loại quan sát | Một hoặc nhiều loại / tất cả loại trong nhóm | Danh sách loại phụ thuộc nhóm đã chọn |
| Nguồn Report | Trực tiếp / gián tiếp / tất cả | Dùng nguồn Report, không dùng nhãn tải media |
| Media | Tất cả / có media / không có media | “Có” khi có ít nhất một tệp công khai đã sẵn sàng; URL nguồn đơn thuần không tính là media |
| Quyền trả lời | Tất cả / đang mở / đã khóa | Dùng trạng thái thread, không biểu thị kết luận đúng/sai |
| Tìm địa danh | Tên khu vực hoặc địa danh | Chọn kết quả để di chuyển vùng nhìn; tìm địa danh không tự tạo Report |
| Vị trí của tôi | Theo yêu cầu | Xin GPS để đưa bản đồ về vị trí hiện tại; không biến thành vị trí của Report bất kỳ |
| Sắp xếp danh sách | Thời gian quan sát mới nhất; tùy chọn đăng mới nhất | Giữ thứ tự ổn định với mã Report làm điều kiện phụ |

Các nhóm bộ lọc kết hợp bằng AND; nhiều giá trị trong cùng một bộ lọc kết hợp bằng OR. Khi đổi nhóm, loại không còn thuộc nhóm được bỏ chọn và giao diện thông báo. “Xóa bộ lọc” về mặc định 30 ngày, tất cả nhóm/nguồn/media/trạng thái, giữ vùng nhìn hiện tại.

Khoảng thời gian được chuẩn hóa theo đầu khoảng bao gồm, cuối khoảng không bao gồm. Chọn đến ngày D bao gồm cả ngày D bằng cách lấy trước đầu ngày kế tiếp. Thời điểm chính xác khớp nếu nằm trong khoảng; Report chỉ nhớ ngày/khoảng khớp khi có giao nhau. Report đang tiếp diễn được xét đến thời điểm hiện tại. Thẻ kết quả luôn giữ nhãn ước lượng để tránh hiểu thành khớp chính xác.

Khi sắp xếp theo thời gian quan sát, dùng đầu khoảng quan sát làm khóa cho Report chỉ có ngày/khoảng; trình bày nguyên khoảng trên UI. Đây là quy tắc sắp xếp, không chuyển thời gian không chắc chắn thành giờ chính xác.

Tìm theo từ khóa toàn văn, lọc bán kính quanh một điểm và xếp hạng Report liên quan không nằm trong bản đặc tả này; có thể đặc tả thêm sau. Use case hiện tại dùng vùng nhìn, thời gian và phân loại để khám phá.

## 6. Marker, cụm và vị trí gần đúng

### 6.1. Vị trí đủ chi tiết để công khai thành điểm

Marker dùng `public_observer_location`. Nếu điểm đã giảm chi tiết bằng ô lưới, thẻ ghi “Vị trí quan sát gần đúng”; khi chọn có thể hiển thị ô công khai để giải thích phạm vi. Zoom lớn không được mở ra tọa độ gốc.

### 6.2. Chỉ biết khu vực

Dùng điểm đại diện khu vực với kiểu marker/nhãn khác, ví dụ “Chỉ biết khu vực: Đà Nẵng”. Khi chọn, hiển thị phạm vi khu vực nếu có dữ liệu ranh giới. Không gọi điểm này là nơi người quan sát chắc chắn đã đứng và không vẽ vòng sai số GPS giả.

**Đề xuất quy tắc truy vấn thống nhất:** lọc vùng nhìn theo điểm công khai, bao gồm điểm đại diện khu vực; danh sách và marker sử dụng cùng quy tắc. Với Report chỉ biết khu vực, điểm đại diện có thể nằm ngoài vùng nhìn khi người dùng zoom vào một góc khu vực. Chú giải cần giải thích và cho thu nhỏ để xem toàn khu vực. Không diễn giải bản đồ này như danh sách đầy đủ mọi quan sát trong một bán kính chính xác.

### 6.3. Gom cụm và điểm chồng nhau

- Gom cụm theo khoảng cách hiển thị và mức zoom; thuật toán cụ thể chọn ở thiết kế kỹ thuật.
- Số trên cụm là **số Report**, tính mỗi Report một lần. Không phải số hiện tượng, nhân chứng, media hay mức tin cậy.
- Thành viên cụm phải khớp bộ lọc hiện tại; không gộp cả Report đang bị ẩn.
- Khi có nhiều phân loại trong cụm, dùng ký hiệu cụm trung lập; không gán toàn bộ cụm theo một phân loại bất kỳ.
- Khi zoom đến mức tối đa mà nhiều Report vẫn trùng điểm công khai, mở danh sách cụm có phân trang. Người dùng phải mở được từng Report.
- Việc chọn/xem cụm không tạo bản ghi Event hoặc sửa quan hệ giữa các Report.

## 7. Thẻ tóm tắt và danh sách

Thẻ Report gồm tiêu đề, nhóm/loại, thời gian quan sát và mức chính xác, nhãn trực tiếp/gián tiếp, tên khu vực quan sát công khai, nhãn vị trí, một thumbnail nếu có, số media công khai, số phản hồi công khai và trạng thái khóa trả lời. Có nút mở report thread. Không hiển thị địa chỉ riêng hoặc metadata GPS gốc trong tooltip/thẻ.

Danh sách hiển thị 20 Report/trang theo D09. Đổi vùng nhìn hoặc bộ lọc đưa về trang đầu. Chuyển trang danh sách không làm các marker của Report ở trang khác biến mất; marker/cụm đại diện toàn bộ tập khớp trong vùng nhìn. Khi mở danh sách một cụm, giao diện ghi rõ đang xem thành viên của cụm và có cách quay lại danh sách vùng nhìn.

Hệ thống dùng truy vấn giới hạn theo vùng nhìn và cơ chế tổng hợp phù hợp, không tải mọi Report của toàn hệ thống về client để rồi cắt còn 20. Nếu dịch vụ cần giới hạn kết quả, phải trả trạng thái giới hạn và hướng dẫn thu hẹp vùng/lọc; không âm thầm cắt dữ liệu rồi hiển thị số như toàn bộ kết quả.

## 8. Luồng thay thế và lỗi

| Mã | Tình huống | Xử lý |
| --- | --- | --- |
| A01 | Guest mở bản đồ | Dùng chức năng tra cứu bình thường; chỉ yêu cầu đăng nhập khi chuyển sang hành động cần tài khoản |
| A02 | Chọn “Vị trí của tôi”, từ chối quyền hoặc GPS lỗi | Giữ vùng nhìn hiện tại, thông báo không lấy được vị trí; cho kéo map hoặc tìm địa danh |
| A03 | Mở từ Report/liên kết Report | Kiểm tra công khai, đưa về vị trí công khai và mở thẻ; nếu bộ lọc loại Report này ra thì đặt lại các điều kiện xung đột để gồm Report, thông báo trên UI |
| A04 | Không có kết quả | Hiện trạng thái rỗng kèm vùng/bộ lọc; gợi ý mở rộng thời gian, đổi khu vực hoặc xóa lọc; không tự bỏ bộ lọc |
| A05 | Cụm không tách thêm được | Mở danh sách thành viên phân trang, từng dòng dẫn đến một Report độc lập |
| A06 | Report có thêm vị trí hiện tượng | Vẫn một marker chính; xem vị trí hiện tượng ở trang chi tiết dưới nhãn riêng |
| A07 | Report bị ẩn/xóa sau khi tải bản đồ | Kiểm tra lại khi mở thẻ/chi tiết/media; thông báo không còn khả dụng, loại khỏi kết quả và cập nhật cụm |
| E01 | Bản đồ nền tải lỗi nhưng dữ liệu Report còn truy cập được | Thông báo lỗi nền, cho xem danh sách theo vùng truy vấn đã có; cho thử tải lại bản đồ |
| E02 | Dịch vụ Report lỗi/mất mạng | Hiện lỗi và nút thử lại; dữ liệu cũ nếu còn trên màn hình phải ghi “chưa cập nhật”, không thay bằng tổng 0 |
| E03 | Phản hồi truy vấn cũ đến sau truy vấn mới | Bỏ kết quả cũ, chỉ hiển thị dữ liệu của vùng/bộ lọc hiện tại |
| E04 | Thời gian lọc không hợp lệ | Chỉ rõ lỗi, không chạy truy vấn mới cho đến khi sửa |
| E05 | Tìm địa danh không có kết quả hoặc dịch vụ lỗi | Phân biệt không tìm thấy với lỗi; giữ map và cho nhập lại/chọn bằng tay |
| E06 | Trang danh sách rỗng vì Report vừa bị ẩn/xóa | Làm mới tổng và điều hướng về trang hợp lệ; không trả nội dung đã bị ẩn để lấp trang |
| E07 | Bộ lọc từ URL chứa giá trị không hợp lệ | Kiểm tra và thông báo phần cần đặt lại; không lỗi toàn màn hình hoặc gửi truy vấn không giới hạn |

Khi mất mạng, nội dung đã tải không thể được bảo đảm cập nhật tức thì theo quyết định kiểm duyệt mới. Không cung cấp tải xuống bản đồ/Report để dùng offline trong use case này; khi kết nối lại phải lấy trạng thái hiện tại trước khi mở nội dung mới.

## 9. Quy tắc nghiệp vụ và dữ liệu trả về

| Mã | Quy tắc |
| --- | --- |
| BR-M01 | Chỉ Report `PUBLIC` tham gia tập kết quả và số đếm |
| BR-M02 | Marker chính dùng vị trí người quan sát công khai; không dùng GPS gốc hoặc vị trí hiện tượng để âm thầm thay thế |
| BR-M03 | Mỗi Report đếm một lần; số cụm không thể dùng làm số hiện tượng thật hoặc số người quan sát độc lập |
| BR-M04 | Map, tổng kết quả và danh sách dùng cùng bộ lọc/vùng nhìn tại lần truy vấn; không lấy marker từ riêng trang danh sách |
| BR-M05 | Lọc không gian và tính cụm dùng tọa độ công khai, tránh tiết lộ tọa độ gốc qua cách truy vấn |
| BR-M06 | Lọc thời gian theo quan sát; nhãn thời gian ước lượng không bị mất khi lọc/sắp xếp |
| BR-M07 | Khóa thread không xóa marker; ẩn/xóa Report loại cả marker, chi tiết công khai và media |
| BR-M08 | Endpoint public chỉ trả dữ liệu công khai. Không gửi GPS gốc xuống client rồi ẩn bằng giao diện |
| BR-M09 | Truy cập thẻ/thread/media kiểm tra trạng thái công khai hiện tại; cache phải được vô hiệu hóa hoặc chặn tại bước đọc khi Report bị ẩn |
| BR-M10 | Màu/icon dùng phân loại và dạng vị trí, không dùng như điểm tin cậy |

Dữ liệu bản đồ tối thiểu gồm mã Report hoặc mã cụm, tọa độ công khai, loại điểm, số Report nếu là cụm và phạm vi cụm để zoom. Dữ liệu chi tiết thẻ được lấy khi cần. Không đưa tệp gốc, toàn bộ metadata hay mọi reply vào phản hồi tải marker.

## 10. Tiêu chí nghiệm thu

Các kịch bản sau là tiêu chí cho giai đoạn triển khai; chưa có số liệu kiểm thử hiệu năng thực tế.

| Mã | Tình huống | Kết quả mong đợi |
| --- | --- | --- |
| AC-M01 | Guest mở lần đầu | Thấy vùng Việt Nam, 30 ngày gần nhất và chú giải; không bắt đăng nhập/GPS |
| AC-M02 | Nhiều Report gần nhau, gồm cả hai nguồn | Tạo cụm; số đếm bằng số Report khớp; các Report vẫn độc lập |
| AC-M03 | Nhiều Report dùng cùng điểm khu vực/ô lưới | Zoom tối đa vẫn mở được danh sách từng Report có phân trang |
| AC-M04 | Report có cả hai vị trí | Một marker chính ở vị trí người quan sát công khai; không tăng đôi số đếm |
| AC-M05 | Report chỉ biết khu vực | Marker/thẻ ghi rõ điểm đại diện, không giả làm GPS; thu nhỏ vùng có thể tìm lại theo quy tắc mục 6.2 |
| AC-M06 | Lọc nhóm + nguồn + thời gian | Marker, số đếm, cụm và danh sách cùng khớp điều kiện AND/OR đã định |
| AC-M07 | Một Report đăng hôm nay nhưng quan sát năm trước | Không có trong bộ lọc quan sát 30 ngày; có khi chọn thời gian phù hợp |
| AC-M08 | Report chỉ nhớ ngày hoặc một khoảng giao với khoảng lọc | Có trong kết quả; giữ nhãn ước lượng/chỉ nhớ ngày |
| AC-M09 | Report ở sát ranh giới ngày trong múi giờ Việt Nam | Kết quả theo ngày địa phương đã chọn; không lệch ngày do chuyển UTC |
| AC-M10 | Đổi trang danh sách từ 1 sang 2 | Map vẫn đại diện toàn bộ tập khớp; không chỉ còn marker của trang 2 |
| AC-M11 | Khóa thread của Report công khai | Marker vẫn có; thẻ hiển thị khóa trả lời |
| AC-M12 | Moderator ẩn Report sau khi người xem tải map | Truy cập mới vào thẻ/thread/media bị chặn; làm mới cụm bỏ Report đó |
| AC-M13 | Kiểm tra API public, tệp công khai và zoom sát marker | Không có GPS gốc, địa chỉ chi tiết hoặc link gốc không kiểm soát quyền |
| AC-M14 | Mất mạng hoặc lỗi dịch vụ dữ liệu | Hiện lỗi, không hiển thị “0 báo cáo” như kết quả truy vấn thành công |
| AC-M15 | Kéo map liên tục, kết quả cũ về sau | Chỉ kết quả của truy vấn mới nhất được áp dụng |
| AC-M16 | Mở “Xem trên bản đồ” từ Report cũ/khác bộ lọc | Điều chỉnh bộ lọc xung đột có thông báo, mở đúng Report; không dùng vị trí private |
| AC-M17 | Chủ đề tự do liên kết ba Report | Không có marker thứ tư; ba Report hiển thị theo điều kiện riêng |
| AC-M18 | Từ chối quyền vị trí hiện tại | Vẫn tìm địa danh, kéo map, lọc và xem Report được |
| AC-M19 | Report bị xóa là phần tử cuối ở trang cuối | Tổng cập nhật và chuyển về trang còn hợp lệ; không mắc kẹt ở trang rỗng |
| AC-M20 | Tập dữ liệu lớn hơn một trang danh sách | Không cắt số cụm theo trang; nếu đạt giới hạn truy vấn phải báo rõ và yêu cầu thu hẹp |

## 11. Chuẩn bị kiểm thử và thiết kế kỹ thuật

Chuẩn bị dữ liệu mẫu gồm các Report ở gần nhau, trùng điểm công khai, chỉ biết khu vực, khác múi giờ, quan sát cũ nhưng mới đăng, thiếu media, hai vị trí khác nhau và các trạng thái công khai/ẩn/xóa/khóa. Dữ liệu demo phải gắn nhãn dữ liệu mẫu, không trình bày như quan sát có thật.

Sau khi chọn công nghệ và quy mô dữ liệu dự kiến, nhóm cần đặt mục tiêu thời gian phản hồi, kích thước dữ liệu truyền và số người dùng đồng thời để đo hiệu năng truy vấn/cluster. Các chỉ tiêu này chưa được xác định trong trao đổi, nên bản đặc tả chưa tuyên bố ngưỡng hiệu năng đã đạt.
