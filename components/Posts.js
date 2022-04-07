import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { db } from '../firebase';
import Post from './Post'

// const posts = [
//     {
//         id: "123",
//         username: "sssss",
//         userImg: "https://i.pravatar.cc/300?random=12",
//         img: "https://images.unsplash.com/photo-1642270927237-0d46b25fded1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
//         caption: "this is noice bruh"
//     },
//     {
//         id: "12",
//         username: "gmm",
//         userImg: "https://i.pravatar.cc/300?random=12",
//         img: "https://images.unsplash.com/photo-1642270927237-0d46b25fded1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
//         caption: "this is noice bruh"
//     }
// ]


function Posts() {
    //getting posts from firebase data storage
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot =>{
           //this is a real time listener
           setPosts(snapshot.docs);
       });

       return ()=>{
           unsubscribe();
       }
    }, [db])

    return (
        <div>
            {posts.map((post)=>(
                <Post 
                key={post.id} 
                id={post.id}
                username={post.data().username} 
                userImg={post.data().profileImg} 
                img={post.data().image} 
                caption={post.data().caption} />
            ))}

            
        </div>
    )
}

export default Posts
