import { useState, useEffect } from 'react'
import NumberList from './components/NumberList'
import Form from './components/Form'
import Search from './components/Search'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setErrorMessage(
          `Phonebook server down`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      <Search search={search} setSearch={setSearch}/>
      <h3>Add a new</h3>
      <Form 
      persons={persons} newName={newName} newNumber={newNumber} search={search} 
      setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} setSearch={setSearch}
      setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
      <h3>Numbers</h3>
      <NumberList search={search} persons={persons} setPersons={setPersons}
      setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
      </div>
  )
}

export default App