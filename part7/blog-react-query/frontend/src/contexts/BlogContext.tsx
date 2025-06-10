import { createContext, useReducer, useContext } from 'react'

const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
      return action.payload
    case 'ERROR':
      return action.payload
    case 'REMOVE':
      return action.payload
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return action.payload
    case 'RESET':
      return null
    default:
      return state
  }
}

const BlogsContext = createContext()

export const useblogsValue = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[0]
}

export const useblogsDispatch = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[1]
}

export const BlogsContextProvider = (props) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, null)

  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  )
}

export default BlogsContext
