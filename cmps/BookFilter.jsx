const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, minPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Book name: </label>
                <input value={txt} onChange={handleChange} type="text" placeholder="By Name" id="txt" name="txt" />

                <label htmlFor="minPrice">Min Price: </label>
                <input value={minPrice} onChange={handleChange} type="number" placeholder="By Min Price" id="minPrice" name="minPrice" />

                <button>Set Filter</button>
            </form>
        </section>
    )
}