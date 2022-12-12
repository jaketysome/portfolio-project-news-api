const express = require("express");
const app = express();
const { handle404errors } = require("./controllers/controllers.errors");
const { getTopics } = require("./controllers/controllers.news");

app.use(express.json());

app.get("/api/topics", getTopics);

app.all("*", handle404errors);

module.exports = app;
