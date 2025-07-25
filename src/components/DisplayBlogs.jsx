import Blog from "./Blog";

const DisplayBlogs = ({ blogs, user, setUser }) => {

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  };

  return (
    <div>
      <h2>blogs</h2>
      <div style={{ margin: "10px auto" }}>
        <span>{user.name} is logged in —</span>
        <button style={{ marginLeft: 4 }} onClick={logout}>
          logout
        </button>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default DisplayBlogs;
