import React, { useEffect, useState } from "react";
import "./RecentActivityCard.scss";
import NavIcon from "../shared/NavIcon";
import RecentUser from "../../assets/recent-user.png";
import Group1 from "../../assets/Group1.png";
import Group2 from "../../assets/Group2.png";
import Group3 from "../../assets/Group3.png";
import { useNavigate } from "react-router-dom";
import { SuccessToast, ToasterContainer } from "../../Toaster";


const RecentActivityCard = ({ username, tagname }) => {
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState(
    JSON.parse(localStorage.getItem("joinedGroups")) || []
  );

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:8100/api/v1/groups");
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const data = await response.json();
        setGroups(data.groups);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const groupData = [
    {
      icon: Group1,
      name: "Design Enthusiast",
    },
    {
      icon: Group2,
      name: "UI Official",
    },
    {
      icon: Group3,
      name: "Web Designer",
    },
  ];

  const navigate = useNavigate();

  const handleJoinGroup = (index) => {
    setGroups((prevGroups) => {
      const updatedGroups = [...prevGroups];
      const joinedGroup = updatedGroups[index];
    SuccessToast("Group added successfully");


      // Check if the group is already joined
      if (!joinedGroup.joined) {
        joinedGroup.joined = true;
        setJoinedGroups((prevJoinedGroups) => [
          ...prevJoinedGroups,
          joinedGroup,
        ]);

        // Update local storage to persist joined groups
        localStorage.setItem(
          "joinedGroups",
          JSON.stringify([...prevJoinedGroups, joinedGroup])
        );
      }


      return updatedGroups;
    });
  };

  return (
    <div className="recent-card-container">
      {/* ... (previous code remains the same) */}
      <div className="recent-content-desc">
      <ToasterContainer />

        <h2>Groups</h2>
        <ol className="group-list">
          {groups.slice(0, 8).map((group, index) => (
            <div key={group.GroupID} className="group-item">
              <img
                src={groupData[index % groupData.length].icon}
                alt="Group Icon"
              />
              <div className="det">
                <h3>{group.GroupName}</h3>
                <p>{group.Description}</p>
                <img className="rendered-image" src={group.PhotoURL} alt="" />
              </div>
              <button onClick={() => handleJoinGroup(index)}>
                {group.joined ? "Joined" : "Join Group"}
              </button>
            </div>
          ))}
        </ol>
      </div>
      <div className="joined-groups">
        <h2>Recent Activity</h2>
        <ol className="joined-group-list">
          {joinedGroups.map((joinedGroup) => (
            <div key={joinedGroup.GroupID} className="joined-group-item">
              {/* Render information of the joined group */}
              <h3>{joinedGroup.GroupName}</h3>
              <p>{joinedGroup.Description}</p>
              <img className="rendered-image" src={joinedGroup.PhotoURL} alt="" />
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecentActivityCard;
