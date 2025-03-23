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
  
    setPersons(persons.concat(nameObject))
    setNewName('')
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
      <ul>
        {persons.map((entry) => (
          <Entry key={entry.name} entry={entry} />
        ))}
      </ul>
      </div>
  )
}

export default App