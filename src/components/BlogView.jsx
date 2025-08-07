import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogId = useParams().id;
  const blog = blogs.find((b) => b.id === blogId);
  const dispatch = useDispatch();


  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
      {blog.url} <br />
      Author: {blog.author} <br />
      Likes: {blog.likes} <button onClick={() => dispatch(likeBlog(blog))}>like</button><br />
      Posted by: {blog.user ? blog.user.name : "Unknown"}
      </p>
    </div>
  );
};

export default BlogView;