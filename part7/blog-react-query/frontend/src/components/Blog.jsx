import { Typography, Card, CardContent } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const Blog = ({ blog }) => {
  console.log(blog)
  return (
    <Card
      sx={{
        midWidth: 275,
        borderBottom: 8,
        borderBottomColor: 'secondary.light',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          data-testid="title"
          component={RouterLink}
          to={`/blogs/${blog.id}`}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.dark',
            },
          }}
        >
          {blog.title}
        </Typography>
        <Typography>{blog.author}</Typography>
      </CardContent>
    </Card>
  )
}

export default Blog
