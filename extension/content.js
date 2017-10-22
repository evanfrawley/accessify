// content.js
var on;
readOn();
// Read all values into currentConfiguration
var currentConfiguration = {};
readAllValues();

// Make the desired changes to HTML/CSS
function makeChanges() {
  if (on) {
    // HELENA DO YOUR THANG
    console.log('Making changes.');
  	var style = document.createElement('link');
  	style.rel = 'stylesheet';
  	style.type = 'text/css';
  	style.href = chrome.extension.getURL('styles.css');
  	(document.head||document.documentElement).appendChild(style);

  	var buttons = document.getElementsByTagName('button');
  	for (var i = 0; i < buttons.length; i++) {
  	    var button = buttons[i];
  	    var type = button.getAttribute('type') || 'submit'; // Submit is the default
  	    // ...
  	    buttons[i].style.height = "20px";
  	    buttons[i].style.width = "20px";
  	}

  		var el = document.querySelectorAll('*');
  		for(var i=0;i<el.length;i++){
  		  el[i].style.fontFamily = 'Verdana';
  		  el[i].style.color = 'black';
  		  el[i].style.backgroundColor = 'white';
  		  el[i].style.paddingTop = "5px";
  		  //el[i].style.outline = '1px solid grey';		  
  		}
  		$('p').each(function() {
  		    /* text for current paragraph */
  		    //this.style.textAlign = 'left';
  		    if ($(this).text().length > 20){
  		    	$(this).css("text-align", "left");
  		    }
  		});
  // If user does not want page changed.
  } else { 
    console.log('Not making changes.');
  }
}

// Set up listener for plugin icon.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);

// Read if plugin is enabled. 
function readOn() {
  chrome.storage.sync.get({
    "onoff": true,
  }, function(items) {
    on=items.onoff;
    // Make changes if the app is enabled.
    console.log("reading on as: " + on);
    if(on) {
      makeChanges();
    }
  });
}

function readAllValues() {
  // Profile is a string, everything else is a boolean.
  var profile_key = "profile";
  var keys = ["fonts-readability", "color-brightness", "linear-layout", 
              "consistent-layout", "enlarge-buttons", "form-space", "summarize"];

  chrome.storage.sync.get({
    profile_key: "none",
  }, function(items) {
    console.log(items.profile_key);
    currentConfiguration[profile_key] = items.profile_key;
  });

  keys.forEach(function (key) {
    chrome.storage.sync.get({
      key: false,
    }, function(items) {
      console.log(items.key);
      currentConfiguration[key] = items.key;
    });
  });
}

// Collect images, text, video and send request.
function request() {
  let websiteUrl = $("a[href^='http']").eq(0).attr("href");
  var imageUrls = [];
  var text = [];
  var videos = [];

  // Collect src attributes from image tags. 
  $("img[src^='http").each(function() {  
   imgsrc = this.src;
   imageUrls.push(imgsrc);
  }); 

  // Collect bodies of text longer than 500 characters.
  $( "p" )
  .contents()
  .filter(function(){
    return this.nodeType !== 1;
  }).each(function() {  
   body = $(this).text();
    if(body.length > 500) {
      text.push(body);
    }
  }); 

  // Collect video links
  $('video').each( function(num,val){
    // console.log($(this).attr('src'));
    console.log("Video tag here!!!");
    // videos.push();
  }); 
  // Collect video links
  $('video source').each( function(num,val){
    // console.log($(this).attr('src'));
    console.log("Video tag here!!!");
    // videos.push();
  }); 

  //TODO: Make HTTP Request
  let requestJSON = {websiteUrl, imageUrls, text};
  console.log(requestJSON);

}
request();

