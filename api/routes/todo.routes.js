/** @format */

const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model");
const User = require("../models/user.model");
const moment = require("moment");

router.post("/todos/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, category } = req.body;

    const newTodo = new Todo({
      title,
      category,
      dueDate: moment().format("YYYY-MM-DD"),
    });

    await newTodo.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user?.todos.push(newTodo._id);
    await user.save();

    res
      .status(201)
      .send({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/users/:userId/todos", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("todos");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ todos: user.todos });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.patch("/todos/:todoId/toggleStatus", async (req, res) => {
  try {
    const todoId = req.params.todoId;

    // Find the todo by ID
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    // Toggle the status of the todo
    todo.status = todo.status === "completed" ? "pending" : "completed";
    await todo.save();

    res.status(200).send({ message: "Todo status updated successfully", todo });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/todos/completed/:date", async (req, res) => {
  try {
    const date = req.params.date;

    const completedTodos = await Todo.find({
      status: "completed",
      dueDate: {
        $gte: new Date(`${date}T00:00:00.000Z`), // Start of the selected date
        $lt: new Date(`${date}T23:59:59.999Z`), // End of the selected date
      },
    }).exec();

    res.status(200).json({ completedTodos });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/todos/count", async (req, res) => {
  try {
    const totalCompletedTodos = await Todo.countDocuments({
      status: "completed",
    }).exec();

    const totalPendingTodos = await Todo.countDocuments({
      status: "pending",
    }).exec();

    res.status(200).json({
      totalCompletedTodos,
      totalPendingTodos,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
