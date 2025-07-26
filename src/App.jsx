import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginLogout from './components/LoginLogout'
import AddBlog from './components/AddBlog'
import DisplayBlogs from './components/DisplayBlogs'
import Notification from './components/Notification'
import { emptyBlog, displayMessage } from './services/utils'
import Togglable from './components/Toggable'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(emptyBlog)
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

  /**
   * Gère l'ajout d'un nouveau blog depuis le formulaire d'ajout
   * du composant DisplayBlogs
   */
  const addBlog = (event) => {
    event.preventDefault()

    try {
      blogService
        .create(newBlog)
          .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog(emptyBlog)
          displayMessage(`New blog "${newBlog.title}" by <i>${newBlog.author}</i> has been added`, setMessage)
        })
    } catch (exception) {
      displayMessage('Oops, something wrong happened', setErrorMessage)
    }
  }

  /**
   * Gère la mise à jour de l'état d'un nouveau blog lorsqu'il 
   * est en train d'être ajouté
   */
  const handleNewBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    });
  }

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
        addBlog={addBlog}
        newBlog={newBlog}
        handleNewBlogChange={handleNewBlogChange}
      />}

      <DisplayBlogs
        blogs={blogs}
      />
    </div>
  )
}

export default App