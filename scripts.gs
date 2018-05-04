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

function getScheduledDates() {

  // variables for coordinates and array
  var row = 2;
  var column = 5; //E
  var scheduledDates = [];
  var backendSheet = SpreadsheetApp.getActive().getSheetByName("Backend");

  if (backendSheet.getRange(row, column).getValue() == "") {
    SpreadsheetApp.getUi().alert("getScheduledDates Failed. Please try again.");
    return;
  }
  //iterate through data and add to selectedDates
  while (backendSheet.getRange(row, column).getValue() != "") {
    scheduledDates.push(getScheduledDate(row, column, backendSheet));

    row++;
  }
  return scheduledDates;
}

function getScheduledDate(row, column, sheet) {
  var dateArray = [];

  for (i=0; i < 6; i++) {
    dateArray.push(sheet.getRange(row, column + i).getValue());
  }
  return dateArray;

}

function removeExpiredData() {
  var scheduledDates = getScheduledDates();
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



function checkAvailability() {
var proposedDate = getProposedDate();
//variables
var scheduledDates = getScheduledDates();
var compliantShells = getShellArray(SpreadsheetApp.getActive().getSheetByName("Shells"));
var unavailableDates = [];
var availableShells = [];

//check propsed out date against scheduled in dates
for (i = 0; i < scheduledDates.length; i++) {

  if (proposedDate[1] < scheduledDates[i][2]) {
    if (proposedDate[1] > scheduledDates[i][1]) {
      unavailableDates.push(scheduledDates[i]);
    }
  }
}
//check proposed in date against scheduled out Dates. save overlaps in array
for (j = 0; j < scheduledDates.length; j++) {

  if (proposedDate[3] > scheduledDates[j][1]) {
    if (proposedDate[3] < scheduledDates[j][2]) {
      unavailableDates.push(scheduledDates[j]);
    }
  }
}
// check unavailable dates against compliant shells
for (k = 0; k < unavailableDates.length; k++) {

  for (l = 0; l < compliantShells.length; l++) {

    if (unavailableDates[k][4] == compliantShells[l]) {
        compliantShells[l] = null;
    }
  }
}
//transfer compliant shells to available shells.
for (m = 0; m < compliantShells.length; m++) {
  if (compliantShells[m] != null) {
    availableShells.push(compliantShells[m]);
  }
}
// paste available shells in availble shells
  writeAvailableShells(availableShells);
}


function writeAvailableShells(availableShells) {
  var sheet = SpreadsheetApp.getActive().getSheetByName("Backend");
  var ranges = sheet.getRange(2, 3, 500, 1);
  var row = 2;
  var column = 3;
  //var range = sheet.getRange(2, 3);
  ranges.setValue("");

  for (i = 0; i < availableShells.length; i++) {
    sheet.getRange(row, column).setValue(availableShells[i]);
    row++;
  }
}
