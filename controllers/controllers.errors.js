exports.handle404errors = (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
  next();
};

exports.handle500errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "server error" });
};
