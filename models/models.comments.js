const db = require("../db/connection");

exports.countComments = (articleId) => {
  queryStr = `
    SELECT title, COUNT(comments.article_id) AS comment_count
    FROM articles
    JOIN comments
    ON articles.article_id = comments.article_id`;

  if (articleId) {
    queryStr += `
       WHERE articles.article_id = $1
      GROUP BY title`;

    return db.query(queryStr, [articleId]).then((response) => {
      return response.rows;
    });
  } else {
    queryStr += ` GROUP BY title`;

    return db.query(queryStr).then((response) => {
      return response.rows;
    });
  }
};

exports.removeCommentByCommentId = (commentId) => {
  
  queryStr = `
  DELETE 
  FROM comments
  WHERE comment_id = $1`

  return db.query(queryStr, [commentId]).then(() => {})
}
