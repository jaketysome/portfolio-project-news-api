const express = require("express");
const app = express();
const {
  handle404errors,
  handle500errors,
} = require("./controllers/controllers.errors");
const { getTopics, getArticles } = require("./controllers/controllers.news");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.use(handle500errors);

app.all("*", handle404errors);

module.exports = app;
