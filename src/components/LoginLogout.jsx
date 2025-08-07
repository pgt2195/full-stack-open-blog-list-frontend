import { useState } from "react";
import Togglable from "./Toggable";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../reducers/userLogReducer";

const LoginLogout = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  // Gère la connection de l'utilisateur
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <>
      {user === null ? (
        <Togglable buttonLabel="login">
          <div style={{marginBottom: 10}}><b>log in to application</b></div>
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
        <div>
          <span>{user.name} is logged in —</span>
          <button style={{ marginLeft: 4 }} onClick={() => dispatch(logoutUser())}>
            logout
          </button>
        </div>
      )}
    </>
  );
};

export default LoginLogout;
