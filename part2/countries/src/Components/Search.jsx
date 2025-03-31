const Search = ({ search, setSearch }) => {

    const handleChange = (event) => {
        setSearch(event.target.value)
    }

    return(
        <>
        <form>
            <label>find countries
                <input value={search} onChange={handleChange} />
            </label>
        </form>
        </>
    )
}

export default Search