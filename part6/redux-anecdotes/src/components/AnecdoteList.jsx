import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

export const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    console.log('anecdotes :',anecdotes)
    console.log('filter:', filter)
    const filteredAnecdotes = anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    console.log('filtered Anecdotes:', filteredAnecdotes)


    return filteredAnecdotes
  })

  const vote = (id) => {
    dispatch(incrementVote(id))
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList