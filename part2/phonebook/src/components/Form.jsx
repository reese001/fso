const Form = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <h2>add a new</h2>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/> <br />
          number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    )
}

export default Form