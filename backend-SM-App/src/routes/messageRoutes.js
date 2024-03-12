import { Router } from 'express';
import { createMessage } from '../controllers/messageControllers.js';

const messageRouter = Router();

messageRouter.post('/messages', createMessage);

export default messageRouter;
