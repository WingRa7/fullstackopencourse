import ReactDOM from 'react-dom/client'
import App from './App'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { BlogsContextProvider } from './contexts/BlogContext'
import { UserContextProvider } from './contexts/UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <BlogsContextProvider>
          <App />
        </BlogsContextProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)
