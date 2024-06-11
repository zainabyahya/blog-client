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
        <div className='w-[15rem] h-fit flex flex-col gap-5 hover:bg-[#eaeaea] p-3 rounded-md hover:dark:text-black' onClick={handlePostClick}>
            <img className='w-full h-auto rounded-md' src={`http://localhost:8000/${Post.image}`} alt='Blog Cover' />
            <div className='flex flex-col items-start justify-center gap-2 '>
                <span>{Post.dateCreated.substring(0, 10)}</span>
                <h1 className='font-bold'>{Post.title}</h1>
                <span key={1}>
                    {truncateText(Post.introduction, 75)}
                </span>
                <span className='flex gap-2 flex-wrap '>
                    {Post.tags.map((tag) => (
                        <span key={tag._id} className=' py-1 px-2 rounded-md bg-gray-100 dark:bg-[#49515a] dark:text-white'>{tag.name}</span>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default PostCard;
