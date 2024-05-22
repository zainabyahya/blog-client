import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { IoPencil, IoTrash, IoBookmark, IoBookmarkOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { deletePost } from '../actions/postActions';
import { handleBookrmark, fetchBookmarks } from "../actions/bookmarkActions";
import { handleLike, fetchLikes } from "../actions/likeActions.js";

const PostDetails = ({ post }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const [saved, setSaved] = useState(false);
    const [liked, setLiked] = useState(false);

    let bookmarks = useSelector((state) => state.bookmark.allBookmarks);
    const likes = useSelector((state) => state.like.allLikes);
    const likedPost = useSelector((state) => state.like.postById);
    const currentUser = useSelector(state => state.auth.user)

    const handleEdit = () => {
        navigate(`/edit/${post._id}`);
    };
    const handleDelete = () => {
        dispatch(deletePost(postId));
        navigate("/");
    };
    const handleBookmarkBtn = () => {
        const newBookmark = {
            postId: postId
        }
        dispatch(handleBookrmark(newBookmark));
        setSaved(!saved);
    }

    const handleLikeBtn = () => {
        const newLike = {
            userId: currentUser.userId,
            postId: postId
        };
        dispatch(handleLike(newLike));

        setLiked(!liked);
    };

    useEffect(() => {
        dispatch(fetchBookmarks());
        dispatch(fetchLikes());

    }, [dispatch]);

    useEffect(() => {
        const bookmark = bookmarks.some(bookmark => bookmark.user === currentUser.userId &&
            bookmark.posts.some(post => post._id === postId)
        );
        setSaved(bookmark);

        const like = likes.some(like =>
            (like.post === postId && like.user === currentUser.userId));
        setLiked(like);
    }, [likes, bookmarks]);



    let isAuthor = false;
    if (currentUser) {
        isAuthor = currentUser.userId && post.author._id === currentUser.userId;
    }
    return (
        <div>
            {post &&
                <div className='flex flex-col items-start justify-center gap-4'>
                    <span>{post.dateCreated.substring(0, 10)}</span>
                    <h1 className='font-bold'>{post.title}</h1>
                    <p>{post.introduction}</p>
                    <hr />
                    <div className='flex items-center justify-between w-full'>
                        <span>{post.author.firstName} {post.author.lastName}</span>
                        <div className='flex gap-2'>
                            {currentUser &&
                                <button onClick={handleBookmarkBtn} className='text-[#212529]  dark:text-white'>
                                    {saved ? <IoBookmark />
                                        : <IoBookmarkOutline />
                                    }
                                </button>
                            }
                            {isAuthor && (
                                <div className='flex gap-2'>
                                    <button onClick={handleEdit} className='text-[#212529]  dark:text-white'>
                                        <IoPencil />
                                    </button>
                                    <button onClick={handleDelete} className='text-[#212529] dark:text-white'>
                                        <IoTrash />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <img className='w-full rounded-md' src={`http://localhost:8000/${post.image}`} alt='Blog Cover' />
                    <div>
                        {post.content}
                    </div>
                    <hr />
                    <div className='w-full flex justify-between items-center'>
                        <span className='flex gap-2'>
                            {
                                post.tags.map((tag) => {
                                    return <span key={tag._id} className='py-1 px-2 rounded-md bg-gray-100 dark:bg-[#49515a] dark:text-[#212529]'>{tag.name}</span>
                                })
                            }
                        </span>
                        <div className='flex gap-3'>
                            {currentUser &&
                                <button onClick={handleLikeBtn} className='text-[#212529] hover:text-[#020303] dark:text-white dark:hover:text-gray-100'>

                                    {liked ? <IoHeart />
                                        : <IoHeartOutline />
                                    }
                                </button>
                            }
                            <span>
                                {likedPost ? likedPost.likeCount : post.likeCount} Likes
                            </span>

                        </div>
                    </div>
                    <hr />
                </div>
            }
        </div>
    )
}

export default PostDetails;