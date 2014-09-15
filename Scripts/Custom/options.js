// Saves options to chrome.storage
function save_options() {
  var home = document.getElementById('home').value;
  var zoneOne = document.getElementById('zoneOne').value;
  var zoneTwo = document.getElementById('zoneTwo').value;
  var bmUse = document.getElementById('bmSelect').value;
  var timeFormat = document.getElementById('timeFormat').value;
  var weekStart = document.getElementById('wkDaySelect').value;
  chrome.storage.sync.set({
    myHome: home,
    myZoneOne: zoneOne,
    myZoneTwo: zoneTwo,
    myBmUse: bmUse,
    myTimeFormat: timeFormat,
    myWeekStart: weekStart
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Saved';
    setTimeout(function() {
      status.textContent = '';
    }, 1050);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // retrieve values otherwise use these defaults
  chrome.storage.sync.get({
    myHome: 'London',
    myZoneOne: 'New_York',
    myZoneTwo: 'Sydney',
    myBmUse: 'chrome',
    myTimeFormat: '24HrClock',
    myWeekStart: '0'
  }, function(items) {
    document.getElementById('home').value = items.myHome;
    document.getElementById('zoneOne').value = items.myZoneOne;
    document.getElementById('zoneTwo').value = items.myZoneTwo;
    document.getElementById('bmSelect').value = items.myBmUse;
    document.getElementById('timeFormat').value = items.myTimeFormat;
    document.getElementById('wkDaySelect').value = items.myWeekStart;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);