import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarksByUser } from '../actions/bookmarkActions';
import PostCard from './PostCard';

const Bookmarks = () => {
    const dispatch = useDispatch();
    const bookmark = useSelector((state) => state.bookmark.userBookmarks);
    const currentUser = useSelector((state) => state.auth.user);
    const userId = currentUser.userId;

    useEffect(() => {
        dispatch(fetchBookmarksByUser(userId));
    }, [dispatch, userId]);

    return (
        <div className="w-full m-auto">
            {bookmark && bookmark.posts && bookmark.posts.length > 0 ? (
                <div className="flex flex-wrap justify-center md:justify-start gap-5 m-auto">
                    {bookmark.posts.map((post) => (
                        <PostCard key={post._id} Post={post} />
                    ))}
                </div>
            ) : (
                <div className='flex justify-center items-center mt-10'>
                    <div>No bookmarked posts, browse the blog to discover your next favorite post!</div>
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
