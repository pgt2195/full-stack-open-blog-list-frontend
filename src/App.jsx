import { useState, useEffect, useRef } from "react";

import blogService from "./services/blogs";
import LoginLogout from "./components/LoginLogout";
import AddBlog from "./components/AddBlog";
import DisplayBlogs from "./components/DisplayBlogs";
import Notification from "./components/Notification";
import Togglable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  /**
   * Choppe les blogs qui sont dans la BDD
   */
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  /**
   * Vérifie dans le localStorage si un utilisateur est déjà connecté ou pas
   */
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
            blogs={blogs}
            setBlogs={setBlogs}
            blogFormRef={blogFormRef}
          />
        </Togglable>
      )}

      <DisplayBlogs
        user={user}
        blogs={blogs}
        setBlogs={setBlogs}
      />
    </div>
  );
};

export default App;
