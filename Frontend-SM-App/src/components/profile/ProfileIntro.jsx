import './ProfileIntro.scss'
import { useState, useEffect } from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import { CiCalendarDate } from "react-icons/ci";
import { TbBriefcase } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoLinkedin } from "react-icons/io";


// import { format } from 'date-fns';

const ProfileIntro = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Fetch user details from local storage
    const location = localStorage.getItem('location')
    setUserDetails(location)

    console.log(localStorage.getItem('location'));

  }, [])

  return (
    <div className="intro">
      <div className="Intro-top">
        <div className="intro-title">
          <p style={{ fontWeight: 600 }}>Intro</p>
        </div>
        <div className="intro-dots">
          <HiDotsHorizontal />
        </div>
      </div>
      <div className='profileAbout'>
        {/* Check if userDetails.user exists before accessing its properties */}
        <p style={{ fontWeight: "500", color: "#64748B" }}>
          Hello, I am an experinced joiner with well developed skills
        </p>
      </div>
      <div className="list">
        <div className="map-pin">
          <CiLocationOn />
          {/* Check if userDetails.user exists before accessing its properties */}
          <p>{location.location}</p>
        </div>
        <div className="Briefcase">
          <TbBriefcase />
          {/* Check if userDetails.user exists before accessing its properties */}
          Binford Ltd.
        </div>
        <div className="Calender">
          <CiCalendarDate />
          {/* Check if userDetails.user and userDetails.user.registeredDate exist before formatting */}
          March 5, 2024
        </div>
        <div className="link">
          <IoLogoLinkedin />
          {/* Check if userDetails.user exists before accessing its properties */}
          dribbble.com/Angela
        </div>
      </div>
    </div>
  );
}

export default ProfileIntro;