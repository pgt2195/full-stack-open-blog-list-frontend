import Blog from "./Blog";

const DisplayBlogs = ({ blogs, setBlogs, setErrorMessage }) => {

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <div style={{marginBottom: 8, marginTop: 20}}><b>Blogs:</b></div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
      ))}
    </div>
  );
};

export default DisplayBlogs;
