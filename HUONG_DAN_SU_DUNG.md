# HƯỚNG DẪN CHI TIẾT: TỐI ƯU MOBILE & CÀI ĐẶT ĐỔ DATA VỀ GOOGLE SHEET

---

## I. CÁC TỐI ƯU DÀNH CHO CHIẾN DỊCH QUẢNG CÁO TẬP TRUNG FORM LEAD
1. **Loại bỏ hoàn toàn Hotline và Zalo:**
   - Tránh việc khách thoát trang gọi điện hoặc nhắn tin trực tiếp làm thất thoát dữ liệu và khó đo lường chi phí trên một chuyển đổi (Cost Per Lead - CPL).
   - 100% lưu lượng truy cập từ quảng cáo được điều hướng tập trung vào **Form Đăng Ký**.
2. **Nút Floating CTA Full-Width trên Mobile:**
   - Đáy màn hình điện thoại chỉ có 1 nút duy nhất, to rõ, nổi bật với hiệu ứng phát sáng nhẹ: **"ĐĂNG KÝ TƯ VẤN - NHẬN ƯU ĐÃI GIẢM 20%"** $\rightarrow$ bấm vào sẽ cuộn mượt ngay đến Form để điền thông tin.
3. **Khắc phục lỗi tự động Zoom của iPhone (iOS Safari):**
   - Đã đặt `font-size: 16px` cho tất cả các ô nhập liệu (`input`, `select`), giúp màn hình không bị phóng to bất ngờ khi khách hàng chạm vào ô điền.
4. **Hiệu ứng Loading khi gửi form:**
   - Nút đổi sang trạng thái *"Đang gửi thông tin..."* để khách hàng không bấm liên tục nhiều lần.

---

## II. HƯỚNG DẪN CÀI ĐẶT DỮ LIỆU ĐỔ VỀ GOOGLE SHEET (100% MIỄN PHÍ)

Hệ thống đã được lập trình sẵn bằng công nghệ **Google Apps Script Web App**. Bạn chỉ cần làm theo 5 bước:

### Bước 1: Tạo Google Sheet mới
1. Mở trình duyệt và truy cập: [https://sheets.new](https://sheets.new)
2. Đặt tên file (ví dụ: `Data Khách Hàng KSK Phương Đông`).
3. Tại **Dòng 1**, nhập tên các cột theo thứ tự sau:
   - **Cột A:** `Thời Gian`
   - **Cột B:** `Họ Và Tên`
   - **Cột C:** `Số Điện Thoại`
   - **Cột D:** `Gói Khám`
   - **Cột E:** `Ngày Dự Kiến Khám`
   - **Cột F:** `Ghi Chú`
   - **Cột G:** `Nguồn Form`

---

### Bước 2: Dán mã Script vào Google Sheet
1. Trên thanh công cụ Google Sheet, bấm:  
   👉 **Tiện ích mở rộng (Extensions)** $\rightarrow$ chọn **Apps Script**.
2. Xóa hết code mặc định, mở file [google_sheet_script.js](file:///c:/Users/hungnv/Desktop/Landi%20KSK/google_sheet_script.js), sao chép toàn bộ nội dung và **dán vào ô soạn thảo Apps Script**.
3. Bấm biểu tượng **Lưu (Save)** hoặc nhấn `Ctrl + S`.

---

### Bước 3: Triển khai thành Web App (Deploy)
1. Ở góc trên bên phải trang Apps Script, bấm nút màu xanh **Triển khai (Deploy)** $\rightarrow$ chọn **Tùy chọn triển khai mới (New deployment)**.
2. Bấm vào biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại", chọn **Ứng dụng web (Web app)**.
3. Cấu hình:
   - **Mô tả (Description):** `Nhận data KSK`
   - **Thực thi dưới dạng (Execute as):** `Tôi (Me)`
   - **Ai có quyền truy cập (Who has access):** 👉 Chọn **`Bất kỳ ai (Anyone)`** *(Lưu ý: Bắt buộc chọn "Bất kỳ ai" thì Landing page mới gửi data vào được!)*
4. Bấm nút **Triển khai (Deploy)**.
5. Google sẽ hiện cửa sổ yêu cầu cấp quyền:
   - Bấm **Ủy quyền truy cập (Authorize access)** $\rightarrow$ chọn tài khoản Google của bạn $\rightarrow$ bấm chữ **Nâng cao (Advanced)** ở góc dưới $\rightarrow$ bấm tiếp **Đi tới [Tên dự án] (không an toàn)** $\rightarrow$ bấm **Cho phép (Allow)**.
6. Sau khi triển khai xong, hãy bấm **Sao chép (Copy)** đường link **URL ứng dụng web (Web app URL)** (dạng: `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Bước 4: Dán Link vào Landing Page
1. Mở file [index.html](file:///c:/Users/hungnv/Desktop/Landi%20KSK/index.html).
2. Cuộn xuống phần thẻ `<script>` ở gần cuối file, tìm dòng:
   ```javascript
   const GOOGLE_SHEET_WEBAPP_URL = "";
   ```
3. Dán link vừa sao chép vào giữa hai dấu ngoặc kép:
   ```javascript
   const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Lưu file `index.html` lại.

---

### Bước 5: Kiểm tra thử nghiệm
- Mở file `index.html` trên trình duyệt.
- Điền thử Họ tên, Số điện thoại, chọn gói khám và bấm **Đăng ký nhận ưu đãi ngay**.
- Dữ liệu khách hàng sẽ ngay lập tức được ghi vào dòng mới trên Google Sheet theo thời gian thực!
