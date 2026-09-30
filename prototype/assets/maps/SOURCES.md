# Nguồn dữ liệu bản đồ prototype

- **Natural Earth**: land polygons/admin-0 ở tỷ lệ 1:110m, public domain. [Điều khoản](https://www.naturalearthdata.com/about/terms-of-use/). [Tệp nguồn](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson). `world-land.js` chỉ giữ thuộc tính tên/mã và geometry, để mở HTML trực tiếp vẫn tải được dữ liệu.
- **MapLibre GL JS 5.6.2**: thư viện local ở `vendor/maplibre`, giấy phép đi kèm. [Globe](https://maplibre.org/maplibre-gl-js/docs/examples/display-a-globe-with-a-vector-map/), [3D terrain](https://maplibre.org/maplibre-gl-js/docs/examples/3d-terrain/).
- **OpenStreetMap standard tiles**: lớp đường phố online khi zoom gần từ `https://tile.openstreetmap.org/{z}/{x}/{y}.png`, không cần API key; được giảm màu/độ sáng để hợp giao diện. [Tile usage policy](https://operations.osmfoundation.org/policies/tiles/). Attribution hiển thị trong bản đồ. [OSM copyright](https://www.openstreetmap.org/copyright).
- **Mapterhorn**: DEM online cho địa hình, URL `https://tiles.mapterhorn.com/tilejson.json`, như ví dụ MapLibre. Độ cao phóng đại 1,25×. [Dự án](https://mapterhorn.com/).

Các điểm của bốn báo cáo mẫu là tọa độ đại diện khu vực do prototype chọn, không phải tọa độ thật do người quan sát cung cấp và không định vị vật thể. Báo cáo mới chỉ có marker khi người thử chọn một khu vực minh họa. Không tự suy tọa độ từ mô tả.

Tham khảo NUFORC ngày 30/09/2026: https://nuforc.org/map/ báo “Map Temporarily Unavailable”; chưa xác nhận được họ dùng bản đồ 3D hay thư viện nào. Đây là cách triển khai riêng cho prototype.
