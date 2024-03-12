import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import { authenticateUserService, findUserByEmailService, getAllUsersService, getUserByIdService, registerNewUserService, updateUsersService } from '../services/userService.js';
import { checkIfValuesIsEmptyNullUndefined, sendCreated, sendServerError } from '../helpers/helperFunctions.js';
import { RegisterUserValidator, loginUserValidator } from '../utils/Validators.js';

export const createNewUserController = async (req, res) => {
    try {
      const { Username, Email, Password, TagName, Location } = req.body;
      // console.log(req.body);

      //check if the user exist
      const existingUser = await findUserByEmailService(Email);
      if(existingUser) {
        return res.status(400).json({
          message: "User already exist!"
        })
      }

      const UserID = v4();
      const { error } = RegisterUserValidator({ Username, Email, Password, TagName, Location });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const hashedPassword = await bcrypt.hash(Password, 8);
        const registeredUser = { UserID, Username, Email, Password: hashedPassword, TagName, Location };
  
        const result = await registerNewUserService(registeredUser);
  
        if (result.message) {
          sendServerError(res, result.message)
          
      } else {
          sendCreated(res, 'User created successfully');
      }
      }
    } catch (error) {
      sendServerError(res, error.message);
    }
  };


export const loginUserController = async (req, res) => {
  try {
    const { Email, Password } = req.body;
      const { error } = loginUserValidator({ Email, Password });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await authenticateUserService({ Email, Password });
    console.log(user);
    if (user.error) {
      return notAuthorized(res, user.error);
    }

    // Successful login
    res.status(200).json({ user });
  } catch (error) {
    return sendServerError(res, "Internal server error");
  }
};


export const getAllUsersController = async (req, res) => {
  try {
    const results = await getAllUsersService()
      const users=results.recordset
      console.log(users);
    res.status(200).json( users );
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json("Internal server error");
  }
};

export const getUserById = async (req, res) => {
  try {
      const id = req.params.UserID;
      const user = await getUserByIdService(id);
      
      if (user) {
          return res.status(200).json({ user });
      } else {
          return res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      // Handle any unexpected errors
      return res.status(500).json({ error: error.message });
  }
}
        
export const updateUsers= async (req, res) => {
  try {
  const { Username, Email, Password, TagName, Location } = req.body;
  const UserID = req.params.UserID;
  const userToUpdate = await getUserByIdService(UserID);
      if (!userToUpdate) {
          sendNotFound(res, 'user not found');
      } else {
          if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
              if (Username) {
                  userToUpdate.Username = Username;
              }
              if (Email) {
                  userToUpdate.Email = Email;
              }
              if (Password) {
                  const hashedPassword = await bcrypt.hash(Password, 8);
                  userToUpdate.Password = hashedPassword;
              }
              if (TagName) {
                  userToUpdate.TagName = TagName;
              }
              if (Location) {
                  userToUpdate.Location = Location;
              }
              await updateUsersService(userToUpdate);
              sendCreated(res, 'users updated successfully');
          } else {
            sendServerError(res, 'Please provide a completed field');
          }
      }
  } catch (error) {
    sendServerError(res, error.message); // Fixed typo: sendSeverError -> sendServerError
  }
}

