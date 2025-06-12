import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import { useNotificationDispatch } from './contexts/NotificationContext'
import { useUserDispatch, useUserValue } from './contexts/UserContext'

import { useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import './index.css'

const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()
  const userValue = useUserValue()
  const dispatchUser = useUserDispatch()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
  // console.log(JSON.parse(JSON.stringify(blogsQuery)))
  const blogs = blogsQuery.data

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const currentUser = JSON.parse(loggedUserJSON)
        dispatchUser({
          type: 'LOGIN',
          payload: currentUser,
        })
        blogService.setToken(currentUser.token)
        return currentUser
      }
      return null
    },
  })
  // console.log(JSON.parse(JSON.stringify(userQuery)))

  const blogFormRef = useRef()

  const toggleBlogVisibility = async () => {
    blogFormRef.current.toggleVisibility()
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

  if (blogsQuery.isLoading) {
    return <div>loading data...</div>
  }
  if (userQuery.isLoading) {
    return <div>loading data...</div>
  }

  if (userValue === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <p>
        {userValue.name} is logged in
        <button className="button-secondary" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm toggleBlogVisibility={toggleBlogVisibility} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={userValue} />
        ))}
    </div>
  )
}

export default App
