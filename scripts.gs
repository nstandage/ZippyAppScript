function checkCompliance() {
  var spreadsheet = SpreadsheetApp.getActive();
  var truckSheet = spreadsheet.getSheetByName("Trucks");
  var backendSheet = spreadsheet.getSheetByName("Backend");
  var truckArray = [];
  // clear old data
  clearPrintedData(backendSheet);

  // check to see if row is compliant. If so, add name to array
  truckArray = getTruckArray(truckSheet);

  //Go to database sheet, print array to compliant Trucks
  printCompliantTrucks(truckArray, backendSheet);

}

function getTruckArray(sheet) {
  var array = [];
  var row = 2;
  var compliantColumn = 19;
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

function printCompliantTrucks(truckArray, backendSheet) {
  var row = 2;
  var column = 1;

  var cell = backendSheet.getRange(row, column);

  for (var i = 0; i < truckArray.length; i++) {
    backendSheet.getRange(row, column).setValue(truckArray[i]);
    row++;
  }
}

function clearPrintedData(backendSheet) {
  var row = 2;
  var column = 1;
  var numberOfRows = 200;

  backendSheet.getRange(row, column, numberOfRows).setValue("");

}

function grabScheduledDates() {

  // variables for coordinates and array
  var row = 2;
  var column = 6; //f
  var scheduledDates = [];
  var backendSheet = SpreadsheetApp.getActive().getSheetByName("Backend");

  if (backendSheet.getRange(row, column).getValue() == "") {
    SpreadsheetApp.getUi().alert("grabScheduledDates Failed. Please try again.");
    return;
  }
  //iterate through data and add to selectedDates
  while (backendSheet.getRange(row, column).getValue() != "") {
    scheduledDates.push(grabScheduledDate(row, column, backendSheet));

    row = row + 2;

  }
  return scheduledDates;
}

function grabScheduledDate(row, column, sheet) {
  var dateArray = [];
  dateArray.push(sheet.getRange(row, column).getValue());
  dateArray.push(sheet.getRange(row + 1, column).getValue());
  dateArray.push(sheet.getRange(row, column + 1).getValue());
  dateArray.push(sheet.getRange(row + 1, column + 1).getValue());
  dateArray.push(sheet.getRange(row, column + 2).getValue());
  dateArray.push(sheet.getRange(row + 1, column + 2).getValue());

  return dateArray;

}

function removeExpiredData() {
  var scheduledDates = grabScheduledDates();
  var yesterday = new Date(Date.now() - 86400000);
  //create today's date variable
  for (i = 0; i < scheduledDates.length; i++) {

    var date = new Date(scheduledDates[i][4]);

    if (date < yesterday) {
       delete scheduledDates[i];
    } else {
    }

  }
  writeScheduledDates(scheduledDates);
}

function writeScheduledDates(scheduledDates) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("Backend");
  var row = 2;
  var column = 6;
  wipeScheduledDates();

  for (j = 0; j < scheduledDates.length; j++) {

    if (scheduledDates[j] != undefined) {
      writeDate(row, column, scheduledDates[j], sheet);
      row = row + 2;
    }

  }
}

function writeDate(row, column, scheduledDate, sheet) {

  for (i = 0; i < 6; i++) {

    switch (i) {
      case 0:
        sheet.getRange(row, column).setValue(scheduledDate[i]);
        break;
      case 1:
        sheet.getRange(row+1, column).setValue(scheduledDate[i]);
        break;
      case 2:
        sheet.getRange(row, column+1).setValue(scheduledDate[i]);
        break;
      case 3:
        sheet.getRange(row+1, column+1).setValue(scheduledDate[i]);
        break;
      case 4:
        sheet.getRange(row, column+2).setValue(scheduledDate[i]);
        break;
      case 5:
        sheet.getRange(row+1, column+2).setValue(scheduledDate[i]);
        break;
    }

  }


}

function wipeScheduledDates() {
  SpreadsheetApp.getActive().getSheetByName("Backend").getRange(2, 6, 500, 3).setValue("");
}

function print(string) {
  Logger.log(string);
}
