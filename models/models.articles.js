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
    if (article.rowCount === 0) {
      return Promise.reject({ status: 404, msg: "article not found" });
    }
    return article.rows[0];
  });
};

exports.selectCommentsByArticleId = (articleId) => {
  queryStr = `
  SELECT comments.article_id,
         comments.comment_id, 
         comments.votes, 
         comments.created_at, 
         comments.author, 
         comments.body
  FROM comments
  WHERE comments.article_id = $1
  ORDER BY comments.created_at desc`;

  return db.query(queryStr, [articleId]).then((comments) => {
    return comments.rows;
  });
};

exports.checkIfArticleExists = (articleId) => {
  queryStr = `
    SELECT *
    FROM articles
    WHERE article_id = $1`;

  return db.query(queryStr, [articleId]).then((articles) => {
    if (articles.rowCount === 0) {
      return Promise.reject({ status: 404, msg: "article not found" });
    } else {
      return true;
    }
  });
};

exports.insertCommentByArticleId = (articleId, reqBody) => {
  const { body, username } = reqBody;

  queryStr = `
  INSERT INTO comments
  (body, article_id, author)
  VALUES
  ($1, $2, $3)
  RETURNING *;`

  return db.query(queryStr, [body, articleId, username]).then((postedComment) => {
    return postedComment.rows[0]
  })
};
