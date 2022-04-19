const express = require("express");
const app = express();
const port = 8000;

app.use("/gui", express.static("public_gui"));
app.use("/openspace", express.static("public_openspace"));
app.listen(port, () => {});
