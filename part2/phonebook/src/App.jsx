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
  const [notifyMessage, setNotifyMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setNotifyMessage(
          `Error: Phonebook server down`
        )
        setTimeout(() => {
          setNotifyMessage(null)
        }, 5000)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notifyMessage={notifyMessage}/>
      <Search search={search} setSearch={setSearch}/>
      <h3>Add a new</h3>
      <Form 
      persons={persons} newName={newName} newNumber={newNumber} search={search} 
      setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} setSearch={setSearch}
      setNotifyMessage={setNotifyMessage}/>
      <h3>Numbers</h3>
      <NumberList search={search} persons={persons} setPersons={setPersons} setNotifyMessage={setNotifyMessage}/>
      </div>
  )
}

export default App