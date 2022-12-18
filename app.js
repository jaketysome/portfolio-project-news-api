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
} = require("./controllers/controllers.articles");
const {
  getUsers,
  getUserByUsername,
} = require("./controllers/controllers.users");
const {
  deleteCommentByCommentId,
  patchCommentByCommentId
} = require("./controllers/controllers.comments");

const { getEndpoints } = require("./controllers/controllers.api");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleByArticleId);

app.get("/api/users", getUsers);

app.get("/api/users/:username", getUserByUsername);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.patch("/api/comments/:comment_id", patchCommentByCommentId);

app.all("*", handleIncorrectPath);

app.use(handleCustomErrors);

app.use(handlePSQLerrors);

app.use(handle500errors);

module.exports = app;
