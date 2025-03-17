import { useState } from 'react'

const Display = (props) => {
  return(
    <>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <p>all {props.total} </p>
    </>
  )
}

const Stats = (props) => {
  if (props.total === 0) {
    return (
      <>
      <p>average n/a</p>
      <p>positive n/a %</p>
      </>
    )
  }
  return (
    <>
    <p>average {props.Average}</p>
    <p>positive {props.Positive} % </p>
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
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  const Average = ((good * 1) + (neutral * 0) + (bad* -1)) / total
  const Positive = ((good / total) * 100)
  console.log(Positive)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <h1>statistics</h1>
      <Display
       good={good}
       neutral={neutral}
       bad={bad}
       total={total}
       />
      <Stats Average={Average} Positive={Positive} total={total}/>
    </div>
  )
}

export default App