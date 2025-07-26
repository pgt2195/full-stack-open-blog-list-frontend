import Blog from "./Blog";

const AddBlog = ({ setUser, addBlog, newBlog, handleNewBlogChange }) => {

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  };

  return (
    <div>
      <div style={{marginBottom: 8}}><b>Add a new blog:</b></div>
      <form onSubmit={addBlog} style={{marginBottom: 20}}>
            title: <input name="title" value={newBlog.title} onChange={handleNewBlogChange} /><br/>
            author: <input name="author" value={newBlog.author} onChange={handleNewBlogChange} /><br/>
            url: <input name="url" value={newBlog.url} onChange={handleNewBlogChange} /><br/>
            <button type="submit">save</button>
      </form>
    </div>
  );
};

export default AddBlog;
