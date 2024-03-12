import React, { useState, useEffect } from "react";
import "./JoinGroupCard.scss";
import GroupHeader from "./GroupHeader";
import MembersIcons from "../shared/MembersIcons";

const JoinGroupCard = () => {
  const [latestGroups, setLatestGroups] = useState([]);

  // Assuming you have an API or method to fetch the latest groups, you can use useEffect to update the state
  useEffect(() => {
    // Assuming fetchLatestGroups is a function that fetches the latest groups
    const fetchLatestGroups = async () => {
      // Fetch your groups data and update the state
      try {
        const response = await fetch("/api/v1/groups"); // Replace with your API endpoint
        const data = await response.json();
        setLatestGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchLatestGroups();
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <div className="group-container">
      <GroupHeader setLatestGroups={setLatestGroups} />
      <div className="group-sub-titles">
        <div className="sub-titles-left">
          <h4>Suggested Groups for you</h4>
          <p>Groups you might be interested in.</p>
        </div>
        <div className="sub-titles-right"></div>
      </div>
      <div className="group-card-container">
        <div className="card-contents">
          {latestGroups.map((group, index) => (
            <div key={group.groupNames} className="card-content">
              <h3>{group.groupNames}</h3>
              {group.PhotoURL && (
                <img
                  src={group.PhotoURL}
                  alt={group.groupNames}
                  style={{ maxWidth: "100%" }}
                />
              )}
              <p>{group.groupDescription}</p>
              <div className="group-bottom">
                {/* Assuming MembersIcons component displays icons for members */}
                <MembersIcons />
                {/* Add more icons or components as needed */}
                <div className="group-para"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinGroupCard;
