import { bookService } from "../services/books.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('Error:', err))
    }, [filterBy])


    // function onAddBook(title, listPriceObj) {
    //     bookService.createBook(title, listPriceObj)
    //         .then(book => setBooks([...books, book]))
    //         .catch(err => console.log('Error:', err))
    // }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('Error:', err))
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">

            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <Link to="/book/edit">Add Book</Link>
            <BookList books={books} onRemoveBook={onRemoveBook} />

        </section>
    )
}
