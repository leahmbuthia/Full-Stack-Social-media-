import React from "react";
import Avatar from "../../assets/Avatar.png";
import "./SideProfile.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SideProfile({ username, tagname }) {
  const[showProfile, setShowProfile]=useState(false)
  const navigate = useNavigate();

  const handleProfile=()=>{
      setShowProfile(true)
      navigate("/profile");
      console.log("navigation");
  }
  return (
    <div className="sideProfile">
      <div className="SideImage">
        <img onClick={handleProfile} src={Avatar} alt="avatar" />{" "}
      </div>
      <div className="leftprofile">
        <p className="Profilename">{username}</p>
        <p className="username">@{tagname}</p>
      </div>
    </div>
  );
}

export default SideProfile;