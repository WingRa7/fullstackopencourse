import { useState } from 'react'

const Country = ({ country, resultLength }) => {

    const [toggle, setToggle] = useState(true)
    const toggleChange = () => {
        setToggle((newToggle) => !newToggle)
    }

    const DropdownButton = () => <button onClick={toggleChange} toggle={toggle}>{toggle ? 'Show' : 'Hide'}</button>

    const CountryProfile = (props) => {
        console.log('country profile', props)
        return(
            <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}<br/>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
            <img src={country.flags.png} />
            </>
        )
}
    
    return(
        <>
        {(resultLength == 1) 
        ?    /* single country display */
            <CountryProfile />
           
        :    /* country list display */
         <>
         {country.name.common} <DropdownButton /><br/>
         {toggle ? null : <><CountryProfile /><br/><br/></>}
         </>

        }    
        </>
    )
}

export default Country