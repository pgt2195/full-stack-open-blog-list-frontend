import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// #region styles
const blogStyle = {
  padding: 8,
  backgroundColor: "white",
  borderRadius: 5,
  borderWidth: 1,
  marginBottom: 5,
  position: "relative",
  paddingRight: 50,
};

const buttonStyle = {
  position: "absolute",
  top: 5,
  right: 5,
};

const postedByStyle = {
  position: "absolute",
  bottom: 5,
  right: 5,
  fontSize: "10pt",
};
// #endregion


const Blog = ({ blog }) => {
  const [toggleBlogInfo, setToggleBlogInfo] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Vérifie si le blog a été posté par l'utilisateur connecté
  const blogPostedByConnectedUser =
    user && user.username === blog.user.username;

  return (
    <div style={blogStyle} data-testid="blog-unit">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      {toggleBlogInfo ? (
        <>
          <button
            style={buttonStyle}
            onClick={() => setToggleBlogInfo(!toggleBlogInfo)}
          >
            hide
          </button>

          <div>
            <u>Link:</u> {blog.url}
          </div>

          <div>
            <u>Likes:</u> {blog.likes}{" "}
            <button onClick={() => dispatch(likeBlog(blog))}>like</button>
          </div>

          <div>
            <u>Author:</u> {blog.author}
          </div>

          <div style={postedByStyle}>
            Added by {blogPostedByConnectedUser ? "you" : blog.user.username}
          </div>

          {blogPostedByConnectedUser && (
            <button
              style={{ marginTop: 12 }}
              onClick={() => dispatch(deleteBlog(blog, user))}
            >
              remove blog
            </button>
          )}
        </>
      ) : (
        <>
          <span style={{ fontSize: "10pt" }}>
            <i> - by {blog.author}</i>
          </span>

          <button
            style={buttonStyle}
            onClick={() => setToggleBlogInfo(!toggleBlogInfo)}
          >
            view
          </button>
        </>
      )}
    </div>
  );
};

export default Blog;
