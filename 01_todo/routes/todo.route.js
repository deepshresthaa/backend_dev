const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

router.get("/home", (req, res) => {
  res.send("you're in home page.");
});
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.get("/getTodo/:id", getTodo);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);
module.exports = router;
