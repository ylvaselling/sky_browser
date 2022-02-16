var openspace;
const no_id = "no_id";
var id = no_id;
var isSynced = false;

function sendMessageToWWT(message) {
  try {
    var frame = document.getElementsByTagName("iframe")[0].contentWindow;
    frame.postMessage(message, "http://localhost:8080");
  } catch (error) {
    console.log("Trying to connect to AAS World Wide Telescope" + error);
  }
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
      console.log('Connected to OpenSpace');
    } catch (e) {
      console.log('OpenSpace library could not be loaded: Error: \n', e)
      return;
    }
    if(openspace) {
      // Get ID
      openspace.skybrowser.startSetup();
    }
  })
  // Connect
  api.connect();
}

function setId(newId) {
  console.log("Setting id : " + newId)
  id = newId;
  // Ensure that a proper ID is sent to OpenSpace
  if(openspace) {
    openspace.skybrowser.initializeBrowser(id);
  }
}

function startUp() {
    // Listen to callback functions from WWT
    window.addEventListener('message', function (event) {
        if(!isSynced && openspace && id != no_id) {
          openspace.skybrowser.loadImagesToWWT(id);
          isSynced = true;
        }
    });

};
