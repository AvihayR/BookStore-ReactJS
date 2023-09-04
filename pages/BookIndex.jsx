import { bookService } from "../services/books.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"


const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isBookEdit, setBookEdit] = useState(false)
    // const [selectedBookId, setSelectedBookId] = useState(null)


    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('Error:', err))
    }, [filterBy])


    function onAddBook(title, listPriceObj) {
        bookService.createBook(title, listPriceObj)
            .then(book => setBooks([...books, book]))
            .catch(err => console.log('Error:', err))
    }

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
            <BookList books={books} onRemoveBook={onRemoveBook} />

        </section>
    )
}
