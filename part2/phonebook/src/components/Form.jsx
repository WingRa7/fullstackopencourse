import personsService from '../services/persons'

const Form = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => { 

    const addName = (event) => {
    
        event.preventDefault()
        const nameObject = {
          name: newName,
          number: newNumber
        }
        const checkDuplicateName = (person) => person.name.toLowerCase() === newName.toLowerCase()
        const isDuplicate = persons.some(checkDuplicateName)
        const duplicatePerson = persons.find(value => value.name.toLowerCase() === newName.toLowerCase())

        if (isDuplicate === false) {
           personsService
          .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => alert(`Error: ${nameObject.name} couldn't be added`))
        }
        else
        {
         if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
         {
           personsService
           .update(duplicatePerson.id, nameObject)
           .then(updatedPerson => {
             setPersons(persons.filter(person => person.number !== duplicatePerson.number).concat(updatedPerson))
             setNewName('')
             setNewNumber('')
           })
           .catch(error => alert(`Error: ${duplicatePerson.name} couldn't be updated`))
       }
       }
       }

      const handleNameEntryChange = (event) => {
        setNewName(event.target.value)
      }
      const handleNumberEntryChange = (event) => {
        setNewNumber(event.target.value)
      }

return(
    <form onSubmit={addName}>
        <div> name: <input value={newName} onChange={handleNameEntryChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberEntryChange}/></div>
        <div><button type="submit">add</button></div>
    </form>
)
}

export default Form