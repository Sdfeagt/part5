import { useState} from 'react'


const Blog = ({...blog}) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  return (
  <div>
    <li className="blog">
      <div style={hideWhenVisible}>
      Title: "{blog.title}". Author: {blog.author}. <button onClick={() => setDetailsVisible(true)}>View details</button>
      </div>
      <div style={showWhenVisible}>
      Title: "{blog.title}". Author: {blog.author} Url: {blog.url} Likes: {blog.likes} <button onClick={() => setDetailsVisible(false)}>Close</button>
        </div>
      </li>
  </div>  
  )
}

export default Blog