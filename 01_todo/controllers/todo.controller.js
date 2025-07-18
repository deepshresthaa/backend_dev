const todoDataBase = require("../models/todo.model");
const createTodo = async (req, res, next) => {
  try {
    const { todo, description } = req.body;
    const response = await todoDataBase.create({
      todo: todo,
      description: description,
    });

    res.status(200).json({
      data: response,
      message: "todo is created",
    });
  } catch (e) {
    res.status(500).json({
      data: "Internal server error",
      message: e.message,
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await todoDataBase.find({});
    if (!todos) {
      res.status(404).json({
        success: false,
        message: "Todo is empty",
      });
    }
    res.status(200).json({
      success: true,
      data: todos,
      messaage: "Todos fetched successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error",
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await todoDataBase.findById({ _id: id });
    if (!todo) {
      res.status(404).json({
        success: false,
        message: "No todo with this id",
      });
    }
    res.status(200).json({
      success: true,
      data: todo,
      message: `Todo with ${id} is fetched.`,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error.",
    });
  }
};
const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { todo, description } = req.body;
    // const isTodo=await todoDataBase.findById
    const todo_item = await todoDataBase.findByIdAndUpdate(
      id,
      {
        todo: todo,
        description: description,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!todo_item) {
      res.status(404).json({
        success: false,
        message: "Todo with this doesn't exist",
      });
    }
    res.status(200).json({
      success: true,
      data: todo_item,
      message: "Todo with this id updated",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await todoDataBase.findByIdAndDelete(id);
    if (!todo) {
      res.status(404).json({
        success: false,
        message: "Todo with this id doesn't exist",
      });
    }
    res.status(200).json({
      success: true,
      data: todo,
      message: "todo deleted",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error",
    });
  }
};
module.exports = { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
