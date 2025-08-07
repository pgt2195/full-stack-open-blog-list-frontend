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

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    console.log('Comment button clicked');
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

      <div>
        <h3>Comments</h3>
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <div>
        <h3>Add a comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <input type="text" name="comment" placeholder="Write a comment..." />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default BlogView;