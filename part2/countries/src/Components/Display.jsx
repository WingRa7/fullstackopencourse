import Country from './Country'

const Display = ({ search, countries }) => {

const searchResult = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))
const resultLength = searchResult.length


return(
    <>
    {
    (resultLength < 10) ? 
    searchResult.map((country) =>
    <Country key={country.name.common} country={country} resultLength={resultLength} />)
    : 
    <>Too many matches, specify another filter</>
    }
    </>
    )
}

export default Display