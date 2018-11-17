import Comment from '../models/comment';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments (req, res) {
  // eslint-disable-next-line no-console
  Comment.find({ postId: req.params.cuid }).sort('-dateAdded').exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comments });
  });
}

/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment (req, res) {
  if (!req.body.comment.name || !req.body.comment.postId || !req.body.comment.content) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment);

  // Let's sanitize inputs
  newComment.name = sanitizeHtml(newComment.name);
  newComment.postId = sanitizeHtml(newComment.postId);
  newComment.content = sanitizeHtml(newComment.content);

  newComment.cuid = cuid();
  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}

/**
 * Get a single comment
 * @param req
 * @param res
 * @returns void
 */
export function getComment (req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment });
  });
}

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment (req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    comment.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Update a single comment
 * @param req
 * @param res
 * @returns void
 */
export function updateComment (req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    // eslint-disable-next-line no-param-reassign
    comment.content = sanitizeHtml(req.body.comment.content);

    comment.save((err2, saved) => {
      if (err2) {
        res.status(500).send(err2);
      }
      res.json({ comment: saved });
    });
  });
}

