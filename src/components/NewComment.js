import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../actions/commentActions.js';

const NewComment = ({ postId }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const handleComment = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            commentText: comment,
            post: postId
        };

        dispatch(addComment(token, newComment));

        setComment('');
    };

    // useEffect(() => {
    // }, [dispatch]);
    return (
        <div className='py-5'>
            <h1 className='font-bold py-3 '>Add comment</h1>
            <form onSubmit={(e) => handleComment(e)} className='w-full flex items-center justify-between gap-1'>
                <input
                    className='border-[1px] border-[#212529] py-3 px-2 w-4/5 rounded-md'
                    type='text'
                    placeholder='Your comment ..'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type='submit' className='w-1/5 bg-[#212529] text-white p-3 rounded-md'>
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default NewComment;
