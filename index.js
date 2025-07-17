const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("respond to the client");
});
app.listen(3000);
