import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from '../services/blogs'

const BlogForm = ({ toggleBlogVisibility }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      dispatchNotification({
        type: 'NEW',
        payload: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
      })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    },
    onError: (error, variables) => {
      dispatchNotification({
        type: 'ERROR',
        payload: `the blog '${variables.title}' by ${variables.author} could not be added`,
      })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    },
  })

  const addBlog = (event) => {
    event.preventDefault()
    toggleBlogVisibility()
    newBlogMutation.mutate({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
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
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          <label>URL</label>
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button className="button-primary" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
