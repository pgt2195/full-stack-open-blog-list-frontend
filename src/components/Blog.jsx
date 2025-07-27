import { useState } from "react";
import { displayMessage } from "../services/utils";
import blogService from '../services/blogs'

const blogStyle = {
  maxWidth: 500,
  padding: 8,
  border: 'solid',
  borderRadius: 5,
  borderWidth: 1,
  marginBottom: 5,
  position: 'relative'
}

const buttonStyle = {
  position: 'absolute',
  top: 5,
  right: 5
}

const Blog = ({ blog, blogs, setBlogs, setErrorMessage }) => {
  const [toggleBlogInfo, setToggleBlogInfo] = useState(false)

  const likeBlog = (blog) => {
    const likedBlog = {...blog, likes: blog.likes + 1}
    try {
      blogService
        .update(blog.id, likedBlog)
          .then(returnedBlog => {
          setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
        })
    } catch (exception) {
      displayMessage(`Oops, something wrong happened! Error: ${exception}`, setErrorMessage)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      { toggleBlogInfo 
        ? <>
            <button style={buttonStyle} onClick={() => setToggleBlogInfo(!toggleBlogInfo)}>hide</button>
            <div><u>Link:</u> {blog.url}</div>
            <div><u>Likes:</u> {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
            <div><u>Author:</u> {blog.author}</div>
          </>
        : <>
            <button style={buttonStyle} onClick={() => setToggleBlogInfo(!toggleBlogInfo)}>view</button>
          </>
      }
    </div>
  );
};

export default Blog;
