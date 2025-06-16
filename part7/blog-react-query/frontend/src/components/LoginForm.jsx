import {
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Box,
} from '@mui/material'

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'

import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useUserDispatch } from '../contexts/UserContext'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()
  const dispatchUser = useUserDispatch()

  const userMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatchUser({
        type: 'LOGIN',
        payload: user,
      })
      dispatchNotification({
        type: 'LOGIN',
        payload: 'Logged in succesfully',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    },
    onError: (error) => {
      dispatchNotification({
        type: 'ERROR',
        payload: 'Wrong credentials',
      })
      setTimeout(() => {
        dispatchNotification({ type: 'RESET' })
      }, 5000)
    },
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    userMutation.mutate({ username, password })
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatchUser({
      type: 'LOGOUT',
      payload: null,
    })
    dispatchNotification({
      type: 'LOGOUT',
      payload: 'Logged out successfully',
    })
    setTimeout(() => {
      dispatchNotification({ type: 'RESET' })
    }, 5000)
  }

  return (
    <Container maxWidth="xs">
      <Paper>
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 6, my: 10 }}>
          <form onSubmit={handleLogin}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '0.35em',
              }}
            >
              <AutoStoriesOutlinedIcon fontSize="large" sx={{ mr: 1 }} />
              <Typography variant="h3">Blogs</Typography>
            </Box>
            <Typography variant="h5" gutterBottom>
              Log in to application
            </Typography>
            <Box>
              <TextField
                fullWidth
                label="Username"
                type="username"
                value={username}
                name="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                name="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Box>
            <Button variant="contained" sx={{ mt: 2 }} type="submit">
              Login
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginForm
