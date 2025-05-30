import { useState } from 'react'

const Button = (props) => {

  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Votes = ({ votes, selected }) => {
  return(
    <>
    <p>has {votes[selected]} votes</p>
    </>
  )
}

const TopVoted = ({ votes, anecdotes }) => {
  const topAnecdote = Math.max(...votes)
  const index = (votes.indexOf(topAnecdote))

  console.log('Top voted anecdote index:', index)

  return(
    <>
    {anecdotes[index]}
    <p>has {votes[index]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const initVotes = Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initVotes)

  console.log('Voting scoreboard:', votes)

  const handleVoteClick = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <div>
    <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
    <Votes votes={votes} selected={selected}/>
    <div>
    <Button onClick={handleVoteClick} text="vote" />
    <Button onClick={() => setSelected(getRandomInt(anecdotes.length))} text="next anecdote"/>
    </div>
    <div>
    <h1>Anecdote with most votes</h1>
    <TopVoted votes={votes} anecdotes={anecdotes} />
    </div>
    </div>

  )
}

export default App