import { CenterOnCoordinatesMessage } from "./node_modules/@wwtelescope/research-app-messages/dist/classic_pywwt"

function setupOrigin() {
  let frame = document.getElementsByTagName("iframe")[0].contentWindow;
  console.log(frame);
  //wwt.contentWindow.frames.wwt.origin = "https://web.wwtassets.org/";
  frame.postMessage("Hello World!", "http://localhost:8000") ;
}

function sendMessageToWWT(message) {
  //setupOrigin();
  let frame = document.getElementsByTagName("iframe")[0].contentWindow;
  frame.postMessage(message,"http://localhost:8000");
}
