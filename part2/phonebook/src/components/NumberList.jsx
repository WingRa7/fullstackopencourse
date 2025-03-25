import Entry from "./Entry"

const NumberList = ({ persons, search }) => {
    const searchResult = persons.filter((person) => person.name.toLowerCase().startsWith(search.toLowerCase()))
return(
    <>
    <h2>Numbers</h2>
    {searchResult.map((entry) => (
        <Entry key={entry.name} entry={entry} />
      ))}
    </>
)
}

export default NumberList