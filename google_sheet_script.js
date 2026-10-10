/**
 * MÃ NGUỒN GOOGLE APPS SCRIPT ĐỂ TỰ ĐỘNG NHẬN DATA FORM TỪ LANDING PAGE VÀO GOOGLE SHEET
 * 
 * HƯỚNG DẪN CÀI ĐẶT 5 BƯỚC:
 * 1. Mở trang Google Trang tính (Google Sheets) mới: https://sheets.new
 * 2. Đặt tên trang tính (ví dụ: "Data Khách Hàng KSK Phương Đông")
 *    - Tại Dòng 1, điền các tiêu đề cột sau:
 *      A1: Thời Gian
 *      B1: Họ Và Tên
 *      C1: Số Điện Thoại
 *      D1: Gói Khám
 *      E1: Ngày Dự Kiến Khám
 *      F1: Ghi Chú
 *      G1: Vị Trí Form
 * 3. Trên menu Google Sheet, chọn: "Tiện ích mở rộng" (Extensions) -> "Apps Script"
 * 4. Xóa hết code mặc định trong cửa sổ Apps Script và DÁN TOÀN BỘ CODE BÊN DƯỚI VÀO.
 * 5. Bấm nút "Triển khai" (Deploy) màu xanh ở góc trên bên phải:
 *    - Chọn "Tùy chọn triển khai mới" (New deployment)
 *    - Bấm vào biểu tượng bánh răng (⚙) cạnh "Chọn loại", chọn: "Ứng dụng web" (Web app)
 *    - Cấu hình:
 *      + Mô tả: "Nhận data KSK"
 *      + Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *      + Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone) -> RẤT QUAN TRỌNG!
 *    - Bấm "Triển khai" (Deploy) -> Cấp quyền truy cập cho tài khoản Google của bạn nếu được hỏi.
 *    - Sao chép đường link "URL Ứng dụng web" (dạng: https://script.google.com/macros/s/.../exec)
 * 6. Mở file index.html, tìm dòng:
 *    const GOOGLE_SHEET_WEBAPP_URL = "DÁN_LINK_VÀO_ĐÂY";
 *    Dán link của bạn vào đó là xong!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Tránh ghi đè khi nhiều khách cùng gửi

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Đọc dữ liệu từ form gửi lên
    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    // Thời gian hiện tại theo múi giờ Việt Nam
    var formattedDate = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss");

    var fullname = data.fullname || "";
    var phone = data.phone || "";
    var pkg = data.package || "";
    var preferred_date = data.preferred_date || "";
    var note = data.note || "";
    var formName = data.formName || "Landing Page";

    // Ghi thêm dòng mới vào Google Sheet
    sheet.appendRow([
      formattedDate,
      fullname,
      phone,
      pkg,
      preferred_date,
      note,
      formName
    ]);

    // Trả về kết quả thành công JSON
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("API Google Sheet Webhook đang hoạt động bình thường!");
}
