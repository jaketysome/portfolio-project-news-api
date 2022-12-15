const express = require("express");
const app = express();
const {
  handleCustomErrors,
  handle500errors,
  handlePSQLerrors,
  handleIncorrectPath,
} = require("./controllers/controllers.errors");
const {
  getTopics,
  getArticles,
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("./controllers/controllers.articles");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.all("*", handleIncorrectPath);

app.use(handleCustomErrors);

app.use(handlePSQLerrors);

app.use(handle500errors);

module.exports = app;
