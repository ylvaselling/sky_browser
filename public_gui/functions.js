var guiIsConnected = false;

function setBorderRadius(radius) {
  let w = window.innerWidth;
  let h = window.innerHeight;
  let radiusPixels = radius * Math.min(w * 0.5, h * 0.5);
  document.getElementById("container").style.borderRadius = radiusPixels + 'px';
  document.getElementById("wwtWrapper").style.borderRadius = radiusPixels + 'px';
}

function setBackgroundColor(stringColor) {
  document.getElementById("container").style.borderColor = 'rgb(' + stringColor + ')';
}

function sendMessageToWWT(message) {
  try {
    var frame = document.getElementsByTagName("iframe")[0].contentWindow;
    frame.postMessage(message, "http://wwtapp.openspaceproject.com");
  } catch (error) {
    console.log(error);
  }
}

function startUp() {
  // Listen to callback functions from WWT
  window.addEventListener("message", function(event) {
    if (event.data.event == "set_background_color") {
      setBackgroundColor(event.data.data);
    } else if (event.data.event == "set_border_radius") {
      setBorderRadius(event.data.data);
    } else if (event.data.event == "load_image_collection_completed") {
      parent.postMessage("load_image_collection_completed", "*");
    } else if (
      event.data.type == "wwt_application_state" ||
      event.data.type == "wwt_view_state"
    ) {
      if (!guiIsConnected) {
        // The first time the wwt app responds to messages
        // Notify GUI by passing a message to parent
        guiIsConnected = true;
        parent.postMessage("wwt_has_loaded", "*");
      }
    } else if (
      event.data.type != "wwt_application_state" &&
      event.data.type != "wwt_view_state" &&
      event.data != "wwt_has_loaded"
    ) {
      try {
        sendMessageToWWT(event.data);
      } catch (error) {}
    }
  });
}
