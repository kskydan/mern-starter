import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments
router.route('/comments').get(CommentController.getComments);

// Get one Comment by cuid
router.route('/comments/:cuid').get(CommentController.getComment);

// Delete a Comment by cuid
router.route('/comments/:cuid').delete(CommentController.deleteComment);

// Update one Comment by cuid
router.route('/comments/:cuid').put(CommentController.updateComment);

export default router;
