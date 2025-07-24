import Blog from './Blog'

const DisplayBlogs = ({ blogs, user }) => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}  
    </div>
  )

export default DisplayBlogs