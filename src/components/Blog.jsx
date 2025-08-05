import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const blogStyle = {
  maxWidth: 500,
  padding: 8,
  border: "solid",
  borderRadius: 5,
  borderWidth: 1,
  marginBottom: 5,
  position: "relative",
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

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const [toggleBlogInfo, setToggleBlogInfo] = useState(false);
  const dispatch = useDispatch();

  const likeBlog = (blog) => {
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      blogService.update(blog.id, likedBlog).then((returnedBlog) => {
        returnedBlog = { ...returnedBlog, user: blog.user }; // pour gérer l'affichage de l'utilsateur sans avoir à recharger la page après l'ajout
        setBlogs(
          blogs.map((blog) =>
            blog.id === returnedBlog.id ? returnedBlog : blog,
          ),
        );
        dispatch(showNotification(`Blog liked successfully: ${blog.title}`, 'success', 5));
      });
    } catch (exception) {
      dispatch(showNotification('error liking blog', 'error', 5));
    }
  };

  const deleteBlog = (idToRemove) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );

    if (confirmDelete) {
      try {
        blogService.deleteBlog(blog.id).then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== idToRemove));
        });
      } catch (exception) {
        console.log(exception)
      }
    }
  };

  const blogPostetByConnectedUser =
    user && user.username === blog.user.username;

  return (
    <div style={blogStyle} data-testid="blog-unit">
      {blog.title}
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
            <button onClick={() => likeBlog(blog)}>like</button>
          </div>
          <div>
            <u>Author:</u> {blog.author}
          </div>

          <div style={postedByStyle}>
            Added by {blogPostetByConnectedUser ? "you" : blog.user.username}
          </div>

          {blogPostetByConnectedUser && (
            <button
              style={{ marginTop: 12 }}
              onClick={() => deleteBlog(blog.id)}
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
