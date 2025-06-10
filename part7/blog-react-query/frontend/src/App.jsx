import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from '@tanstack/react-query'
import { useNotificationDispatch } from './contexts/NotificationContext'

import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      dispatch({
        type: 'NEW',
        payload: `a new blog '${blogObject.title}' by ${blogObject.author} added`,
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: `the blog ${blogObject.title} by ${blogObject.author} could not be added`,
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      setBlogs(
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: 'Like could not be added',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    const blogIndex = blogs.findIndex((blog) => {
      return blog.id === blogObject.id
    })
    const blogsArr = blogs

    try {
      await blogService.remove(blogObject)
      blogsArr.splice(blogIndex, 1)
      setBlogs(blogsArr)
      dispatch({
        type: 'REMOVE',
        payload: 'Blog deleted',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    } catch (exception) {
      dispatch({
        type: 'ERROR',
        payload: 'Blog could not be deleted',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  }

  const handleLogin = async (credentialsObject) => {
    try {
      const user = await loginService.login(credentialsObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch({
        type: 'LOGIN',
        payload: 'Logged in succesfully',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    } catch (exception) {
      dispatch({
        type: 'ERROR',
        payload: 'Wrong credentials',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch({
      type: 'LOGOUT',
      payload: 'Logged out successfully',
    })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm processLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <p>
        {user.name} is logged in
        <button className="button-secondary" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            processLike={updateBlog}
            processDelete={deleteBlog}
          />
        ))}
    </div>
  )
}

export default App
