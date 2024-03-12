import {Router} from 'express';
import { createCommentController, getAllCommentsController, updateCommentControllers } from '../controllers/commentController.js';

const commentRouter=Router();

commentRouter.post('/comments', createCommentController)

commentRouter.get('/comments', getAllCommentsController)

// commentRouter.get('/comments/single/:CommentID', getSingleCommentController)

commentRouter.put('/comments/update/:CommentID', updateCommentControllers)

// commentRouter.patch('/comments/patch/:CommentID', updateContentControllers)

// commentRouter.delete('/comments/delete/:CommentID', deleteCommentController)


export default commentRouter;