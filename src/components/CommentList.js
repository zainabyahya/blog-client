import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsByPost } from "../actions/commentActions.js"

const CommentList = ({ post }) => {
    const postId = post._id;
    const dispatch = useDispatch();
    const commentsList = useSelector((state) => state.comment.foundComments);
    useEffect(() => {
        dispatch(getCommentsByPost(postId));
    }, [dispatch, postId]);

    return (
        <div>
            <h1 className='font-bold py-5'>{commentsList.length} comments</h1>
            <div>
                {commentsList &&
                    commentsList.map((comment, index) => (
                        <div key={index} className='py-2'>
                            <h1 className='font-bold mb-3'> {comment.user.firstName} {comment.user.lastName}</h1>
                            <p>{comment.commentText}</p>
                            <hr />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CommentList;
