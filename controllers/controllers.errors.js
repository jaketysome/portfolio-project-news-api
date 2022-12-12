exports.handle404errors = (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
  next();
};
