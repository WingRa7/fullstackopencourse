import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material'

import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import LogoutIcon from '@mui/icons-material/Logout'

import { Link as RouterLink } from 'react-router-dom'
import { useUserDispatch, useUserValue } from '../contexts/UserContext'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const Navbar = () => {
  const dispatchNotification = useNotificationDispatch()
  const userValue = useUserValue()
  const dispatchUser = useUserDispatch()

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
    <AppBar position="sticky" sx={{ py: 1, mb: 3 }}>
      <Container>
        <Toolbar>
          <AutoStoriesOutlinedIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, letterSpacing: 1 }}>
            Blogs
          </Typography>

          <Button
            component={RouterLink}
            variant="text"
            to="/"
            sx={{
              color: 'inherit',
            }}
          >
            Blogs
          </Button>
          <Button
            component={RouterLink}
            variant="text"
            to="/users"
            sx={{
              color: 'inherit',
            }}
          >
            Users
          </Button>
          <Typography variant="caption">
            {userValue.name} is logged in
          </Typography>
          <Button
            size="small"
            variant="text"
            endIcon={<LogoutIcon />}
            sx={{ color: 'inherit' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
