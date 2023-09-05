import { bookService } from "../services/books.service.js"
// import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => console.log('Error:', err))
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
        if (field === 'amount') setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, listPrice: { ...prevBookToEdit.listPrice, [field]: value } }))
        else setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => { navigate('/book') })
            .then(eventBusService.showSuccessMsg(`${bookToEdit.title} updated`))
            .catch(err => {
                console.log('Error:', err)
                eventBusService.showErrorMsg(`Error! ${bookToEdit.title} not updated`)

            })
    }

    const { title, listPrice = { amount: 0, currencyCode: 'USD', isOnSale: false } } = bookToEdit
    const { amount, currencyCode, isOnSale } = listPrice

    return (
        <section className="book-edit">
            <form onSubmit={onSaveBook}>
                <label htmlFor="book-name">Book name:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="book-name" />
                <label htmlFor="book-name">Book Price:</label>
                <input onChange={handleChange} value={amount} type="number" name="amount" id="book-price" />

                <button>Save</button>
            </form>
        </section>
    )
}