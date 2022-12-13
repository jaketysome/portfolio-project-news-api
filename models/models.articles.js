const db = require("../db/connection");
const comments = require("../db/data/test-data/comments");

exports.selectTopics = () => {
  queryStr = `
    SELECT *
    FROM topics`;

  return db.query(queryStr).then((topics) => {
    return topics.rows;
  });
};

exports.selectArticles = () => {
  queryStr = `
  SELECT *
  FROM articles
  ORDER BY created_at desc`;

  return db.query(queryStr).then((articles) => {
    return articles.rows;
  });
};

exports.selectArticleById = (articleId) => {
  queryStr = `
  SELECT *
  FROM articles
  WHERE article_id = $1`;

  return db.query(queryStr, [articleId]).then((article) => {
    return article.rows[0];
  });
};

exports.selectCommentsByArticleId = (articleId) => {
  queryStr = `
  SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body
  FROM comments
  JOIN articles
  ON articles.article_id = comments.article_id
  WHERE articles.article_id = 1
  ORDER BY comments.created_at desc`;

  return db.query(queryStr, [articleId]).then((comments) => {
    console.log(comments.rows, '<<<<<<<')
    return comments.rows;
  })
};
