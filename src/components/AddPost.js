import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../actions/postActions';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";

Modal.setAppElement('#root'); // Ensure accessibility

const AddPost = ({ isOpen, onRequestClose }) => {
    const [title, setTitle] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // State to hold the selected image file
    const [tags, setTags] = useState('');
    const dispatch = useDispatch();

    const handlePost = (e) => {
        e.preventDefault();
        const formData = new FormData(); // Create a FormData object to hold form data including file
        formData.append('title', title);
        formData.append('introduction', introduction);
        formData.append('content', content);
        formData.append('image', image); // Append the image file
        formData.append('tags', tags);
        formData.append('dateCreated', new Date());

        const token = localStorage.getItem("token");
        dispatch(addPost(token, formData));
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Post"
            className="modal"
            overlayClassName="overlay"
        >
            <div className='py-5'>
                <div className="flex justify-between items-center mb-3">
                    <h1 className='font-bold'>Add Post</h1>
                    <button onClick={onRequestClose}><IoClose className="text-2xl cursor-pointer" /></button>
                </div>
                <form onSubmit={handlePost} className='w-full flex flex-col gap-3'>
                    <input
                        className='border-[1px] border-[#212529] py-2 px-2 rounded-md'
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        className='border-[1px] border-[#212529] py-2 px-2 rounded-md'
                        type='text'
                        placeholder='Introduction'
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                        required
                    />
                    <textarea
                        className='border-[1px] border-[#212529] py-2 px-2 rounded-md'
                        placeholder='Content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <input
                        className='border-[1px] border-[#212529] py-2 px-2 rounded-md'
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                    <input
                        className='border-[1px] border-[#212529] py-2 px-2 rounded-md'
                        type='text'
                        placeholder='Tags (space separated)'
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <button type='submit' className='bg-[#212529] text-white p-3 rounded-md'>
                        Add Post
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default AddPost;
