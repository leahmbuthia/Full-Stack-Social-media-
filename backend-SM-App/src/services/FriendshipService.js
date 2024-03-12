
import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register post service
export const createFriendshipService=async(friendship)=>{
  
  try {
    const result=await poolRequest()
    .input('FriendshipID', sql.VarChar,friendship.FriendshipID )
    .input('User1ID', sql.VarChar,friendship.User1ID )
    .input('User2ID', sql.VarChar,friendship.User2ID)
    .input('FriendshipDate', sql.DateTime,friendship.FriendshipDate)
    .query('INSERT INTO Friendship (FriendshipID,User1ID,User2ID,FriendshipDate) VALUES(@FriendshipID,@User1ID,@User2ID,@FriendshipDate)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};


// updating friendship details based on the id
export const updateFriendshipService=async(updateFriendship)=>{
  try {
    const updatedFriendship=await poolRequest()
    .input('FriendshipID', sql.VarChar,updateFriendship.FriendshipID)
    .input('FriendshipDate', sql.DateTime,updateFriendship.FriendshipDate)
  .query(`UPDATE Friendship  SET FriendshipID=@FriendshipID,  FriendshipDate = @FriendshipDate  WHERE  FriendshipID = @FriendshipID`)
  console.log(updateFriendship);
  return updatedFriendship
  
  } catch (error) {
    return error
  }
}


export const checkExistingFriendshipService=async(User1ID,User2ID)=>{
  const result =  await poolRequest()
  .input('User1ID', sql.VarChar, User1ID)
  .input('User2ID', sql.VarChar, User2ID)
  .query`
  SELECT *
  FROM Friendship
  WHERE (User1ID = @User1ID AND User2ID = @User2ID)
     OR (User1ID = @User2ID AND User2ID = @User1ID)
  
    `;
    console.log("new result",result);
    return result
}

export const getAllFriendshipsService=async()=>{
  try {
      const allFriendships=await poolRequest().query(`SELECT * FROM Friendship`)
      return allFriendships
  } catch (error) {
      return error
  }
}

export const deleteFriendshipServices = async (FriendshipID) => {
  try {
    const deletedFriendship = await poolRequest()
      .input('FriendshipID', sql.VarChar, FriendshipID)
      .query('DELETE FROM Friendship WHERE FriendshipID = @FriendshipID');

    console.log('Deleted friendship:', deletedFriendship);

    return deletedFriendship;
  } catch (error) {
    console.error('Error deleting friendship:', error);
    throw error;
  }
};



