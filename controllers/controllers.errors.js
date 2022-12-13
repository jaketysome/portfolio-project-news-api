exports.handleIncorrectPath = (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
};

exports.handle404errors = (err, req, res, next) => {
  if (err.msg !== undefined) {
    res.status(404).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle500errors = (err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
};

exports.handle400errors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "bad request" });
  }
};
