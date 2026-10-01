/* Static prototype. All records and actions are local to this browser. */
const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  sky: '<ellipse cx="12" cy="13" rx="9" ry="3"/><path d="M7 11c0-6 10-6 10 0M6 19l-1 2m7-3v3m6-2 1 2"/>',
  mystery:
    '<path d="M5 20V10a7 7 0 0 1 14 0v10l-4-2-3 2-3-2-4 2Z"/><path d="M9 9v2m6-2v2"/>',
  nature:
    '<path d="M19 3C7 2 2 8 5 15c3 7 15 3 14-12ZM5 20l10-11M9 12v5m3-8h4"/>',
  unknown:
    '<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 1c0 2-3 2-3 4m0 3h.01"/>',
  message: '<path d="M4 4h16v12H9l-5 4V4Z"/><path d="M8 8h8m-8 4h5"/>',
  map: '<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4V3Z"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  link: '<path d="m9 15 6-6m-5-3 2-2a5 5 0 0 1 7 7l-3 3m-6-4-3 3a5 5 0 0 0 7 7l2-2"/>',
  file: '<path d="M5 3h9l5 5v13H5V3Zm9 0v6h5M8 13h8m-8 4h5"/>',
  clip: '<path d="m8 12 6-6a3 3 0 0 1 4 4l-8 8a5 5 0 0 1-7-7l9-9"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  quote: '<path d="M4 6h6v7H5c0 3 1 4 3 5M14 6h6v7h-5c0 3 1 4 3 5"/>',
  flag: '<path d="M5 21V3m0 1c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>',
  plus: '<path d="M12 4v16M4 12h16"/>',
  bell: '<path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3Zm5 3h4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
const icon = (name) =>
  `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.message}</svg>`;
const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const paragraphs = (value) =>
  String(value || "")
    .split("\n")
    .filter(Boolean)
    .map((p) => `<p>${esc(p)}</p>`)
    .join("");
const initials = (name) =>
  name
    .split(" ")
    .slice(-2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();
const categories = [
  { id: "all", label: "Tất cả chủ đề", icon: "grid" },
  { id: "sky", label: "Bầu trời / không trung", icon: "sky" },
  { id: "mystery", label: "Tâm linh / kỳ bí", icon: "mystery" },
  { id: "nature", label: "Tự nhiên / môi trường", icon: "nature" },
  { id: "unknown", label: "Khác / chưa xác định", icon: "unknown" },
];
const cat = (id) => categories.find((c) => c.id === id) || categories[4];
const observationLabels = {
  sky: ["Màu sắc", "Hình dạng", "Hướng nhìn", "Hướng di chuyển"],
  mystery: [
    "Giác quan ghi nhận",
    "Biểu hiện quan sát",
    "Không gian quan sát",
    "Diễn biến / lặp lại",
  ],
  nature: ["Màu sắc / số đo", "Biểu hiện", "Môi trường quan sát", "Diễn biến"],
  unknown: ["Màu sắc", "Biểu hiện", "Hướng nhìn", "Diễn biến"],
};
const sample = {
  threads: [
    {
      id: "d201",
      type: "discussion",
      category: "sky",
      kind: "Phân tích / đối chiếu",
      title: "Ba báo cáo đốm sáng ở Đà Nẵng: có điểm gì tương đồng?",
      author: "Minh Anh",
      time: "12 phút trước",
      pinned: true,
      views: 284,
      links: ["r102", "r108", "r115"],
      body: "Tui thấy ba báo cáo cùng ghi nhận nhiều đốm sáng vào tối 24/09, nhưng thời gian và hướng nhìn chưa hoàn toàn khớp. Mở chủ đề này để mọi người đối chiếu dữ liệu, thay vì trao đổi rải rác ở từng báo cáo.\nLiệu những đốm sáng này có thể là máy bay, vệ tinh hoặc một hiện tượng khác? Nhờ mọi người ghi rõ đang tham chiếu báo cáo nào và nguồn dữ liệu dùng để so sánh.",
      summary:
        "Có hai giả thuyết đang được trao đổi: máy bay và vệ tinh. Dữ liệu hiện có chưa đủ để chọn một cách giải thích.\nTrả lời #1 đưa ra sơ đồ hướng nhìn để đối chiếu. Trả lời #2 chỉ ra thời gian giữa các báo cáo có thể lệch vài phút.\nCần bổ sung: thời gian chính xác hơn và hướng quay trong tệp gốc của báo cáo #108.",
      replies: [
        {
          id: "p1",
          author: "Quang Lê",
          time: "35 phút trước",
          body: "Tui phác lại hướng nhìn của #102 và #108 từ mô tả của người đăng. Nếu hướng nhìn chính xác thì hai người đang nhìn về hai vùng trời khác nhau. Chưa thể xem đây là cùng một hiện tượng chỉ vì ở gần nhau.",
          useful: 8,
          diagram: true,
        },
        {
          id: "p2",
          author: "Hà Nguyễn",
          time: "20 phút trước",
          body: "Trong #108, người đăng nói thời gian là ước lượng. Mình nghĩ nên hỏi lại trước khi đối chiếu lịch bay. Hai mốc 20:10 và 20:15 chưa chắc phản ánh chênh lệch thực tế.",
          useful: 5,
          quote: "Ba báo cáo cùng ghi nhận nhiều đốm sáng vào tối 24/09.",
        },
      ],
    },
    {
      id: "r102",
      type: "report",
      category: "sky",
      kind: "Đốm sáng",
      title: "Ba đốm sáng di chuyển chậm phía trên biển Mỹ Khê",
      author: "Hoàng Nam",
      time: "48 phút trước",
      views: 196,
      body: "Khoảng 20:10 tui đang đi dạo gần biển Mỹ Khê thì thấy ba đốm sáng xếp gần thành một đường thẳng. Các đốm sáng di chuyển chậm về phía nam trong khoảng hai phút rồi khuất sau mây.\nTui quan sát bằng mắt thường và có chụp một ảnh bằng điện thoại. Không nghe thấy tiếng động rõ ràng. Chưa biết đây là gì nên đăng để mọi người cùng tìm hiểu.",
      observed: "2026-09-24T20:10",
      location: "Mỹ Khê, Đà Nẵng",
      source: "Trực tiếp quan sát",
      color: "Trắng ngả vàng",
      shape: "Đốm sáng",
      direction: "Nhìn về phía đông",
      movement: "Di chuyển chậm về phía nam",
      media: [
        {
          name: "my-khe-2409.jpg",
          type: "image/jpeg",
          origin: "Tải từ thư viện · Người đăng khai báo tự chụp",
        },
      ],
      replies: [
        {
          id: "p3",
          author: "Minh Anh",
          time: "30 phút trước",
          body: "Bạn có nhớ đốm sáng nhấp nháy hay sáng liên tục không? Tui đang đối chiếu với hai báo cáo khác trong chủ đề #201.",
          useful: 2,
        },
      ],
    },
    {
      id: "d202",
      type: "discussion",
      category: "mystery",
      kind: "Hỏi đáp",
      title: "Tiếng gõ trên mái tôn lúc nửa đêm: nên kiểm tra những gì?",
      author: "Thu Phương",
      time: "1 giờ trước",
      views: 153,
      links: [],
      body: "Nhà tui gần hàng cây và thỉnh thoảng nghe tiếng gõ trên mái tôn vào ban đêm. Tui chưa xác định được nguồn âm thanh.\nMuốn hỏi mọi người cách ghi âm, kiểm tra gió, cành cây hoặc động vật để tìm nguồn. Đây là câu hỏi chung, chưa phải một báo cáo quan sát có đủ thời gian và vị trí.",
      replies: [
        {
          id: "p4",
          author: "Đức Trần",
          time: "40 phút trước",
          body: "Bạn thử đặt điện thoại ở vị trí cố định, ghi giờ và tình trạng gió mỗi lần nghe. Một bản ghi dài hơn có thể giúp phân biệt tiếng cành cây với tiếng động vật.",
          useful: 4,
        },
      ],
    },
    {
      id: "r120",
      type: "report",
      category: "nature",
      kind: "Hiện tượng ánh sáng",
      title: "Vệt sáng xanh trên mặt nước sau cơn mưa ở Cần Giờ",
      author: "Linh Trần",
      time: "2 giờ trước",
      views: 97,
      body: "Tui nhìn thấy một vùng nước có ánh xanh nhạt khi sóng vỗ vào bờ. Ánh sáng chỉ hiện lên thoáng qua, khó thấy khi đứng xa.\nKhông có ảnh rõ vì trời tối. Tui muốn ghi lại lần quan sát này và hỏi xem cần bổ sung thông tin gì.",
      observed: "2026-09-25T21:30",
      location: "Cần Giờ, TP. Hồ Chí Minh",
      source: "Trực tiếp quan sát",
      color: "Xanh nhạt",
      shape: "Vệt sáng trên nước",
      direction: "Nhìn về mặt nước",
      movement: "Theo sóng",
      media: [],
      replies: [],
    },
    {
      id: "d203",
      type: "discussion",
      category: "sky",
      kind: "Kiến thức / kinh nghiệm",
      title: "Vì sao quay đốm sáng bằng điện thoại thường thấy hình tròn lớn?",
      author: "Quang Lê",
      time: "3 giờ trước",
      views: 421,
      links: ["r108"],
      body: "Khi máy ảnh lấy nét sai, một nguồn sáng nhỏ có thể hiện thành hình tròn lớn. Zoom số và phơi sáng cũng có thể làm thay đổi hình ảnh.\nMọi người có thể chia sẻ ảnh thử nghiệm và thông số chụp để so sánh. Mục đích là hiểu ảnh hưởng của thiết bị, chưa kết luận về báo cáo cụ thể.",
      replies: [],
    },
    {
      id: "r108",
      type: "report",
      category: "sky",
      kind: "Đốm sáng",
      title: "Chuỗi ánh sáng nhìn từ cầu Thuận Phước",
      author: "Bảo Nguyễn",
      time: "4 giờ trước",
      views: 142,
      body: "Tui thấy một chuỗi đốm sáng khi đứng gần cầu Thuận Phước. Thời gian nhớ được là khoảng 20:15, có thể lệch vài phút. Các điểm sáng trông như đang di chuyển chậm.\nẢnh được chụp bằng điện thoại có zoom. Tui chưa biết hướng nhìn chính xác.",
      observed: "2026-09-24T20:15",
      estimated: true,
      location: "Thuận Phước, Đà Nẵng",
      source: "Trực tiếp quan sát",
      color: "Trắng",
      shape: "Chuỗi đốm sáng",
      direction: "Chưa xác định",
      movement: "Di chuyển chậm",
      media: [
        {
          name: "thuan-phuoc.jpg",
          type: "image/jpeg",
          origin: "Tải từ thư viện · Người đăng khai báo tự chụp",
        },
      ],
      replies: [],
    },
    {
      id: "r115",
      type: "report",
      category: "sky",
      kind: "Đốm sáng",
      title: "Ánh sáng phía đông nhìn từ Sơn Trà",
      author: "Thanh Vũ",
      time: "5 giờ trước",
      views: 86,
      body: "Tui nhìn thấy hai đến ba điểm sáng phía đông. Chỉ quan sát được một lúc vì có mây che. Thời gian ghi lại theo trí nhớ.",
      observed: "2026-09-24T20:12",
      estimated: true,
      location: "Sơn Trà, Đà Nẵng",
      source: "Trực tiếp quan sát",
      color: "Trắng",
      shape: "Đốm sáng",
      direction: "Phía đông",
      movement: "Chưa xác định",
      media: [],
      replies: [],
    },
    {
      id: "d204",
      type: "discussion",
      category: "unknown",
      kind: "Thảo luận chung",
      title: "Bạn thường ghi lại điều gì khi gặp một hiện tượng chưa biết?",
      author: "Đức Trần",
      time: "6 giờ trước",
      views: 76,
      links: [],
      body: "Mình thường quên ghi hướng nhìn và thời lượng. Mọi người có cách nào ghi chép nhanh mà vẫn đủ thông tin để xem lại sau này không?",
      replies: [],
    },
  ],
  saved: [],
  followed: [],
  liked: [],
  flags: [],
};
const STORAGE = "di-thuong-prototype-v1";
let state;
try {
  state = JSON.parse(localStorage.getItem(STORAGE));
} catch {}
if (
  !state ||
  !Array.isArray(state.threads) ||
  !["saved", "followed", "liked", "flags"].every((k) => Array.isArray(state[k]))
)
  state = structuredClone(sample);
let category = "all",
  tab = "all",
  search = "",
  page = 1,
  mapCategory = "all",
  mapSelection = "r102",
  quote = null;
let focusBeforeModal = null,
  toastTimer,
  replyFiles = [];
const mediaURLs = new Map();
const persist = () => {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(state));
  } catch {
    toast("Bộ nhớ trình duyệt đầy. Thay đổi chỉ giữ trong phiên này.");
  }
};
const thread = (id) => state.threads.find((t) => t.id === id);
const route = () => location.hash.slice(1) || "forum";
const toast = (message) => {
  const el = document.querySelector("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3500);
};
const mediaHTML = (m) =>
  `<div class="attachment">${mediaURLs.has(m.key) && m.type.startsWith("image/") ? `<img src="${esc(mediaURLs.get(m.key))}" alt="Ảnh đính kèm ${esc(m.name)}">` : icon("file")}<div>${esc(m.name)}<small>${esc(m.origin || (mediaURLs.has(m.key) ? "Tệp được chọn trong phiên này" : "Chỉ lưu tên tệp trong bản thử"))}</small></div></div>`;

function renderSidebar() {
  const sidebarCategory = route().startsWith("thread/")
    ? thread(route().split("/")[1])?.category || category
    : category;
  document.querySelector("#sidebar").innerHTML =
    `<section class="member-panel"><span class="avatar mine">MA</span><strong>Minh Anh</strong><small>Thành viên cộng đồng</small><div class="member-panel-footer">${icon("bookmark")} ${state.saved.length} chủ đề đã lưu</div></section><p class="side-label">KHÁM PHÁ CỘNG ĐỒNG</p>${categories.map((c) => `<button class="side-item ${sidebarCategory === c.id ? "active" : ""}" data-category="${c.id}">${icon(c.icon)}<span>${c.label}</span><span class="count">${state.threads.filter((t) => c.id === "all" || t.category === c.id).length}</span></button>`).join("")}<hr><div class="sidebar-extra"><p class="side-label">KHÔNG GIAN CỦA BẠN</p><a class="side-item" href="#saved">${icon("bookmark")}Chủ đề đã lưu<span class="count">${state.saved.length}</span></a><a class="side-item" href="#followed">${icon("bell")}Đang theo dõi<span class="count">${state.followed.length}</span></a></div><hr><button class="button primary wide" data-action="create">${icon("plus")}Tạo nội dung</button><p class="side-note">Một quan sát đáng ghi lại.<br>Một câu hỏi đáng cùng tìm hiểu.</p><div class="sidebar-extra sidebar-footer">Dữ liệu minh họa · Prototype v1<br><button class="text-button" data-action="about">Về bản thử này</button> · <button class="text-button" data-action="reset">Đặt lại dữ liệu</button></div>`;
}
function renderRightbar(t) {
  document.querySelector("#rightbar").innerHTML = t
    ? `<div class="right-card"><p class="eyebrow">TRONG CHỦ ĐỀ NÀY</p><h3 style="margin-top:12px">${icon("message")}${t.replies.length} trả lời</h3><p>${t.type === "report" ? "Trao đổi ngay dưới quan sát này. Nếu muốn đối chiếu nhiều báo cáo, bạn có thể mở chủ đề riêng." : "Tập trung vào câu hỏi ở bài mở đầu. Khi đưa ra giải thích, hãy dẫn nguồn và nêu thông tin còn thiếu."}</p><button class="button secondary wide" style="margin-top:16px" data-action="${t.type === "report" ? "related-topic" : "reply-focus"}" data-id="${t.id}">${t.type === "report" ? "Mở chủ đề có báo cáo này" : "Tham gia thảo luận"} ${icon("arrow")}</button></div>${guideHTML()}<div class="right-card"><h3>${icon("flag")}Cùng giữ cuộc trao đổi cởi mở</h3><p>Tôn trọng người quan sát. Phân biệt điều đã quan sát với giả thuyết. Số lượt “Hữu ích” không xác nhận một giải thích là đúng.</p></div>`
    : `<div class="right-card"><p class="eyebrow">CHÀO BẠN, MINH ANH</p><h3 style="font-size:16px;margin-top:10px;margin-bottom:8px">Tò mò cùng nhau.</h3><p>Một nơi ghi lại những điều chưa hiểu và cùng tìm cách giải thích.</p><div class="stats"><div><strong>${state.threads
        .filter((t) => t.type === "report")
        .length.toString()
        .padStart(
          2,
          "0",
        )}</strong><small>Báo cáo mẫu</small></div><div><strong>${state.threads
        .filter((t) => t.type === "discussion")
        .length.toString()
        .padStart(
          2,
          "0",
        )}</strong><small>Chủ đề mẫu</small></div></div></div><div class="right-card"><h3>${icon("map")}Quan sát quanh bạn</h3><a href="#map" class="mini-map" style="display:block" aria-label="Khám phá bản đồ mẫu"><span class="map-pin"></span><span class="map-pin"></span><span class="map-pin"></span><span class="map-label">VIỆT NAM · MINH HỌA</span></a><p>Khám phá các báo cáo theo khu vực. Mỗi điểm đại diện cho vị trí người quan sát đã làm mờ.</p><a class="button secondary wide" style="margin-top:15px" href="#map">Mở bản đồ ${icon("arrow")}</a></div>${guideHTML()}<div class="sidebar-footer">Cộng đồng quan sát & thảo luận<br>Chưa xác định không có nghĩa là siêu nhiên.</div>`;
}
function guideHTML() {
  return `<div class="right-card"><h3>Chia sẻ theo cách nào?</h3><div class="guide-step"><span class="step-number">1</span><div><strong>Bạn ghi nhận một hiện tượng?</strong><p>Đăng báo cáo có thời gian, vị trí và mô tả quan sát.</p></div></div><div class="guide-step"><span class="step-number">2</span><div><strong>Bạn có câu hỏi hoặc phân tích?</strong><p>Mở chủ đề, đính kèm tài liệu và dẫn chiếu báo cáo nếu cần.</p></div></div></div>`;
}
function topicRow(t) {
  return `<article class="topic-row ${t.isNew ? "new" : ""}"><a href="#thread/${t.id}" class="topic-symbol ${t.type}" aria-label="Mở ${esc(t.title)}">${icon(t.type === "report" ? cat(t.category).icon : "message")}</a><div class="topic-content"><div class="topic-tags"><span class="pill ${t.type}">${t.type === "report" ? "Báo cáo" : "Thảo luận"}</span><span class="pill">${esc(t.kind)}</span>${t.pinned ? `<span class="pill pin">✦ Đáng chú ý</span>` : ""}${t.links?.length ? `<span class="pill">${t.links.length} báo cáo liên kết</span>` : ""}</div><a href="#thread/${t.id}" class="topic-title">${esc(t.title)}</a><p class="topic-excerpt">${esc(t.body)}</p><div class="topic-meta"><span class="avatar mini-avatar">${esc(initials(t.author))}</span><span>${esc(t.author)}</span><span>·</span><span>${esc(t.time)}</span>${t.type === "report" ? `<span>·</span>${icon("pin")}<span>${esc(t.location)}</span>` : ""}</div></div><div class="topic-counts"><span title="Số trả lời">${icon("message")}${t.replies.length}</span><span class="views" title="Lượt xem minh họa">${icon("eye")}${t.views}</span><span class="last">Cập nhật<br>${esc(t.time)}</span></div></article>`;
}
const realmFor = (id) => ["mystery", "nature", "unknown"].includes(id) ? id : "sky";
function forumBanner() {
  const banners = {
    all: ["bg-1.webp", "Chưa biết là gì?<br>Bắt đầu từ điều bạn thấy.", "Chia sẻ quan sát có cấu trúc, đối chiếu bằng chứng và cùng đặt những câu hỏi tốt hơn."],
    sky: ["bg-1.webp", "Bạn thấy gì trên bầu trời?<br>Cùng ghi lại và đối chiếu.", "Từ đốm sáng đến UFO/UAP, bắt đầu bằng thời gian, hướng nhìn và những gì bạn thực sự quan sát."],
    mystery: ["bg-2.webp", "Những câu chuyện kỳ bí.<br>Cùng tìm hiểu từ quan sát.", "Chia sẻ trải nghiệm, đặt câu hỏi và trao đổi những cách giải thích có thể kiểm tra."],
    nature: ["bg-natural.webp", "Thiên nhiên còn nhiều điều lạ.<br>Cùng quan sát kỹ hơn.", "Ghi nhận ánh sáng, âm thanh, thời tiết hoặc những biến đổi bất thường của môi trường."],
    unknown: ["bg-other.webp", "Chưa biết xếp vào đâu?<br>Vẫn có thể bắt đầu ghi nhận.", "Mô tả điều bạn thấy, giữ lại bối cảnh và cùng cộng đồng tìm cách lý giải."],
  };
  const [image, heading, description] = banners[category] || banners.all;
  return `<section class="hero hero-photo hero-${realmFor(category)}"><img class="hero-image" src="assets/${image}" alt="" width="1672" height="941" fetchpriority="high" decoding="async"><div class="hero-copy"><p class="eyebrow">${category === "all" ? "TỪ MỘT QUAN SÁT ĐẾN MỘT CUỘC TRAO ĐỔI" : esc(cat(category).label)}</p><h2>${heading}</h2><p>${description}</p><button class="text-button hero-link" data-action="create">Chia sẻ quan sát của bạn ${icon("arrow")}</button></div></section>`;
}
function renderForum() {
  document.body.dataset.realm = realmFor(category);
  const savedView = route() === "saved",
    followedView = route() === "followed";
  const filtered = state.threads.filter(
    (t) =>
      (!savedView || state.saved.includes(t.id)) &&
      (!followedView || state.followed.includes(t.id)) &&
      (category === "all" || t.category === category) &&
      (tab === "all" || t.type === tab) &&
      `${t.title} ${t.body} ${t.location || ""}`
        .toLocaleLowerCase("vi")
        .includes(search.toLocaleLowerCase("vi")),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / 5));
  page = Math.min(page, pages);
  const title = savedView
    ? "Chủ đề đã lưu"
    : followedView
      ? "Đang theo dõi"
      : category === "all"
        ? "Diễn đàn cộng đồng"
        : cat(category).label;
  document.querySelector("#main").innerHTML =
    `<div class="page-heading"><div><p class="eyebrow">KHÔNG GIAN CỦA NHỮNG CÂU HỎI</p><h1>${title}</h1><p>Ghi lại điều bạn thấy. Cùng tìm hiểu điều chưa rõ.</p></div><button class="button primary" data-action="create">${icon("plus")}Tạo nội dung</button></div>${!savedView && !followedView && !search ? forumBanner() : ""}<div class="toolbar"><div class="tabs" aria-label="Loại nội dung">${[
      ["all", "Mới cập nhật"],
      ["report", "Báo cáo"],
      ["discussion", "Thảo luận"],
    ]
      .map(
        ([v, l]) =>
          `<button class="tab ${tab === v ? "active" : ""}" data-tab="${v}" aria-pressed="${tab === v}">${l}</button>`,
      )
      .join(
        "",
      )}</div><label class="search">${icon("search")}<input id="search" aria-label="Tìm chủ đề" placeholder="Tìm chủ đề, địa điểm…" value="${esc(search)}"></label></div><div class="section-meta"><span>${filtered.length} chủ đề${category !== "all" ? ` · ${cat(category).label}` : ""}</span><span>Hoạt động gần đây</span></div><section class="topic-list" aria-label="Danh sách chủ đề">${
      filtered.length
        ? filtered
            .slice((page - 1) * 5, page * 5)
            .map(topicRow)
            .join("")
        : `<div class="empty">${icon("search")}<h3>Chưa có chủ đề phù hợp</h3><p>${savedView ? "Nhấn “Lưu” trong một chủ đề để tìm lại ở đây." : followedView ? "Nhấn “Theo dõi” trong chủ đề bạn quan tâm." : "Thử từ khóa khác hoặc chọn tất cả nhóm hiện tượng."}</p><button class="button secondary" data-action="clear-filter">Xóa bộ lọc</button></div>`
    }</section><div class="pagination"><span>${filtered.length ? `${(page - 1) * 5 + 1}–${Math.min(page * 5, filtered.length)} / ${filtered.length} chủ đề` : "0 chủ đề"}</span><div class="pages">${Array.from({ length: pages }, (_, i) => `<button class="page-button ${page === i + 1 ? "active" : ""}" data-page="${i + 1}" aria-label="Trang ${i + 1}" ${page === i + 1 ? 'aria-current="page"' : ""}>${i + 1}</button>`).join("")}</div></div>`;
  renderRightbar();
}
function linkedReport(id) {
  const r = thread(id);
  if (!r) return "";
  return `<a href="#thread/${r.id}" class="linked-report"><span class="report-thumb ${r.category}"></span><span><strong>#${r.id.slice(1)} · ${esc(r.title)}</strong><small>${esc(r.location)} · ${formatTime(r)} · ${esc(r.source)}</small></span>${icon("chevron")}</a>`;
}
function formatTime(t) {
  const d = new Date(t.observed);
  return Number.isNaN(d.getTime())
    ? esc(t.observed)
    : `${t.estimated ? "Khoảng " : ""}${d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}, ${d.toLocaleDateString("vi-VN")}`;
}
function summaryHTML(t) {
  return `<section class="card summary" id="summary"><div class="summary-heading"><h3>${icon("file")}Tóm tắt hiện tại</h3>${t.author === "Minh Anh" ? `<button class="button ghost" data-action="edit-summary" data-id="${t.id}">Chỉnh sửa</button>` : ""}</div>${paragraphs(t.summary)}${t.id === "d201" ? `<p style="margin-top:10px"><a href="#reply-p1">Đọc trả lời #1</a> · <a href="#reply-p2">Đọc trả lời #2</a></p>` : ""}<div class="summary-foot">${icon("clock")}Do ${esc(t.author)} tổng hợp · Có thể cập nhật khi có dữ liệu mới</div></section>`;
}
function reportHTML(t) {
  const fields = [
    ["Thời gian quan sát", formatTime(t)],
    ["Vị trí người quan sát", esc(t.location) + " · Khu vực gần đúng"],
    ["Nguồn báo cáo", esc(t.source)],
    ["Phân loại", esc(t.kind)],
    ...["color", "shape", "direction", "movement"].map((key, i) => [
      observationLabels[t.category][i],
      esc(t[key] || "Chưa ghi nhận"),
    ]),
  ];
  return `<section class="card"><p class="eyebrow">DỮ LIỆU QUAN SÁT</p><dl class="observation-grid">${fields.map(([l, v]) => `<div><dt>${l}</dt><dd>${v}</dd></div>`).join("")}${t.phenomenonLocation ? `<div><dt>Vị trí hiện tượng (ước lượng)</dt><dd>${esc(t.phenomenonLocation)}</dd></div>` : ""}${t.sourceURL ? `<div><dt>Nguồn bên ngoài</dt><dd>${esc(t.sourceURL)}</dd></div>` : ""}</dl><div class="prose">${paragraphs(t.body)}</div>${t.media?.length ? `<div class="linked-heading">${icon("clip")}Tệp đính kèm (${t.media.length})</div>${t.id === "r102" || t.id === "r108" ? `<div class="scene" role="img" aria-label="Minh họa ba đốm sáng trên bầu trời, không phải bằng chứng thật"><span class="scene-lights">• • •</span><span class="scene-skyline"></span></div><p class="scene-caption">Ảnh minh họa bằng CSS · Không phải ảnh quan sát thật</p>` : ""}${t.media.map(mediaHTML).join("")}` : `<p class="scene-caption" style="margin-top:16px">Báo cáo này chưa có tệp đính kèm.</p>`}<p class="scene-caption" style="margin-top:16px">Vị trí công khai là khu vực gần đúng. Báo cáo ghi nhận lời kể của người đăng, chưa xác nhận cách giải thích.</p></section>`;
}
function replyHTML(r, i, t) {
  return `<article class="card reply" id="reply-${r.id}"><div class="reply-header"><span class="avatar ${r.author === "Minh Anh" ? "mine" : ""}">${esc(initials(r.author))}</span><div><strong>${esc(r.author)}</strong>${r.author === t.author ? '<span class="pill" style="margin-left:6px">Tác giả</span>' : ""}<small>${esc(r.time)}</small></div><a class="reply-number" href="#reply-${r.id}">#${i + 1}</a></div>${r.quote ? `<blockquote>${esc(r.quote)}</blockquote>` : ""}<div class="prose">${paragraphs(r.body)}</div>${r.diagram ? `<div class="art-evidence" role="img" aria-label="Sơ đồ hướng nhìn minh họa: hai vị trí quan sát với hướng khác nhau"><svg viewBox="0 0 370 120"><path d="M0 87Q80 60 120 93T240 75T370 88" fill="none" stroke="#d7e0cc" stroke-width="22"/><path d="m90 72 95-36M233 74l52-45" stroke="#718b57" stroke-width="2" stroke-dasharray="5 4"/><circle cx="90" cy="72" r="6" fill="#486a40"/><circle cx="233" cy="74" r="6" fill="#a58952"/><text x="66" y="103" fill="#5e7552" font-size="10">#102 · Mỹ Khê</text><text x="194" y="104" fill="#8e7b55" font-size="10">#108 · Thuận Phước</text><text x="145" y="22" fill="#899779" font-size="9">Hướng theo lời kể, cần kiểm tra lại</text></svg><span class="art-label">SƠ ĐỒ MINH HỌA</span></div><div class="attachment">${icon("file")}<div>doi-chieu-huong-nhin.png<small>Hình đối chiếu · Minh họa cho prototype</small></div></div>` : ""}${(r.media || []).map(mediaHTML).join("")}<div class="reply-footer"><button class="text-button ${state.liked.includes(r.id) ? "active" : ""}" data-action="useful" data-reply="${r.id}" data-id="${t.id}">${icon("check")}Hữu ích · ${(r.useful || 0) + (state.liked.includes(r.id) ? 1 : 0)}</button><button class="text-button" data-action="quote" data-reply="${r.id}" data-id="${t.id}">${icon("quote")}Trích dẫn</button><button class="text-button" data-action="flag" data-target="${r.id}">${icon("flag")}Báo vi phạm</button></div></article>`;
}
function renderThread(t) {
  document.body.dataset.realm = realmFor(t?.category);
  if (!t) {
    document.querySelector("#main").innerHTML =
      '<div class="empty"><h2>Không tìm thấy chủ đề</h2><p>Chủ đề này không có trong dữ liệu mẫu.</p><a href="#forum" class="button">Về diễn đàn</a></div>';
    renderRightbar();
    return;
  }
  document.querySelector("#main").innerHTML =
    `<nav class="breadcrumb"><a href="#forum">Diễn đàn</a>${icon("chevron")}<button class="text-button" data-category="${t.category}">${cat(t.category).label}</button>${icon("chevron")}<span>${t.type === "report" ? "Báo cáo" : "Chủ đề thảo luận"}</span></nav><div class="detail-head"><div class="topic-tags"><span class="pill ${t.type}">${t.type === "report" ? "Báo cáo" : "Thảo luận"}</span><span class="pill">${esc(t.kind)}</span><span class="pill">Đang mở</span></div><h1>${esc(t.title)}</h1><div class="detail-author"><span class="avatar ${t.author === "Minh Anh" ? "mine" : ""}">${esc(initials(t.author))}</span><strong>${esc(t.author)}</strong><span>· ${esc(t.time)}</span><span>· #${t.id.slice(1)}</span></div><div class="detail-actions"><button class="button ${state.saved.includes(t.id) ? "secondary" : ""}" data-action="save" data-id="${t.id}">${icon("bookmark")}${state.saved.includes(t.id) ? "Đã lưu" : "Lưu chủ đề"}</button><button class="button ${state.followed.includes(t.id) ? "secondary" : ""}" data-action="follow" data-id="${t.id}">${icon("bell")}${state.followed.includes(t.id) ? "Đang theo dõi" : "Theo dõi"}</button>${t.type === "report" ? `<a class="button" href="#map/${t.id}">${icon("map")}Xem trên bản đồ</a>` : ""}<button class="button ghost" data-action="flag" data-target="${t.id}">${icon("flag")}Báo vi phạm</button></div></div>${t.summary ? summaryHTML(t) : ""}${t.type === "report" ? reportHTML(t) : `<section class="card"><div class="prose">${paragraphs(t.body)}</div>${t.links?.length ? `<h3 class="linked-heading">${icon("link")}Báo cáo được dẫn chiếu (${t.links.length})</h3>${t.links.map(linkedReport).join("")}<p class="scene-caption" style="margin-top:10px">Liên kết để đối chiếu, chưa khẳng định các báo cáo ghi nhận cùng một hiện tượng.</p>` : ""}${(t.media || []).map(mediaHTML).join("")}</section>`}${!t.summary && t.author === "Minh Anh" && t.type === "discussion" ? `<button class="button secondary" data-action="edit-summary" data-id="${t.id}">${icon("plus")}Thêm tóm tắt hiện tại</button>` : ""}<div class="replies-heading"><h2>${t.replies.length} trả lời</h2><small>Theo thứ tự thời gian</small></div>${t.replies.map((r, i) => replyHTML(r, i, t)).join("")}<form class="card composer" id="reply-form" data-id="${t.id}"><div class="reply-header"><span class="avatar mine">MA</span><strong>Tham gia trao đổi</strong></div><div id="quote-preview"></div><label class="sr-label" for="reply-body" style="display:block;font-size:10px;margin-bottom:8px;color:#8b967e">Góp ý, hỏi thêm hoặc đưa ra phân tích kèm nguồn</label><textarea id="reply-body" name="body" required maxlength="10000" placeholder="Bạn nghĩ sao? Hãy nói rõ dữ liệu nào hỗ trợ ý kiến của bạn…"></textarea><div id="reply-files" class="selected-files"></div><div class="composer-footer"><label class="file-label" for="reply-attachments">${icon("clip")}Đính kèm ảnh / tài liệu<input class="file-input" type="file" multiple id="reply-attachments" accept="image/*,video/*,audio/*,.pdf,.txt"></label><button class="button primary" type="submit">Gửi trả lời ${icon("arrow")}</button></div></form>`;
  replyFiles = [];
  renderRightbar(t);
  renderQuote();
}
function renderQuote() {
  const el = document.querySelector("#quote-preview");
  if (el)
    el.innerHTML = quote
      ? `<div class="quote-preview"><button data-action="clear-quote" type="button" aria-label="Bỏ trích dẫn">×</button><strong>${esc(quote.author)}</strong><br>${esc(quote.body.slice(0, 300))}</div>`
      : "";
}
function mapReports() {
  return state.threads.filter(
    (t) =>
      t.type === "report" &&
      (mapCategory === "all" || t.category === mapCategory),
  );
}
let mapClusterZoom = null;
function renderMapList() {
  const list = document.querySelector("#map-report-list");
  if (!list) return;
  const reports = mapReports();
  list.innerHTML = reports.length ? reports.map(t => {
    const located = !!window.ReportMap.coordinateOf(t);
    return `<article class="map-report-item ${t.id === mapSelection ? "selected" : ""}" data-map-item="${t.id}"><div><span class="pill report">${esc(t.kind)}</span><a href="#thread/${t.id}"><strong>${esc(t.title)}</strong></a><small>${esc(t.location)} · ${located ? "Điểm khu vực minh họa" : "Chưa chọn điểm bản đồ"}</small><a class="text-button" href="#thread/${t.id}">Mở báo cáo & thảo luận ${icon("arrow")}</a></div><button class="button secondary" data-map-report="${t.id}" ${located ? "" : "disabled"}>${icon("pin")}Định vị</button></article>`;
  }).join("") : `<div class="card empty"><h3>Chưa có báo cáo thuộc nhóm này</h3><p>Bạn có thể đăng một quan sát để thử luồng này.</p><button class="button secondary" data-action="report">Đăng báo cáo</button></div>`;
}
function renderMap() {
  document.body.dataset.realm = "sky";
  document.body.classList.add("map-route");
  const reports = mapReports();
  const located = reports.filter(t => window.ReportMap.coordinateOf(t));
  if (!reports.some(t => t.id === mapSelection)) mapSelection = reports[0]?.id;
  document.querySelector("#main").innerHTML = `<div class="page-heading"><div><p class="eyebrow">QUAN SÁT THEO KHU VỰC</p><h1>Khám phá bản đồ</h1><p>Khám phá các báo cáo trên địa cầu, rồi zoom đến khu vực bạn quan tâm.</p></div><button class="button primary" data-action="report">${icon("plus")}Đăng báo cáo</button></div><div class="filter-chips">${categories.map(c => `<button class="filter-chip ${mapCategory === c.id ? "active" : ""}" data-map-category="${c.id}" aria-pressed="${mapCategory === c.id}">${c.id === "all" ? "Tất cả báo cáo" : c.label}</button>`).join("")}</div><div class="map-toolbar"><div class="map-mode-switch" aria-label="Góc nhìn bản đồ"><button data-map-mode="globe" class="active" aria-pressed="true">Trái Đất 3D</button><button data-map-mode="terrain" aria-pressed="false">Địa hình 3D</button><button data-map-mode="flat" aria-pressed="false">Bản đồ 2D</button></div><button class="button" data-map-command="home">${icon("map")}Về Việt Nam</button></div><div class="map-surface map-live"><div id="report-map" role="region" aria-label="Bản đồ tương tác vị trí người quan sát"></div><div class="map-key">${icon("pin")} Vị trí người quan sát · Điểm khu vực minh họa</div></div><div class="map-status" id="map-status" role="status" aria-live="polite">Đang khởi tạo bản đồ…</div><p class="map-note">${located.length} báo cáo có điểm khu vực${reports.length > located.length ? ` · ${reports.length - located.length} báo cáo chưa chọn điểm` : ""}. Cụm điểm giúp bản đồ gọn hơn; các báo cáo vẫn độc lập. Đường phố và độ cao địa hình cần mạng.</p><div class="map-preview"><div class="replies-heading"><h2>${reports.length} báo cáo phù hợp</h2><small>Không gộp các báo cáo</small></div><div id="map-report-list"></div></div>`;
  renderMapList();
  renderRightbar();
  window.ReportMap.mount({
    reports, selected: mapSelection,
    focusId: route().split("/")[1],
    onSelect(id) { mapSelection = id; renderMapList(); },
    onCluster(ids, zoom) {
      mapClusterZoom = zoom;
      openModal(`${ids.length} báo cáo trong cụm`, `<p class="modal-intro">Gom điểm theo mức zoom; chưa khẳng định các báo cáo ghi nhận cùng một hiện tượng.</p>${ids.map(linkedReport).join("")}<div class="modal-footer"><button class="button secondary" data-map-command="zoom-cluster">Phóng to khu vực này ${icon("search")}</button></div>`);
    },
  });
}

function render() {
  const r = route();
  if (r.startsWith("forum/")) {
    const requested = r.split("/")[1];
    if (categories.some(c => c.id === requested)) category = requested;
  }
  document.body.classList.toggle("map-route", r.startsWith("map"));
  if (!r.startsWith("map")) window.ReportMap?.unmount();
  document
    .querySelectorAll("[data-nav]")
    .forEach((a) =>
      a.classList.toggle(
        "active",
        r.startsWith(a.dataset.nav) ||
          (a.dataset.nav === "forum" && r.startsWith("thread/")),
      ),
    );
  renderSidebar();
  if (r.startsWith("thread/")) renderThread(thread(r.split("/")[1]));
  else if (r.startsWith("map")) {
    if (r.split("/")[1]) {
      mapSelection = r.split("/")[1];
      mapCategory = "all";
    }
    renderMap();
  } else renderForum();
  if (r === "report") openReport();
}

function openModal(title, html) {
  focusBeforeModal = document.activeElement;
  const root = document.querySelector("#modal-root");
  root.innerHTML = `<section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-head"><h2 id="modal-title">${title}</h2><button class="close-button" data-action="close" aria-label="Đóng cửa sổ">×</button></div>${html}</section>`;
  root.hidden = false;
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() =>
    root.querySelector('input:not([type="checkbox"]),textarea,button')?.focus(),
  );
}
function closeModal() {
  const root = document.querySelector("#modal-root");
  root.hidden = true;
  root.innerHTML = "";
  document.body.style.overflow = "";
  if (focusBeforeModal?.isConnected) focusBeforeModal.focus();
}
function openCreate() {
  openModal(
    "Bạn muốn chia sẻ điều gì?",
    `<p class="modal-intro">Chọn cách phù hợp với điều bạn đang muốn ghi lại.</p><button class="create-choice" data-action="report">${icon("pin")}<span><strong>Báo cáo một hiện tượng</strong><small>Một lần quan sát cụ thể, có thời gian và vị trí.<br>Xuất hiện trên diễn đàn và bản đồ.</small></span>${icon("chevron")}</button><button class="create-choice" data-action="discussion">${icon("message")}<span><strong>Mở chủ đề thảo luận</strong><small>Hỏi đáp, phân tích hoặc chia sẻ kiến thức.<br>Có thể dẫn chiếu nhiều báo cáo, không tạo điểm bản đồ.</small></span>${icon("chevron")}</button>`,
  );
}
function categorySelect(selected = "sky") {
  return `<select name="category" id="form-category">${categories
    .slice(1)
    .map(
      (c) =>
        `<option value="${c.id}" ${selected === c.id ? "selected" : ""}>${c.label}</option>`,
    )
    .join("")}</select>`;
}
function openDiscussion(prelink) {
  openModal(
    "Mở chủ đề thảo luận",
    `<p class="modal-intro">Bắt đầu bằng một câu hỏi rõ ràng. Dẫn chiếu báo cáo nếu bạn muốn phân tích hoặc đối chiếu.</p><form id="discussion-form"><div class="field-grid"><div class="field"><label for="form-category">Nhóm hiện tượng</label>${categorySelect(thread(prelink)?.category)}</div><div class="field"><label for="topic-kind">Mục đích trao đổi</label><select name="kind" id="topic-kind"><option>Hỏi đáp</option><option ${prelink ? "selected" : ""}>Phân tích / đối chiếu</option><option>Kiến thức / kinh nghiệm</option><option>Thảo luận chung</option></select></div></div><div class="field"><label for="topic-title">Tiêu đề / câu hỏi *</label><input id="topic-title" name="title" required minlength="10" maxlength="200" placeholder="Bạn muốn mọi người cùng tìm hiểu điều gì?"></div><div class="field"><label for="topic-body">Nội dung mở đầu *</label><textarea id="topic-body" name="body" required minlength="30" maxlength="10000" placeholder="Bối cảnh, thông tin đã biết và điều bạn cần được giúp đỡ…"></textarea></div><div class="field"><label>Dẫn chiếu báo cáo <span class="muted">(không bắt buộc)</span></label><div class="report-options">${state.threads
      .filter((t) => t.type === "report")
      .map(
        (t) =>
          `<label class="report-option"><input type="checkbox" name="links" value="${t.id}" ${t.id === prelink ? "checked" : ""}><span>#${t.id.slice(1)} · ${esc(t.title)}<br><small>${esc(t.location)}</small></span></label>`,
      )
      .join(
        "",
      )}</div><small>Liên kết để trao đổi; không gộp các báo cáo và không xác nhận chúng cùng một hiện tượng.</small></div>${uploadField()}<div class="modal-footer"><small>Đăng dưới tài khoản mẫu Minh Anh.<br>Nội dung chỉ lưu trên trình duyệt này.</small><button type="submit" class="button primary">Đăng chủ đề ${icon("arrow")}</button></div></form>`,
  );
}
function uploadField() {
  return `<div class="field"><label for="form-files">Ảnh / tài liệu đính kèm <span class="muted">(tùy chọn)</span></label><input type="file" id="form-files" name="files" multiple accept="image/*,audio/*,video/*,.pdf,.txt"><small>Bản thử lưu tên tệp; ảnh xem trước chỉ có trong phiên hiện tại.</small></div>`;
}
function branchFields(category) {
  return observationLabels[category]
    .map(
      (l, i) =>
        `<div class="field"><label for="extra-${i}">${l} <span class="muted">(tùy chọn)</span></label><input id="extra-${i}" name="${["color", "shape", "direction", "movement"][i]}" maxlength="200" placeholder="Chỉ ghi điều bạn quan sát được"></div>`,
    )
    .join("");
}
function openReport() {
  openModal(
    "Đăng báo cáo hiện tượng",
    `<p class="modal-intro">Ghi lại một lần quan sát. Báo cáo có phần trao đổi riêng và xuất hiện trên bản đồ.</p><form id="report-form"><div class="field-grid"><div class="field"><label for="form-category">Nhóm hiện tượng *</label>${categorySelect()}</div><div class="field"><label for="classification">Loại quan sát *</label><select id="classification" name="kind"><option>Đốm sáng</option><option>UFO / UAP chưa xác định</option><option>Khác / chưa xác định</option></select></div></div><div class="field"><label for="report-source">Nguồn báo cáo *</label><select id="report-source" name="source"><option>Trực tiếp quan sát</option><option>Đăng lại từ nguồn khác</option></select></div><div class="field" id="source-field" hidden><label for="report-source-detail">Người quan sát / nguồn gốc *</label><input id="report-source-detail" name="sourceURL" placeholder="Tên nguồn, liên kết hoặc lời kể có ghi người cung cấp"></div><div class="field"><label for="report-title">Tiêu đề *</label><input id="report-title" name="title" required minlength="10" maxlength="200" placeholder="Mô tả ngắn hiện tượng bạn ghi nhận"></div><div class="field"><label for="report-body">Mô tả quan sát *</label><textarea id="report-body" name="body" required minlength="30" maxlength="10000" placeholder="Bạn thấy, nghe hoặc ghi nhận điều gì? Trong hoàn cảnh nào?"></textarea></div><div class="field-grid"><div class="field"><label for="observed">Thời gian quan sát *</label><input id="observed" type="datetime-local" name="observed" required value="2026-09-30T20:00"><label style="font-weight:400;margin-top:7px;font-size:9px;display:flex;gap:6px;align-items:center"><input style="width:auto" type="checkbox" name="estimated">Thời gian ước lượng</label></div><div class="field"><label for="observer-location">Vị trí người quan sát *</label><input id="observer-location" name="location" required placeholder="Ví dụ: Sơn Trà, Đà Nẵng"><small>Nhập khu vực gần đúng. Không cần địa chỉ nhà.</small></div></div><div class="field"><label for="map-area">Điểm khu vực trên bản đồ <span class="muted">(tùy chọn trong bản thử)</span></label><select id="map-area" name="mapArea"><option value="">Chưa chọn điểm bản đồ</option>${Object.entries(window.ReportMap.areas).map(([key,area])=>`<option value="${key}">${area.name}</option>`).join("")}</select><small>Chọn khu vực khớp với vị trí người quan sát. Chỉ có một số điểm minh họa; chưa có tìm địa chỉ hoặc GPS.</small></div><div class="field"><label for="phenomenon-location">Vị trí hiện tượng <span class="muted">(nếu biết)</span></label><input id="phenomenon-location" name="phenomenonLocation" placeholder="Không đoán nếu bạn chưa xác định được"></div><div class="field-grid" id="branch-fields">${branchFields("sky")}</div>${uploadField()}<div class="helper">Vị trí công khai: khu vực bạn nhập và điểm đại diện nếu đã chọn. Prototype chưa thu GPS hay metadata thiết bị.</div><div class="modal-footer"><small>Báo cáo có một luồng trả lời.<br>Không tạo sự kiện hoặc điểm tin cậy.</small><button class="button primary" type="submit">Đăng báo cáo ${icon("arrow")}</button></div></form>`,
  );
}
function readFiles(input) {
  return Array.from(input?.files || []).map((f) => {
    const key = crypto.randomUUID();
    if (f.type.startsWith("image/")) mediaURLs.set(key, URL.createObjectURL(f));
    return {
      name: f.name,
      type: f.type || "application/octet-stream",
      key,
      origin: "Tải lên từ thiết bị · Chưa khai báo nguồn trong bản thử",
    };
  });
}
function toggleList(key, id) {
  state[key] = state[key].includes(id)
    ? state[key].filter((v) => v !== id)
    : [...state[key], id];
  persist();
}

document.addEventListener("click", (e) => {
  const el = e.target.closest(
    "[data-action],[data-category],[data-tab],[data-page],[data-map-category],[data-map-report],[data-map-mode],[data-map-command]",
  );
  if (!el) return;
  if (el.dataset.category) {
    category = el.dataset.category;
    page = 1;
    search = "";
    if (!["forum", "saved", "followed"].includes(route()))
      location.hash = "forum";
    else render();
    return;
  }
  if (el.dataset.tab) {
    tab = el.dataset.tab;
    page = 1;
    renderForum();
    return;
  }
  if (el.dataset.page) {
    page = Number(el.dataset.page);
    renderForum();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (el.dataset.mapMode) {
    window.ReportMap.setMode(el.dataset.mapMode);
    return;
  }
  if (el.dataset.mapCommand) {
    if (el.dataset.mapCommand === "home") window.ReportMap.home();
    if (el.dataset.mapCommand === "retry") window.ReportMap.retry();
    if (el.dataset.mapCommand === "zoom-cluster") { closeModal(); mapClusterZoom?.(); }
    return;
  }
  if (el.dataset.mapCategory) {
    mapCategory = el.dataset.mapCategory;
    renderMap();
    return;
  }
  if (el.dataset.mapReport) {
    mapSelection = el.dataset.mapReport;
    window.ReportMap.focusReport(mapSelection);
    return;
  }
  const id = el.dataset.id,
    t = thread(id);
  switch (el.dataset.action) {
    case "create":
      openCreate();
      break;
    case "report":
      openReport();
      break;
    case "discussion":
      openDiscussion();
      break;
    case "related-topic":
      openDiscussion(id);
      break;
    case "close":
      closeModal();
      break;
    case "save":
      toggleList("saved", id);
      render();
      toast(state.saved.includes(id) ? "Đã lưu chủ đề." : "Đã bỏ lưu.");
      break;
    case "follow":
      toggleList("followed", id);
      render();
      toast(
        state.followed.includes(id)
          ? "Đã theo dõi trong bản thử; chưa gửi thông báo."
          : "Đã bỏ theo dõi.",
      );
      break;
    case "useful": {
      toggleList("liked", el.dataset.reply);
      const r = t.replies.find((r) => r.id === el.dataset.reply);
      el.classList.toggle("active", state.liked.includes(r.id));
      el.innerHTML = `${icon("check")}Hữu ích · ${(r.useful || 0) + (state.liked.includes(r.id) ? 1 : 0)}`;
      break;
    }
    case "quote":
      quote = t.replies.find((r) => r.id === el.dataset.reply);
      renderQuote();
      document.querySelector("#reply-body")?.focus();
      break;
    case "clear-quote":
      quote = null;
      renderQuote();
      break;
    case "reply-focus":
      document.querySelector("#reply-body")?.focus();
      break;
    case "flag":
      openModal(
        "Báo nội dung cần xem xét",
        `<p class="modal-intro">Ghi lý do để người kiểm duyệt hiểu vấn đề. Bản thử chỉ ghi nhận trên máy của bạn.</p><form id="flag-form" data-target="${esc(el.dataset.target)}"><div class="field"><label for="flag-reason">Lý do *</label><select id="flag-reason" name="reason"><option>Công kích / xúc phạm</option><option>Lộ thông tin cá nhân</option><option>Spam / không liên quan</option><option>Khác</option></select></div><div class="field"><label for="flag-detail">Thông tin bổ sung</label><textarea id="flag-detail" name="detail" maxlength="2000"></textarea></div><div class="modal-footer"><small>Không tự ẩn hoặc kết luận nội dung.</small><button class="button primary" type="submit">Ghi nhận báo vi phạm</button></div></form>`,
      );
      break;
    case "edit-summary":
      openModal(
        "Tóm tắt hiện tại",
        `<p class="modal-intro">Tổng hợp những ý chính, nguồn tham chiếu và dữ liệu còn thiếu. Có thể giữ trạng thái chưa có lời giải.</p><form id="summary-form" data-id="${id}" class="summary-edit"><div class="field"><label for="summary-body">Nội dung tóm tắt *</label><textarea id="summary-body" name="body" required minlength="20" maxlength="5000">${esc(t.summary || "")}</textarea></div><div class="modal-footer"><small>Chỉnh sửa bởi tác giả chủ đề mẫu.</small><button class="button primary" type="submit">Lưu tóm tắt</button></div></form>`,
      );
      break;
    case "cluster": {
      const records = mapReports().filter((t) =>
        t.location.includes("Đà Nẵng"),
      );
      openModal(
        `${records.length} báo cáo tại Đà Nẵng`,
        `<p class="modal-intro">Cụm điểm chỉ giúp bản đồ gọn hơn. Mỗi báo cáo vẫn độc lập.</p>${records.map((r) => linkedReport(r.id)).join("")}`,
      );
      break;
    }
    case "clear-filter":
      category = "all";
      tab = "all";
      search = "";
      page = 1;
      render();
      break;
    case "profile":
      openModal(
        "Tài khoản trong bản thử",
        '<p class="modal-intro">Diễn đàn đang dùng tài khoản mẫu Minh Anh. Bạn có thể thử riêng luồng đăng nhập, đăng ký bằng mật khẩu hoặc Google và xác thực OTP.</p><div class="detail-actions"><a class="button primary" href="login.html">Đăng nhập</a><a class="button" href="register.html">Đăng ký</a></div>',
      );
      break;
    case "about":
      openModal(
        "Về bản thử này",
        `<div class="prose"><p>Prototype để hình dung diễn đàn cho các quan sát bất thường tại Việt Nam. Tất cả tên, báo cáo, hình ảnh và số liệu đều là dữ liệu minh họa.</p><p>Bạn có thể đăng báo cáo, mở chủ đề dẫn chiếu nhiều báo cáo, trả lời, trích dẫn, lưu và chỉnh sửa tóm tắt của chủ đề mẫu.</p><p>Dữ liệu chữ được lưu trong trình duyệt. Tệp không tải lên máy chủ; bản đồ dùng dữ liệu địa lý, còn điểm báo cáo là vị trí khu vực minh họa. Chưa có đăng nhập, kiểm duyệt thật, camera, GPS hoặc xác thực bằng chứng.</p></div>`,
      );
      break;
    case "reset":
      openModal(
        "Đặt lại dữ liệu mẫu?",
        `<p class="modal-intro">Xóa nội dung bạn đã tạo trong prototype trên trình duyệt này và khôi phục các ví dụ ban đầu.</p><div class="modal-footer"><button class="button" data-action="close">Giữ dữ liệu</button><button class="button primary" data-action="confirm-reset">Đặt lại</button></div>`,
      );
      break;
    case "confirm-reset":
      state = structuredClone(sample);
      persist();
      quote = null;
      search = "";
      category = "all";
      page = 1;
      tab = "all";
      closeModal();
      if (route() === "forum") render();
      else location.hash = "forum";
      toast("Đã khôi phục dữ liệu mẫu.");
      break;
  }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "search") {
    search = e.target.value;
    page = 1;
    const start = e.target.selectionStart;
    renderForum();
    const input = document.querySelector("#search");
    input.focus();
    input.setSelectionRange(start, start);
  }
});
document.addEventListener("change", (e) => {
  if (e.target.id === "reply-attachments") {
    replyFiles = readFiles(e.target);
    document.querySelector("#reply-files").innerHTML = replyFiles
      .map((m) => `<span class="file-chip">${esc(m.name)}</span>`)
      .join("");
  }
  if (e.target.id === "report-source") {
    const indirect = e.target.value === "Đăng lại từ nguồn khác";
    document.querySelector("#source-field").hidden = !indirect;
    document.querySelector("#report-source-detail").required = indirect;
  }
  if (e.target.id === "form-category" && e.target.closest("#report-form")) {
    const v = e.target.value,
      options = {
        sky: ["Đốm sáng", "UFO / UAP chưa xác định", "Khác / chưa xác định"],
        mystery: [
          "Âm thanh chưa xác định",
          "Biểu hiện được cho là kỳ bí",
          "Khác / chưa xác định",
        ],
        nature: [
          "Hiện tượng ánh sáng",
          "Hiện tượng thời tiết",
          "Khác / chưa xác định",
        ],
        unknown: ["Khác / chưa xác định"],
      };
    document.querySelector("#classification").innerHTML = options[v]
      .map((l) => `<option>${l}</option>`)
      .join("");
    document.querySelector("#branch-fields").innerHTML = branchFields(v);
  }
});
document.addEventListener("submit", (e) => {
  const form = e.target;
  if (
    ![
      "discussion-form",
      "report-form",
      "reply-form",
      "summary-form",
      "flag-form",
    ].includes(form.id)
  )
    return;
  e.preventDefault();
  const data = new FormData(form),
    body = String(data.get("body") || "").trim(),
    title = String(data.get("title") || "").trim();
  if (["discussion-form", "report-form"].includes(form.id)) {
    if (title.length < 10 || body.length < 30) {
      toast("Tiêu đề cần ít nhất 10 ký tự, mô tả cần ít nhất 30 ký tự.");
      return;
    }
    const isReport = form.id === "report-form",
      id = `${isReport ? "r" : "d"}${Date.now()}`;
    const t = {
      id,
      type: isReport ? "report" : "discussion",
      category: data.get("category"),
      kind: data.get("kind"),
      title,
      body,
      author: "Minh Anh",
      time: "Vừa xong",
      views: 0,
      replies: [],
      isNew: true,
      media: readFiles(form.querySelector('[name="files"]')),
    };
    if (isReport) {
      if (!String(data.get("location")).trim()) {
        toast("Hãy nhập khu vực người quan sát.");
        return;
      }
      Object.assign(t, {
        publicCoordinates: window.ReportMap.areas[data.get("mapArea")]?.coordinates,
        source: data.get("source"),
        sourceURL: data.get("sourceURL"),
        observed: data.get("observed"),
        estimated: data.has("estimated"),
        location: String(data.get("location")).trim(),
        phenomenonLocation: data.get("phenomenonLocation"),
        color: data.get("color"),
        shape: data.get("shape"),
        direction: data.get("direction"),
        movement: data.get("movement"),
      });
    } else t.links = data.getAll("links");
    state.threads.unshift(t);
    persist();
    closeModal();
    location.hash = `thread/${id}`;
    toast(
      isReport
        ? "Đã tạo báo cáo và luồng trao đổi."
        : "Đã mở chủ đề thảo luận.",
    );
  } else if (form.id === "reply-form") {
    if (!body) {
      toast("Hãy nhập nội dung trả lời.");
      return;
    }
    const t = thread(form.dataset.id);
    const r = {
      id: `p${Date.now()}`,
      author: "Minh Anh",
      time: "Vừa xong",
      body,
      useful: 0,
      quote: quote ? `${quote.author}: ${quote.body.slice(0, 300)}` : null,
      media: replyFiles,
    };
    t.replies.push(r);
    t.time = "Vừa xong";
    quote = null;
    persist();
    render();
    document
      .querySelector(`#reply-${r.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    toast("Đã gửi trả lời trong bản thử.");
  } else if (form.id === "summary-form") {
    if (body.length < 20) {
      toast("Hãy viết tóm tắt ít nhất 20 ký tự.");
      return;
    }
    thread(form.dataset.id).summary = body;
    persist();
    closeModal();
    render();
    toast("Đã cập nhật tóm tắt.");
  } else {
    state.flags.push({
      target: form.dataset.target,
      reason: data.get("reason"),
      detail: data.get("detail"),
    });
    persist();
    closeModal();
    toast("Đã ghi nhận cục bộ; chưa gửi tới kiểm duyệt viên.");
  }
});
document.querySelector("#modal-root").addEventListener("click", (e) => {
  if (e.target.id === "modal-root") closeModal();
});
document.addEventListener("keydown", (e) => {
  const root = document.querySelector("#modal-root");
  if (root.hidden) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") {
    const items = [
      ...root.querySelectorAll("a[href],button,input,select,textarea"),
    ].filter((el) => !el.disabled && el.getClientRects().length);
    const first = items[0],
      last = items.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }
});
window.addEventListener("hashchange", () => {
  if (route().startsWith("reply-")) {
    document
      .getElementById(route())
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  closeModal();
  quote = null;
  render();
  window.scrollTo(0, 0);
});
// Reply anchors retain the current thread instead of becoming a new page.
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#reply-"]');
  if (a) {
    e.preventDefault();
    document
      .getElementById(a.getAttribute("href").slice(1))
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
render();
