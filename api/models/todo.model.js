/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed"],
    default: "pending",
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Use Date.now() to get the current date and time
    timezone: "Asia/Dhaka", // Set the timezone explicitly to Dhaka, Bangladesh
  },
});

module.exports = mongoose.model("Todo", todoSchema);

module.exports = mongoose.model("Todo", todoSchema);
