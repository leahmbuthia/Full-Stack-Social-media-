import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register user service
export const registerNewUserService = async(newUser)=>{

  try {
    const result=await poolRequest()
    .input('UserID', sql.VarChar,newUser.UserID)
    .input('Username', sql.VarChar,newUser.Username)
    .input('Email', sql.VarChar,newUser.Email)
    .input('Password', sql.VarChar,newUser.Password)
    .input('TagName', sql.VarChar,newUser.TagName)
    .input('Location', sql.VarChar,newUser.Location)
    .query(`INSERT INTO tbl_user (UserID,Username,Email,Password,TagName,Location) VALUES(@UserID,@Username,@Email,@Password,@TagName,@Location)`)

    return result;

  } catch (error) {
    return error
  }
};


export const findUserByEmailService = async(email) => {
    try {
      const result = await poolRequest()
        .input('Email', sql.VarChar, email)
        .query('SELECT * FROM tbl_user WHERE Email = @Email')
  
       return result.recordset.length > 0 ? result.recordset[0] : null
      
    } catch (error) {
      console.log(error)
      return error    
    }
  
  }


  export const authenticateUserService=async(user)=>{
    try {
      const userFoundResponse=await poolRequest()
      .input('Email', sql.VarChar, user.Email)
      .query('SELECT * FROM tbl_user WHERE Email=@Email')
    
      if(userFoundResponse.recordset[0]){
        if(await bcrypt.compare(user.Password,userFoundResponse.recordset[0].Password)){
    
          let token=jwt.sign({
            UserID:userFoundResponse.recordset[0].UserID,
            Password:userFoundResponse.recordset[0].Password,
            Email:userFoundResponse.recordset[0].Email
          },process.env.SECRET_KEY,{ expiresIn: "24h" })
          console.log("Token is",token);
          const {Password,...user}=userFoundResponse.recordset[0]
          return {user,token:`JWT ${token}`}
    
        }else{
          return { error: 'Invalid Credentials' };
        }
      }else{
        return { error: 'Invalid Credentials' };
      }
    } catch (error) {
      return error
    }
    }


    export const getAllUsersService=async(users)=>{
      try {
          const allUsers=await poolRequest().query(`SELECT * FROM tbl_user`)
          return allUsers
      } catch (error) {
          return error
      }
  }
  export const getUserByIdService = async (UserID) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.VarChar, UserID)
            .query("SELECT * FROM Tbl_User WHERE UserID =@UserID");

        // Check if any user is found
        if (result.recordset.length === 0) {
            throw new Error('User not found');
        }

        // Return the first (and presumably only) user found
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
}

  export const updateUsersService = async (User) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.VarChar, User.UserID)
            .input('Username', sql.VarChar, User.Username)
            .input('Email', sql.VarChar, User.Email)
            .input('Password', sql.VarChar, User.Password)
            .input('TagName', sql.VarChar, User.TagName)
            .input('Location', sql.VarChar, User.Location)
            .query("UPDATE Tbl_User SET Username = @Username, Email = @Email, Password = @Password, TagName = @TagName, Location = @Location WHERE UserID = @UserID");
        return result;
    } catch (error) {
        return error;
    }
}

  

