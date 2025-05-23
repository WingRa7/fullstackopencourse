import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <form className="blogform" onSubmit={addBlog}>
        <h2>Create new blog</h2>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={event => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={event => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          <label>URL</label>
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={event => setNewUrl(event.target.value)}
          />
        </div>
        <button className="button-primary" type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm