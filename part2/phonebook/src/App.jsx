import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
        <label htmlFor="filter">filter shown with</label>
        <input id="filter" value={filtered} onChange={(e) => setFiltered(e.target.value)}/>
      <form onSubmit={handleSubmit}>
        <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/> <br />
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => {
        return (
          <p key={i}>{filtered ? person.name.includes(filtered) : person.name}</p>
        )
      })}
   </div>
  )
}

export default App