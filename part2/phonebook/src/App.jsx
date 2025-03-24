import { useState } from 'react'
import Entry from './components/Entry'

const App = ({ directory }) => {

  const [persons, setPersons] = useState(directory) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const checkDuplicateName = (person) => person.name.toLowerCase() === newName.toLowerCase()
    const duplicateName = persons.some(checkDuplicateName)

    if (duplicateName === false) {
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div> name: <input value={newName} onChange={handleNameEntryChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberEntryChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((entry) => (
          <Entry key={entry.name} entry={entry} />
        ))}
      </div>
  )
}

export default App