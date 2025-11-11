import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Form from "./components/Form"
import Numbers from './components/Numbers'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
       console.log(response.data)
       setPersons(response.data)
    })
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some((person) => person.name === newName || person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons((prev) => [...prev, {name: newName, number: newNumber}])
      setNewName('')
      setNewNumber('')
    }
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
       <Filter filtered={filtered} handleFilter={handleFilter}/>
      <Form newName={newName} newNumber={newNumber} handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} filtered={filtered}/>
   </div>
  )
}

export default App