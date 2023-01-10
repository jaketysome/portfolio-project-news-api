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

exports.selectArticles = (topic, sort_by = "created_at", order = "desc") => {
  const validSortByQueries = [
    "article_id",
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
    "comment_count",
  ];

  const validOrderQueries = ["asc", "desc"];

  if (
    !validSortByQueries.includes(sort_by) ||
    !validOrderQueries.includes(order)
  ) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  queryStr = `
  SELECT 
    articles.article_id, 
    articles.title, 
    articles.topic, 
    articles.author, 
    articles.body, 
    articles.created_at, 
    articles.votes, 
    COUNT(comments.article_id) AS comment_count
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  `;

  const queryValues = [];

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryStr += `
  GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order}`;

  return db.query(queryStr, queryValues).then((articles) => {
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
  RETURNING *`;

  return db.query(queryStr, [body, articleId, username]).then((comment) => {
    return comment.rows[0];
  });
};

exports.updateArticleByArticleId = (articleId, newVote=0) => {

  queryStr = `
  WITH updated AS (
    UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *)
    SELECT 
        updated.article_id, 
        updated.title, 
        updated.topic, 
        updated.author, 
        updated.body, 
        updated.created_at, 
        updated.votes, 
        COUNT(comments.article_id) AS comment_count
    FROM updated
    LEFT JOIN comments ON updated.article_id = comments.article_id
    WHERE updated.article_id = $1
    GROUP BY 
        updated.article_id, 
        updated.title, 
        updated.topic, 
        updated.author, 
        updated.body, 
        updated.created_at, 
        updated.votes`;

  return db.query(queryStr, [articleId, newVote]).then((article) => {
    console.log(article.rows, "<<< patched article")
    return article.rows[0];
  });
};
