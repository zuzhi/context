window.addEventListener("load", function() {
    chrome.extension.sendMessage({
        type: "dom-loaded", 
        data: {
            myProperty: "value"
        }
    });
}, true);

var port = chrome.runtime.connect({name: "my-channel"});
port.postMessage({myProperty: "value"});
port.onMessage.addListener(function(msg) {
    // do some stuff here
    alert(msg);
});

