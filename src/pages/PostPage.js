import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, deletePost } from '../actions/postActions';
import PostDetails from '../components/PostDetails';
import CommentList from '../components/CommentList';
import NewComment from '../components/NewComment';
import decodeJWT from "../utils/jwt"
const PostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();

    const post = useSelector((state) => state.post.singlePost.foundPost);
    const token = localStorage.getItem("token");
    console.log("🚀 ~ PostPage ~ token:", token)

    const currentUser = decodeJWT(token);
    // const currentUser = useSelector((state) => decodeJWT(state.auth.currentToken));
    const handleEdit = () => {
        navigate(`/edit/${post._id}`);
    };
    const handleDelete = () => {
        dispatch(deletePost(postId, token));
        navigate("/");
    };
    useEffect(() => {
        dispatch(getPostById(postId));
    }, [dispatch, postId, navigate]);
    return (
        <div>
            {post &&
                <div>
                    <PostDetails currentUser={currentUser} onEdit={handleEdit} onDelete={handleDelete} post={post} />
                    <CommentList post={post} />
                    <NewComment postId={post._id} />

                </div>
            }
        </div>
    )
}

export default PostPage