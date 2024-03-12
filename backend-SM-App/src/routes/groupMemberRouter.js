import {Router} from 'express';
import { createGroupMembersController, deleteGroupMembersControllers, getAllGroupMembersController, getSingleGroupMembersController, updateGroupMemberControllers } from '../controllers/groupMebersController.js';


const groupMemberRouter=Router();

groupMemberRouter.post('/members', createGroupMembersController)

groupMemberRouter.get('/members',  getAllGroupMembersController)

groupMemberRouter.get('/members/:GroupID', getSingleGroupMembersController )

groupMemberRouter.put('/members/:GroupMemberID',updateGroupMemberControllers )


groupMemberRouter.delete('/members/:GroupID', deleteGroupMembersControllers)


export default groupMemberRouter;