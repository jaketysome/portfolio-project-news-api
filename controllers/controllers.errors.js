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

exports.handlePSQLerrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "bad request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "not found" });
  } else {
    next(err);
  }
};

exports.handle500errors = (err, req, res, next) => {
  res.status(500).send({ msg: "server error" });
};
