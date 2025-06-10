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
  const [user, setUser] = useState(null)

  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
  console.log(JSON.parse(JSON.stringify(blogsQuery)))

  const blogs = blogsQuery.data

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      dispatch({
        type: 'NEW',
        payload: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
    onError: (error, variables) => {
      console.log('error:', variables)
      dispatch({
        type: 'ERROR',
        payload: `the blog '${variables.title}' by ${variables.author} could not be added`,
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
      )
    },
    onError: (error) => {
      dispatch({
        type: 'ERROR',
        payload: 'Like could not be added',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const splicedBlogs = blogs
      const blogIndex = blogs.findIndex((blog) => {
        return blog.id === deletedBlog.id
      })
      splicedBlogs.splice(blogIndex, 1)
      queryClient.setQueryData(['blogs'], splicedBlogs)
      dispatch({
        type: 'REMOVE',
        payload: 'Blog deleted',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
    onError: (error) => {
      dispatch({
        type: 'ERROR',
        payload: 'Blog could not be deleted',
      })
      setTimeout(() => {
        dispatch({ type: 'RESET' })
      }, 5000)
    },
  })

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
    newBlogMutation.mutate(blogObject)
  }

  const updateBlog = async (blogObject) => {
    updateBlogMutation.mutate(blogObject)
  }

  const deleteBlog = async (blogObject) => {
    deleteBlogMutation.mutate(blogObject)
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

  if (blogsQuery.isLoading) {
    return <div>loading data...</div>
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
