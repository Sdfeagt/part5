import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'
import AddBlogForm from './components/AddBlogForm'

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

  const blogFormRef = useRef()



  useEffect(() => {
    const time = setTimeout(() => {
      setMessage(null)
      setErrorMessage(null)
    }, 5000);
    return () => {
      clearTimeout(time)
    };
  })

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
    blogFormRef.current.toggleVisibility()
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


  const logout = () =>{
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false);
  }



  return (
    <div>
      <Notification message={Message} />
      <Error message={errorMessage}/>
      <h1>Blogs</h1>

      {user === null ?
        <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>Logout</button>
          {blogs.map(blog =>
          <Blog key={blog.id}
          title={blog.title}
          author={blog.author}
          url={blog.url}
          likes={blog.likes}
            />
                    )}
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <AddBlogForm 
           addBlog = {addBlog}
           title = {title}
           handleTitleChange = {handleTitleChange}
           author = {author}
           handleAuthorChange = {handleAuthorChange} 
           url = {url} 
           handleUrlChange = {handleUrlChange} 
           likes= {likes} 
           handleLikesChange = {handleLikesChange}
            />
           </Togglable>

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