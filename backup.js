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
          el[i].style.fontFamily = 'Verdana';
          //color
          el[i].style.backgroundColor = 'white';
          el[i].style.color = 'black';
        }
        if (el[i].id == "div" ){
          //layout
          el[i].style.marginTop = "5px";
        }
        if (el[i].tagName == "input" || el[i].class == "UIInput-content"){ //doesn't work yet!! 
          //clickable
          console.log("FORM");
          el[i].style.marginBottom = "5px";
        }
        if (el[i].id == "question-header"){
          //format
          el[i].style.paddingBottom = "3px";
        } 
        if ( ((el[i].id == "div") || (el[i].type == "body") || (el[i].tagName == "h1") || (el[i].text != null)) && (el[i].tagName != "img" )) {
          //color
          el[i].style.backgroundColor = 'white';
          el[i].style.color = 'black';
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
      };
    }
    setProperties(formArr);
  // If user does not want page changed.
  } else { 
    console.log('Not making changes.');
  }
}

// convert settings form responses into property values
function compileProperties(formArr) {
  var propertyArr = []
  for (i = 0; i < formArr.length; i++) {
    localArr = formArr[i];
    if (localArr.length > 1) {
      for (i = 0; i < localArr.length; i++) {
        propertyArr[propertyArr.length] = localArr[i];
      }
    } else {
      propertyArr[propertyArr.length] = localArr;
    }
  }
  return propertyArr;
}
function convertProperties(formOutput){
  var compiledForm = []
  for (i = 0; i < formOutput.length; i++) {
    if (formOutput[i] == "autism") {
      compiledForm[i] = ["fonts-readability", "color-brightness", "summarize", "linear-layout"];
    } else if (formOutput[i] == "screen") {
      compiledForm[i] = ["alt", "linear-layout"] ;
    } else if (formOutput[i] == "vision") {
      compiledForm[i] = ["color-brightness", "linear-layout"] ; 
    } else if (formOutput[i] == "motor") {
      compiledForm[i] = ["enlarge-buttons", "form-space"]; 
    } else if (formOutput[i] == "hearing") {
      compiledForm[i] = ["video", "linear-layout"] ; 
    } else if (formOutput[i] == "dyslexia") {
      compiledForm[i] = ["summarize", "linear-layout", "color-brightness", "fonts-readability"];
    } 

    if (formOutput[i] == "fonts-readability") {
      compiledForm[i] = ["fonts"];
    } else if (formOutput[i] == "color-brightness") {
      compiledForm[i] = ["colors"];
    } else if (formOutput[i] == "linear-layout") {
      compiledForm[i] = ["layout"];
    } else if (formOutput[i] == "consistent-layout") {
      compiledForm[i] = ["layout"];
    } else if (formOutput[i] == "summarize") {
      compiledForm[i] = ["summarize"];
    }
  }
  return compileProperties(compiledForm);
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
