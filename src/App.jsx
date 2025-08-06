// imports
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
// components
import Notification from "./components/Notification";
import LoginLogout from "./components/LoginLogout";
import Home from "./components/Home";
import Users from "./components/Users";
// reducers
import { fetchBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs()); // Récupération des blogs au chargement de l'application
    dispatch(initializeUser()); // Vérifie dans le localStorage si un utilisateur est déjà connecté ou pas
  }, []);

  return (
    <div>
      <Notification />

      <h2>blogs</h2>
      <LoginLogout />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>

    </div>
  );
};

export default App;
