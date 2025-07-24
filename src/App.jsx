import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import DisplayBlogs from './components/DisplayBlogs'
import Notification from './components/Notification'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return (
    <div>
      <Notification message={errorMessage} />

      {user === null 
        ? <LoginForm 
            formData={{username, password}} 
            handleLogin={handleLogin}
            onChange={{setUsername, setPassword}}
          />  
        : <DisplayBlogs
            blogs={blogs}
            user={user}
          />
      }
    </div>
  )
}

export default App