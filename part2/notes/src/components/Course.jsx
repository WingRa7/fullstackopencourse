const Course = ({ name, parts}) => { 

    const Header = () =>
         <h2>{name}</h2>

    const Content = ({ parts }) => 
        <div>
            {parts.map(part =>
              <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
        </div>
      
    const Part = ({ name, exercises }) => 
     <p>{name} {exercises}</p>

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

  export default Course