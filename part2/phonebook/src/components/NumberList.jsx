import Entry from "./Entry"

const NumberList = ({ persons, setPersons, search, setNotifyMessage }) => {
    const searchResult = persons.filter((person) => person.name.toLowerCase().startsWith(search.toLowerCase()))

return(
    <>
    {searchResult.map((entry) => (
        <Entry key={entry.name} entry={entry} persons={persons} setPersons={setPersons} setNotifyMessage={setNotifyMessage}/>
      ))}
    </>
)
}

export default NumberList