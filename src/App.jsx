import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
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
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
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
   * Gère la connection de l'utilisateur, donne un message d'erreur si les identifiants
   * et mots de passes sont mauvais 
  */
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      displayMessage('Wrong credentials', setErrorMessage)
    }
  }

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

      <LoginForm 
        user={user}
        formData={{username, password}} 
        handleLogin={handleLogin}
        onChange={{setUsername, setPassword}}
        setUser={setUser}
      />

      {user !== null && <AddBlog 
        setUser={setUser} 
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