import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import { useNotificationDispatch } from './contexts/NotificationContext'
import { useUserDispatch, useUserValue } from './contexts/UserContext'

import { useEffect, useRef } from 'react'
import './index.css'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from 'react-router-dom'
import users from './services/users'

const UsersList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Arto Hellas</td>
            <td>6</td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

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

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    placeholderData: [],
  })
  console.log(JSON.parse(JSON.stringify(usersQuery)))
  const users = usersQuery.data
  console.log('users:', users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      dispatchUser({
        type: 'LOGIN',
        payload: currentUser,
      })
      blogService.setToken(currentUser.token)
    }
  }, [])

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
      <Routes>
        <Route path="/" />
        <Route path="/users" element={<UsersList users={users} />}></Route>
      </Routes>
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
