//Work on this

//import react
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import mutations

//icons
import { TbMoodSmile } from "react-icons/tb";
import { IoIosLink } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { GoShareAndroid } from "react-icons/go";

//import assets
import Avatar from "../../assets/Avatar.png"

//stylefile
import './ProfilePostCard.scss';

//import components


const ProfileStatusPost = ({comment}) => {

        //Destructure datetime and get only time function
        //This function will only display the time its being passed
        
        //Function to show and hide comments
        const [isVisible, setIsVisible] = useState(false);
        const toggleVisibility = () => {
          setIsVisible(!isVisible);
        };
    

        //comment input functions
        const [commentContent, setCommentContent] = useState('');
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        // const [addComment] = useAddCommentMutation();
        const handlePostContentChange = (e) => {
            setCommentContent(e.target.value);
        }

        //Check for userID before posting
        const handleCommentId=()=>{
            console.log(comment.CommentID);
        }

         //Likes action
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    // console.log("Comments", comments);
    
    return (
        <div className="profileStatusPost">
            <div className='postCommentHeader'>
            <div className="profilePic">
                <img src={Avatar} alt="" />
            </div>
            <div className="user">
                <p className="username">Username</p>
                <p className="postDate">commentDate</p>
            </div>
        </div>
            <div className='profileStatusPostTextContent'>
                <p style={{color:'black'}}>Content</p>
            </div>
            <div className='profileStatusPostImageContent'>
                {/* {UserID} */}
            </div>
            <div className='profileStatusPostInteraction'>
                <div className="like" onClick={handleClick}><FaHeart /> {count} Likes</div>
                <div className="comment"><AiOutlineMessage />Comments</div>
                <div className="share"><GoShareAndroid/> 201 Share</div>
            </div>
        </div>
    )
}
export default ProfileStatusPost;
