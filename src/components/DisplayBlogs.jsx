import Blog from "./Blog";

const DisplayBlogs = ({ user, blogs, setBlogs, setErrorMessage, setMessage }) => {

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <div style={{marginBottom: 8, marginTop: 20}}><b>Blogs:</b></div>
      {sortedBlogs.map((blog) => (
        <Blog 
          key={blog.id} 
          user={user}
          blog={blog} 
          blogs={blogs} 
          setBlogs={setBlogs} 
          setErrorMessage={setErrorMessage} 
          setMessage={setMessage} />
      ))}
    </div>
  );
};

export default DisplayBlogs;
