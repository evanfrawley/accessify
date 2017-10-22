// content.js
console.log("hi");

var answer = confirm("Accessify this page?")
if (answer) {
    //some code
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

	function setProperties() {
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
	}
	setProperties()


	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	    if( request.message === "clicked_browser_action" ) {
	      var firstHref = $("img[src^='http']").eq(0).attr("src");

	      console.log(firstHref);

	      // This line is new!
	      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
	    }
	  }
	);

}
else { 
    //if user does not want page changed!
}

