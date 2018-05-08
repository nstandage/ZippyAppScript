

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

function getShellArray(sheet) {
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
  // Get selected row on cell
  var selectedRow = scheduleSheet.getRange(1, 9);
  selectedRow = selectedRow.getValue();
  // Pull all data on selected row and add to array
  var rawData = [];
  for (var column = 1; column < 9; column++) {
    var cellRange = scheduleSheet.getRange(selectedRow, column);
    rawData.push(cellRange.getValue());
  }

  return linkDateTime(rawData);
}

function linkDateTime(rawArray) {
  var dateTimeOut = new Date(rawArray[1]);
  const timeBlockOut = rawArray[2];
  var dateTimeIn = new Date(rawArray[3]);
  const timeBlockIn = rawArray[4];
  var databaseReadyArray = [rawArray[0]];
  Logger.log(dateTimeIn);
  // Check for time block and update the array to reflect that data.
  switch (timeBlockOut) {
    case 'Early Morning':
      dateTimeOut.setHours(11);
      break;
    case 'Morning':
      dateTimeOut.setHours(13);
      break;
    case 'Afternoon':
      dateTimeOut.setHours(15);
      break;
    case 'Late Afternoon':
      dateTimeOut.setHours(17);
      break;
  }

  switch (timeBlockIn) {
    case 'Early Morning':
      dateTimeIn.setHours(11);
      break;
    case 'Morning':
      dateTimeIn.setHours(13);
      break;
    case 'Afternoon':
      dateTimeIn.setHours(15);
      break;
    case 'Late Afternoon':
      dateTimeIn.setHours(17);
      break;
  }
  Logger.log(dateTimeIn);
  databaseReadyArray.push(dateTimeOut);
  databaseReadyArray.push(dateTimeIn);
  databaseReadyArray.push(rawArray[5]);
  databaseReadyArray.push(rawArray[6]);
  databaseReadyArray.push(rawArray[7]);

  return databaseReadyArray;

}

function print(string) {
  Logger.log(string);
}

function testJoshua() {
  var rawData = getProposedDate();
  linkDateTime(rawData);

}
