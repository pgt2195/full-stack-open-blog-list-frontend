import Blog from "./Blog";

const DisplayBlogs = ({ blogs, user, setUser, addBlog, newBlog, handleBlogChange }) => {

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

      <div style={{marginBottom: 8}}><b>Add a new blog:</b></div>
      <form onSubmit={addBlog} style={{marginBottom: 20}}>
            title: <input name="title" value={newBlog.title} onChange={handleBlogChange} /><br/>
            author: <input name="author" value={newBlog.author} onChange={handleBlogChange} /><br/>
            url: <input name="url" value={newBlog.url} onChange={handleBlogChange} /><br/>
            <button type="submit">save</button>
      </form>

      <div style={{marginBottom: 8}}><b>Blogs:</b></div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default DisplayBlogs;
