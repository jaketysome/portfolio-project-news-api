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
  patchArticleByArticleId,
  getUsers,
  deleteCommentByCommentId,
} = require("./controllers/controllers.articles");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleByArticleId);

app.get("/api/users", getUsers);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.all("*", handleIncorrectPath);

app.use(handleCustomErrors);

app.use(handlePSQLerrors);

app.use(handle500errors);

module.exports = app;
