Trong bản báo cáo của NASA, **không có một lược đồ kỹ thuật cụ thể (chẳng hạn như một JSON Schema, XML Schema hay bảng định dạng SQL chi tiết) được quy định sẵn cho việc xuất dữ liệu**.

Thay vào đó, báo cáo tập trung đưa ra **các nguyên tắc thiết kế dữ liệu mang tính định hướng học thuật** và **các nhóm trường dữ liệu bắt buộc (metadata) cần phải có** để dữ liệu có giá trị khoa học. Cụ thể như sau:

---

### 1. Khung nguyên tắc: Chuẩn dữ liệu FAIR

NASA khuyến nghị việc lưu trữ và chia sẻ dữ liệu phải tuân thủ nghiêm ngặt theo bộ nguyên tắc **FAIR**:

- **F**indability (Khả năng tìm kiếm): Dữ liệu phải có định danh rõ ràng, dễ dàng tra cứu.

- **A**ccessibility (Khả năng truy cập): Công khai, mở cho cả nhà khoa học lẫn cộng đồng thông qua API hoặc kho dữ liệu công cộng.

- **I**nteroperability (Khả năng tương tác): Sử dụng các định dạng mở, có thể tích hợp và đối soát chéo với các nguồn dữ liệu vệ tinh, radar khác.

- **R**eusability (Khả năng tái sử dụng): Có đầy đủ thông số ngữ cảnh để người khác có thể phân tích lại hoặc dùng để huấn luyện mô hình máy học (ML/AI).

---

### 2. Các thành phần thông tin và Metadata bắt buộc phải có

Báo cáo chỉ ra rằng một báo cáo dị thường không thể phân tích được nếu thiếu các nhóm dữ liệu sau:

1. **Thông số thiết bị & Cảm biến (Sensor Characteristics):**

- Loại cảm biến (sensor type), nhà sản xuất (manufacturer details).

- Độ nhạy (instrument sensitivity), độ sâu bit màu/dữ liệu (bit-depth).

- Đặc tính nhiễu (noise characteristics), tỷ lệ lỗi của cảm biến.

- Nhiệt độ và điều kiện hoạt động của thiết bị lúc chụp/quay (sensor temperature, exposure characteristics).

- Chế độ quan sát của cảm biến (observing modes).

2. **Dữ liệu không gian - thời gian (Spatiotemporal Context):**

- Thời gian ghi nhận chính xác (time of acquisition - timestamp UTC).

- Tọa độ, vị trí đặt thiết bị quan sát (sensor location).

3. **Dữ liệu động học & Quan sát đa giác quan (Multi-sensor / Kinematic Data):**

- Dữ liệu hình ảnh (imaging data - để nhận diện hình dáng).

- Dữ liệu quang phổ/đa phổ (multispectral hoặc hyperspectral data - xác định màu sắc/bước sóng phản xạ).

- Dữ liệu âm thanh (sound data).

- Các tham số ước lượng động học: khoảng cách mục tiêu (target range), góc phương vị (azimuth angle), góc tà/độ nâng (elevation angle), độ cao (altitude), vận tốc (velocity).

---

### Gợi ý cho đồ án của bạn (Dựng cấu trúc JSON Schema)

Vì NASA không đưa cấu trúc mã nguồn cụ thể, đây chính là **cơ hội để bạn tự thiết kế cấu trúc dữ liệu** (đóng góp mang tính kỹ thuật của đồ án) bằng cách hiện thực hóa các yêu cầu trên thành một chuẩn JSON.

Ví dụ, cấu trúc bản ghi xuất ra có thể như sau:

```json
{
  "report_id": "UAP-VN-20260920-001",
  "event_time": "2026-09-20T13:12:00Z",
  "observer_context": {
    "geo_location": {
      "latitude": 10.762622,
      "longitude": 106.660172,
      "altitude_meters": 15.5
    },
    "viewing_angles": {
      "azimuth_deg": 45.0,
      "elevation_deg": 35.2
    }
  },
  "sensor_metadata": {
    "device_model": "Sony IMX...",
    "sensor_type": "Optical CMOS",
    "exposure_time_sec": 0.002,
    "iso": 100,
    "focal_length_mm": 24.0,
    "bit_depth": 12
  },
  "media_payload": {
    "image_urls": ["..."],
    "audio_spectrum_url": "..."
  },
  "inferred_kinematics": {
    "estimated_duration_sec": 12,
    "apparent_trajectory": "linear_to_high_g_turn"
  },
  "validation_status": {
    "is_corroborated": false,
    "flight_radar_crosscheck": "no_commercial_aircraft"
  }
}
```

Việc bạn giải thích trong khóa luận rằng: _"NASA chỉ đưa ra khuyến nghị về loại dữ liệu cần có (FAIR + Metadata cảm biến), và đề tài này đã cụ thể hóa thành định dạng JSON/REST API chuẩn"_ sẽ là một điểm cộng rất lớn về mặt đóng góp kỹ thuật.
