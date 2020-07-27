import React, { useState, useEffect } from 'react';
import personService from './services/persons'

const  App = (props) => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filtteri, setFiltteri ] = useState('')
  const [ alertMessage, setAlertMessage ] = useState(null)

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log('henkilot ladattu')
      })
  }

  useEffect(hook, [])

  const personsToShow = persons.filter(persons => persons.name.includes(filtteri));

  const addPersons = (event) => {
    event.preventDefault()
    console.log('nappulaa painettu', newName, filtteri, persons.length)
    const personsObject = {
      name: newName,
      number: newNumber,
      id: newName,
    }

    let loytyy = false;
    for (let i = 0; i < persons.length; i++) {
      console.log('etsinta', i)
      if (persons[i].name === personsObject.name) {
        loytyy = true;
        console.log('loytyi')
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          personService
            .update(newName, personsObject)
            //.then(window.location.reload(true))
            setAlertMessage(`${newName} number updated`)
            setTimeout(() => {
              setAlertMessage(null)
              window.location.reload(true)
            }, 3000)
            //window.location.reload(true)
        }
        break;
      }
      console.log('ei loytynyt kierroksella', i)
    }
    if (loytyy === false) {
      personService
        .create(personsObject)
        .then(added => {
          setPersons(persons.concat(added))
          setAlertMessage(`${newName} added`)
          setTimeout(() => {
            setAlertMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
    } 
  }

  const handleRemoval = (event) => {
    event.preventDefault()
    console.log('poistoa painettu', event.target.value)
    personService
      .poista(event.target.value)
      setAlertMessage('person deleted')
      setTimeout(() => {
        setAlertMessage(null)
        window.location.reload(true)
      }, 3000)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFiltteri(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} />
      <Suodatin filt={filtteri} kasittelija={handleFilterChange} />
      <h2>add a new</h2>
      <form onSubmit={addPersons}>
        <div>
          name: 
          <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Lista henkN={personsToShow} handleRemoval={handleRemoval} />
    </div>
  )
}

const Lista = (props) => {

  return (
    <ul>
      {props.henkN.map(henk =>
        <li key={henk.name}>
          {henk.name} {henk.number} <button onClick={props.handleRemoval} value={henk.id}>delete</button>
        </li>
        )}
    </ul>
  )
}

const Suodatin = (props) => {
  return (
    <div>
      filter shown with<input
        value={props.filt}
        onChange={props.kasittelija} />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="alert">
      {message}
    </div>
  )
}

export default App;
