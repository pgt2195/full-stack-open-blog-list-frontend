// imports
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
// components
import Navigation from "./components/Navigation";
import Notification from "./components/Notification";
import LoginLogout from "./components/LoginLogout";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import BlogView from "./components/BlogView";
// reducers
import { fetchBlogs } from "./reducers/blogReducer";
import { fetchUsers } from "./reducers/userReducer";
import { initializeUser } from "./reducers/userLogReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs()); // Récupération des blogs au chargement de l'application
    dispatch(fetchUsers()); // Récupération des utilisateurs au chargement de l'application
    dispatch(initializeUser()); // Vérifie dans le localStorage si un utilisateur est déjà connecté ou pas
  }, []);

  return (
    <div>
      <Navigation />
      <Notification />

      <h2>blogs</h2>

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>

    </div>
  );
};

export default App;
