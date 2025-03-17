import { useState } from 'react'

const Display = (props) => {
  return(
    <p>{props.text} {props.score}</p>
  )
}

const Button = (props) => {
  return(
    <button onClick={props.onClick} text={props.text}>{props.text}</button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <h1>statistics</h1>
      <Display text="good" score={good}/>
      <Display text="neutral" score={neutral}/>
      <Display text="bad" score={bad}/>
    </div>
  )
}

export default App