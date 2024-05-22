import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../actions/postActions';
import PostDetails from '../components/PostDetails';
import CommentList from '../components/CommentList';
import NewComment from '../components/NewComment';
const PostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();

    const post = useSelector((state) => state.post.singlePost.foundPost);
    const currentUser = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(getPostById(postId));
    }, [navigate]);
    return (
        <div className='mb-10'>
            {post &&
                <div>
                    <PostDetails post={post} />
                    <CommentList post={post} />
                    {currentUser && <NewComment postId={post._id} />}
                </div>
            }
        </div>
    )
}

export default PostPage