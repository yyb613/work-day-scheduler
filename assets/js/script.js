// Hero: display current day 
$('#currentDay').text(moment().format('dddd, MMMM Do'));

// Hours of the day (Array)
var timesArray = [
    '12AM',
    '1AM',
    '2AM',
    '3AM',
    '4AM',
    '5AM',
    '6AM',
    '7AM',
    '8AM',
    '9AM',
    '10AM',
    '11AM',
    '12PM',
    '1PM',
    '2PM',
    '3PM',
    '4PM',
    '5PM',
    '6PM',
    '7PM',
    '8PM',
    '9PM',
    '10PM',
    '11PM',
];

// Do every second
setInterval(function () {
    var currentHourAMPM = moment().format('hA');              // variable for (current hour + AM/PM)
    var currentHourIDX = timesArray.indexOf(currentHourAMPM); // current hour idx in timesArray

    // PAST
    for (var i = 0; i < currentHourIDX; i++) {                // from 12AM - current hour minus 1
        $('#' + timesArray[i]).attr('class', 'col-10 past');  // add 'past' class to textarea
    }

    // PRESENT         
    $('#' + currentHourAMPM).attr('class', 'col-10 present')   // add 'present' class to textarea

    // FUTURE
    for (var j = currentHourIDX + 1; j < timesArray.length - 1; j++) { // from current hour - 11PM
        $('#' + timesArray[j]).attr('class', 'col-10 future');         // add 'future' class to textarea
    }
}, 1000)

var eventsArray = []; // create events array
var eventsIDX = 0;    // initialize array index

// Get events from Local Storage
eventsArray = JSON.parse(localStorage.getItem("events")) || []; // events: Local Storage -> array
for (var i = 9; i <= 17; i++) {                                 // iterate over textarea hours 9-5
    $('textarea#' + timesArray[i]).val(eventsArray[eventsIDX]); // populate textarea values
    eventsIDX++;
}

// Save events to Local Storage
$('.saveBtn').on("click", function () { // when user clicks save...
    eventsIDX = 0;                      // reset events index
    for (var i = 9; i <= 17; i++) {     // iterate over textarea hours 9-5
        if ($('textarea#' + timesArray[i]).val()) { // if textarea has a value
            eventsArray[eventsIDX] = $('textarea#' + timesArray[i]).val(); // store value in array
        } else {
            eventsArray[eventsIDX] = ''; // otherwise store empty string
        }
        eventsIDX++; // increment index
    }

    eventsIDX = 0; // reset index 

    localStorage.setItem("events", JSON.stringify(eventsArray)); // store events in Local Storage
});

