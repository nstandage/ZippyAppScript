function checkComplience() {
  var spreadsheet = SpreadsheetApp.getActive();
  var truckSheet = spreadsheet.getSheetByName("Trucks");
  var backendSheet = spreadsheet.getSheetByName("Backend");
  var truckArray = [];
// clear old data
clearPrintedData(backendSheet);

// check to see if row is complient. If so, add name to array
truckArray = getTruckArray(truckSheet);

//Go to database sheet, print array to complient Trucks
printComplientTrucks(truckArray, backendSheet);


}

function getTruckArray(sheet)  {
  var array = [];
  var row = 2;
  var complientColumn = 19;
  var nameColumn = 1;
  var cell = sheet.getRange(row, nameColumn); // first nameColumn

  while (cell.getValue() != "") {
    if (sheet.getRange(row, complientColumn).getValue() == "Yes") {
      array.push(sheet.getRange(row, nameColumn).getValue());
    }

  row++;
  cell = sheet.getRange(row, nameColumn);
  }
    return array;
}


function printComplientTrucks(truckArray, backendSheet) {
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

  var cell = backendSheet.getRange(row, column);

  while (cell.getValue() != "") {
    backendSheet.getRange(row, column).setValue("");
    row++;
    cell = backendSheet.getRange(row, column);
  }
}
