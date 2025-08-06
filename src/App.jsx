import { useState, useEffect, useRef } from "react";
import { fetchBlogs } from "./reducers/blogReducer";
import { useDispatch } from "react-redux";

import blogService from "./services/blogs";
import LoginLogout from "./components/LoginLogout";
import AddBlog from "./components/AddBlog";
import DisplayBlogs from "./components/DisplayBlogs";
import Notification from "./components/Notification";
import Togglable from "./components/Toggable";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  // Récupération des blogs au chargement de l'application
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  // Vérifie dans le localStorage si un utilisateur est déjà connecté ou pas
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Notification />

      <h2>blogs</h2>

      <LoginLogout
        user={user}
        setUser={setUser}
      />

      {user !== null && (
        <Togglable
          buttonLabel="add new blog"
          ref={blogFormRef}
          style={{ marginTop: 4 }}
        >
          <AddBlog
            user={user}
            blogFormRef={blogFormRef}
          />
        </Togglable>
      )}

      <DisplayBlogs
        user={user}
      />
    </div>
  );
};

export default App;
