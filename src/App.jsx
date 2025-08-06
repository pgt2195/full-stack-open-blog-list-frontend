import { useState, useEffect, useRef } from "react";
import { fetchBlogs } from "./reducers/blogReducer";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";
import LoginLogout from "./components/LoginLogout";
import AddBlog from "./components/AddBlog";
import DisplayBlogs from "./components/DisplayBlogs";
import Notification from "./components/Notification";
import Togglable from "./components/Toggable";
import { initializeUser } from "./reducers/userReducer";
import { use } from "react";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBlogs()); // Récupération des blogs au chargement de l'application
    dispatch(initializeUser()); // Vérifie dans le localStorage si un utilisateur est déjà connecté ou pas
  }, []);

  return (
    <div>
      <Notification />

      <h2>blogs</h2>

      <LoginLogout />

      {user !== null && (
        <Togglable
          buttonLabel="add new blog"
          ref={blogFormRef}
          style={{ marginTop: 4 }}
        >
          <AddBlog blogFormRef={blogFormRef} />
        </Togglable>
      )}

      <DisplayBlogs />
    </div>
  );
};

export default App;
