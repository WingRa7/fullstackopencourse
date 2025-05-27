import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'The app state is in Redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'State changes are made with actions',
    important: false,
    id: 2
  }
})

