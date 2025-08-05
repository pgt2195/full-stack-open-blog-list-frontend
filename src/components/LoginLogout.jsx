import { useState } from "react";
import { displayMessage } from "../services/utils";
import blogService from "../services/blogs";
import loginService from "../services/login";
import Togglable from "./Toggable";

const LoginLogout = ({ user, setUser, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Gère la connection de l'utilisateur, donne un message d'erreur si les identifiants
   * et mots de passes sont mauvais, stock les données de login dans le localStorage
   */
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      displayMessage("Wrong credentials", setErrorMessage);
    }
  };

  /**
   * Gère la déconnection de l'utilisateur
   */
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return (
    <>
      {user === null ? (
        <Togglable buttonLabel="login">
          <p>
            <b>log in to application</b>
          </p>
          <form onSubmit={handleLogin}>
            <div>
              username{" "}
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password{" "}
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </Togglable>
      ) : (
        <div style={{ margin: "10px auto" }}>
          <span>{user.name} is logged in —</span>
          <button style={{ marginLeft: 4 }} onClick={logout}>
            logout
          </button>
        </div>
      )}
    </>
  );
};

export default LoginLogout;
