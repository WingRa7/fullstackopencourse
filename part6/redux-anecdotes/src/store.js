import { configureStore } from '@reduxjs/toolkit'

import filterReducer, { setFilter } from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }
})

export default store