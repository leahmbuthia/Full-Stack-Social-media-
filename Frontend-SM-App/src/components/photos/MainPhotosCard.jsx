import React, { useState, useEffect } from "react";
import "./MainPhotosCard.scss";
import PhotosHeader from "./PhotosHeader";
// import PhotosImage1 from "../../assets/photos-image1.png";
// import PhotosImage2 from "../../assets/photos-image2.png";
// import PhotosImage3 from "../../assets/photos-image3.png";
// import PhotosImage4 from "../../assets/photos-image4.png";
// import PhotosImage5 from "../../assets/photos-image5.png";
// import PhotosImage6 from "../../assets/photos-image6.png";
// import PhotosImage7 from "../../assets/photos-image7.png";
// import PhotosImage8 from "../../assets/photos-image8.png";
// import PhotosImage9 from "../../assets/photos-image9.png";
// import PhotosImage10 from "../../assets/photos-image10.png";
// import PhotosImage11 from "../../assets/photos-image11.png";
// import PhotosImage12 from "../../assets/photos-image12.png";
// import PhotosImage13 from "../../assets/photos-image13.png";
// import PhotosImage14 from "../../assets/photos-image14.png";
// import PhotosImage15 from "../../assets/photos-image15.png";
// import PhotosImage16 from "../../assets/photos-image16.png";
import likes from "../../assets/heart.png";
import comments from "../../assets/message-circle.png";
import AddPhoto from "./AddPhoto";

const MainPhotosCard = () => {

  return (
    <div className="photo-container">
      <div className="photos-top">
        <PhotosHeader />
      </div>
      <div className="photo-sub-titles">
        <div className="photos-title-top">
          <h4 className="about-you-photos">Photos About You</h4>
          <h4 className="your-photos">Your Photos</h4>
          <h4 className="photos-album">Album</h4>
        </div>
        <div className="total-photos">
          <h4> Total Photos</h4>
        </div>
         <AddPhoto />
      </div>
    </div>
  );
};

export default MainPhotosCard;
