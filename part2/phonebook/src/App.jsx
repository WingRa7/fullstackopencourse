import { useState, useEffect } from 'react'
import NumberList from './components/NumberList'
import Form from './components/Form'
import Search from './components/Search'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        alert(
          `Error: Phonebook server down`
        )
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch}/>
      <h3>Add a new</h3>
      <Form 
      persons={persons} newName={newName} newNumber={newNumber} search={search} 
      setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} setSearch={setSearch}/>
      <h3>Numbers</h3>
      <NumberList search={search} persons={persons} />
      </div>
  )
}

export default App