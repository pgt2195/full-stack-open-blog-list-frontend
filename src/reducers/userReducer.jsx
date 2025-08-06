import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "./notificationReducer";
import loginService from "../services/login";

//// SLICE ////
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
    clearUser: () => {
      return null;
    }
  }
});

//// ACTIONS EXPORT ////
export const { setUser, clearUser } = userSlice.actions;


//// THUNKS ////

/**
 * Initialise l'utilisateur à partir du localStorage
 * Vérifie si un utilisateur est déjà connecté et le charge dans le store.
 * Si l'utilisateur n'est pas connecté, l'état reste null.
 * @returns {function} Une fonction qui initialise l'utilisateur à partir du localStorage
 */
export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  };
};


/**
 * Gère la connexion de l'utilisateur et stocke les données dans le localStorage
 * @param {Object} user - Les données de l'utilisateur
 * @returns {function} Une fonction qui dispatch l'action setUser
 */
export const loginUser = (username, password) => {
  const connectingUser = {
    username,
    password,
  };
  // console.log("Connecting user:", connectingUser);
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(connectingUser);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(loggedUser));
      dispatch(setUser(loggedUser));
    } catch (exception) {
      dispatch(showNotification("Wrong credentials", "error", 5));
    }
  };
};


/**
 * Gère la déconnexion de l'utilisateur, supprime les données du localStorage
 * et dispatch l'action clearUser.
 * Affiche une notification de succès après la déconnexion.
 * @returns {function} Une fonction qui gère la déconnexion de l'utilisateur
 */
export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(clearUser());
    dispatch(showNotification("Logged out successfully", "success", 5));
  };
};


//// REDUCER EXPORT ////
export default userSlice.reducer;