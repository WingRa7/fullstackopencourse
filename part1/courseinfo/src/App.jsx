const Header = (props) => {
  return (
  <>
  <h1>{props.course}</h1>
  </>
  )
}

const Content = (props) => {
  return (
    <>
    <Part title={props.part1} exnum={props.exercises1}/>
    <Part title={props.part2} exnum={props.exercises2}/>
    <Part title={props.part3} exnum={props.exercises3}/>
    </>
  )
}

const Part = (props) => {

  return(
    <>
    <p>{props.title} {props.exnum}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content
       part1={parts[0].name}
       part2={parts[1].name}
       part3={parts[2].name}
       exercises1={parts[0].exercises}
       exercises2={parts[1].exercises}
       exercises3={parts[2].exercises}
       />

      <Total exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises}/>
    </div>
  )
}

export default App