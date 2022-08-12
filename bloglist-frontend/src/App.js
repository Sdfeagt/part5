import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      content: newBlog,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: blogs.length + 1,
    }

    blogService
      .create(blogObject)
      .then(returnedblog => {
        setBlogs(blogs.concat(returnedblog))
        setNewBlog('')
      })
  }

  const handleBlogchange = (event) => {
    setNewBlog(event.target.value)
  }

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
  
 /* const blogForm = () => (
    <form onSubmit={addBlog
}>
      <input
        value={newBlog}
        onChange={handleBlogchange}
      />
      <button type="submit">save</button>
    </form>  
)*/

const UserBlogs = () => {
  const loggedin = window.localStorage.getItem('loggedBlogappUser')
  console.log(blogs.map(blog => blog.user.username));
  const tocheck = JSON.parse(loggedin)
  console.log(tocheck.username);
  const goodid = blogs.filter(blog => blog.user.username === tocheck.username)
  console.log(goodid);
  return goodid
}

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>Logout</button>
          {UserBlogs().map(blog =>
          <Blog key={blog.id}
          title={blog.title}
          author={blog.author}
                    />
                    )}
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