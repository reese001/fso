import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => {
  return <button onClick= {onClick}>{text}</button>
}

const StatisticLine = ({text, value}) => <tr><td>{text}</td> <td>{value}</td></tr>


const Statistics = (props) => {
  return (
    <div>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.average.toFixed(1)}/>
      <StatisticLine text="positive" value={props.positivePercent.toFixed(2) + "%"} />     
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const average = (good - bad) / total
  const positivePercent = (good / total) * 100

  return (
    <div>

      <Header text="Give Feedback" />
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h1>Statistics</h1>
      { total === 0 ? 
        <p>No feedback given</p> 
      :
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={total}
          average={average}
          positivePercent={positivePercent}
        />
      }
    </div>
  )
}

export default App