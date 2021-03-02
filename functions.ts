import { CenterOnCoordinatesMessage } from "node_modules/@wwtelescope/research-app-messages/dist/classic_pywwt"

function setupOrigin() {
  let frame = document.getElementsByTagName("iframe")[0].contentWindow;
  console.log(frame);
  //wwt.contentWindow.frames.wwt.origin = "https://web.wwtassets.org/";
  frame.postMessage("Hello World!", "http://localhost:8000") ;
}

function changeCoords() {
  //setupOrigin();
  let frame = document.getElementsByTagName("iframe")[0].contentWindow;
  const message : CenterOnCoordinatesMessage = {
    event: "center_on_coordinates",
    ra: Number((<HTMLInputElement>document.getElementById('ra')).value) ,
    dec: Number((<HTMLInputElement>document.getElementById('dec')).value),
    fov: Number((<HTMLInputElement>document.getElementById('fov')).value),
    instant: false,
  };

  frame.postMessage(message,"http://localhost:8000");
}
