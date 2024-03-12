import {Router} from 'express';
import { createGroupController, getAllGroupsController } from '../controllers/groupController.js';


const groupRouter=Router();

groupRouter.post('/groups', createGroupController)

groupRouter.get('/groups',  getAllGroupsController)

export default groupRouter;