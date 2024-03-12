import { v4 } from 'uuid'
import { notAuthorized, sendCreated, sendDeleteSuccess, sendServerError } from "../helpers/helperFunctions.js"
import { createGroupService, getAllGroupsService } from '../services/groupService.js';
import { createGroupValidator } from '../validators/groupValidators.js';


export const createGroupController = async (req, res) => {
  try {

    const { GroupName, Description, PhotoURL } = req.body;
    console.log(req.body);

    const GroupID = v4();
    const { error } = createGroupValidator({ GroupName, Description, PhotoURL });
    console.log("error", error);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const CreatedDate = new Date();
      const createdGroup = { GroupID, GroupName, Description, CreatedDate,PhotoURL };

      const result = await createGroupService(createdGroup);

      if (result.message) {
        sendServerError(res, result.message)
      } else {
        sendCreated(res, 'Group created successfully');
        console.log('Request Body:', req.body);
        console.log('GroupName:', GroupName);
        console.log('Description:', Description);

      }
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};


export const getAllGroupsController = async (req, res) => {
  try {
    const results = await getAllGroupsService()
    const groups = results.recordset
    console.log(groups);
    res.status(200).json({ groups: groups });
  } catch (error) {
    console.error("Error fetching all group:", error);
    res.status(500).json("Internal server error");
  }
};

