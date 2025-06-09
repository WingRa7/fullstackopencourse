const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification notification-error">
      {message}
    </div>
  )
}

export default Notification