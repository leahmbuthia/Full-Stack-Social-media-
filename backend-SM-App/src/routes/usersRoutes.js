import {Router} from 'express';
import { createNewUserController, getAllUsersController, loginUserController, updateUsers,getUserById } from '../controllers/usersControllers.js';

const userRouter=Router();

userRouter.post('/users/register', createNewUserController)

userRouter.post('/users/login', loginUserController)

userRouter.get('/users', getAllUsersController)

export default userRouter;


