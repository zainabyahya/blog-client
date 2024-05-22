import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCard from './PostCard';
import { getUserById } from '../actions/userActions';
import { getPostByAuthor } from '../actions/postActions';

const Profile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector(state => state.auth.user);
    const userId = currentUser.userId;
    const userProfile = useSelector(state => state.user.singleUser);
    const userPosts = useSelector(state => state.post.allPosts);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getUserById(userId));
            await dispatch(getPostByAuthor(userId))
            setLoading(false);
        };

        fetchData();
    }, [dispatch, userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 dark:bg-[#212529] dark:text-white">
            <div className="flex flex-col items-center">
                <img
                    src={`http://localhost:8000/${userProfile.image}`}
                    alt="Profile"
                    className="w-32 h-32 rounded-full"
                />
                <h1 className="text-2xl font-bold mt-4">{userProfile.firstName} {userProfile.lastName}</h1>
                <p className="text-gray-600">{userProfile.email}</p>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userPosts.map(post => (
                        <PostCard key={post._id} Post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
