import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Paper,
  TableContainer,
} from '@mui/material'

import { Link as RouterLink } from 'react-router-dom'

const UsersList = ({ users }) => {
  return (
    <Box sx={{ gap: 2, p: 2, m: 2 }}>
      <TableContainer component={Paper}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
            pl: 1,
            pt: 1,
            ml: 1,
            mt: 1,
          }}
        >
          <Typography variant="h4">Users</Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link
                    component={RouterLink}
                    to={`/users/${user.id}`}
                    sx={{
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.dark',
                      },
                    }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UsersList
