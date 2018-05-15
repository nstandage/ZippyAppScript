//var    getCompliantItems("Shells", 2, 18);
function getCompliantItems(sheetName, row, column) {
    var sheet = getSheet(sheetName);
    var compliantItems = [];
    var nameColumn = 1;
    var nameCell = sheet.getRange(row, nameColumn); // first nameColumn
    while (nameCell.getValue() != "") {
        if (sheet.getRange(row, column).getValue() == "Yes") {
            compliantItems.push(sheet.getRange(row, nameColumn).getValue());
        }
        row++;
        nameCell = sheet.getRange(row, nameColumn);
    }
    console.log("Compliant Items: " + compliantItems);
    return compliantItems;
}

function getSheet(sheetName) {
    return SpreadsheetApp.openById("1-sSObYwouUu8Y7gPFmNcGhIy2PDTjfREuLLrdtVrx9U").getSheetByName(sheetName);
}

function linkTimeToDate(rawArray) {
    console.log("linkTimeToDate");
    var dateTimeOut = new Date(rawArray[1]);
    const timeBlockOut = rawArray[2];
    var dateTimeIn = new Date(rawArray[3]);
    const timeBlockIn = rawArray[4];
    var databaseReadyArray = [rawArray[0]];
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
    databaseReadyArray.push(dateTimeOut);
    databaseReadyArray.push(dateTimeIn);
    databaseReadyArray.push(rawArray[5]);
    databaseReadyArray.push(rawArray[6]);
    databaseReadyArray.push(rawArray[7]);

    return databaseReadyArray;
}

function getScheduledDates() {
    var row = 2;
    var column = 1;
    var scheduledDates = [];
    var backendSheet = SpreadsheetApp.openById("1-sSObYwouUu8Y7gPFmNcGhIy2PDTjfREuLLrdtVrx9U").getSheetByName("Backend");

    //iterate through data and add to selectedDates
    while (backendSheet.getRange(row, column).getValue() != "") {
        scheduledDates.push(getScheduledDate(row, column, backendSheet));
        row++;
    }
    return scheduledDates;
}

function getScheduledDate(row, column, sheet) {
    var dateArray = [];
    for (i = 0; i < 6; i++) {
        dateArray.push(sheet.getRange(row, column + i).getValue());
    }
    return dateArray;
}

function removeExpiredData() {
    var scheduledDates = getScheduledDates();
    var yesterday = new Date(Date.now() - 86400000);
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
    var sheet = SpreadsheetApp.openById("1-sSObYwouUu8Y7gPFmNcGhIy2PDTjfREuLLrdtVrx9U").getSheetByName("Backend");
    var row = 2;
    var column = 1;
    wipeScheduledDates();
    for (j = 0; j < scheduledDates.length; j++) {
        if (scheduledDates[j] != undefined) {
            writeDate(row, column, scheduledDates[j], sheet);
            row++;
        }
    }
}

function writeDate(row, column, scheduledDate, sheet) {
    for (i = 0; i < scheduledDate.length; i++) {
        sheet.getRange(row, column + i).setValue(scheduledDate[i]);
    }
}

function wipeScheduledDates() {
    SpreadsheetApp.openById("1-sSObYwouUu8Y7gPFmNcGhIy2PDTjfREuLLrdtVrx9U").getSheetByName("Backend").getRange(2, 1, 500, 6).setValue("");
}

function checkAvailability(proposedDate) {
    var scheduledDates = getScheduledDates(); // This should grab the dates that are already in the calendar
    var compliantShells = getCompliantItems("Shells", 2, 18);
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
    return availableShells;
}

function saveScheduledDate(rawData) {
    var dateToWrite = linkTimeToDate(rawData);
    var row = 2;
    const column = 1;
    var i = 0;
    while (SpreadsheetApp.openById("1-sSObYwouUu8Y7gPFmNcGhIy2PDTjfREuLLrdtVrx9U").getSheetByName("Backend").getRange(row + i, column).getValue() != "") {
        i++;
    }
    writeDate(row + i, column, dateToWrite, SpreadsheetApp.openById("1-sSObYwouUu8Y7gPFmNcGhIy2PDTjfREuLLrdtVrx9U").getSheetByName("Backend"));
}

function doGet(request) {
    return HtmlService.createTemplateFromFile('index')
        .evaluate();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}
