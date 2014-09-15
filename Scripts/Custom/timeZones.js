

// format timezone names for display
var formatZones = function(items) {
  for (var i = 0; i < items.length; i++) {
      // strip off continent name and slash
      items[i] = items[i].substring(items[i].indexOf('/') +1);
      // remove underscores
      items[i] = items[i].replace("_", " ");
  }
};


// display timezone names
var setZoneNames = function(zones) {
  // strip out unnecessary characters then display
  formatZones(zones);
  document.getElementById('homeName').innerHTML = zones[0];
  document.getElementById('zoneOneName').innerHTML = zones[1];
  document.getElementById('zoneTwoName').innerHTML = zones[2];
};



var setTimeFormat = function(format) {
  var from = '';
  if (format === '24HrClock') {
    form = 'HH:mm';
  }
  if (format === '12HrClock') {
    form = 'hh:mm A';
  }
  return form;
};


// display timezone times
var setZoneTimes = function(zones) {
  // choose 24hr or 12hr clock format
  tFormat = setTimeFormat(zones[3]);
  // for each zone call moment().tz, format and display
  var tzH = moment().tz(zones[0]).format(tFormat);
  document.getElementById("homeTime").innerHTML = tzH;
  var tz1 = moment().tz(zones[1]).format(tFormat);
  document.getElementById("zoneOneTime").innerHTML = tz1;
  var tz2 = moment().tz(zones[2]).format(tFormat);
  document.getElementById("zoneTwoTime").innerHTML = tz2;
};



// retrieve stored timezones
// note: this is async so passed to
// callback function once completed
var getZones = function(callback) {
  
  // create array to store retrieved data
  var zones = [];
  
  // retrieve from storage API
  chrome.storage.sync.get({
    myHome: 'London',
    myZoneOne: 'New_York',
    myZoneTwo: 'Sydney',
    myTimeFormat: '24HrClock'
  },
  
  // add stored data to array
  function (obj) {
    zones[0] = obj.myHome;
    zones[1] = obj.myZoneOne;
    zones[2] = obj.myZoneTwo;
    zones[3] = obj.myTimeFormat;
    
    // pass to callback function
    callback(zones);
  });
};


// run getZones with each callback function
// to set names and times
var initZones = function() {
    getZones(setZoneNames);
    getZones(setZoneTimes);
};


document.addEventListener('DOMContentLoaded', function () {
    initZones();
    setInterval(initZones, 250);
}, false);