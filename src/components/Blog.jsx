import { useState } from "react";
import Toggable from "./Toggable";

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

const Blog = ({ blog }) => {
  const [toggleBlogInfo, setToggleBlogInfo] = useState(false)

  return (
    <div style={blogStyle}>
      {blog.title}
      { toggleBlogInfo 
        ? <>
            <button style={buttonStyle} onClick={() => setToggleBlogInfo(!toggleBlogInfo)}>hide</button>
            <div><u>Link:</u> {blog.url}</div>
            <div><u>Likes:</u> {blog.likes} <button>like</button></div>
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
