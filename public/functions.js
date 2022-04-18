var openspace;
const no_id = "no_id";
var id = no_id;
var guiIsConnected = false;
var osIsConnected = false;

function setBackgroundColor(stringColor) {
  document.body.style.backgroundColor = "rgb(" + stringColor + ")";
}

function sendMessageToWWT(message) {
  try {
    var frame = document.getElementsByTagName("iframe")[0].contentWindow;
    frame.postMessage(message, "http://localhost:8080");
  } catch (error) {}
}

// Helper function to connect to opensapce
function connectToOpenSpace() {
  let host = "127.0.0.1";
  let api = window.openspaceApi(host, 4682);

  api.onDisconnect(() => {
    openspace = null;
  });

  api.onConnect(async () => {
    try {
      openspace = await api.library();
      console.log("Connected to OpenSpace");
    } catch (e) {
      console.log("OpenSpace library could not be loaded: Error: \n", e);
      return;
    }
    if (openspace) {
      // Get ID
      openspace.skybrowser.startSetup();
    }
  });
  // Connect
  api.connect();
}

function setId(newId) {
  console.log("Setting id : " + newId);
  id = newId;
  // Ensure that a proper ID is sent to OpenSpace
  if (openspace) {
    openspace.skybrowser.initializeBrowser(id);
  }
}

function startUp() {
  // Listen to callback functions from WWT
  window.addEventListener("message", function(event) {
    if (event.data.event == "disconnect_to_openspace") {
      console.log("Disconnect from OpenSpace");
      openspace = null;
      osIsConnected = false;
    }
    if (event.data.event == "set_background_color") {
      setBackgroundColor(event.data.data);
    } else if (event.data.event == "load_image_collection_completed") {
      if (osIsConnected) {
        openspace.skybrowser.loadingImageCollectionComplete(id);
      } else {
        parent.postMessage("load_image_collection_completed", "*");
      }
    } else if (
      event.data.type == "wwt_application_state" ||
      event.data.type == "wwt_view_state"
    ) {
      if (!osIsConnected) {
        // Notify C++ application if this is a browser loaded in the C++ application
        console.log("Contact established with WorldWide Telescope");
        const idIsSet = id != no_id;
        if (openspace && idIsSet) {
          openspace.skybrowser.loadImagesToWWT(id);
          osIsConnected = true;
        }
      } else if (!guiIsConnected) {
        // The first time the wwt app responds to messages
        // Notify GUI by passing a message to parent
        guiIsConnected = true;
        parent.postMessage("wwt_has_loaded", "*");
      }
    } else if (
      event.data.type != "wwt_application_state" &&
      event.data.type != "wwt_view_state"
    ) {
      try {
        sendMessageToWWT(event.data);
      } catch (error) {}
    }
  });
}
