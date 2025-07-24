const LoginForm = ({ formData, handleLogin, onChange }) => (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
      <div>
        username <input
        type="text"
        value={formData.username}
        name="Username"
        onChange={({ target }) => onChange.setUsername(target.value)}
        />
      </div>
      <div>
        password <input
        type="password"
        value={formData.password}
        name="Password"
        onChange={({ target }) => onChange.setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
      </form>   
    </>   
  )

export default LoginForm