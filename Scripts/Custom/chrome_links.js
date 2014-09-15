
// bookmark values
var chr = "chrome";
var dwy = "dewey";

// bookmark URLs
var chromeBM = "chrome://bookmarks";
var deweyBM = "chrome-extension://aahpfefkmihhdabllidnlipghcjgpkdm/app.html#/main";

// URL to use
var bmURL = " ";


// callback function
var setBM = function(bm) {
  // set bookmarks URL to chrome or chosen extension
  if (bm === chr)
  {
    bmURL = chromeBM;
  }
  if (bm === dwy)
  {
    bmURL = deweyBM;
  }
  // load bookmarks
  chrome.tabs.update({ url: bmURL });
};


var getBM = function(callback) {
  // create variable to store retrieved data
  var bm = " ";
  // retrieve from storage API
  chrome.storage.sync.get({
    myBmUse: 'chrome'
  },
  // store data in variable
  function (obj) {
    bm = obj.myBmUse;
    // pass to callback function
    callback(bm);
  });
};




// loads bookmarks link on click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bookmarks').addEventListener('click', function() {
       getBM(setBM);
    });
});












// loads chrome://extensions

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('extensions').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://extensions' });
    });
});


// loads chrome://settings

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('settings').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://settings' });
    });
});


// loads chrome://history

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('history').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://history' });
    });
});





// loads chrome://downloads

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('downloads').addEventListener('click', function() {
        chrome.tabs.update({ url: 'chrome://downloads' });
    });
});




