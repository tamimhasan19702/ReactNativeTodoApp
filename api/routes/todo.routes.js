/** @format */
const router = express.Router();
const moment = require("moment");
const User = require("../models/user.model");
const Todo = require("../models/todo.model");

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
    await user?.save();

    res
      .status(201)
      .send({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
