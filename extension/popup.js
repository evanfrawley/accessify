var on = 1;
chrome.storage.sync.get({
  "onoff": 1,
}, function(items) {
  document.getElementById('onoff').value = items.onoff;
});

//var on = document.getElementById('onoff').value;
console.log(on)
function change() {
    on = -on;
    document.getElementById('onoff').textContent = on; 
    chrome.storage.sync.set({ "onoff" : on }, function() {
     console.log(on);
     if (chrome.runtime.error) {
       console.log("Runtime error.");
     }
   })
}
document.getElementById('onoff').onclick = change;