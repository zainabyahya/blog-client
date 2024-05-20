import React, { useEffect } from 'react';
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.allPosts);
    console.log("🚀 ~ PostList ~ posts:", posts)


    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className='flex flex-wrap gap-5'>
            {
                posts.map((post) => (
                    <PostCard key={post._id} Post={post} />
                ))
            }
        </div>
    )
}

export default PostList