import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../actions/categoryActions';
import { fetchPosts, getPostByCategory } from '../actions/postActions';
import PostCard from '../components/PostCard';


const HomePage = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState({ "name": "all" });
    const allCategories = useSelector((state) => state.category.allCategories);
    const posts = useSelector((state) => state.post.allPosts);
    console.log("🚀 ~ HomePage ~ posts:", posts)

    console.log("🚀 ~ HomePage ~ allCategories:", allCategories)

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleAllPosts = () => {
        setSelectedCategory(null);
        dispatch(fetchPosts());
    }

    const handlePostsByCategory = (category) => {
        setSelectedCategory(category);
        dispatch(getPostByCategory(category._id))
    }

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch, selectedCategory]);

    return (
        <div className="container">
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
                        <div className="cursor-pointer mb-2 hover:bg-gray-300 rounded p-2">
                            More <span className="text-xs">&#9660;</span>
                        </div>
                        <div className="absolute right-0 w-48 bg-white rounded shadow-md hidden">
                            {allCategories.slice(3).map(category => (
                                <div key={category._id} className="cursor-pointer px-4 py-2 hover:bg-gray-300" onClick={() => handleCategorySelect(category)}>
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className='flex flex-wrap gap-5'>
                    {posts.map((post) => (
                        <PostCard key={post._id} Post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
