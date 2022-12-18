const { removeCommentByCommentId, updateCommentByCommentId } = require("../models/models.comments");

exports.deleteCommentByCommentId = (req, res, next) => {
  const commentId = req.params.comment_id;

  removeCommentByCommentId(commentId)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

exports.patchCommentByCommentId = (req, res, next) => {
  const commentId = req.params.comment_id;
  const incVotes = req.body.inc_votes;

  updateCommentByCommentId(commentId, incVotes)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};
