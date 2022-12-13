const db = require("../db/connection");

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
