const {
  selectTopics,
  selectArticles,
  selectArticleById,
  selectCommentsByArticleId,
  checkIfArticleExists,
  insertCommentByArticleId,
  updateArticleByArticleId,
  selectUsers,
} = require("../models/models.articles");
const { countComments } = require("../models/models.comments");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { topic } = req.query;
  const promises = [countComments(), selectArticles(topic)];

  Promise.all(promises)
    .then(([commentCount, articles]) => {
      articles.forEach((article) => {
        commentCount.forEach((comment) => {
          if (article.title === comment.title) {
            article.comment_count = parseInt(comment.comment_count);
          } else {
            article.comment_count = 0;
          }
        });
      });
      return articles;
    })
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;

  const promises = [
    checkIfArticleExists(articleId),
    selectArticleById(articleId),
  ];

  Promise.all(promises)
    .then(([articleExists, article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;

  const promises = [
    selectCommentsByArticleId(articleId),
    checkIfArticleExists(articleId),
  ];

  Promise.all(promises)
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  const reqBody = req.body;

  insertCommentByArticleId(articleId, reqBody)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchArticleByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  const { inc_votes } = req.body;

  const promises = [
    updateArticleByArticleId(articleId, inc_votes),
    checkIfArticleExists(articleId),
  ];

  Promise.all(promises)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
