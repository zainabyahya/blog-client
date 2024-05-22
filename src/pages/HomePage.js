import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../actions/categoryActions';
import { fetchPosts, getPostByCategory } from '../actions/postActions';
import PostCard from '../components/PostCard';
import LandingPage from '../components/LandingPage';


const HomePage = () => {
    const dispatch = useDispatch();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const allCategories = useSelector((state) => state.category.allCategories);
    const posts = useSelector((state) => state.post.allPosts);

    const handleAllPosts = () => {
        dispatch(fetchPosts());
    }
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handlePostsByCategory = (category) => {
        setDropdownVisible(false);
        dispatch(getPostByCategory(category._id))
    }

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchPosts());
    }, []);

    return (
        <div className="py-5">
            <LandingPage />
            <div className="flex md:flex-row gap-4">
                <div className="flex rounded">
                    <div key={0} className="cursor-pointer mb-2 hover:bg-gray-300 rounded p-2" onClick={() => handleAllPosts()}>
                        All Posts
                    </div>
                    {allCategories.slice(0, 3).map(category => (
                        <div key={category._id} className="cursor-pointer mb-2 hover:bg-gray-300 rounded p-2" onClick={() => handlePostsByCategory(category)}>
                            {category.name}
                        </div>
                    ))}
                    <div className="relative">
                        <div className="cursor-pointer mb-2 hover:bg-gray-300 rounded p-2" onClick={toggleDropdown}>
                            More <span className="text-xs">&#9660;</span>
                        </div>
                        {dropdownVisible && (<div className="absolute right-0 w-48 bg-white rounded shadow-md">
                            {allCategories.slice(3).map(category => (
                                <div key={category._id} className="cursor-pointer px-4 py-2 hover:bg-gray-300" onClick={() => handlePostsByCategory(category)}>
                                    {category.name}
                                </div>
                            ))}
                        </div>)
                        }
                    </div>
                </div>
            </div>
            <div className="w-full m-auto">
                <div className='flex flex-wrap justify-center md:justify-start gap-5 m-auto'>
                    {posts ? posts.map((post) => (
                        <PostCard key={post._id} Post={post} />
                    )) :
                        <div></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default HomePage;
