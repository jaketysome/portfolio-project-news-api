const express = require("express");
const app = express();
const {
  handle404errors,
  handle500errors,
  handle400errors,
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

app.use(handle400errors);

app.use(handle500errors);

app.all("*", handle404errors);

module.exports = app;
