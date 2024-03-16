/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 1200;
const cors = require("cors");
app.use(cors());
