/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 1200;
const cors = require("cors");

const registerRoutes = require("./routes/register.routes");
const loginRoutes = require("./routes/login.routes");
const todoRoutes = require("./routes/todo.routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api", registerRoutes);
app.use("/api", loginRoutes);
app.use("/api", todoRoutes);
