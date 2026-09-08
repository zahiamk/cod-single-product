function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheets()[0];

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.id || "",
      data.name || "",
      data.phone || "",
      data.wilaya || "",
      data.commune || "",
      data.quantity || "",
      data.total || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        ok: true
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
