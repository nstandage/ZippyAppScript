let clientNameTextbox = document.getElementById('clientNameTextbox');
let outDateTextbox = document.getElementById('outDateTextbox');
let outTimeDropdown = document.getElementById('outTimeDropdown');
let inDateTextbox = document.getElementById('inDateTextbox');
let inTimeDropdown = document.getElementById('inTimeDropdown');
let coordinatorTextbox = document.getElementById('coordinatorTextbox');
let shellsDropdown = document.getElementById('shellsDropdown');
let trucksDropdown = document.getElementById('trucksDropdown');
let checkAvailabilityButton = document.getElementById('checkAvailabilityButton');
let scheduleButton = document.getElementById('scheduleButton');


checkAvailabilityButton.addEventListener('click', function() {
    var dataToCheck = [];
    dataToCheck.push(clientNameTextbox.value);
    dataToCheck.push(outDateTextbox.value);
    dataToCheck.push(outTimeDropdown.value);
    dataToCheck.push(inDateTextbox.value);
    dataToCheck.push(inTimeDropdown.value);
    dataToCheck.push(coordinatorTextbox.value);
    
    console.log(dataToCheck);
});

scheduleButton.addEventListener('click', function() {
    var dataToCheck = [];
    dataToCheck.push(clientNameTextbox.value);
    dataToCheck.push(outDateTextbox.value);
    dataToCheck.push(outTimeDropdown.value);
    dataToCheck.push(inDateTextbox.value);
    dataToCheck.push(inTimeDropdown.value);
    dataToCheck.push(coordinatorTextbox.value);
    dataToCheck.push(trucksDropdown.value);
    dataToCheck.push(shellsDropdown.value);

    console.log(dataToCheck);

});





