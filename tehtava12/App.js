import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filtteri, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('data haettu')
        console.log('maita listalla: ', countries.length)
        setCountries(response.data)
        console.log('maita listalla nyt: ', countries.length)
      })
  }

  useEffect(hook, [])
  console.log('ja nyt: ' + countries.length)

  const countriesToShow = countries.filter(e => e.name.includes(filtteri));

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filtteri filt={filtteri} kasittelija={handleFilterChange} />
    
    
      <Display maat={countriesToShow} klikkaus={handleClick} />
    </div>
  )
}

const Filtteri = (props) => {
  return (
    <div>
      find countries<input
        value={props.filt}
        onChange={props.kasittelija} />
    </div>
  )
}

const Display = (props) => {
  if (props.maat.length > 10) {  
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (props.maat.length > 1) {
    return (
      <ul>
        {props.maat.map(maa =>
          <li key={maa.name}>
            {maa.name} <button onClick={props.klikkaus} value={maa.name}>show</button>
          </li>)}
      </ul>
    )
  } else {
    return (
      <div>
        {props.maat.map(maa =>
          <h1>{maa.name}</h1>
          )}
        {props.maat.map(maa =>
          <p>capital {maa.capital}<br />population {maa.population}</p>
        )}
        <h2>languages</h2>
        <div>
          {props.maat.map(maa =>
            <ul>
              {maa.languages.map(kielet =>
                <li key={kielet.name}>
                  {kielet.name}
                </li>)}
            </ul>)}
          {props.maat.map(maa =>
            <img src={maa.flag} alt="flag" width="200" />)}
        </div>
      </div>
    )
  }
}


export default App;
