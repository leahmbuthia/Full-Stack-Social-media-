import React from 'react'
import './CenterBody.scss'
// import CenterContent from '../components/profile/CenterContent'
// import RightContent from '../components/profile/RightContent'
import { useState } from 'react'
import { useEffect } from 'react'


const CenterBody = () => {
  const [location, setLocation] = useState('')
  const [username, setUsername] = useState('')
  const [tagname, setTagname] = useState('');
  const [userId, setUserId] = useState('');
  // const [location, setLocation] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    const tagname = localStorage.getItem('tagname');
    const storedUserId = localStorage.getItem('userId');

    setUsername(username);
    setTagname(tagname);
    setUserId(storedUserId);
    // setLocation(location);


  }, [])

  useEffect(() => {
    // This effect will run on every render
    const storedLocation = localStorage.getItem('location');
    setLocation(storedLocation);
  });
  
  return (
    <div className='center-body'>
      
        {/* <CenterContent location={location} /> */}
        {/* <RightContent /> */}
    </div>
  )
}

export default CenterBody