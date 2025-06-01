import { configureStore } from '@reduxjs/toolkit'

import filterReducer, { setFilter } from './reducers/filterReducer'
import anecdoteReducer, { createAnecdote, incrementVote } from './reducers/anecdoteReducer'
import notificationReducer, { createNotification, voteNotification } from './reducers/notificationReducer'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store