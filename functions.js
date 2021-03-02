"use strict";
exports.__esModule = true;
function setupOrigin() {
    var frame = document.getElementsByTagName("iframe")[0].contentWindow;
    console.log(frame);
    //wwt.contentWindow.frames.wwt.origin = "https://web.wwtassets.org/";
    frame.postMessage("Hello World!", "http://localhost:7800");
}
function changeCoords() {
    //setupOrigin();
    var frame = document.getElementsByTagName("iframe")[0].contentWindow;
    var message = {
        event: "center_on_coordinates",
        ra: Number(document.getElementById('ra').value),
        dec: Number(document.getElementById('dec').value),
        fov: Number(document.getElementById('fov').value),
        instant: false
    };
    frame.postMessage(message, "http://localhost:7800");
    console.log(message);
}
window.addEventListener('message', function (event) {
    alert('Received message');
});
