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
    <div>
      <form className="loginform" onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="button-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
