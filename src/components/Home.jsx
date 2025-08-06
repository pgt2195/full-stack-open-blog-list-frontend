// imports
import { useSelector } from "react-redux";
import { useRef } from "react";
// components
import Togglable from "./Toggable";
import AddBlog from "./AddBlog";
import DisplayBlogs from "./DisplayBlogs";


const Home = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();


  return (
    <div>
      {user !== null && (
        <Togglable
          buttonLabel="add new blog"
          ref={blogFormRef}
          style={{ marginTop: 4 }}
        >
          <AddBlog blogFormRef={blogFormRef} />
        </Togglable>
      )}

      <DisplayBlogs />
    </div>
  );
};

export default Home;
