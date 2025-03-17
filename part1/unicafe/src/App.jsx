import { useState } from 'react'

const Statistics = ({ good, neutral, bad } ) => {

  const Total = good + neutral + bad
  const Average = ((good * 1) + (neutral * 0) + (bad* -1)) / Total
  const Positive = ((good / Total) * 100)

  if (Total === 0) {
    return (
      <>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {Total} </p>
    <p>average {Average}</p>
    <p>positive {Positive} % </p>
    </>
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App