/**
 * Google Apps Script backend for the 20/10 page's interaction log.
 * Setup steps are in README.md ("Theo dõi tương tác").
 */

// Optional: put your email here to get a mail every time a gift choice is sent.
const NOTIFY_EMAIL = "";

const SHEET_NAME = "Log";
const HEADERS = ["Thời gian", "Sự kiện", "Chi tiết", "Phiên", "Thiết bị"];

const EVENT_LABELS = {
  visit: "Mở trang",
  letter_open: "Mở thư",
  letter_close: "Gấp thư",
  gift_pick: "Chọn quà",
  gift_send: "Gửi lựa chọn quà",
  secret_open: "Bấm quà đặc biệt",
};

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  const label = EVENT_LABELS[data.event] || data.event;
  sheet.appendRow([new Date(data.at || Date.now()), label, data.detail || "", data.session || "", data.device || ""]);

  if (NOTIFY_EMAIL && data.event === "gift_send") {
    MailApp.sendEmail(NOTIFY_EMAIL, "🎁 Có lựa chọn quà 20/10!", `Người nhận đã chọn: ${data.detail}`);
  }

  return ContentService.createTextOutput("ok");
}
