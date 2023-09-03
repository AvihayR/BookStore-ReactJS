const { useState, useEffect } = React

export function BookEdit({ onAddBook, onSetBookEdit }) {
    const [formFields, setFormFields] = useState(null)

    function onCreateNewBook(ev) {
        ev.preventDefault()
        if (!formFields) return
        const { title, amount, currencyCode, isOnSale } = formFields
        const listPrice = { amount, currencyCode, isOnSale }

        onAddBook(title, listPrice)
        onSetBookEdit(false)
    }


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

        setFormFields(prevFormFields => ({ ...prevFormFields, [field]: value }))
    }

    return (
        <form onChange={handleChange} onSubmit={onCreateNewBook}>
            <label>Book title: <input type="text" required name="title" /></label>
            <label>Book Price: <input type="number" required name="amount" /></label>
            <label>Currency: <input type="text" required name="currencyCode" /></label>
            <label>On Sale: <input type="checkbox" name="isOnSale" /></label>
            <button>Submit</button>
        </form>
    )
}