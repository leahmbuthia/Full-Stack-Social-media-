import React, { useState, useEffect } from "react";
import {
  useAddPhotosMutation,
  useGetPhotosQuery,
} from "../../features/photos/photosApi";
import "./addPhotos.scss";
import likesIcon from "../../assets/heart.png";
import commentsIcon from "../../assets/message-circle.png";
import { useAddCommentMutation } from "../../features/Comments/CommentsApi";
import { SuccessToast, ToasterContainer } from "../../Toaster";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const UserID = localStorage.getItem("UserID");
  const [addPhotos] = useAddPhotosMutation();
  const { data: photos } = useGetPhotosQuery({ refetchOnReconnect: true });
  const [imageCount, setImageCount] = useState(0);
  const [addComment] = useAddCommentMutation();
  const [commentContent, setCommentContent] = useState("");
  const [modal, setModal] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // State to store likes and comments for each photo
  const [photoLikes, setPhotoLikes] = useState({});
  const [photoComments, setPhotoComments] = useState({});

  useEffect(() => {
    if (photos) {
      setImageCount(photos.length);

      // Initialize likes and comments state for each photo from localStorage
      const storedLikes = JSON.parse(localStorage.getItem("photoLikes")) || {};
      const storedComments =
        JSON.parse(localStorage.getItem("photoComments")) || {};

      // Ensure that each photo has an entry in the state
      photos.forEach((photo, index) => {
        if (!storedLikes.hasOwnProperty(index)) {
          storedLikes[index] = 0;
        }
        if (!storedComments.hasOwnProperty(index)) {
          storedComments[index] = [];
        }
      });

      setPhotoLikes(storedLikes);
      setPhotoComments(storedComments);
    }
  }, [photos]);

  const handleLikesClick = (index) => {
    setPhotoLikes((prevLikes) => {
      const updatedLikes = {
        ...prevLikes,
        [index]: (prevLikes[index] || 0) + 1,
      };
      localStorage.setItem("photoLikes", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const handleCommentClick = (index) => {
    setSelectedPhotoIndex(index);
    setModal(true);
  };

  const handleCommentSubmit = async () => {
    if (commentContent.trim() !== "") {
      const commentWithUserId = {
        Content: commentContent,
        UserID: UserID,
      };
      try {
        const response = await addComment(commentWithUserId);
        const newComment = response.data; // Assuming the API returns the new comment object

        setPhotoComments((prevComments) => {
          const updatedComments = {
            ...prevComments,
            [selectedPhotoIndex]: [
              ...(prevComments[selectedPhotoIndex] || []),
              newComment,
            ],
          };
          localStorage.setItem(
            "photoComments",
            JSON.stringify(updatedComments)
          );
          return updatedComments;
        });

        setCommentContent("");
        SuccessToast("comment added successfully");
        setModal(false);
      } catch (error) {
        console.error("Error sending the comment:", error);
      }
    } else {
      console.log("No comment content entered");
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    SuccessToast("photo added succesfully");
    if (imageUrl.trim() !== "") {
      const photoWithData = {
        PhotoURL: imageUrl,
        UserID: UserID,
      };

      try {
        await addPhotos(photoWithData);
        console.log("Photo created successfully", photoWithData);
        setImageUrl("");
      } catch (error) {
        console.error("Error creating photo", error);
      }
    } else {
      console.log("No photo added");
    }
  };

  const renderCommentsModal = () => {
    return (
      <div className="comment-modal">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add your comment..."
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    );
  };

  return (
    <div className="addPhotos">
      <div className="photo-header">
        <ToasterContainer />
        <p>There Are {imageCount} Photos About You</p>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Upload Photo</p>
            <input value={imageUrl} onChange={handleImageUrlChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <section>
        {photos &&
          photos.map((photo, index) => (
            <div key={index} className="image-holder">
              <img src={photo.PhotoURL} alt={`Photo ${index + 1}`} />
              <div className="action-icons">
                <img
                  onClick={() => handleLikesClick(index)}
                  src={likesIcon}
                  alt="Likes"
                />
                <span>{photoLikes[index]}</span>
                <img
                  onClick={() => handleCommentClick(index)}
                  src={commentsIcon}
                  alt="Comments"
                />
                <span>{photoComments[index]?.length || 0}</span>
              </div>
            </div>
          ))}
      </section>
      {modal && renderCommentsModal()}
    </div>
  );
};

export default AddPhoto;
