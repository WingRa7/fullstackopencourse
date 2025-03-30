import personsService from '../services/persons'

const Entry = ({ entry, persons, setPersons, setNotifyMessage }) => {

  const handleErase = () => {
        if (window.confirm(`Delete ${entry.name}?`))
        {
        personsService
        .erase(entry.id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
          setNotifyMessage(`Deleted ${deletedPerson.name}`)
          setTimeout(() => {
            setNotifyMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotifyMessage(
            `Error: Unable to delete ${entry.name}`)
            setTimeout(() => {
              setNotifyMessage(null)
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