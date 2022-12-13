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
  articlesQueryStr = `
  SELECT *
  FROM articles
  ORDER BY created_at desc`;

  return db.query(articlesQueryStr).then((articles) => {
    return articles.rows;
  });
};
