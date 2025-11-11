const Filter = (props) => {
    return (
        <div>
            <label htmlFor="filter">filter shown with</label>
            <input id="filter" value={props.filtered} onChange={props.handleFilter}/>
        </div>
    )
}

export default Filter