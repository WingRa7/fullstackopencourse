import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
        return `anecdote '${action.payload}' added`
    case 'VOTE':
        return `anecdote '${action.payload}' voted`
    case 'ERROR':
        return action.payload
    case 'RESET':
        return null
    default:
        return state
  }
}

const NotifyContext = createContext()

export const useNotifyValue = () => {
  const notificationAndDispatch = useContext(NotifyContext)
  return notificationAndDispatch[0]
  }
  
export const useNotifyDispatch = () => {
  const notificationAndDispatch = useContext(NotifyContext)
  return notificationAndDispatch[1]
  }

export const NotifyContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

return (
  <NotifyContext.Provider value={[notification, notificationDispatch]}>
    {props.children}
  </NotifyContext.Provider>
  )
}

export default NotifyContext