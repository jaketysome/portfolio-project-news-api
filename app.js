const express = require("express");
const app = express();
const {
  handle404errors,
  handle500errors,
  handle400errors,
  handleIncorrectPath
} = require("./controllers/controllers.errors");
const {
  getTopics,
  getArticles,
  getArticleById,
} = require("./controllers/controllers.articles");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.all("*", handleIncorrectPath);

app.use(handle404errors);

app.use(handle400errors);

app.use(handle500errors);


module.exports = app;
