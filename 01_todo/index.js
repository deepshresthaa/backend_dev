const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db.config");
const todoRouter = require("./routes/todo.route");
const app = express();

const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("respond to the client");
});
app.use("/api/v1", todoRouter);
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
