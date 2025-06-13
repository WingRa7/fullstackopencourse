import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from '../services/blogs'

const BlogView = ({ blog, user }) => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const splicedBlogs = blogs
      const blogIndex = blogs.findIndex((blog) => {
        return blog.id === deletedBlog.id
      })
      splicedBlogs.splice(blogIndex, 1)
      queryClient.setQueryData(['blogs'], splicedBlogs)
      dispatchNotification({
        type: 'REMOVE',
        payload: 'Blog deleted',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    },
    onError: (error) => {
      dispatchNotification({
        type: 'ERROR',
        payload: 'Blog could not be deleted',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
    },
    onError: (error) => {
      dispatchNotification({
        type: 'ERROR',
        payload: 'Like could not be added',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    },
  })

  const handleLike = (event) => {
    event.preventDefault()
    updateBlogMutation.mutate({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id,
    })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteBlogMutation.mutate({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user.id,
      id: blog.id,
    })
  }

  const isUsersBlog = blog ? blog.user.username === user.username : false // can reference username in context rather than passed prop.

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p data-testid="likes">
        Likes {blog.likes}
        <button
          className="button-primary like"
          data-testid="likeButton"
          onClick={handleLike}
        >
          Like
        </button>
      </p>
      <p>added by {blog.author}</p>
      {isUsersBlog && (
        <button
          className="button-secondary remove"
          data-testid="removeButton"
          onClick={handleDelete}
        >
          Remove
        </button>
      )}
    </div>
  )
}

export default BlogView
