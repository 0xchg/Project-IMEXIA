import Post from "./components/Post"
import { useState } from "react"

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

      <button onClick={createPost}>New Post</button>
    </div>
  )
}

export default App
