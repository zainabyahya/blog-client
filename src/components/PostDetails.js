import React, { } from 'react'
import CommentList from './CommentList';
import { IoPencil, IoTrash } from "react-icons/io5";


const PostDetails = ({ post, currentUser, onEdit, onDelete }) => {
    const isAuthor = currentUser.userId && post.author._id === currentUser.userId;

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
                        {isAuthor && (
                            <div className='flex gap-2'>
                                <button onClick={onEdit} className='text-[#212529] hover:text-[#020303]'>
                                    <IoPencil />
                                </button>
                                <button onClick={onDelete} className='text-[#212529]hover:text-[#020303]'>
                                    <IoTrash />
                                </button>
                            </div>
                        )}
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
                                    return <span key={tag._id} className='py-1 px-2 rounded-md bg-gray-100'>{tag.name}</span>
                                })
                            }
                        </span>
                        <div className='flex gap-3'>
                            <span>
                                {post.likes} Likes
                            </span>
                            <span>
                                {post.comments.length} Comments
                            </span>
                            {/* <span>
                                {post.bookmark} Bookmarks
                            </span> */}
                        </div>
                    </div>
                    <hr />
                </div>
            }
        </div>
    )
}

export default PostDetails;