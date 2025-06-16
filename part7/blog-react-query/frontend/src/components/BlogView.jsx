import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Card,
  Paper,
  Button,
  Link,
  TextField,
  List,
  ListItem,
} from '@mui/material'

import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DeleteIcon from '@mui/icons-material/Delete'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from '../services/blogs'

const BlogView = ({ blog, user }) => {
  const [newComment, setNewComment] = useState('')

  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

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

  const newCommentMutation = useMutation({
    mutationFn: blogService.createComment,
    onSuccess: (updatedBlog) => {
      console.log('updatedBlog:', updatedBlog)
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
      dispatchNotification({
        type: 'NEW',
        payload: 'comment added',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    },
    onError: (error, variables) => {
      dispatchNotification({
        type: 'ERROR',
        payload: 'could not add comment',
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

  const addComment = (event) => {
    event.preventDefault()
    newCommentMutation.mutate({
      body: newComment,
      id: blog.id,
    })
    setNewComment('')
  }

  const isUsersBlog = blog ? blog.user.username === user.username : false

  if (!blog) {
    return null
  }

  return (
    <Paper>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4, my: 4 }}
      >
        <Typography variant="h4">{blog.title}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Link
            href={
              blog.url.startsWith('http://') || blog.url.startsWith('https://')
                ? blog.url
                : `https://${blog.url}`
            }
            underline="none"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog.url}
          </Link>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography data-testid="likes">Likes {blog.likes}</Typography>
            <Button
              size="small"
              startIcon={<ThumbUpIcon />}
              data-testid="likeButton"
              onClick={handleLike}
            >
              Like
            </Button>
          </Box>
          <Typography>Added by {blog.author}</Typography>
        </Box>

        {isUsersBlog && (
          <Box>
            <Button
              size="small"
              startIcon={<DeleteIcon />}
              color="error"
              data-testid="removeButton"
              onClick={handleDelete}
            >
              Remove
            </Button>
          </Box>
        )}
        <Box>
          <form onSubmit={addComment}>
            <Typography variant="h6">Comments</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                my: 1,
              }}
            >
              <TextField
                label="Comment"
                size="small"
                sx={{ m: 0 }}
                autoComplete="off"
                type="text"
                value={newComment}
                name="Author"
                onChange={(event) => setNewComment(event.target.value)}
              />
              <Button type="submit">Add comment</Button>
            </Box>
          </form>
          <List>
            {blog.comments.map((comment) => (
              <Box
                key={comment._id}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  my: 1,
                }}
              >
                <ChatBubbleOutlineIcon />
                <ListItem>{comment.body}</ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </Box>
    </Paper>
  )
}

export default BlogView
