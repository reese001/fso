const Numbers = (props) => {
    return props.persons.filter(person => {
        if (!props.filtered) return true
        return person.name.toLowerCase().includes(props.filtered.toLowerCase())
      }).map((person, i) => {
        return (
          <p key={i}>{person.name} {person.number}</p>
        )
      })
}

export default Numbers