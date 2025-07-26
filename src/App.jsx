import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginLogout from './components/LoginLogout'
import AddBlog from './components/AddBlog'
import DisplayBlogs from './components/DisplayBlogs'
import Notification from './components/Notification'
import Togglable from './components/Toggable'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  /** 
   * Choppe les blogs qui sont dans la BDD
  */
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  /** 
   * Vérifie dans le localStorage si un utilisateur est déjà connecté ou pas 
  */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={errorMessage} type='bad' />
      <Notification message={message} />

      <h2>blogs</h2>

      <LoginLogout 
        user={user}
        setUser={setUser}
        setErrorMessage={setErrorMessage}
      />

      {user !== null && <AddBlog 
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
        blogs={blogs}
        setBlogs={setBlogs}
      />}

      <DisplayBlogs
        blogs={blogs}
      />
    </div>
  )
}

export default App