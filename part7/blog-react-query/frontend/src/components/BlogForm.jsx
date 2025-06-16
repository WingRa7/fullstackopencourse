import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Paper,
  TextField,
  Tooltip,
  MenuItem,
  Link,
  Stack,
} from '@mui/material'

import { useState } from 'react'
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
    <Container maxWidth="xs">
      <Paper>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 4, my: 4 }}>
          <form onSubmit={addBlog}>
            <Typography variant="h5" gutterBottom>
              Create new blog
            </Typography>
            <Box>
              <TextField
                fullWidth
                label="Title"
                type="text"
                value={newTitle}
                name="Title"
                autoComplete="off"
                onChange={(event) => setNewTitle(event.target.value)}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Author"
                type="text"
                value={newAuthor}
                name="Author"
                autoComplete="off"
                onChange={(event) => setNewAuthor(event.target.value)}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="URL"
                type="text"
                value={newUrl}
                name="Url"
                autoComplete="off"
                onChange={(event) => setNewUrl(event.target.value)}
              />
            </Box>
            <Button type="submit" sx={{ mt: 2 }}>
              Create
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default BlogForm
