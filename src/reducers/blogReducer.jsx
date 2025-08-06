import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { showNotification } from './notificationReducer';

//// SLICE ////
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (_state, action) => {
      console.log('blogs set in state', action.payload);
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
    console.log('blogs fetched', blogs);
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
      const response = await blogService.create(newBlog);
      // Ajouter les informations de l'utilisateur au blog retourné
      const returnedBlog = {
            ...response,
            user: {
              id: response.user,
              username: user.username,
              name: user.name,
            },
      }
      dispatch(addBlog(response))
      const message = `Your blog has been added successfully: ${response.title}`
      showNotification(message, 'success', 5)
    } catch (exception) {
      const message = `Error, something happened: ${exception}`
      showNotification(message, 'error', 10)
    }
  }
}

//// REDUCER EXPORT ////  

export default blogSlice.reducer;