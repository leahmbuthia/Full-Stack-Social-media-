import dotenv from 'dotenv'
import { poolRequest, sql } from '../dbconnect/dbConnect.js'

dotenv.config();

export const createMessageService = async (messageS) => {
    try {
        const query = `
            INSERT INTO Message (MessageID, SenderID, MessageDate, Content)
            VALUES (@MessageID, @SenderID, @MessageDate, @Content)
        `;

        console.log('Executing query:', query);  // Log the query being executed

        const result = await poolRequest()
            .input('MessageID', sql.VarChar, messageS.MessageID)
            .input('SenderID', sql.VarChar, messageS.SenderID)
            .input('MessageDate', sql.DateTime, new Date(messageS.MessageDate))  // Use sql.DateTime for MessageDate
            .input('Content', sql.VarChar, messageS.Content)
            .query(query);

        console.log('Query execution result:', result);  // Log the result of the query
        return result;
    } catch (error) {
        console.error('Error in createMessageService:', error);  // Log any errors
        return error;
    }
};
