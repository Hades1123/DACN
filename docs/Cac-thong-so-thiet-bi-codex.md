## Kết luận ngắn

**Có, metadata giúp chuyên gia phân tích tốt hơn rất nhiều**, đặc biệt để:

- Phát hiện hiện tượng do rung máy, phơi sáng, zoom số, nén video hoặc lỗi cảm biến;
- Ước lượng hướng quan sát và chuyển động biểu kiến;
- Đối chiếu với máy bay, vệ tinh, thời tiết và báo cáo khác;
- Biết giới hạn của hình ảnh trước khi đưa ra nhận định.

Tuy nhiên, danh sách trong [Goi-y-cau-truc-FAIR-Gemini.md](/home/hades/code/project/dacn/docs/Goi-y-cau-truc-FAIR-Gemini.md) đang trộn ba loại dữ liệu:

1. Dữ liệu smartphone có thể tự động thu thập;
2. Dữ liệu chỉ lấy được trên một số thiết bị;
3. Dữ liệu không thể xác định từ một smartphone thông thường.

Vì vậy, JSON mẫu hiện tại **chưa thể triển khai nguyên trạng**.

---

# 1. Những dữ liệu khả thi

| Dữ liệu                         |             Khả thi | Lưu ý                                               |
| ------------------------------- | ------------------: | --------------------------------------------------- |
| Thời gian bắt đầu/kết thúc      |             Rất cao | Lưu cả thời gian thiết bị và máy chủ                |
| Kinh độ, vĩ độ người quan sát   |                 Cao | Cần lưu cả độ chính xác GPS                         |
| Độ cao của người quan sát       |          Trung bình | Sai số thường lớn hơn tọa độ ngang                  |
| Hướng camera theo phương ngang  |          Trung bình | Dùng la bàn, cần lưu sai số                         |
| Góc ngẩng camera                |          Trung bình | Ước lượng từ accelerometer/gyroscope                |
| Hãng và model điện thoại        |                 Cao | Android/iOS đều cung cấp                            |
| Camera trước/sau, loại ống kính |                 Cao | Có thể biết camera đang được sử dụng                |
| Tiêu cự                         |                 Cao | Android Camera2 và EXIF hỗ trợ                      |
| ISO                             | Cao hoặc trung bình | Phụ thuộc thiết bị và API camera                    |
| Thời gian phơi sáng             | Cao hoặc trung bình | Có thể lấy từ kết quả capture/EXIF                  |
| Khẩu độ                         |          Trung bình | Nhiều điện thoại có khẩu độ cố định                 |
| Mức zoom                        |                 Cao | Cần phân biệt zoom quang và zoom số                 |
| Độ phân giải                    |                 Cao | Lấy trực tiếp từ tệp                                |
| Framerate video                 |                 Cao | Lấy từ cấu hình quay/tệp video                      |
| Codec, bitrate                  |                 Cao | Lấy từ container video                              |
| Hướng xoay thiết bị             |                 Cao | Portrait/landscape và orientation                   |
| Chế độ HDR/flash/chống rung     |          Trung bình | App biết chế độ yêu cầu, thiết bị có thể xử lý thêm |
| EXIF của ảnh                    |                 Cao | Nếu chụp trực tiếp và app giữ metadata              |
| Mã băm tệp gốc                  |                 Cao | Tạo sau khi máy chủ nhận tệp                        |

Android Camera2 cung cấp những trường như exposure time, ISO, focal length, crop region và trong một số thiết bị có cả noise profile. Tuy nhiên, nhiều trường là tùy chọn và phụ thuộc mức hỗ trợ camera. [Android Camera2 CaptureResult](https://developer.android.com/reference/android/hardware/camera2/CaptureResult)

Android cũng hỗ trợ đọc các trường EXIF như focal length, ISO, exposure time, khẩu độ và digital zoom. [Android ExifInterface](https://developer.android.com/reference/androidx/exifinterface/media/ExifInterface)

Trên iOS, ảnh chụp có thể chứa orientation và các thuộc tính EXIF; một số chế độ chụp còn cung cấp dữ liệu hiệu chỉnh camera. [Apple AVCapturePhoto metadata](https://developer.apple.com/documentation/avfoundation/avcapturephoto/metadata), [Apple AVCameraCalibrationData](https://developer.apple.com/documentation/avfoundation/avcameracalibrationdata)

---

# 2. Dữ liệu lấy được nhưng phải kèm sai số

## Vị trí

Không nên chỉ lưu:

```json
{
  "latitude": 10.762622,
  "longitude": 106.660172
}
```

Nên lưu:

```json
{
  "latitude": 10.762622,
  "longitude": 106.660172,
  "altitude_m": 15.5,
  "horizontal_accuracy_m": 8.2,
  "vertical_accuracy_m": 19.0,
  "measured_at": "2026-09-20T13:12:00.123Z",
  "is_mock_location": false
}
```

Android xác nhận vị trí có latitude, longitude, timestamp và horizontal accuracy; altitude, bearing và vertical accuracy có thể không tồn tại. Android cũng cho biết vị trí giả lập có thể được đưa vào hệ thống. [Android Location](https://developer.android.com/reference/android/location/Location)

Vì vậy, GPS là một phép đo có sai số, không phải tọa độ tuyệt đối.

## Hướng quan sát

Hướng camera nên được lưu cùng:

- Hướng theo Bắc từ;
- Hướng theo Bắc thật nếu có;
- Sai số hướng;
- Orientation của điện thoại;
- Thời điểm đo;
- Dữ liệu rotation vector;
- Trạng thái hiệu chỉnh la bàn.

Ví dụ:

```json
{
  "azimuth_deg": 45.2,
  "azimuth_reference": "TRUE_NORTH",
  "heading_accuracy_deg": 12.0,
  "elevation_deg": 31.4,
  "roll_deg": 2.1,
  "measured_at": "2026-09-20T13:12:00.150Z"
}
```

iOS cung cấp `magneticHeading`, `trueHeading`, `headingAccuracy` và timestamp. [Apple CLHeading](https://developer.apple.com/documentation/corelocation/clheading)

Một giá trị hướng duy nhất chưa đủ cho video vì người quay có thể lia máy. Nên lưu **chuỗi tư thế thiết bị theo thời gian**, chẳng hạn 10 mẫu/giây, rồi đồng bộ với timestamp của video.

---

# 3. Những dữ liệu không thể lấy đáng tin cậy từ smartphone thông thường

| Dữ liệu trong file                 | Vấn đề                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------- |
| Model cảm biến kiểu `Sony IMX...`  | Hệ điều hành thường không công khai chính xác linh kiện cảm biến          |
| Nhiệt độ cảm biến camera           | Thường không có API công khai                                             |
| Tỷ lệ lỗi của cảm biến             | Không có giá trị chuẩn cho từng lần quay                                  |
| Noise characteristics đầy đủ       | Chỉ một số thiết bị hoặc chế độ RAW cung cấp                              |
| Độ nhạy quang phổ chính xác        | Cần tài liệu hiệu chuẩn của cảm biến                                      |
| Multispectral/hyperspectral        | Camera RGB điện thoại thông thường không phải thiết bị quang phổ khoa học |
| Khoảng cách tới vật thể            | Không suy ra được từ một video đơn mắt khi không biết kích thước thật     |
| Độ cao của vật thể                 | Cần khoảng cách hoặc nhiều điểm quan sát                                  |
| Vận tốc thật của vật thể           | Cần khoảng cách; video đơn lẻ chủ yếu cho vận tốc góc                     |
| Camera đã được hiệu chuẩn khoa học | Camera nhà sản xuất không mặc nhiên là thiết bị đo đã hiệu chuẩn          |
| Độ lớn âm thanh vật lý             | Microphone điện thoại không được hiệu chuẩn như sound level meter         |

Đặc biệt phải phân biệt:

```text
observer_altitude
```

là độ cao của **người quan sát**, có thể lấy từ thiết bị;

```text
object_altitude
```

là độ cao của **vật thể**, thường không thể biết.

Tương tự:

- Có thể tính vật thể di chuyển bao nhiêu pixel mỗi giây;
- Có thể ước lượng vận tốc góc theo độ/giây nếu biết trường nhìn;
- Không thể suy ra vận tốc km/h nếu không biết khoảng cách.

---

# 4. Metadata giúp chuyên gia phân tích được những gì?

## 4.1. Phân biệt chuyển động của vật thể với chuyển động của camera

Nếu video cho thấy đốm sáng di chuyển nhanh, chuyên gia cần biết:

- Điện thoại có đang lia hay rung không;
- Chống rung điện tử có đang hoạt động không;
- Camera sử dụng zoom bao nhiêu;
- Tiêu cự và trường nhìn là bao nhiêu;
- Dữ liệu gyroscope tại thời điểm đó.

Nếu đốm sáng di chuyển đồng thời với chuyển động camera hoặc thay đổi do chống rung điện tử, nó có thể là artifact thay vì chuyển động thật.

## 4.2. Giải thích vệt sáng

Một đốm sáng có thể thành vệt dài do:

- Thời gian phơi sáng dài;
- Night mode ghép nhiều khung hình;
- Người dùng rung hoặc lia máy;
- Đối tượng thông thường đang di chuyển;
- Rolling shutter.

Biết exposure time, ISO, chế độ chụp và chuyển động thiết bị giúp kiểm tra các khả năng này.

## 4.3. Đánh giá kích thước biểu kiến

Nếu có:

- Tiêu cự;
- Kích thước vùng cảm biến;
- Crop;
- Zoom;
- Kích thước khung hình;

thì có thể ước lượng trường nhìn và kích thước góc của vật thể.

Kết quả hợp lệ sẽ là:

> Vật thể chiếm khoảng 0,3° trong trường nhìn.

Chưa thể kết luận:

> Vật thể rộng 10 mét.

Muốn tính kích thước vật lý cần biết khoảng cách.

## 4.4. Phát hiện artifact do nén

Báo cáo NASA đưa ra ví dụ một vật thể dường như có vệt khí động học, sau đó được đánh giá có khả năng là máy bay thương mại và phần “vệt” có thể là artifact do nén video. NASA nhấn mạnh metadata và hiệu chỉnh cảm biến có thể giúp loại bỏ các kết quả dương tính giả do sensor artifact. [NASA UAP Independent Study Report](https://www.nasa.gov/wp-content/uploads/2023/09/uap-independent-study-team-final-report-0.pdf)

Do đó, nên lưu:

- Tệp gốc;
- Codec;
- Bitrate;
- Framerate;
- Độ phân giải;
- Số lần transcoding;
- Phần mềm tạo tệp;
- Các bản dẫn xuất đã nén để hiển thị.

Không nên chỉ giữ video đã được backend nén để phát trên mạng xã hội.

## 4.5. Đối chiếu với nguồn bên ngoài

Thời gian và vị trí chính xác cho phép kiểm tra:

- Chuyến bay trong khu vực;
- Vệ tinh hoặc Starlink;
- Dữ liệu thiên văn;
- Thời tiết;
- Mây, sét và hiện tượng khí quyển;
- Báo cáo của người quan sát khác.

Kết quả đối chiếu phải kèm nguồn và thời gian truy vấn:

```json
{
  "source": "flight_data_provider",
  "query_time": "...",
  "coverage_status": "PARTIAL",
  "matches": []
}
```

Không nên chuyển `matches: []` thành kết luận “không có máy bay”. Nguồn dữ liệu có thể thiếu chuyến bay quân sự, máy bay tắt transponder hoặc bị gián đoạn vùng phủ.

---

# 5. Metadata có chứng minh báo cáo là đúng không?

Cần tách bốn mức đánh giá:

| Câu hỏi                                            | Metadata hỗ trợ được không? |
| -------------------------------------------------- | --------------------------: |
| Tệp có được ghi bằng thiết bị và cấu hình nào?     |                          Có |
| Hình ảnh có khả năng là artifact của camera không? |              Hỗ trợ khá tốt |
| Có vật thể vật lý ngoài môi trường không?          |                     Chưa đủ |
| Vật thể đó có thực sự bất thường không?            |                     Chưa đủ |

Metadata giúp chuyên gia đánh giá **khả năng phân tích và tính nhất quán** của báo cáo. Nó không tự xác nhận nội dung báo cáo.

Bằng chứng mạnh hơn xuất hiện khi có:

- Nhiều người quan sát độc lập;
- Nhiều vị trí quan sát;
- Timestamp đủ chính xác;
- Hướng camera được ghi lại;
- Tệp gốc từ nhiều thiết bị;
- Dữ liệu radar, chuyến bay, vệ tinh hoặc thời tiết để đối chiếu.

Đây cũng là lý do dữ liệu từ nhiều smartphone có giá trị hơn một video đơn lẻ.

---

# 6. Cấu trúc dữ liệu nên sửa theo hướng nào?

Nên chia thành bốn nhóm.

## Dữ liệu gốc

```text
raw_observation
raw_media
raw_sensor_samples
```

Gồm dữ liệu lấy trực tiếp từ thiết bị và lời khai của người dùng.

## Thông tin nguồn gốc

```text
provenance
```

Gồm:

- Ghi trực tiếp hay tải lên;
- Phiên bản ứng dụng;
- Thời điểm máy chủ nhận;
- Hash tệp gốc;
- Lịch sử xử lý và chuyển mã;
- Trường metadata nào do thiết bị cung cấp;
- Trường nào do người dùng nhập.

## Dữ liệu suy luận

```text
derived_analysis
```

Gồm:

- Vận tốc góc;
- Đường đi trong khung hình;
- Báo cáo tương tự;
- Kết quả đối chiếu máy bay;
- Điều kiện thời tiết.

Mỗi kết quả phải lưu thuật toán, phiên bản và độ bất định.

## Đánh giá của con người

```text
review
```

Gồm:

- Ý kiến chuyên gia;
- Giả thuyết giải thích;
- Dữ kiện ủng hộ hoặc phản bác;
- Trạng thái chưa xác định hoặc đã giải thích.

Không nên trộn dữ liệu gốc với kết luận như JSON hiện tại đang làm ở `inferred_kinematics` và `validation_status`.

---

# 7. Hai điểm trong tài liệu FAIR cần sửa

Thứ nhất, FAIR là **bộ nguyên tắc**, không phải một JSON Schema hoặc tiêu chuẩn kỹ thuật cụ thể. Nguồn công bố FAIR cũng nói rõ các nguyên tắc này không quy định công nghệ triển khai cụ thể. [FAIR Guiding Principles](https://www.nature.com/articles/sdata201618)

Thứ hai, FAIR không bắt buộc toàn bộ dữ liệu phải công khai. Dữ liệu có thể yêu cầu xác thực và phân quyền mà vẫn FAIR. Điều này rất quan trọng vì tọa độ chính xác có thể tiết lộ nhà riêng hoặc vị trí nhạy cảm của người báo cáo. [GO FAIR – What FAIR is not](https://www.go-fair.org/resources/faq/what-fair-is-not/)

Nên:

- Công khai vị trí đã làm mờ;
- Giữ tọa độ chính xác trong hệ thống bảo vệ;
- Chỉ cấp quyền dữ liệu chi tiết theo chính sách nghiên cứu;
- Ghi rõ license, nguồn gốc và điều kiện sử dụng.

## Đánh giá cuối cùng

Ý tưởng thu thập metadata **khả thi và rất đáng đưa thành điểm kỹ thuật chính của đồ án**. Mức triển khai hợp lý là:

- Thu thập chắc chắn các dữ liệu camera, thời gian, vị trí và tư thế mà hệ điều hành cung cấp;
- Luôn lưu giá trị sai số và trạng thái thiếu dữ liệu;
- Giữ nguyên tệp gốc;
- Đồng bộ chuỗi chuyển động thiết bị với video;
- Phân biệt dữ liệu đo được, người dùng khai báo và hệ thống suy luận;
- Không cam kết đo khoảng cách, độ cao hoặc vận tốc thật của vật thể;
- Không gọi dữ liệu smartphone là dữ liệu cảm biến đã được hiệu chuẩn khoa học.

Nếu làm đúng, hệ thống chưa thể trả lời “UAP này có thật không?”, nhưng có thể cung cấp đủ bối cảnh để chuyên gia trả lời những câu hữu ích hơn:

> Hình ảnh này có phù hợp với lỗi camera, chuyển động thiết bị, máy bay, vệ tinh hoặc hiện tượng thông thường nào đã biết hay không?
