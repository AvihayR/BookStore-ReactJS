import { bookService } from "../services/books.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"


const { useState, useEffect } = React

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [isBookEdit, setBookEdit] = useState(false)


    useEffect(() => {
        bookService.query(filterBy).then(books => setBooks(books))
    }, [filterBy])


    function onAddBook(title, listPriceObj) {
        bookService.createBook(title, listPriceObj)
            .then(setFilterBy(bookService.getDefaultFilter()))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {isBookEdit && <BookEdit onAddBook={onAddBook} onSetBookEdit={setBookEdit} />}

            {!selectedBookId && !isBookEdit &&
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <button onClick={() => { setBookEdit(true) }}>Add a new book</button>
                    <BookList books={books} onRemoveBook={onRemoveBook} onSelectBookId={onSelectBookId} />
                </React.Fragment>
            }
            {selectedBookId && <BookDetails onBack={() => onSelectBookId(null)} bookId={selectedBookId} />}
        </section>
    )
}
