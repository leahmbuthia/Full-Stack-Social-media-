import React, { useEffect, useState } from 'react';
import "./Groups.scss"
import Group1 from "../../assets/Group1.png";
import Group2 from "../../assets/Group2.png";
import Group3 from "../../assets/Group3.png";

function Groups() {

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:8100/api/v1/groups');
        if (!response.ok) {
          throw new Error('Failed to fetch groups');
          // console.log(response);
        }
        const data = await response.json();
        setGroups(data.groups);
        // console.log(data.groups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
  
    fetchGroups();
    // console.log("response");
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
  return (
    <div className="GroupItems">
      <div className="heading">
              <p style={{textTransform: "uppercase"}}>Your Page</p>
              <p style={{color: "#2563EB"}}>See all</p>
      </div>
      {groups.slice(0, 4).map((group, index) => (
        <div key={group.GroupID} className="group-item">
          <img src={groupData[index % groupData.length].icon} alt="Group Icon" />
          <h3>{group.GroupName}</h3>
          {/* <p>{group.Description}</p> */}
        </div>
      ))}
    </div>
  );
}

export default Groups;

