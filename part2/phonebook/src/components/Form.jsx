import axios from 'axios'

const Form = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => { 

    const addName = (event) => {
    
        event.preventDefault()
        const nameObject = {
          name: newName,
          number: newNumber
        }
        const checkDuplicateName = (person) => person.name.toLowerCase() === newName.toLowerCase()
        const duplicateName = persons.some(checkDuplicateName)
        if (duplicateName === false) {

        axios
            .post('http://localhost:3001/persons', nameObject)
            .then(response => {
              setPersons(persons.concat(response.data))
              setNewName('')
              setNewNumber('')
            }
          )
        
        }
        else
        {
          alert(`${newName} is already in the phonebook`)
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