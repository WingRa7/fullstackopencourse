import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = ({ message }) => {
  const notification = useNotificationValue()
  if (!notification) return null

  return <div className="notification notification-error">{notification}</div>
}

export default Notification
