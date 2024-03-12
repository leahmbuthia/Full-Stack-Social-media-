import TimelinePostCard from '../../components/Timeline/timelineStatusPost'

import React from "react";

import { ClipLoader } from "react-spinners";
import { useGetPostsQuery } from "../../features/posts/postsApi";

const PostList = () => {
  const {
    data: posts,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetPostsQuery({ refetchOnReconnect: true });

  console.log("This is the logged posts:", posts);
  return (
    <div className="postHolder">
      {isError && <div>{error.data.message} </div>}
      {(isLoading || isFetching) && <ClipLoader color="#000" loading={true} />}
      <section>
        {posts &&
          posts.map((post, index) => (
            <TimelinePostCard key={index} post={post} />
          ))}
      </section>
    </div>
  );
};

export default PostList;
