import { Container, ThemeProvider, CssBaseline } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import theme from './theme'

import ReactDOM from 'react-dom/client'
import App from './App'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { UserContextProvider } from './contexts/UserContext'

const queryClient = new QueryClient()

import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <NotificationContextProvider>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Router>
      </NotificationContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
)
