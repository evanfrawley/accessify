$(function() {
    // Event Handler for Profile
    $("#profile-radio :input").change(function() {
    	// Save 
    	var profile = $(this).attr("value");
    	saveValue("profile", profile);
    	console.log($(this).attr("value")); 
	});

	// Event handler for toggle buttons
	$('button').click(function(e) {
		console.log("The id is: " + e.target.id);
        var currentValue = toggleValue(e.target.id);
	});
})


// Writes the variable to chrome.store
function saveValue(key, value) {
	console.log("The profile about to be saved is: " + value);
	var obj = {};
	obj[key] = value;
	console.log(obj);
	chrome.storage.local.set(obj, function() {
    	console.log("Wrote key: " + key + " with value: " + value);
    	if (chrome.runtime.error) {
    		console.log("Runtime error.");
    	}
    	readValue(key);
   	})

}

// Reads value for the given key 
function readValue(key) {
	chrome.storage.local.get(null, function(items) {
		console.log("in read value", items[key]);
		return items[key]
	});
}

// Pressed is true, unpressed is false
function toggleValue(key) {
	chrome.storage.sync.get({
		key: false,
	}, function(items) {
		var currentValue = items.key;
		console.log("Current value is: " + !currentValue);
		saveValue(key, !currentValue);
	});
}