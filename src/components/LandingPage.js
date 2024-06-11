import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.post.allPosts).slice(0, 3);
    const [selectedPostIndex, setSelectedPostIndex] = useState(0);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div className='lg:flex lg:h-[1000px]'>
            {posts.length > 0 && (
                <div className='w-full'>
                    <div className='w-[100%] lg:h-[50%] xl:h-[60%] object-cover overflow-hidden'>
                        <img className='h-auto w-[100%]' src={`http://localhost:8000/${posts[selectedPostIndex].image}`} alt='Blog Cover' />
                    </div>
                    <div className='w-full flex flex-col-reverse lg:flex-row'>
                        <div id='choose' className='md:w-1/2 flex justify-center gap-2 lg:flex-col items-end lg:justify-end p-5'>
                            {posts.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedPostIndex(index)}
                                    className={`w-fit my-2 text-2xl ${selectedPostIndex === index ? 'underline decoration-[#81B29A]' : ''}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className='lg:w-1/2 bg-[#e5e5e5] p-10 flex flex-col gap-4 text-black' onClick={() => handlePostClick(posts[selectedPostIndex]._id)}>
                            <span>{posts[selectedPostIndex].dateCreated.substring(0, 10)}</span>
                            <h1 className='font-bold'>{posts[selectedPostIndex].title}</h1>
                            <p>{posts[selectedPostIndex].introduction.substring(0, 90)}...</p>
                            <hr className=' border-[#15151567]' />
                            <br />
                            <div className='flex items-center justify-between w-full'>
                                <span>By: {posts[selectedPostIndex].author.firstName} {posts[selectedPostIndex].author.lastName}</span>
                            </div>
                        </div>

                    </div>
                </div >
            )}
        </div >
    );
}

export default LandingPage;
