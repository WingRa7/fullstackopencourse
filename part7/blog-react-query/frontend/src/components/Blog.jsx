import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <h3 data-testid="title">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </h3>
    </div>
  )
}

export default Blog
