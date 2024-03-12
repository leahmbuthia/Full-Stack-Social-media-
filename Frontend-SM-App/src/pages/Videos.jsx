import GroupVideos from "../components/videos/GroupVideos";
import SingleVideo from "../components/videos/SingleVideo";
import Addupdate from '../components/profile/ProfileStatusInput'
import TimelineStatusPostList from '../components/Timeline/timelineStatusPostList'


import "./Videos.scss";

const Videos = () => {
  return (
    <div className="video-right-content">
      <div className="video-middle-content">
        <div className="video-top">
          {/* <GroupVideos /> */}
          <Addupdate />
        </div>
        <div className="video-bottom">
          {/* <SingleVideo/> */}
          <TimelineStatusPostList />
        </div>
      </div>
    </div>
  );
};

export default Videos;
