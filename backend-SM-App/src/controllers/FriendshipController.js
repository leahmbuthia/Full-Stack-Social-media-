import {v4} from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError} from "../helpers/helperFunctions.js"
import { createFriendshipValidator } from '../validators/FriendshipValidator.js';
import { checkExistingFriendshipService, createFriendshipService, deleteFriendshipServices, getAllFriendshipsService, } from '../services/FriendshipService.js';


export const createFriendshipController = async (req, res) => {
    try {

      const {User1ID,User2ID } = req.body;
      console.log(
        req.body);
      const existingFriendship = await checkExistingFriendshipService(User1ID, User2ID);
      console.log(existingFriendship);
      if (existingFriendship.rowsAffected>0) {
        return res.status(400).send({message:"The two users are already friends."});
      }else{
        const FriendshipID = v4();
        const { error } = createFriendshipValidator(req.body);
        console.log("error",error);
        if (error) {
          return res.status(400).send(error.details[0].message);
        } else {
          const FriendshipDate = new Date();    
          const createdFriendship = { FriendshipID, User1ID,User2ID,FriendshipDate};
    
          const result = await createFriendshipService(createdFriendship);
    
          if (result.message) {
            sendServerError(res, result.message)
        } else {
            sendCreated(res, 'Friendship created successfully');
        }
        }
      }
   
    } catch (error) {
      sendServerError(res, error.message);
    }
};

export const getAllFriendshipsController = async (req, res) => {
try {
const results = await getAllFriendshipsService()
  if(results.rowsAffected>0){
  const Friendships=results.recordset
  res.status(200).json({ Friendships: Friendships });
  }else{
  res.status(400).json({ message: "No friendships" });
  }
} catch (error) {
console.error("Error fetching all friendships:", error);
res.status(500).json("Internal server error");
}
};

export const deleteFriendshipController=async(req,res)=>{
  try {
    const {FriendshipID}=req.params
    const deletedFriendship=await deleteFriendshipServices(FriendshipID)
    console.log('deleted friendship',deletedFriendship); 
    sendDeleteSuccess(res,"Deleted successfully")
  } catch (error) {
    return error
  }
}

