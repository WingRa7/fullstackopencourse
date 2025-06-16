import { Container, Typography, Box, List, ListItem } from '@mui/material'

import { Link as RouterLink } from 'react-router-dom'

const UserBlogs = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, m: 2 }}>
      <Box>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="h6">added blogs</Typography>
      </Box>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </Box>
  )
}

export default UserBlogs
