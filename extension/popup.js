var on = true;
readOn();
function readOn() {
  chrome.storage.local.get({
    "onoff": true,
  }, function(items) {
    document.getElementById('onoff').checked = items.onoff;
  });
}

console.log(on)
function change() {
    on = !on;
    document.getElementById('onoff').checked = on; 
    chrome.storage.local.set({ "onoff" : on }, function() {
     console.log(on);
     if (chrome.runtime.error) {
       console.log("Runtime error.");
     }
   })
}
document.getElementById('onoff').onclick = change;