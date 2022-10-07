const express = require("express");
const app = express();
const port = 9000;

app.use("/1/gui", express.static("public_gui"));
app.use("/1/openspace", express.static("public_openspace"));
app.use(express.static("../sky_browser_rel/public"))
app.listen(port, () => {});
