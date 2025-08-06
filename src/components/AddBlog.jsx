import { useState } from "react";
import { emptyBlog } from "../services/utils";
import { useDispatch, useSelector } from "react-redux";
import { addNewBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const AddBlog = ({ blogFormRef }) => {
  const [newBlog, setNewBlog] = useState(emptyBlog);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  /**
   * Gère l'ajout d'un nouveau blog
   * @param {object} event - L'événement de soumission du formulaire
   */
  const addBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility(); // Ferme le formulaire d'ajout de blog après soumission

    // Ne pas ajouter le blog si les champs requis sont vides
    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      dispatch(showNotification('Please fill in all fields', 'error', 5));
      return;
    }

    dispatch(addNewBlog(newBlog, user)); // Ajoute le nouveau blog via le thunk addNewBlog
    setNewBlog(emptyBlog); // Réinitialise le formulaire d'ajout de blog
  };

  /**
   * Gère la mise à jour de l'état d'un nouveau blog lorsqu'il
   * est en train d'être écrit dans le formulaire
   * @param {object} event - L'événement de changement du formulaire
   */
  const handleNewBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <b>Add a new blog:</b>
      </div>
      <form onSubmit={addBlog}>
        title:{" "}
        <input
          name="title"
          data-testid="title"
          value={newBlog.title}
          onChange={handleNewBlogChange}
        />
        <br />
        author:{" "}
        <input
          name="author"
          data-testid="author"
          value={newBlog.author}
          onChange={handleNewBlogChange}
        />
        <br />
        url:{" "}
        <input
          name="url"
          data-testid="url"
          value={newBlog.url}
          onChange={handleNewBlogChange}
        />
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default AddBlog;
