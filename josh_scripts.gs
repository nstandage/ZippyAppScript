

function checkShellComplience() {
  var spreadsheet = SpreadsheetApp.getActive();
  var shellSheet = spreadsheet.getSheetByName("Shells");
  var backendSheet = spreadsheet.getSheetByName("Backend");
  var shellArray = [];

//Clear data before updating
  clearShellData(backendSheet);

// check to see if row is complient. If so, add name to array
shellArray = getShellArray(shellSheet);

//Go to database sheet, print array to complient Shells
printComplientShells(shellArray, backendSheet);

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
  var complientColumn = 18;
  var nameColumn = 1;
  var cell = sheet.getRange(row, nameColumn); // first nameColumn

  while (cell.getValue() != "") {
    if (sheet.getRange(row, complientColumn).getValue() == "Yes") {
      array.push(sheet.getRange(row, nameColumn).getValue());
    }

  row++;
  cell = sheet.getRange(row, nameColumn);
  }

Logger.log(array);

    return array;
}

function printComplientShells(shellArray, backendSheet) {
  var row = 2;
  var column = 2;

  var cell = backendSheet.getRange(row, column);

  for (var i = 0; i < shellArray.length; i++) {
      backendSheet.getRange(row, column).setValue(shellArray[i]);
      row++;
    }
}


function getProposedDate() {
  var sheet = SpreadsheetApp.getActive();
  var scheduleSheet = sheet.getSheetByName("Schedule");
  var selectedRow = scheduleSheet.getRange(1, 9);
  var array = [];
  var rawData = scheduleSheet.getRange(selectedRow.getValue(), 1, 1,8).getValues();

  Logger.log(rawData);

  return rawData;
}

function writeToBackend(data) {
  var rawArray = data;
  var dateTime = [];
  var arrayNoDateTime = [];
  var sortedArray = [];


}

function print(string) {
  Logger.log(string);
}
