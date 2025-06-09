import { useState } from 'react'

const Blog = ({ blog, processLike, processDelete, user }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const isUsersBlog = blog.user.username === user.username


  const handleLike = (event) => {
    event.preventDefault()
    processLike({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes + 1),
      user: blog.user.id,
      id: blog.id,
    })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    processDelete({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id,
      id: blog.id,
    })
  }


  return(
    <div className="blog">

      <div>
        <h3 data-testid="title">{blog.title} {blog.author}</h3>
        <button className="button-secondary" data-testid="hideButton" style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
        <button className="button-secondary" data-testid="viewButton" style={hideWhenVisible} onClick={toggleVisibility}>View</button>
      </div>

      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p data-testid="likes">Likes {blog.likes}<button className="button-primary like" data-testid="likeButton" onClick={handleLike}>Like</button></p>
        <p>{blog.user.name}</p>
        {isUsersBlog && <button className="button-secondary remove" data-testid="removeButton" onClick={handleDelete}>Remove</button>}
      </div>

    </div>
  )
}

export default Blog