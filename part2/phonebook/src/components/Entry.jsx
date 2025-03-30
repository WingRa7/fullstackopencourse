import personsService from '../services/persons'

const Entry = ({ entry, persons, setPersons, setErrorMessage, setSuccessMessage }) => {

  const handleErase = () => {
        if (window.confirm(`Delete ${entry.name}?`))
        {
        personsService
        .erase(entry.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
          setSuccessMessage(`Deleted ${deletedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Unable to delete ${entry.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
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