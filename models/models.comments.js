const db = require("../db/connection");

exports.countComments = () => {
  queryStr = `
    SELECT title, COUNT(comments.article_id) AS comment_count
    FROM articles
    JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY title`;

  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};
