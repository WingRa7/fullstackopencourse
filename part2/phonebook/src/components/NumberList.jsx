import Entry from "./Entry"

const NumberList = ({ persons, setPersons, search, setErrorMessage, setSuccessMessage }) => {
    const searchResult = persons.filter((person) => person.name.toLowerCase().startsWith(search.toLowerCase()))

return(
    <>
    {searchResult.map((entry) => (
        <Entry key={entry.name} entry={entry} persons={persons} setPersons={setPersons}
         setErrorMessage={setErrorMessage} set setSuccessMessage={setSuccessMessage}/>
      ))}
    </>
)
}

export default NumberList