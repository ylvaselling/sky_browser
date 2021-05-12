import { CenterOnCoordinatesMessage } from "./node_modules/@wwtelescope/research-app-messages/dist/classic_pywwt"

function sendMessageToWWT(message) {
  //setupOrigin();
  let frame = document.getElementsByTagName("iframe")[0].contentWindow;
  frame.postMessage(message,"http://localhost:8080");
}
