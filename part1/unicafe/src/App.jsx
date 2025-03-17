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
    <table>
      <tr>  
      <td><StatisticsLine text="good"/></td>
      <td><StatisticsLine value={good}/></td>
      </tr>
      <tr>
      <td><StatisticsLine text="neutral"/></td>
      <td><StatisticsLine value={neutral}/></td>
      </tr>
     <tr>
      <td><StatisticsLine text="bad"/> </td>
      <td><StatisticsLine value={bad}/> </td>
     </tr>
     <tr>
     <td><StatisticsLine text="all"/></td>
     <td><StatisticsLine value={Total}/></td>
     </tr>
     <tr>
     <td><StatisticsLine text="average"/></td>
     <td><StatisticsLine value={Average}/></td>
     </tr>
     <tr>
     <td><StatisticsLine text="positive"/></td>
     <td><StatisticsLine value={Positive} percent="%"/></td>
     </tr>
    </table>
    
    
    </>
  )
}

const StatisticsLine = (props) => {
  return (
    <>
    <p>{props.text} {props.value} {props.percent}</p>
    </>
  )
}

const Button = (props) => {

  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App