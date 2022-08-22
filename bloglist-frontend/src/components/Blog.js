import { useState } from 'react'
import blogService from '../services/blogs'



const Blog = ({ ...blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }

  const updateBlog = async event => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    blogService
      .update(blog.id, blogObject)

    window.location.reload()
  }

  const deleteBlog = async event => {
    blogService
      .remove(blog.id)
    window.location.reload()

  }

  return (
    <div>
      <li className="blog">
        <div style={hideWhenVisible}>
      Title: {blog.title}. Author: {blog.author}.<button id='Details' onClick={() => setDetailsVisible(true)}>View details</button>
        </div>
        <div style={showWhenVisible}>
      Title: {blog.title}. Author: {blog.author} Url: {blog.url} Likes: {blog.likes} <button id = 'Like' onClick={updateBlog}>Like</button> <button id='delete' onClick={deleteBlog}>Delete</button> <button onClick={() => setDetailsVisible(false)}>Close</button>
        </div>
      </li>
    </div>
  )
}

export default Blog