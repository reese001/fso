import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Form from "./components/Form"
import Numbers from './components/Numbers'
import numbersService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')
  const [notiMessage, setNotiMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
   numbersService
    .getAll()
    .then(initialNumbers => {
      setPersons(initialNumbers)
    })
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const duplicatePerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase() || person.number === newNumber)
    if (duplicatePerson) {
      if (confirm(`${duplicatePerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...duplicatePerson, number: newNumber }
        numbersService
        .update(duplicatePerson.id, updatedPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== duplicatePerson ? person : updatedPerson
          ))
          setNotiMessage(`Updated ${updatedPerson.name}`)
        })
        .catch(error => {
          setNotiMessage(`Unable to update ${duplicatePerson.name} in the phonebook`)
          console.log(error)
        })
        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setNotiMessage(null)
        }, 5000)
      } else return
      
    } else {
      const personObj = {name: newName, number: newNumber}   
      numbersService
      .create(personObj) 
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setIsSuccess(true)
        setNotiMessage(`Added ${newPerson.name}`)
      })
      .catch(error => {
        setNotiMessage(`Unable to add ${personObj.name} to the phonebook.`)
        console.log(error)
      })

      setNewName('')
      setNewNumber('')
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
      setIsSuccess(false)
    }
  } 

  const handleDelete = (id) => {
    const numberToDelete = persons.find(person => person.id === id)
    console.log(numberToDelete)
    if (confirm(`Delete ${numberToDelete.name}?`)) {
      numbersService
      .deleteNumber(numberToDelete.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setIsSuccess(true)
        setNotiMessage(`Deleted ${numberToDelete.name}`)
      })
      .catch(error => {
        setNotiMessage(`Information of ${numberToDelete.name} has already been removed from the server`)
        console.log(error)
      })
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
    } else return
  }

  const handleFilter = (e) => {
    setFiltered(e.target.value)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage} isSuccess={isSuccess}/>
       <Filter filtered={filtered} handleFilter={handleFilter}/>
      <Form newName={newName} newNumber={newNumber} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filtered={filtered} handleDelete={handleDelete}/>
   </div>
  )
}

export default App