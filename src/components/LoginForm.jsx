const LoginForm = ({ user, formData, handleLogin, onChange, setUser }) => {

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  };

  return (
    <>
      {user === null 
      ? <>
          <p><b>log in to application</b></p>
          <form onSubmit={handleLogin}>
            <div>
              username{" "}
              <input
                type="text"
                value={formData.username}
                name="Username"
                onChange={({ target }) => onChange.setUsername(target.value)}
              />
            </div>
            <div>
              password{" "}
              <input
                type="password"
                value={formData.password}
                name="Password"
                onChange={({ target }) => onChange.setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </> 
      : <div style={{ margin: "10px auto" }}>
          <span>{user.name} is logged in —</span>
          <button style={{ marginLeft: 4 }} onClick={logout}>
            logout
          </button>
        </div>
      }
    </>
  );
};

export default LoginForm;
