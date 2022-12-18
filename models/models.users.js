const db = require("../db/connection");

exports.selectUsers = () => {
  queryStr = `
    SELECT *
    FROM users`;

  return db.query(queryStr).then((users) => {
    return users.rows;
  });
};

exports.selectUserByUsername = (username) => {
  queryStr = `
  SELECT *
  FROM users
  WHERE username = $1`;

  return db.query(queryStr, [username]).then((user) => {
    if (user.rowCount === 0) {
      return Promise.reject({ status: 404, msg: "user not found" });
    }
    return user.rows[0];
  });
};
