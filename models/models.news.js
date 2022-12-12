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
  FROM articles`;

  return db.query(queryStr).then((articles) => {
    return articles.rows;
  });
};
