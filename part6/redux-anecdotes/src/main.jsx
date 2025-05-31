import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

console.log('init:', store.getState())
store.subscribe(() => console.log('updated:',store.getState()))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)