
//// UNCHANGING GLOBALS ////
//
//
// not altered by functions
//
// month names in sequence
var months = ['January',' February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// days in each month, adjusted for leap years
var monthDays = function() {
    if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
        return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    else {
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
};

// full date today
var date = new Date();

// day number today - used to highlight today on calendar
var day = date.getDate();

// month today - unchanging record for testing
var currentMonth = date.getMonth();

// year today - unchanging record for testing
var currentYear = date.getFullYear();

////////////////



//// CHANGING GLOBALS ////
//
//
// altered by functions in process of redrawing the calendar
//
// currently displayed month
var month = date.getMonth();

// currently displayed year
var year = date.getFullYear();

// number of days in currently displayed month
var days_in_this_month = monthDays()[month];

////////////////





// create calendar
var calInit = function(weekDay, dayRequest) {
    
    var first_week_day = new Date(year, month, dayRequest).getDay();
    
    // Define the variable which holds the calendar table
    var calendar_html = '<table class="calendarTable">';
    calendar_html += '<tr>';
    // Create row to display the week days
    for (week_day_name = 0; week_day_name < 7; week_day_name++) {
        calendar_html += '<td class="weekDay">' + weekDay[week_day_name] + '</td>';
        }
    calendar_html += '</tr><tr>';
    // Fill first row of the month with empty cells until the month starts.
    for (week_start = 0; week_start < first_week_day; week_start++) {
        calendar_html += '<td> </td>';
        }
    // Populate the days in the month
    var week_day = first_week_day;
    for (day_counter = 1; day_counter <= days_in_this_month; day_counter++) {
        week_day %= 7;
        // Check if week ends, if yes move to next row
        if (week_day === 0) {
              calendar_html += '</tr><tr>';
          }
        // highlight the current day as per css, else add as normal
        if (day === day_counter) {
            
            if (month === currentMonth && year === currentYear) {
                calendar_html += '<td class="currentDay">' + day_counter + '</td>';
            }
            else {
                calendar_html += '<td class="monthDay"> ' + day_counter + ' </td>';
            }
        }
        else {
          calendar_html += '<td class="monthDay"> ' + day_counter + ' </td>';
          }
        week_day++;
        }
    // Close the Calendar table
    calendar_html += '</tr>';
    calendar_html += '</table>';
    // Display the calendar heading
    document.getElementById("calHead").innerHTML = months[month] + ' ' + year;
    // Display the calendar.
    document.getElementById("cal").innerHTML += calendar_html;
};




// move forwards in time
var timeForward = function(timePeriod, weekDay, dayRequest) {
    // clear calendar
    document.getElementById("cal").innerHTML = '';
    // change variables to advance calendar by timePeriod
    switch (timePeriod)
    {
      
    case 'months':
      // for months other than december, add +1
      // to month number
      if (month + 1 <= 11) {
        month = month + 1;
        }
      // for december set month to january and
      // advance year by +1
      else {
        month = 0;
        year = year + 1;
        }
      break;
      
    case 'years':
        year = year + 1;
      break;
      
    case 'decades':
        year = year + 10;
      break;
      
    case 'centuries':
        year = year + 100;
      break;
      
    }
    // find number of days in the new month
    days_in_this_month = monthDays()[month];
    // recreate calendar
    calInit(weekDay, dayRequest);
};



// move backwards in time
var timeBackward = function (timePeriod, weekDay, dayRequest) {
    // clear calendar
    document.getElementById("cal").innerHTML = '';
    // change variables to move calendar back by timePeriod
    switch (timePeriod)
    {
      
      case 'months':
        // for months other than january, subtract -1
        // from the month number
        if (month - 1 >= 0) {
        month = month - 1;
        }
        // for january set month to december and
        // subtract -1 from the year
        else {
          month = 11;
          year = year - 1;
        }
        break;
        
      case 'years':
        year = year - 1;
        break;
      
      case 'decades':
        year = year - 10;
        break;
      
      case 'centuries':
        year = year - 100;
        break;
        
    }
    
    // find number of days in the new month
    days_in_this_month = monthDays()[month];
    // recreate calendar
    calInit(weekDay, dayRequest);
};




var freshCal = function (weekDay, dayRequest) {
    // clear calendar
    document.getElementById("cal").innerHTML = '';
    // reset changing globals
    month = date.getMonth();
    year = date.getFullYear();
    days_in_this_month = monthDays()[month];
    // recreate calendar
    calInit(weekDay, dayRequest);
};
    




///// Control Functions /////

//Experimental changing first week day
var weekDayCalc = function(wkStart, func_to_call, timePeriod) {
  // default sequence of week, starting on monday
  var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // variable to hold chosen sequence of week days
  var weekDay = [];
  // if week starts on monday, sequence of days matches default
  if (wkStart === 0) {
    weekDay = days;
  }
  // otherwise edit default sequence so week starts on chosen day
  else {
    var daysA = days.slice(wkStart);
    var daysB = days.slice(0, wkStart);
    
    weekDay = daysA.concat(daysB);
  }
  // used in request for value to generate blank spaces in calendar
  // e.g. 'first_week_day = new Date(year, month, dayRequest).getDay();'
  // use the negative equivalent of the index of the day in the default
  // sequence of days.  so mon=0, tue=-1, wed=-2, thu=-3, fri=-4, sat=-5
  // sun=-6.
  var dayRequest = -Math.abs(wkStart);
  
  switch (func_to_call)
  {
    case 'calInit':
      calInit(weekDay, dayRequest);
      break;
    
    case 'timeForward':
      timeForward(timePeriod, weekDay, dayRequest);
      break;
    
    case 'timeBackward':
      timeBackward(timePeriod, weekDay, dayRequest);
      break;
      
    case 'freshCal':
      freshCal(weekDay, dayRequest);
      break;
  }
};


var getWeekStart = function(callback, func_to_call, timePeriod) {
  // create variable to store retrieved data
  var wkStart = " ";
  // retrieve from storage API
  chrome.storage.sync.get({
    myWeekStart: '0'
  },
  // store data in variable
  function (obj) {
    wkStart = obj.myWeekStart;
    // pass to callback function
    callback(wkStart, func_to_call, timePeriod);
  });
};


var mainInit = function (func_to_call, timePeriod) {
  
  getWeekStart(weekDayCalc, func_to_call, timePeriod);
  
};




// handlers for advancing a month, year, decade and century

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#rightButton').addEventListener('click', function() {
      mainInit('timeForward', 'months');
    }, false);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#rightYearArrow').addEventListener('click', function() {
      mainInit('timeForward', 'years')
    }, false);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#rightDecArrow').addEventListener('click', function() {
      mainInit('timeForward', 'decades')
    }, false);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#rightCentArrow').addEventListener('click', function() {
      mainInit('timeForward', 'centuries')
    }, false);
});



// handlers for going back a month, year, decade and century

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#leftButton').addEventListener('click', function() {
      mainInit('timeBackward', 'months')
    }, false);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#leftYearArrow').addEventListener('click', function() {
      mainInit('timeBackward', 'years')
    }, false);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#leftDecArrow').addEventListener('click', function() {
      mainInit('timeBackward', 'decades')
    }, false);
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#leftCentArrow').addEventListener('click', function() {
      mainInit('timeBackward', 'centuries')
    }, false);
});



// reset calendar

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#middleButton').addEventListener('click', function() {
      mainInit('freshCal');
}, false);
});



// create calendar on load

document.addEventListener('DOMContentLoaded', function () {
    mainInit('calInit');
}, false);