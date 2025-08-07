import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userLogReducer from "./reducers/userLogReducer";
import userReducer from "./reducers/userReducer";

// Configuration du store Redux
// Le store est la source unique de vérité pour l'état de l'application
// Il contient les reducers qui gèrent l'état des notifications et des blogs

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    user: userLogReducer,
    users: userReducer,
  },
});

export default store;