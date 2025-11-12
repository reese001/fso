import axios from 'axios'

const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY


const getCountries = () => {
   const request = axios.get(countriesUrl)
    return request.then(response => response.data)
}

const getWeatherData = (lat, lon) => {
   const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    return request.then(response => response.data)
}

export default { getCountries, getWeatherData }