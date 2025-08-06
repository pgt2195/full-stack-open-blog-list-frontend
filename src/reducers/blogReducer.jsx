import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { showNotification } from './notificationReducer';
import { formatToken } from '../services/utils';

//// SLICE ////
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (_state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload;
      return state.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    removeBlog: (state, action) => {
      const id = action.payload;
      return state.filter(blog => blog.id !== id);
    }
  }
});

//// ACTIONS EXPORT ////
export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

//// THUNKS ////

/**
 * Gestion de la récupération des blogs depuis le serveur.
 * @returns {function} Une fonction qui fetch et envoie les blogs au store.
 */
export const fetchBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};


/**
 * Ajoute un nouveau blog au serveur et le dispatch dans le store.
 * @param {Object} newBlog - Le nouveau blog à créer.
 * @param {Object} user - L'utilisateur qui crée le blog.
 * @returns {function} Une fonction qui ajoute le nouveau blog et dispatch l'action addBlog
 */
export const addNewBlog = (newBlog, user) => {
  return async dispatch => {
    try {
      // Vérifie si l'utilisateur est connecté
      const response = await blogService.create(newBlog, formatToken(user.token));
      // Ajouter les informations de l'utilisateur au blog retourné
      const returnedBlog = {
            ...response,
            user: {
              id: response.user,
              username: user.username,
              name: user.name,
            },
      }
      dispatch(addBlog(returnedBlog))
      const message = `Your blog has been added successfully: ${returnedBlog.title}`
      dispatch(showNotification(message, 'success', 5))
    } catch (exception) {
      const message = `Error, something happened: ${exception}`
      dispatch(showNotification(message, 'error', 10))
    }
  }
}


/**
 * Gère l'ajout d'un like à un blog
 * @param {object} blog - Le blog à liker
 * @returns {function} Une fonction qui gère le like du blog
 */
export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = { ...blog, likes: blog.likes + 1 };
      const response = await blogService.update(blog.id, likedBlog);
      const formatedBlog = { ...response, user: blog.user }; // pour gérer l'affichage de l'utilisateur sans avoir à recharger la page après l'ajout
      dispatch(updateBlog(formatedBlog));
      const message = `Blog liked successfully: ${formatedBlog.title}`;
      // dispatch(showNotification(message, 'success', 5));
    } catch (exception) {
      const message = `Error, something happened: ${exception}`;
      dispatch(showNotification(message, 'error', 10));
    }
  };
};


/**
 * Supprime un blog
 * @param {*} blog - Le blog à supprimer
 * @returns {function} Une fonction qui supprime le blog et dispatch l'action removeBlog
 */
export const deleteBlog = (blog, user) => {
  return async (dispatch) => {
    try {
      const answer = window.confirm(`Are you sure you want to delete the blog: ${blog.title}?`);
      if (!answer) return;
      await blogService.remove(blog.id, formatToken(user.token));
      dispatch(removeBlog(blog.id));
      const message = 'Blog deleted successfully !';
      dispatch(showNotification(message, 'success', 5));
    } catch (exception) {
      const message = `Error, something happened: ${exception}`;
      dispatch(showNotification(message, 'error', 10));
    }
  };
};


//// REDUCER EXPORT ////
export default blogSlice.reducer;