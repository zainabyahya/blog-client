import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, updatePost } from '../actions/postActions';

const EditPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector((state) => state.post.singlePost.foundPost);

    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        if (!post || post._id !== postId) {
            dispatch(getPostById(postId));
        } else {
            setTitle(post.title);
            setIntroduction(post.introduction);
            setContent(post.content);
            setTags(post.tags.map(tag => tag.name).join(' '));
        }
    }, [dispatch, postId, post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTags = tags.split(',').map(tag => tag.trim());
        const updatedPost = { ...post, title, introduction, content, tags: updatedTags };
        dispatch(updatePost(updatedPost)).then(() => {
            navigate(`/post/${post._id}`);
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 ">
                    <label className="block text-[#212529 ]  dark:text-white">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-[#212529]  w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-[#212529 ] dark:text-white">Introduction</label>
                    <textarea
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                        className="text-[#212529]  w-full px-3 py-2 border rounded"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-[#212529 ]  dark:text-white">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="text-[#212529]  w-full px-3 py-2 border rounded h-lvh"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-[#212529 ]  dark:text-white">Tags (space separated)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="text-[#212529] w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#212529] text-white rounded-md dark:text-[#212529] dark:bg-white"
                    >
                        Update Post
                    </button>
                </div>
            </form >
        </div >
    );
};

export default EditPost;
