// Function to handle login requests
function handleLogin(e) {
  var params = JSON.parse(e.postData.contents);
  var username = params.username;
  var password = params.password;

  // Define the correct credentials (you can change these)
  var correctUsername = "admin";
  var correctPassword = "password123";

  if (username === correctUsername && password === correctPassword) {
    return ContentService.createTextOutput("success").setMimeType(ContentService.MimeType.TEXT);
  } else {
    return ContentService.createTextOutput("failure").setMimeType(ContentService.MimeType.TEXT);
  }
}

// Existing doPost function
function doPost(e) {
  try {
    var formData = JSON.parse(e.postData.contents);

    if (!formData.name || !formData.email || !formData.message) {
      return ContentService.createTextOutput("Error: Missing required fields (name, email, message).")
        .setMimeType(ContentService.MimeType.TEXT);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([new Date(), formData.name, formData.email, formData.message]);

    return ContentService.createTextOutput("Data submitted successfully.")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    Logger.log("Error in doPost: " + error.message);
    return ContentService.createTextOutput("Error: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
