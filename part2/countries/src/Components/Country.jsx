import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'

const Country = ({ country, resultLength }) => {
    
    const [toggle, setToggle] = useState(true)
    const toggleChange = () => setToggle((newToggle) => !newToggle)


    const DropdownButton = () => <button onClick={toggleChange}>{toggle ? 'Show' : 'Hide'}</button>

    const Weather = () => {

            const apiUrl = `http://api.weatherapi.com/v1/current.json?key=`
            const apiKey = import.meta.env.VITE_WEATHER_API_KEY
            const apiQuery = `&q=${country.capital}&aqi=no`

            const [temp, setTemp] = useState('')
            const [wind, setWind] = useState('')
            const [icon, setIcon] = useState('')

            axios
              .get(`${apiUrl}${apiKey}${apiQuery}`)
              .then((response) => {
                setTemp(response.data.current.temp_c)
                setWind(response.data.current.wind_mph)
                setIcon(response.data.current.condition.icon)
               console.log('weather response',response.data.current.condition.icon)
    })
            
        
        return(
            <>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {temp} Celsius</p>
            <img src={icon} />
            <p>Wind {Math.round(wind * 0.44704)} m/s</p>
            </>
        ) 
    }

    const CountryProfile = () => {
        return(
            <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}<br/>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>{Object.values(country.languages).map(language => <li key={language}>{language}</li>)}</ul>
            <img src={country.flags.png} />
            <Weather />
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