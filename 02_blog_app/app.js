const express = require("express");
require("dotenv").config();
const postsRoute = require("./routes/post.route");
const commentsRoute = require("./routes/comment.route");
const likesRoute = require("./routes/like.route");
const app = express();
const connectDb = require("./config/db.config");
const PORT = process.env.PORT || 4000;

connectDb();
app.use(express.json());

app.use("/api/v1/comments", commentsRoute);
app.use("/api/v1/likes", likesRoute);
app.use("/api/v1/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
