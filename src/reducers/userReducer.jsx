import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

//// SLICE ////
const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers: (_state, action) => {
      return action.payload;
    }
  }
});

//// ACTIONS EXPORT ////
export const { setUsers } = userSlice.actions;

//// THUNKS ////

/**
 * Gestion de la récupération des utilisateurs depuis le serveur.
 * @returns {function} Une fonction qui fetch et envoie les utilisateurs au store.
 */
export const fetchUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
    console.log("Fetched users:", users);
  }
};


//// REDUCER EXPORT ////
export default userSlice.reducer;