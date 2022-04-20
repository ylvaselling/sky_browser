var guiIsConnected = false;

function setBackgroundColor(stringColor) {
  document.body.style.backgroundColor = "rgb(" + stringColor + ")";
}

function sendMessageToWWT(message) {
  try {
    var frame = document.getElementsByTagName("iframe")[0].contentWindow;
    frame.postMessage(message, "http://localhost:8080/");
  } catch (error) {
    console.log(error);
  }
}

function startUp() {
  // Listen to callback functions from WWT
  window.addEventListener("message", function(event) {
    if (event.data.event == "set_background_color") {
      setBackgroundColor(event.data.data);
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
