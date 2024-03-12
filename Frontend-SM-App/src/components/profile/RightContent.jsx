import React, { useState, useContext, useEffect } from "react";
import "./RightContent.scss";
import Avatar from "../../assets/angela.png";
import video from "../../assets/video.png";
import star from "../../assets/star.png";
import PostImage from "../../assets/post-image1.png";
import PostImage2 from "../../assets/post-image2.png";
import Like from "../../assets/heart.png";
import Smile from "../../assets/mood-smile.png";
import Link from "../../assets/link.png";
import Image from "../../assets/image.png";
import Message from "../../assets/message-circle.png";
import Share2 from "../../assets/share.png";
import Input from "../shared/Input";
import axios from "axios";
import UserContext from "../../userContext";

const RightContent = ({username, tagname}) => {
  const { setUserId ,userId } = useContext(UserContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postId, setPostId] = useState(null); // State to store the generated PostID
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  const [commentContent, setCommentContent] = useState("");
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const openCommentModal = () => {
    setCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setCommentModalOpen(false);
  };

  const handleCommentContentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const submitComment = async () => {
    try {
      const commentData = {
        UserID: userId,
        Content: commentContent,
        CommentDate: "2021", // Use the actual date format
      };
  
      // Make API call to create comment
      const response = await axios.post(
        "http://localhost:8100/api/v1/comments/",
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Update state and local storage for comments
      const newComments = comments + 1;
      setComments(newComments);
      localStorage.setItem("comments", newComments.toString());
  
      // Close the comment modal after submission
      closeCommentModal();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleImage1Change = (e) => {
    const file = e.target.files[0];
    setImage1(file);
  
    // Save file data to localStorage
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
    };
    localStorage.setItem("image1Data", JSON.stringify(fileData));
  };
  
  const handleImage2Change = (e) => {
    const file = e.target.files[0];
    setImage2(file);
  
    // Save file data to localStorage
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
    };
    localStorage.setItem("image2Data", JSON.stringify(fileData));
  };

  const submitPost = async () => {
    try {
      const postData = {
        UserID: userId,
        Content: postContent,
        Likes: 0,
        Comments: 0,
        Shares: 0,
      };

      console.log("Image 1:", image1);
      console.log("Image 2:", image2);
      // Make API call to create post
      const response = await axios.post(
        "http://localhost:8100/api/v1/posts/",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post created successfully:", response.data);

      // Store post content in local storage using the post's unique identifier
      localStorage.setItem(`postContent_${response.data.id}`, postContent);

      // Update state after successful post submission
      setLikes(0);
      setComments(0);
      setShares(0);
      setPostId(response.data.id); // Capture the generated PostID

      // Close the modal after submission
      closeModal();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  
  const handleLike = () => {
    setLikes(likes + 1);
  
    // Update localStorage for likes
    localStorage.setItem("likes", (likes + 1).toString());
  };
  
  useEffect(() => {
    // Load likes, comments, and the latest post content from local storage on component mount
    const storedLikes = parseInt(localStorage.getItem("likes")) || 0;
    const storedComments = parseInt(localStorage.getItem("comments")) || 0;
  
    // Iterate over all local storage keys to find the latest post content
    let latestPostContent = "";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("postContent_")) {
        latestPostContent = localStorage.getItem(key) || "";
      }
    }
  
    // Retrieve file data from localStorage
    const storedImage1Data = localStorage.getItem("image1Data");
    const storedImage2Data = localStorage.getItem("image2Data");
  
    // Read the userId from local storage when the component mounts
    const storedUserId = localStorage.getItem("userId");
  
    setLikes(storedLikes);
    setComments(storedComments);
    setPostContent(latestPostContent); // Set the latest post content in state
    setUserId(storedUserId);
  
    // Set the images if they exist in localStorage
    if (storedImage1Data) {
      const image1Data = JSON.parse(storedImage1Data);
      // Use image1Data to display information about the image if needed
      // For example, you might want to display the image name, type, or size
      console.log("Image 1 Data:", image1Data);
    }
  
    if (storedImage2Data) {
      const image2Data = JSON.parse(storedImage2Data);
      // Use image2Data to display information about the image if needed
      console.log("Image 2 Data:", image2Data);
    }
  }, [setUserId]);
  

  return (
    <div className="right-center">
      <div className="top-items">
        <div className="top">
          <div className="prof">
            <img src={Avatar} alt="" />
          </div>
          <button className="Create-new-post" onClick={openModal}>
            What's in your mind?
          </button>


      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Close button */}
            <div className="editpost-text">
              <p className="cp-text">Create post</p>
              <span className="close-btn" onClick={closeModal}>
                &times;
              </span>
            </div>

            {/* Form for creating a new post */}
            <form>
              <label htmlFor="postContent">What's on your mind?</label>
              <textarea
                id="postContent"
                name="postContent"
                rows="4"
                cols="50"
                value={postContent}
                onChange={handlePostContentChange}
              ></textarea>

              {/* Input for the first image */}
              <div className="image-select">
                <div className="image-1">
                  <label htmlFor="image1">Select Image 1:</label>
                  <input
                    type="file"
                    id="image1"
                    name="image1"
                    accept="image/*"
                    onChange={handleImage1Change}
                  />
                </div>

                {/* Input for the second image */}
                <div className="image-2">
                  <label htmlFor="image2">Select Image 2:</label>
                  <input
                    type="file"
                    id="image2"
                    name="image2"
                    accept="image/*"
                    onChange={handleImage2Change}
                  />
                </div>
              </div>

              <br />

              <button type="button" onClick={submitPost}>
                Post
              </button>
            </form>
          </div>
        </div>
      )}
        </div>

        <div className="bottom">
          <div className="img">
            <img src={video} alt="" />
            <p>Live Video</p>
          </div>

          <div className="img" onClick={openModal}>
            <img src={Image} alt="" />
            <p>Image/Video</p>
          </div>

          <div className="img">
            <img src={star} alt="" />
            <p>Activity</p>
          </div>
        </div>
      </div>

      <div className="ground">
        <div className="pro">
          <img src={Avatar} alt="" />
          <div className="bottom-info">
            <h4>{username}</h4>
            <p>56 mins ago</p>
          </div>
        </div>
        <div className="text">
          <p>{postContent}</p>
        </div>

        <div className="images">
        {image1 && <img src={URL.createObjectURL(image1)} alt="" />}
        {image2 && <img src={URL.createObjectURL(image2)} alt="" />}
        </div>
        <div className="like-comment">
          <div className="likes">
            <div>
              <img className="on-like" src={Like} alt="" onClick={handleLike} />
            </div>
            <div>
              <p  >
                {likes} <span>Likes</span>
              </p>
            </div>
          </div>
          <div className="comments">
            <div>
              <img src={Message} alt="" onClick={openCommentModal} />
            </div>
            <div className="comm-mod"  >
              <p>
                {comments} <span>comments</span>
              </p>
            </div>
          </div>
          <div className="shares">
            <div>
              <img src={Share2} alt="" />
            </div>
            <div>
              <p>
                {shares} <span>Share</span>
              </p>
            </div>
          </div>
        </div>
        <div className="text-message">
          <button onClick={openCommentModal}>
            <Input inputMsg="Write your message..." />
            <div className="img">
              <img src={Smile} alt="" />
              <img src={Link} alt="" />
            </div>
          </button>

          {/* Comment Modal */}
          {isCommentModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                {/* Close button */}

                {/* Form for adding a new comment */}
                <form>
                  <label htmlFor="commentContent">Add a Comment</label>
                  <textarea
                    id="commentContent"
                    name="commentContent"
                    rows="4"
                    cols="50"
                    value={commentContent}
                    onChange={handleCommentContentChange}
                  ></textarea>
                  <br />

                  <div className="comm-sp">
                  <button className="b-t-n" type="button" onClick={submitComment}>
                    Add Comment
                  </button>
                  <span className="close-b-t-n" onClick={closeCommentModal}>
                  &times;
                </span>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightContent;