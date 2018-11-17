import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as CommentController from '../controllers/comment.controller';

const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

// Get all Comments of Post
router.route('/posts/:cuid/comments').get(CommentController.getComments);

// Add a new Comment to Post
router.route('/posts/:cuid/comments').post(CommentController.addComment);

export default router;
