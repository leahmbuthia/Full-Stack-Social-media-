import {Router} from 'express';
import { createFriendshipController, deleteFriendshipController, getAllFriendshipsController } from '../controllers/FriendshipController.js';

const friendshipRouter=Router();

friendshipRouter.post('/friendships', createFriendshipController)

friendshipRouter.get('/friendships',  getAllFriendshipsController)

// friendshipRouter.get('/friendships/single/:FriendshipID', getSingleFriendshipController)
// friendshipRouter.get('/user/friendships/:User1ID', getAllUserFriendshipsController)

// friendshipRouter.put('/friendships/update/:FriendshipID', updateFriendshipControllers)

// friendshipRouter.patch('/friendships/patch/:FriendshipID', updateFriendshipControllers)

friendshipRouter.delete('/friendships/delete/:FriendshipID',  deleteFriendshipController)


export default friendshipRouter;

