import { Container, Box } from '@mui/material'
import Alert from '@mui/material/Alert'

import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  if (!notification) return null

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, m: 2 }}>
      <Alert>{notification}</Alert>
    </Box>
  )
}

export default Notification
