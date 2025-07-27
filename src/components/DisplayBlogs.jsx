import Blog from "./Blog";

const DisplayBlogs = ({ blogs, setBlogs, setErrorMessage }) => {

  return (
    <div>
      <div style={{marginBottom: 8, marginTop: 20}}><b>Blogs:</b></div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
      ))}
    </div>
  );
};

export default DisplayBlogs;
