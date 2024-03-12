import { useGetPostsQuery } from '../../features/posts/postsApi';
import ProfilePostCard from './ProfilePostCard';
import './ProfilePostList.scss';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const PostList = () => {
    const { data: posts, error, isLoading, isError, isFetching } = useGetPostsQuery({ refetchOnReconnect: true });
console.log(posts);
    let latestPost = null;

    if (isLoading || isFetching) {
        return <ClipLoader color='#000' loading={true}/>;
    }

    if (isError) {
        return <div>{error.data.message}</div>;
    }

    // if (posts && posts.length > 0) {

    //     latestPost = posts;
    // }

    return (
        <div className='UserPostsList'>
            {posts && posts.map(post=>(
                 <ProfilePostCard key={post.post_id} post={post} />
            ))}
        </div>
    );
}

export default PostList;
