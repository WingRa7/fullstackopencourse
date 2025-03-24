import { useState } from 'react'
import Entry from './components/Entry'

const App = ({ directory }) => {

  const [persons, setPersons] = useState(directory) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    
    event.preventDefault()
    const nameObject = {
      name: newName
    }

    const checkDuplicate = (person) => person.name.toLowerCase() === newName.toLowerCase()
    const duplicate = persons.some(checkDuplicate)

    if (duplicate === false) {
    setPersons(persons.concat(nameObject))
    setNewName('')
    }
    else
    {
      alert(`${newName} is already in the phonebook`)
    }
  }
  
  const handleEntryChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleEntryChange} />
        </div>
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