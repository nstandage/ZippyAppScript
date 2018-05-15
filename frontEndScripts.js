function checkAvailability() {
    // add if statement that checks all data is entered
    const clientNameTextbox = document.getElementById('clientNameTextbox');
    const outDateTextbox = document.getElementById('outDateTextbox');
    const outTimeDropdown = document.getElementById('outTimeDropdown');
    const inDateTextbox = document.getElementById('inDateTextbox');
    const inTimeDropdown = document.getElementById('inTimeDropdown');
    const coordinatorTextbox = document.getElementById('coordinatorTextbox');
    var shellsDropdown = document.getElementById('shellsDropdown');
    var trucksDropdown = document.getElementById('trucksDropdown');
    var scheduleButton = document.getElementById('scheduleButton');

    var dataToCheck = [];
    dataToCheck.push(clientNameTextbox.value);
    dataToCheck.push(outDateTextbox.value);
    dataToCheck.push(outTimeDropdown.value);
    dataToCheck.push(inDateTextbox.value);
    dataToCheck.push(inTimeDropdown.value);
    dataToCheck.push(coordinatorTextbox.value);
    
    google.script.run
        .withSuccessHandler(function (availableShells) {
            console.log("Success1");
            for (i = 0; i < availableShells.length; i++) {
                var shellOption = document.createElement('option');
                shellOption.text = availableShells[i];
                shellsDropdown.add(shellOption);
            }

        })
        .withFailureHandler(function (error) {
            console.log("Failure1");
            //create popup thaat displays text instead of message.
            console.log("Couldn't check availability. Please check fields and try again.");
            console.log(error);
        })
        .checkAvailability(dataToCheck);

    google.script.run
        .withSuccessHandler(function(compliantTrucks) {
            console.log("Success2");
            for (i = 0; i < compliantTrucks.length; i++) {
                var truckOption = document.createElement("option");
                truckOption.text = compliantTrucks[i];
                trucksDropdown.add(truckOption);
            }
        })

        .withFailureHandler(function(error) {
            console.log("Failure2");
            console.log("Couldn't check availability. Please check fields and try again.@@@@");
            console.log(error);

        })

        .getCompliantItems("Trucks", 2, 19);

        console.log("FINISHED!");
}

function saveToSchedule() {
    //add if statement that checks all data is entered
    const clientNameTextbox = document.getElementById('clientNameTextbox');
    const outDateTextbox = document.getElementById('outDateTextbox');
    const outTimeDropdown = document.getElementById('outTimeDropdown');
    const inDateTextbox = document.getElementById('inDateTextbox');
    const inTimeDropdown = document.getElementById('inTimeDropdown');
    const coordinatorTextbox = document.getElementById('coordinatorTextbox');
    var shellsDropdown = document.getElementById('shellsDropdown');
    var trucksDropdown = document.getElementById('trucksDropdown');


    var dataToWrite = [];
    dataToWrite.push(clientNameTextbox.value);
    dataToWrite.push(outDateTextbox.value);
    dataToWrite.push(outTimeDropdown.value);
    dataToWrite.push(inDateTextbox.value);
    dataToWrite.push(inTimeDropdown.value);
    dataToWrite.push(trucksDropdown.value);
    dataToWrite.push(shellsDropdown.value);
    dataToWrite.push(coordinatorTextbox.value);

    google.script.run
    .withSuccessHandler(function(){
    console.log("WE DID IT")
    removeOldSelectItems();
    
    })
    .withFailureHandler(function(error) {
    console.log(error);
    removeOldSelectItems();
    })
    .saveScheduledDate(dataToWrite);

}


function removeOldSelectItems() {
    var shellsDropdown = document.getElementById('shellsDropdown');
    var trucksDropdown = document.getElementById('trucksDropdown');

    while (shellsDropdown.length > 1) {
        shellsDropdown.remove(shellsDropdown.length-1);
    }

    while (trucksDropdown.length > 1) {
        trucksDropdown.remove(trucksDropdown.length-1);
    }


}




