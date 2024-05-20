import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ Post }) => {
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    const handlePostClick = () => {
        navigate(`/post/${Post._id}`);
    };

    return (
        <div className='w-[15rem] flex flex-col gap-5' onClick={handlePostClick}>
            <img className='w-full h-auto rounded-md' src={`http://localhost:8000/${Post.image}`} alt='Blog Cover' />
            <div className='flex flex-col items-start justify-center gap-2'>
                <span>{Post.dateCreated.substring(0, 10)}</span>
                <h1 className='font-bold'>{Post.title}</h1>
                <span key={1}>
                    {truncateText(Post.introduction, 75)}
                </span>
                <span className='flex gap-2'>
                    {Post.tags.map((tag) => (
                        <span key={tag._id} className='py-1 px-2 rounded-md bg-gray-100'>{tag.name}</span>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default PostCard;
