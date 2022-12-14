exports.handleIncorrectPath = (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle400errors = (err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};

exports.handle500errors = (err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
};
