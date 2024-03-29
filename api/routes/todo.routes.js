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

router.patch("/todos/:todoId/complete", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        status: "completed",
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    res
      .status(200)
      .send({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {}
});

router.get("/todos/completed/:date", async (req, res) => {
  try {
    const date = req.params.date;

    const completedTodos = await Todo.find({
      status: "completed",
      createdAt: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
      },
    }).exec();

    res.status(200).json({ completedTodos });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
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
