import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [Message, setMessage] = useState(null)

  

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    blogService
      .create(blogObject)
      .then(returnedblog => {
        setBlogs(blogs.concat(returnedblog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes(0)
      })

      setMessage(`${blogObject.title} added to the db!`)
  }

  const handleTitleChange = (event) =>{
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) =>{

    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) =>{

    setUrl(event.target.value)
  }

  const handleLikesChange = (event) =>{
    setLikes(event.target.value)
  }

  const AddBlogForm = () =>(
    <form onSubmit={addBlog}>
      <p>Add a blog</p>
      <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
      </div>
      <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
      </div>
      <div>
          Url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
      </div>
      <div>
          Likes
          <input
            type="number"
            value={likes}
            name="Title"
            onChange={handleLikesChange}
          />
      </div>
      <button type="submit">Add Blog</button>

    </form>
  )

  const logout = () =>{
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false);

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  return (
    <div>
      <Notification message={Message} />
      <h1>Blogs</h1>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>Logout</button>
          {blogs.map(blog =>
          <Blog key={blog.id}
          title={blog.title}
          author={blog.author}
                    />
                    )}
          {AddBlogForm()}
        </div>
      }

      <div>
      </div>   
      <ul>
      </ul>

      <Footer />
    </div>
  )
}

export default App