const express = require("express");
const app = express();
const {
  handleCustomErrors,
  handle500errors,
  handle400errors,
  handleIncorrectPath
} = require("./controllers/controllers.errors");
const {
  getTopics,
  getArticles,
  getArticleById,
  getCommentsByArticleId,
} = require("./controllers/controllers.articles");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);


app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.all("*", handleIncorrectPath);

app.use(handleCustomErrors);

app.use(handle400errors);

app.use(handle500errors);


module.exports = app;
