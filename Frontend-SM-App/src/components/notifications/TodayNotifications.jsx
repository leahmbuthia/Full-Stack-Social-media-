import React, { useState, useEffect } from "react";
import "./TodayNotifications.scss";
import Angela from "../../assets/angela.png";
import { useCreateMessageMutation } from "../../features/Notifications/notificationApi";

function TodayNotifications() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createMessage] = useCreateMessageMutation();
  const UserID = localStorage.getItem("UserID");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Sample friends array for initial rendering
  const friends = [
    {
      image: Angela,
      name: "You",
      message: "started Following you",
      time: "08:15",
    },
    // ... other friend objects
  ];

  const handleCreateMessage = async () => {
    if (message.trim() !== "") {
      const messageData = {
        SenderID: UserID,
        Content: message,
      };

      try {
        const response = await createMessage(messageData);
        const newMessage = response.data; // Assuming the response has the new message data
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
        console.log("Message created successfully");
        setMessage("");
        setIsModalOpen(false); // Close the modal after creating the message
      } catch (error) {
        console.error("Error creating message:", error);
        // Handle error, show an error message, etc.
      }
    }
  };

  // Example: Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      // Implement the logic to fetch messages from your API
      // and update the messages state accordingly
      try {
        // Example fetching logic:
        // const response = await api.fetchMessages();
        // setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="notifications">
      <div className="notification-top">
        <h4>TODAY</h4>
      </div>
      <div className="notification-menu">
        {messages.map((item, index) => (
          <div className="notification" key={index}>
            <div className="not-card-top">
              {/* Use item properties to render the message */}
              <img src={item.image} alt={item.name} />
              <div className="not-content">
                <h3>{item.name}</h3>
                <p>{item.Content}</p>
              </div>
            </div>
            <p>{item.time}</p>
          </div>
        ))}
      </div>
      <div className="notifications-display">
        
      </div>

      <button onClick={() => setIsModalOpen(true)}>Create Message</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Create Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleCreateMessage}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodayNotifications;
