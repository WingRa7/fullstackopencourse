import personsService from '../services/persons'

const Entry = ({ entry, persons, setPersons }) => {

  const handleErase = () => {
       /* console.log('Entry button pressed for:',entry.name) */
        if (window.confirm(`Delete ${entry.name}?`))
        {
        personsService
        .erase(entry.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
        .catch(error => {
          alert(
            `Error: Unable to delete ${entry.name}`
          )
        })
      }
      }

    return (
      <>
      <p>{entry.name} {entry.number}
        <button onClick={handleErase}>delete</button>
        </p>    
      </>
    )
  }
  
  export default Entry