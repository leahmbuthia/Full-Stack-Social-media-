import dotenv from 'dotenv'

import {poolRequest,sql} from '../dbconnect/dbConnect.js'

dotenv.config();

// Register post service
export const createGroupService=async(group)=>{
  
  try {
    const result=await poolRequest()
    .input('GroupID', sql.VarChar,group.GroupID )
    .input('GroupName', sql.VarChar,group.GroupName)
    .input('Description', sql.VarChar,group.Description)
    .input('PhotoURL', sql.VarChar,group.PhotoURL)
    .input('CreatedDate', sql.DateTime,group.CreatedDate)
    .query('INSERT INTO tbl_group (GroupID,GroupName,Description,CreatedDate,PhotoURL) VALUES(@GroupID,@GroupName,@Description,@CreatedDate,@PhotoURL)')
    console.log('results',result);
    return result;

  } catch (error) {
    return error
  }
};


export const getAllGroupsService=async()=>{
    try {
        const allGroups=await poolRequest().query(`SELECT * FROM tbl_group`)
        return allGroups
    } catch (error) {
        return error
    }
}