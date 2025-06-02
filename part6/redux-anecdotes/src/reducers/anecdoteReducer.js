import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote (state, action) {
      const changedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})

export const { incrementVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdotesState = state.anecdotes
    const anecdoteToIncrement = anecdotesState.find(a => a.id === id)
    const incrementedAnecdote = { ...anecdoteToIncrement, votes: anecdoteToIncrement.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(id, incrementedAnecdote)
    dispatch(incrementVote(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer