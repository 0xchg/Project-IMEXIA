import Post from "./components/Post"
import { useState } from "react"

import './App.css'

function App() {

  const [posts, setPosts] = useState<string[]>([
    'Post 1',
    'Post 2',
    'Post 3'
  ])

  function createPost() {
    setPosts([...posts, 'Post 4'])
  }

  return (
    <div>
      {posts.map(post => {
        return <Post text={post}/>
      })}

      <button 
        onClick={createPost}
        style={{
          backgroundColor: 'azure',
          border: 0,
          padding: '12px 24px',
          fontSize: '16px',
        }}
      >
        New Post</button>
    </div>
  )
}

export default App
