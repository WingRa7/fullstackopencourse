import { Link } from 'react-router-dom'
import { useUserDispatch, useUserValue } from '../contexts/UserContext'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const Menu = () => {
  const padding = {
    padding: 5,
  }

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
    <div style={{ backgroundColor: 'lightgrey' }}>
      <p>
        <Link style={padding} to="/">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        {userValue.name} is logged in
        <button className="button-secondary" onClick={handleLogout}>
          Logout
        </button>
      </p>
    </div>
  )
}

export default Menu
