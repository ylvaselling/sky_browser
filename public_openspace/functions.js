var openspace;
const no_id = "no_id";
var id = no_id;
var imagesAreLoaded = false;

function setBackgroundColor(stringColor) {
  document.body.style.backgroundColor = "rgb(" + stringColor + ")";
}

function sendMessageToWWT(message) {
  try {
    var frame = document.getElementsByTagName("iframe")[0].contentWindow;
    frame.postMessage(message, "http://wwtapp.openspaceproject.com");
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
  id = newId;
  // Ensure that a proper ID is sent to OpenSpace
  if (openspace) {
    openspace.skybrowser.initializeBrowser(id);
  }
}

function startUp() {
  // Listen to callback functions from WWT
  window.addEventListener("message", function(event) {
    if (event.data.event == "load_image_collection_completed") {
      if (openspace) {
        openspace.skybrowser.loadingImageCollectionComplete(id);
      }
    } else if (
      event.data.type == "wwt_application_state" ||
      event.data.type == "wwt_view_state"
    ) {
      if (!imagesAreLoaded && id != no_id && openspace) {
        // Notify C++ application if this is a browser loaded in the C++ application
        openspace.skybrowser.loadImagesToWWT(id);
        imagesAreLoaded = true;
      }
    }
  });
}
