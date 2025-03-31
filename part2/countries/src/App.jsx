import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './Components/Search'
import Display from './Components/Display'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

 
useEffect(() => {
  axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(initialCountries => {
      setCountries(initialCountries.data)
    })
    .catch(error => {
      console.log('Failed to initialise Countries')
    })
}, [])



  return (
    <>
    <Search search={search} setSearch={setSearch} />
    <Display search={search} countries={countries} />
    </>
  )
}

export default App