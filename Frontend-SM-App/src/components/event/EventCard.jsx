import React, { useState, useEffect } from "react";
import "./EventCard.scss";
import EventHeader from "./EventHeader";
import EventCalendar from "./EventCalendar";
import EventVenue from "./EventVenue";
import EventImageCard from "./EventImageCard";
import Button from "../shared/Button";
import MembersIcons from "../shared/MembersIcons";
import Heart2 from "../../assets/heart2.png";
import EventOne from "../../assets/event-one.png";
import EventTwo from "../../assets/event-two.png";
import EventThree from "../../assets/event-three.png";
import { 
  LoadingToast, 
  SuccessToast, 
  ErrorToast, 
  ToasterContainer} from "../Toaster"
import {
  useAddEventsMutation,
  useGetEventsQuery,
  useOptOutOfEventMutation,
  useRegisterForEventMutation,
} from "../../features/event/EventApi";
import NavIcon from "../shared/NavIcon";
import Location from "../../assets/location.png";
import "./EventVenue.scss";

const EventCard = (event) => {

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [addEvent] = useAddEventsMutation();

  const { data: eventData, isLoading: eventsLoading, isFetching,isError,error } = useGetEventsQuery();
 
  // const MoreDetailsPortal = ({ isOpen, onClose, eventData }) => {
  //   if (!isOpen) return null;


  const [registered, setRegistered] = useState(false);
  const [registerForEvent] =
    useRegisterForEventMutation();
  const [optOutOfEvent] = useOptOutOfEventMutation();



  // console.log('Events: ${eventData}, Error: ${error}, isError: ${isError}, isLoading: ${isLoading}, isFetching: ${isFetching}');
  

  useEffect(() => {
    if (eventData) {
      setEvents(eventData);
    }
  }, [eventData]);

useEffect(()=>{
  if (isLoading || isFetching) {

    // LoadingToast();
   
  }
  if (isError) {
     ErrorToast(error.data.message) ;
  }
},[isLoading, isFetching, isError, error]);

 
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventData = Object.fromEntries(formData);
    try {
      // LoadingToast(true);
      await addEvent(eventData);

       // Store event in local storage
    const eventsFromLocalStorage = JSON.parse(localStorage.getItem('events')) || [];
    const updatedEvents = [...eventsFromLocalStorage, eventData];
    localStorage.setItem('events', JSON.stringify(updatedEvents));
   //Hide loading toast
    LoadingToast(false);
    SuccessToast("Event added successfully!");
    //Hide Modal
      setShowModal(false);
      // Refetch events data to update the list
      // This will trigger the useEffect above and update the events state
    } catch (error) {
      LoadingToast(false);
      ErrorToast("Error adding event: " + error.message);
    console.error("Error adding event:", error);
    }
  };

  console.log(event);

  
  const handleRegister =async (EventID) => {
    const responseData=localStorage.getItem("UserID")
    const loggedInUserId=responseData;
     
          console.log("event details",{ EventID: EventID, AttendeeID: loggedInUserId });
      try {
        const response= await registerForEvent({ EventID: EventID, AttendeeID: loggedInUserId }).unwrap()
        console.log("first error checking",response.error)
        if(response.error){
          ErrorToast('Already registerd',response.error)  
          }else{
            SuccessToast(response.message)
          }
       
      } catch (error) {
        console.log(error.error)
        ErrorToast('Already registered',error.error);
       
     
      }
        }

  
  return (
    <div className="event-container">
      <ToasterContainer/>
      <div className="events-top">
        <EventHeader />
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Event</h2>
            <form onSubmit={handleSubmit}>
              {/* Form fields for adding events */}
              <div>
                <label htmlFor="EventName">Event Name:</label>
                <input
                  type="text"
                  id="eventName"
                  name="EventName"
                  defaultValue={event.EventName || ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="Description">Description:</label>
                <textarea
                  id="Description"
                  name="Description"
                  defaultValue={event.Description || ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="EventDate">Event Date:</label>
                <input
                  type="date"
                  id="eventDate"
                  name="EventDate"
                  defaultValue={event.EventDate || ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="Location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="Location"
                  defaultValue={event.Location || ""}
                  required
                />
              </div>
              <div>
                <label htmlFor="EventPosterURL">Event URL:</label>
                <input
                  type="url"
                  id="eventUrl"
                  name="EventPosterURL"
                  defaultValue={event.EventPosterURL || ""}
                  required
                />
              </div>

              <button type="submit">Add Event </button>
             
            </form>
          </div>
        </div>
      )}
      <div className="event-sub-titles">
        <div className="events-title-top">
          <h4 className="popular-events">Popular</h4>
          <h4>For You</h4>
          <h4>Nearest</h4>
          <h4>Favorite</h4>
          {/* <h4>Registered</h4> */}
          <button onClick={openModal}>Add Event</button>
        </div>
        
      </div>
      <div className="events-images">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <div className="event-card-contents">
              <EventImageCard
                EventMsg={event.EventName}
                eventIcon={Heart2}
                EventImage={event.EventPosterURL}
              />
              <div className="events-page-icon">
                <div className="events-page-icon-head">
                  <h3>{event.EventName}</h3>
                  <p>{event.Description}</p>
                </div>
                <div className="events-bottom">
                  <EventCalendar Eventmsg={event.EventDate} />
                </div>
              </div>
              <div className="center-events-card">
                <div className="events-icons">
                  <MembersIcons MbrIcon={EventThree} />
                  <MembersIcons MbrIcon={EventOne} />
                  <MembersIcons MbrIcon={EventTwo} />
                  <div className="events-para">
                  <button>see More</button>
                  </div>
                </div>
                {/* <p>+2K are going</p> */}
              </div>
              <div className="venue-container">
                <div>
                  <NavIcon url={Location} />
                </div>
                <div className="venue-content">
                  <p>{event.Location}</p>
                  {/* <p>Kentucky 39495</p> */}
                </div>
              </div>
              <button className="registr" onClick={() => handleRegister(event.EventID)}>
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
