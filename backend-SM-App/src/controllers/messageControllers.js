import { sendBadRequest, sendCreated, sendServerError } from "../helpers/helperFunctions.js";
import { createMessageService } from "../services/messageService.js";
import { v4 } from 'uuid';

export const createMessage = async (req, res) => {
    try {
        const { SenderID, Content } = req.body;

        if (!SenderID || !Content) {
            return sendBadRequest(res, 'UserID and Content are required.');
        }

        const MessageID = v4();

        const MessageDate = new Date();
        const messageS = {
            MessageID,
            SenderID,
            MessageDate,
            Content
        };

        const response = await createMessageService(messageS);

        if (response) {
            return sendCreated(res, 'Message created successfully');
        } else {
            return sendServerError(res, 'Failed to create message. Please try again later.');
        }
    } catch (error) {
        console.error(error);
        return sendServerError(res, 'Server error');
    }
};


