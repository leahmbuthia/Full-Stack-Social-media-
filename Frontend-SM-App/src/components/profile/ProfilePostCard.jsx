import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPostsQuery } from "../../features/posts/postsApi.js";
import { useAddCommentMutation } from "../../features/Comments/CommentsApi.js";
import { TbMoodSmile } from "react-icons/tb";
import { IoIosLink } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { GoShareAndroid } from "react-icons/go";
import Avatar from "../../assets/Avatar.png";
import "./ProfilePostCard.scss";
import CommentList from "./PostCommentList.jsx";

const ProfileStatusPost = ({ post }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const UserID = localStorage.getItem("UserID");
  const [addComment] = useAddCommentMutation();
  const navigate = useNavigate(); 


  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  console.log("post content", post.content);
  const handlePostContentChange = (e) => {
    setCommentContent(e.target.value);
  };

  // Handler for submitting comment
  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentContent.trim() !== "") {
      const commentWithUserId = {
        Content: commentContent,
        UserID: user.UserID,
        PostID: post.post_id,
      };
      addComment(commentWithUserId)
        .then((response) => {
          console.log("Comment sent!:", response);
          setCommentContent("");
        })
        .catch((error) => {
          console.error("Error sending the comment:", error);
        });
    } else {
      console.log("No post content entered");
    }
  };

  // Handler for post ID
  const handlePostId = () => {
    console.log(post.post_id);
  };

  // Check if the post belongs to the logged-in user
  const isUserPost = () => {
    return UserID && post.UserID === UserID;
  };

  // Handler for likes
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="profileStatusPost">
      {isUserPost() && (
        <>
          <div className="profileStatusPostHeader">
            <div className="profilePic">
              <img src={Avatar} alt="" />
            </div>
            <div className="user">
              {/* <p className="username">{}</p>  */}
              <p className="postDate">{post.post_date}</p>
            </div>
          </div>
          <div className="profileStatusPostTextContent">
            <p>{post.content}</p>
            <img src={post.imageUrl} alt="" />
          </div>
          <div className="profileStatusPostInteraction">
            <div className="like" onClick={handleClick}>
              <FaHeart />
              {count} Likes
            </div>
            <div className="comment" onClick={toggleVisibility}>
              <AiOutlineMessage />
              {post.comments} Comments
            </div>
            <div className="share">
              <GoShareAndroid /> 201 Share
            </div>
          </div>
          <div>
            <div className="profileStatusPostComment">
              <form onSubmit={handleSubmit} className="commentForm">
                <input
                  onClick={handlePostId}
                  className="commentInputArea"
                  type="text"
                  placeholder="Write your message..."
                  value={commentContent}
                  onChange={handlePostContentChange}
                  required
                />
              </form>
              <div className="btnIcons">
                <TbMoodSmile />
                <IoIosLink />
              </div>
            </div>
            <div className="fetchedComments">
              {isVisible && (
                <div>
                  <CommentList />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileStatusPost;