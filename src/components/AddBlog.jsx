import { useState } from 'react';
import blogService from '../services/blogs'
import { emptyBlog, displayMessage } from '../services/utils'

const AddBlog = ({ user, blogs, setBlogs, setMessage, setErrorMessage, blogFormRef }) => {
  const [newBlog, setNewBlog] = useState(emptyBlog)

  /**
   * Gère l'ajout d'un nouveau blog depuis le formulaire d'ajout
   * du composant DisplayBlogs
   */
  const addBlog = (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    try {
      blogService
        .create(newBlog)
          .then(returnedBlog => {
            returnedBlog = {...returnedBlog, user: {id: returnedBlog.user, username: user.username, name: user.name}} // pour gérer l'affichage de l'utilsateur sans avoir à recharger la page après l'ajout
            setBlogs(blogs.concat(returnedBlog))
            console.log(returnedBlog)
            setNewBlog(emptyBlog)
            displayMessage(`New blog "${newBlog.title}" by <i>${newBlog.author}</i> has been added`, setMessage)
        })
    } catch (exception) {
      displayMessage(`Oops, something wrong happened! Error: ${exception}`, setErrorMessage)
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
      <div style={{marginBottom: 8}}><b>Add a new blog:</b></div>
      <form onSubmit={addBlog}>
            title: <input name="title" aria-label="title" value={newBlog.title} onChange={handleNewBlogChange} /><br/>
            author: <input name="author" aria-label="author" value={newBlog.author} onChange={handleNewBlogChange} /><br/>
            url: <input name="url" aria-label="url" value={newBlog.url} onChange={handleNewBlogChange} /><br/>
            <button type="submit">save</button>
      </form>
    </div>
  );
};

export default AddBlog;
