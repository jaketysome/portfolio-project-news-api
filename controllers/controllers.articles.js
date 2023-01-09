const {
  selectTopics,
  selectArticles,
  selectArticleById,
  selectCommentsByArticleId,
  checkIfArticleExists,
  insertCommentByArticleId,
  updateArticleByArticleId,
} = require("../models/models.articles");
const {
  countComments,
  removeCommentByCommentId,
} = require("../models/models.comments");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;

  const promises = [
    selectTopics(),
    selectArticles(topic, sort_by, order),
  ];

  Promise.all(promises)
    .then(([topics, articles]) => {
      const validTopics = topics.map((topic) => topic.slug);

      if (topic && !validTopics.includes(topic)) {
        return Promise.reject({ status: 404, msg: "topic not found" });
      }
      articles.forEach((article) => {
        article.comment_count = parseInt(article.comment_count)
      })
      
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
    countComments(articleId),
    selectArticleById(articleId),
  ];

  Promise.all(promises)
    .then(([articleExists, commentCount, article]) => {
      commentCount.forEach((comment) => {
        if (article.title === comment.title) {
          article.comment_count = parseInt(comment.comment_count);
        } else {
          article.comment_count = 0;
        }
      });
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
