const {
  selectTopics,
  selectArticles,
  selectArticleById,
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
  const promises = [countComments(), selectArticles()];

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

  selectArticleById(articleId)
    .then((article) => {
      !article 
      ? res.status(404).send({msg: "article not found"})
      : res.status(200).send({ article });
    })
    .catch(next);
};

// exports.getCommentsByArticleId = (req, res, next) => {
//   const articleId = req.params.article_id;

  
// }
