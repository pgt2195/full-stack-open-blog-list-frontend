import Blog from "./Blog";
import { useSelector } from "react-redux";


const DisplayBlogs = () => {

  const blogs = useSelector((state) => state.blogs)

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <div style={{ marginBottom: 8, marginTop: 20 }}>
        <b>Blogs:</b>
      </div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
};

export default DisplayBlogs;
