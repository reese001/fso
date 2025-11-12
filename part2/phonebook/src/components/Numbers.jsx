const Numbers = (props) => {
    return props.persons.filter(person => {
        if (!props.filtered) return true
        return person.name.toLowerCase().includes(props.filtered.toLowerCase())
      }).map((person) => {
        return (
          <p key={person.id}>{person.name} {person.number} <button onClick={() => props.handleDelete(person.id)}>delete</button>
</p>
          
        )
      })
}

export default Numbers