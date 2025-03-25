import { useState } from 'react'
import NumberList from './components/NumberList'
import Form from './components/Form'
import Search from './components/Search'

const App = ({ directory }) => {

  const [persons, setPersons] = useState(directory) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch}/>
      <Form 
      persons={persons} newName={newName} newNumber={newNumber} search={search} 
      setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} setSearch={setSearch}/>
      <NumberList search={search} persons={persons} />
      </div>
  )
}

export default App