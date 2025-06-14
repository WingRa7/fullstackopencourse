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
import UsersList from './components/UserList'
import UserBlogs from './components/UserBlogs'
import BlogView from './components/BlogView'
import Menu from './components/Menu'

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

const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()
  const userValue = useUserValue()
  const dispatchUser = useUserDispatch()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    placeholderData: [],
  })
  // console.log(JSON.parse(JSON.stringify(blogsQuery)))
  const blogs = blogsQuery.data
  console.log('blogs:', blogs)

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    placeholderData: [],
  })
  // console.log(JSON.parse(JSON.stringify(usersQuery)))
  const users = usersQuery.data

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

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
      <Menu />
      <Notification />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm toggleBlogVisibility={toggleBlogVisibility} />
              </Togglable>
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog key={blog.id} blog={blog} />
                ))}
            </div>
          }
        />
        <Route path="/users" element={<UsersList users={users} />} />
        <Route path="/users/:id" element={<UserBlogs user={user} />} />
        <Route
          path="/blogs/:id"
          element={<BlogView blog={blog} user={userValue} />}
        />
      </Routes>
    </div>
  )
}

export default App
