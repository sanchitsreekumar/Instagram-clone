import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline'

import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Moment from 'react-moment'
import { async } from '@firebase/util'


function Post({key, id, username, userImg, img, caption}) {

    const {data: session} = useSession()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)

    useEffect(()=>{
        const unsubscribe = onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), snapshot =>{
            setComments(snapshot.docs)
        })
        return ()=>{
            unsubscribe()
        }
    },[db]) 


    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, 'posts', id, 'likes'), snapshot=>{
            setLikes(snapshot.docs)
        })
        return ()=>{
            unsubscribe()
        }
    },[db, id])

    useEffect(()=>{
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid)  !== -1)
    },[likes])

    const likePost = async ()=>{
        if(hasLiked){
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        }else{
            
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username,
            })
        }
    }

    const sendComment = async (e)=>{
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'),{
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });
    }

    return (
        <div className='bg-white my-7 border rounded-sm'>
            {/* Header */}
            <div className='flex items-center p-5'>
                <img 
                className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
                src={userImg} alt="userimg" />
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className="h-5"/>
            </div>

            {/* Image */}
            <img 
            className='object-cover w-full'
            src={img} alt="" />

            {/* Buttons */} 
            {session && (
            <div className='flex justify-between px-4 pt-4'>
                <div className='flex space-x-4'>
                    {hasLiked ? (
                        <HeartIconFilled className="btn text-red-500" onClick={likePost}/>
                    ):(
                    <HeartIcon className="btn" onClick={likePost}/>
                    )}
                <ChatIcon className="btn"/>
                <PaperAirplaneIcon  className="btn"/>
                </div>
                <BookmarkIcon className="btn" />
            </div>
            )}


            {/* Caption */}
            <p className='p-5 truncate'>
                        {likes.length > 0 && (
                            <p className='font-bold mb-1'>{likes.length} likes</p>
                        )}

                <span className='font-bold mr-1'>{username}</span>
                {caption}
            </p>

            {/* Comments */}

                {comments.length > 0 && (
                    <div
                    className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'
                    >
                        {comments.map((comment)=>(
                            <div 
                            className='flex items-center space-x-2 mb-3'
                            key={comment.id}>
                                <img 
                                className='h-7 rounded-full'
                                src={comment.data().userImage} alt="" />
                                <p className='text-sm flex-1'>
                                    <span
                                    className='font-bold mr-2'
                                    >{comment.data().username}</span>
                                     {comment.data().comment}
                                </p>
                                <Moment fromNow
                                className='pr-5 text-xs'>
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                            </div>
                        ))}
                    </div>
                )}



            {/* Input box */}
            {session && (
            <form className='flex items-center p-4'>
                <EmojiHappyIcon className="h-7"/>
                <input 
                placeholder='Add a comment...'
                value={comment}
                onChange={(e)=> setComment(e.target.value)}
                className='border-none flex-1 focus:ring-0 outline-none'
                type="text" />
                <button 
                type="submit" 
                onClick={sendComment}
                disbaled={!comment.trim()} 
                className='font-semibold text-blue-400'>Post</button>
            </form>
            )}



        </div>
    )
}

export default Post
