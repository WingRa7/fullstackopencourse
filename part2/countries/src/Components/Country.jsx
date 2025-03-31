const Country = ({ country, resultLength }) => {

    console.log(country)
    return(
        <>
        {(resultLength == 1) 
        ?    /* single country display */
         <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}<br/>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
        <img src={country.flags.png} />
        </>

           
        :    /* country list display */
         <>{country.name.common}<br/></> 
        }    
        </>
    )
}

export default Country