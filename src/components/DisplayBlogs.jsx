import Blog from "./Blog";

const DisplayBlogs = ({ blogs }) => {

  return (
    <div>
      <div style={{marginBottom: 8, marginTop: 20}}><b>Blogs:</b></div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default DisplayBlogs;
