

function checkShellCompliance() {
  var spreadsheet = SpreadsheetApp.getActive();
  var shellSheet = spreadsheet.getSheetByName("Shells");
  var backendSheet = spreadsheet.getSheetByName("Backend");
  var shellArray = [];

//Clear data before updating
  clearShellData(backendSheet);

// check to see if row is compliant. If so, add name to array
shellArray = getShellArray(shellSheet);

//Go to database sheet, print array to compliant Shells
printCompliantShells(shellArray, backendSheet);

}
function clearShellData(backendSheet) {
  var row = 2;
  var column = 2;
  var numberOfRows = 500;

  backendSheet.getRange(row, column, numberOfRows).setValue("");
}

function getShellArray(sheet)  {
  var array = [];
  var row = 2;
  var compliantColumn = 18;
  var nameColumn = 1;
  var cell = sheet.getRange(row, nameColumn); // first nameColumn

  while (cell.getValue() != "") {
    if (sheet.getRange(row, compliantColumn).getValue() == "Yes") {
      array.push(sheet.getRange(row, nameColumn).getValue());
    }

  row++;
  cell = sheet.getRange(row, nameColumn);
  }

    return array;
}

function printCompliantShells(shellArray, backendSheet) {
  var row = 2;
  var column = 2;

  var cell = backendSheet.getRange(row, column);

  for (var i = 0; i < shellArray.length; i++) {
      backendSheet.getRange(row, column).setValue(shellArray[i]);
      row++;
    }
}


function getProposedDate() {
  var spreadsheet = SpreadsheetApp.getActive();
  var scheduleSheet = spreadsheet.getSheetByName("Schedule");
  var selectedRow = scheduleSheet.getRange(1, 9);
  selectedRow = selectedRow.getValue();
  var rawData = [];
  for (var column = 1; column < 9 ; column++) {
    var cellRange = scheduleSheet.getRange(selectedRow, column);
    rawData.push(cellRange.getValue());
  }

  return rawData;
}

function linkDateTime(data) {
  var rawArray = data;
  var dateTime = rawArray[1];
  var timeBlock = rawArray[2];
  var arrayNoDateTime = [];
  var sortedArray = [];

  Logger.log(dateTime);
  Logger.log(timeBlock);
}

function print(string) {
  Logger.log(string);
}

function testJoshua() {
  var rawData = getProposedDate();
  linkDateTime(rawData);

}
