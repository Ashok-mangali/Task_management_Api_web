// src/app.js
const express = require("express");
const connectDB = require("./config/database");
const tasksRouter = require("./routes/tasks");
const errorHandler = require("./middileware/errorhandler");
const { requestLogger } = require("./utils/logger");

require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use(requestLogger);
app.use("/tasks", tasksRouter);
app.use(errorHandler);

module.exports = app;
