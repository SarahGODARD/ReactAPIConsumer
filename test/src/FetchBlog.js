import React, {useState, useEffect} from 'react';
import './fetchblog.css'

const URI_POSTS = 'https://jsonplaceholder.typicode.com/posts'
const URI_COMMENTS = 'https://jsonplaceholder.typicode.com/comments'

const FetchBlog = () => {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [clicked, setClicked] = useState(null)
    const [comment, setComment] = useState(null)

    try {
        useEffect(() => {
            const fetchData = async () => {
                const posts = await fetch(URI_POSTS)
                if (!posts.ok) {
                    throw new Error('error')
                }
                const postsData = await posts.json()
                setPost(postsData)
                const response = await fetch(URI_COMMENTS)
                if (!response.ok) {
                    throw new Error('error')
                }
                const data = await response.json()
                setComments(data)
            }
        
            fetchData()
        }, [])
} catch (e) {
    console.log('error')
}

const handleClicked = (id) => {
    if (clicked === id) {
        setClicked(null)
    } else {
        setClicked(id)
    }
    const currentComment = comments.filter((e) => e.postId === id)
    setComment(currentComment)
}

return (<>
            {post && post.map(e => <li key={e.id}><div class="card">
                        <div class="card-body" onClick={()=> {handleClicked(e.id)}}>
                        <h5 class="card-title">{e.title}</h5>
                        <p class="card-text">{e.body}</p>
                        {clicked === e.id && <div class="card-subtitle mb-2 text-muted">{comment && comment.map(e => <span key={e.id}>{e.body}</span>)}</div>}
                        <h6 class="card-subtitle mb-2 text-muted">{e.userId}</h6>
                    </div>
                </div>
            </li>)}
        </>
)

}

export default FetchBlog