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
  var column = 5; //E
  var scheduledDates = [];
  var backendSheet = SpreadsheetApp.getActive().getSheetByName("Backend");

  if (backendSheet.getRange(row, column).getValue() == "") {
    SpreadsheetApp.getUi().alert("grabScheduledDates Failed. Please try again.");
    return;
  }
  //iterate through data and add to selectedDates
  while (backendSheet.getRange(row, column).getValue() != "") {
    scheduledDates.push(grabScheduledDate(row, column, backendSheet));

    row++;
  }
  return scheduledDates;
}

function grabScheduledDate(row, column, sheet) {
  var dateArray = [];

  for (i=0; i < 6; i++) {
    dateArray.push(sheet.getRange(row, column + i).getValue());
  }
  return dateArray;

}

function removeExpiredData() {
  var scheduledDates = grabScheduledDates();
  var yesterday = new Date(Date.now() - 86400000);
  //create today's date variable
  for (i = 0; i < scheduledDates.length; i++) {

    var date = new Date(scheduledDates[i][2]);

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
  var column = 5;
  wipeScheduledDates();

  for (j = 0; j < scheduledDates.length; j++) {

    if (scheduledDates[j] != undefined) {
      writeDate(row, column, scheduledDates[j], sheet);
      row++;
    }

  }
}

function writeDate(row, column, scheduledDate, sheet) {

  for (i = 0; i < 6; i++) {
    sheet.getRange(row, column + i).setValue(scheduledDate[i]);
  }


}

function wipeScheduledDates() {
  SpreadsheetApp.getActive().getSheetByName("Backend").getRange(2, 5, 500, 6).setValue("");
}

function print(string) {
  Logger.log(string);
}
