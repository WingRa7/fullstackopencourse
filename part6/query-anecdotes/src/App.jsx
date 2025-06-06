import { useQuery, useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotifyDispatch } from './NotifyContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()
  const dispatch = useNotifyDispatch()

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map((anecdote) => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
      dispatch({ type: 'VOTE', payload: updatedAnecdote.content })
      setTimeout(() => {
        dispatch({ type: 'RESET'})
        },5000)
    }
  })

  const handleVote = (anecdote) => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])
    const anecdoteToIncrement = anecdotes.find((a) => a.id === anecdote.id)
    const incrementedAnecdote = { ...anecdoteToIncrement, votes: anecdoteToIncrement.votes + 1 }
    voteAnecdoteMutation.mutate(incrementedAnecdote)
  }

  const result = useQuery({
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
