const App = () => {

  const Course = ({ name, parts}) => { 

    const Header = () => {
      return(
        <h2>{name}</h2>
        )
      }
    const Content = ({ parts }) => {
      return(
        <div>
            {parts.map(part =>
              <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
        </div>
      )
     }
    const Part = ({ name, exercises }) => {
     return(
     <>
     <p>{name} {exercises}</p>
     </>
      )
    }
    const Totals = () => {
      const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
      return(
        <b>
        total of {total} exercises
        </b> 
      )
    }

    return (
      <div>
        <>
         <Header name={name}/>
         <Content parts={parts}/>
         <Totals parts={parts}/>
         </>
      </div>
    )
  }

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
  <div>
    <h1>Web development curriculum</h1>
    {courses.map(course => 
      <Course key={course.id} name={course.name} parts={course.parts} />
    )}
  </div>
  )
}


export default App