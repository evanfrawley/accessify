// content.js
var on;
readOn();
// Read all values into currentConfiguration
var currentConfiguration = {};
var compiledVals = []
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

    function setProperties() {
      var properties = convertProperties(formArr);
      var el = document.querySelectorAll('*');
      for(var i=0;i<el.length;i++){

        if ((el[i].id != "map") || el[i].tagName == "em")  {
          //font
          if (compiledVals.indexOf("fonts-readability")) {
            el[i].style.fontFamily = 'Verdana';
          };
          //color
          if (compiledVals.indexOf("color-brightness")) {
            el[i].style.backgroundColor = 'white';
            el[i].style.color = 'black';
          };
          
        }
        if ((el[i].id == "div") && (compiledVals.indexOf("linear-layout")) ) {
          //layout
          el[i].style.marginTop = "5px";
        }
        if ((el[i].tagName == "input" || el[i].class == "UIInput-content") && ( (compiledVals.indexOf("enlarge-buttons")) (compiledVals.indexOf("form-space")) ){ //doesn't work yet!! 
          //clickable
          console.log("FORM");
          el[i].style.marginBottom = "5px";
        }
        if ((el[i].id == "question-header") && (compiledVals.indexOf("linear-layout")) ) {
          //layout
        el[i].style.paddingBottom = "3px";
          } 
        if ((el[i].id == "div" || el[i].type == "body" || el[i].tagName == "h1" || el[i].text != null) && el[i].tagName != "img" ) {
          //color
          if ((compiledVals.indexOf("color-brightness")) || (compiledVals.indexOf("background-color")) ){
            el[i].style.backgroundColor = 'white';
            el[i].style.color = 'black';
          }
        }
      }
      $('p').each(function() {
        //color 

          /* text for current paragraph */
          //this.style.textAlign = 'left';
          if ($(this).text().length > 1){
          $(this).css("background-color", "white");
          $(this).css("color", "black");
          $(this).css("line-height", 3);
          }
          if ($(this).text().length > 20){
            // align 
            $(this).css("text-align", "left");
          }
      });
    }
    setProperties(formArr);

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

/*
"autism" = ["fonts-readability", "color-brightness", "summarize", "linear-layout"]  
"screen" = ["alt", "linear-layout"]  
"vision" = ["color-brightness", "linear-layout"] 
"motor" = ["enlarge-buttons", "form-space"]  
"hearing" = ["video", "linear-layout"] 
"dyslexia" = ["summarize", "linear-layout", "color-brightness", "fonts-readability"]

"fonts-readability" --> "fonts"
"color-brightness" --> "colors"

"linear-layout" --> "layout" //differientiate later lol
"consistent-layout" --> "layout"

"summarize" --> "summarize"
*/

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

      if(key === "summarize") {
        if (profile_key == "autism") {
          compiledVals = ["fonts-readability", "color-brightness", "summarize", "linear-layout"];
        } else if (profile_key == "screen") {
          compiledVals = ["alt", "linear-layout"] ;
        } else if (profile_key == "vision") {
          compiledVals = ["color-brightness", "linear-layout"] ; 
        } else if (profile_key == "motor") {
          compiledVals = ["enlarge-buttons", "form-space"]; 
        } else if (profile_key == "hearing") {
          compiledVals = ["video", "linear-layout"] ; 
        } else if (profile_key == "dyslexia") {
          compiledVals = ["summarize", "linear-layout", "color-brightness", "fonts-readability"];
        } 
        for (var k in keys) {
          if (keys[k] == true) {
            compiledVals[compiledVals.length] = k;
          } else {
            if (compiledVals.indexOf(k)) {
              compiledVals.remove(compiledVals.indexOf(k));
            }
          }
        }
        makeChanges(compiledVals)
      }
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

