import { useState, useEffect } from 'react'
import countriesService from "./services/countries"


function App() {
  const [countrySearch, setCountrySearch] = useState('')
  const [countryList, setCountryList] = useState([])
  const [countryShown, setCountryShown] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const filteredCountries = countryList.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(countrySearch.toLowerCase())

    if (countryShown) {
      return country.name.common === countryShown
    }
    return matchesSearch
  }) 
  
  useEffect(() => {
    countriesService
   .getCountries()
    .then(countryList => {
      setCountryList(countryList)
    })
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1 || countryShown) {
      const country = countryShown
      ? countryList.find(c => c.name.common === countryShown)
      : filteredCountries[0]

      if (country && country.capitalInfo && country.capitalInfo.latlng) {
        const [lat, lon] = country.capitalInfo.latlng
        countriesService
        .getWeatherData(lat, lon)
        .then(weather => {
          setWeatherData(weather)
        })
        .catch(error => {
          console.log("Error fetching weather:", error)
          setWeatherData(null)
        })
      }
    } 
  }, [filteredCountries, countryShown, countryList])

  console.log(weatherData)

  

  const handleShowInfo = (country) => {
    setCountryShown(country)
  }

  const handleCountrySearch = (e) => {
    setCountrySearch(e.target.value)
    setCountryShown('')
  }

  return ( 
    <div>
      <label>
        find countries
        <input value={countrySearch} onChange={handleCountrySearch} />
      </label>
      {filteredCountries && filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteredCountries && filteredCountries.length <= 10 && filteredCountries.length > 1 && !countryShown && (
        filteredCountries.map(country => {
          return (
            <div key={country.name.common}>
              <span>{country.name.common}</span>
              <button onClick={() => handleShowInfo(country.name.common)}>Show</button>
            </div>
          )
        })
      )}
      {filteredCountries && filteredCountries.length === 1 && !countryShown && (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area: {filteredCountries[0].area}</p>
          <h2>Languages</h2>
          <ul>
           {Object.values(filteredCountries[0].languages).map(language => {
            return (
              <li key={language}>{language}</li>
            )
           })}
          </ul>
          <img 
          src={filteredCountries[0].flags.png}
          alt={`Flag of ${filteredCountries[0].name.common}`}
          style={{width: '200px'}}
          />
          <h2>Weather in {filteredCountries[0].capital}</h2>
          <p>Temperature: {Math.round(weatherData.current.temp)}</p>
          <p>{Math.round(weatherData.current.temp)}</p>
          <p>{Math.round(weatherData.current.temp)}</p>
        </div>
      )}

{countryShown && (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Area: {filteredCountries[0].area}</p>
          <h2>Languages</h2>
          <ul>
           {Object.values(filteredCountries[0].languages).map(language => {
            return (
              <li key={language}>{language}</li>
            )
           })}
          </ul>
          <img 
          src={filteredCountries[0].flags.png}
          alt={`Flag of ${filteredCountries[0].name.common}`}
          style={{width: '200px'}}
          />
        </div>
      )}

    </div>
  )
}

export default App
