import React, {useState} from 'react';
import PostCommentCard from './PostCommentCard.jsx';
import './PostCommentList.scss';
import { ClipLoader } from 'react-spinners';

const PostCommentList = () => {
    // const { data: comments, error, isLoading, isError,isFetching } = useGetCommentsQuery({ refetchOnReconnect: true });

    // if (isError) {
    //     return <div>{error?.data?.message || 'Error fetching comments'}</div>;
    // }

    // if (isLoading || isFetching) {
    //     return <ClipLoader color='#000' loading={true}/>;
    // }

    // console.log("This is the logged comments", comments);

    return (
        <div className='PostCommentList'>
            {/* <p style={{color:"white", padding:"10px 0 0 0"}}>Get all comments...</p>
            
            <section className='section'>
                {comments && <PostCommentCard key={comments.id} comments={comments} />
                }
            </section>
            <p style={{color:"white", padding:"10px 0 0 0"}}>The end of comments</p> */}
        </div>
    );
};

export default PostCommentList;
