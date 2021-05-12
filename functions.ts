function sendMessageToWWT(message) {
  //setupOrigin();
  let frame = document.getElementsByTagName("iframe")[0].contentWindow;
  frame.postMessage(message,"http://localhost:8080");
}
