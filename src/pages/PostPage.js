import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../actions/postActions';
import PostDetails from '../components/PostDetails';
import CommentList from '../components/CommentList';
import NewComment from '../components/NewComment';



const PostPage = () => {
    const postId = useLocation().state.postId;
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post.singlePost.foundPost);

    useEffect(() => {
        dispatch(getPostById(postId));
    }, [dispatch]);
    return (
        <div>
            {post &&
                <div>
                    <PostDetails post={post} />
                    {/* <CommentList post={post} /> */}
                    <NewComment postId={post._id} />

                </div>}
        </div>
    )
}

export default PostPage