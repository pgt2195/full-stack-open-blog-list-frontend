import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../services/utils';

//// SLICE ////
const notificationSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    setNotification: (state, action) => {
      state.push(action.payload)
    },
    clearNotification: (state, action) => {
      return state.filter(n => n.id !== action.payload)
    }
  }
});

//// ACTIONS EXPORT ////
export const { setNotification, clearNotification } = notificationSlice.actions;


//// THUNKS ////

/**
 * Gère toute la logique pour afficher une notification
 * @param {*} message : le message de la notification
 * @param {*} type : le type de la notification (success, error, etc.)
 * @param {*} time : la durée d'affichage de la notification (en secondes)
 * @returns {function} Une fonction qui prend en paramètre le dispatch de Redux
 */
export const showNotification = (message, type, time = 5) => {
  // Check if message and type are provided
  if (!message || !type) {
    console.error('invalid notification data')
    return
  }
  // Create a new notification object
  const newNotification = {
    id: generateId(),
    message,
    type
  }
  // Return a function that dispatches the notification
  // and clears it after the specified time
  return dispatch => {
    dispatch(setNotification(newNotification))
    setTimeout (() => {
      dispatch(clearNotification(newNotification.id))
    }, time*1000)
  }
}


//// REDUCER EXPORT ////
export default notificationSlice.reducer;