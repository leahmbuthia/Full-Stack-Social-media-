import { createEventAttendeesService, getEventAttendeesServices, getEventAttendeeByIdService, updateEventAttendeesService, deleteEventAttendeeService } from "../services/eventAttendService.js";
import { sendNotFound, sendServerError, sendCreated, checkIfValuesIsEmptyNullUndefined } from "../helpers/helperFunctions.js";
import { eventAttendeesValidator } from '../validators/EventAttendValidator.js';

export const getEventAttendees = async (req, res) => {
    try {
        const results = await getEventAttendeesServices()
          const eventAttendee=results.recordset
        res.status(200).json({ eventAttendee: eventAttendee });
      } catch (error) {
        console.error("Error fetching all group Members:", error);
        res.status(500).json("Internal server error");
      }
    };
    export const createEventAttendees = async (req, res) => {
        try {
            const { EventID, AttendeeID } = req.body;
            
            // Validate input data
            const { error } = eventAttendeesValidator({ EventID, AttendeeID });
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            
            // Create event attendee
            const createdEventAttendees = { EventID, AttendeeID };
            const result = await createEventAttendeesService(createdEventAttendees);
    
            if (result.message) {
                return res.status(500).json({ error: result.message });
            } else {
                return res.status(201).json({ message: 'EventAttendee created successfully' });
            }
        } catch (err) {
            console.error("Error creating event attendee:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
    
    export const getEventAttendeeById = async (req, res) => {
        try {
            const EventAttendeeID = req.params.EventAttendeeID;
            const eventAttendee = await getEventAttendeeByIdService(EventAttendeeID);
    
            if (eventAttendee) {
                return res.status(200).json({ eventAttendee });
            } else {
                return res.status(404).json({ error: 'EventAttendee not found' });
            }
        } catch (error) {
            console.error("Error fetching event attendee by ID:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
    
    export const updateEventAttendee = async (req, res) => {
        try {
            const { EventID, AttendeeID } = req.body;
            const EventAttendeeID = req.params.EventAttendeeID;
            const eventAttendeeToUpdate = await getEventAttendeeByIdService(EventAttendeeID);
    
            if (!eventAttendeeToUpdate) {
                return res.status(404).json({ error: 'EventAttendee not found' });
            } else {
                // Check if values are empty, null, or undefined
                if (checkIfValuesIsEmptyNullUndefined(req.body)) {
                    // Update event attendee fields if provided
                    if (EventID) {
                        eventAttendeeToUpdate.EventID = EventID;
                    }
                    if (AttendeeID) {
                        eventAttendeeToUpdate.AttendeeID = AttendeeID;
                    }
                    
                    // Save updated event attendee
                    await updateEventAttendeesService(eventAttendeeToUpdate);
                    return res.status(200).json({ message: 'EventAttendee updated successfully' });
                } else {
                    return res.status(400).json({ error: 'Please provide a completed field' });
                }
            }
        } catch (error) {
            console.error("Error updating event attendee:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    

    export const deleteEventAttendee = async (req, res) => {
        try {
            const EventAttendeeID = req.params.EventAttendeeID;
            const result = await deleteEventAttendeeService(EventAttendeeID);
    
            if (result.rowsAffected[0] > 0) {
                return res.status(200).json({ message: 'EventAttendee deleted successfully' });
            } else {
                return res.status(404).json({ error: 'EventAttendee not found' });
            }
        } catch (error) {
            console.error("Error deleting event attendee:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
    