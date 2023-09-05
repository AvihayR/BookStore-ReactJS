const { useState, useEffect, Fragment } = React
const { useNavigate } = ReactRouterDOM
import { bookService } from "../services/books.service.js"
import { utilService } from "../services/util.service.js"

export function AddGoogleBook() {
    let [books, setBooks] = useState(null)

    const navigate = useNavigate()

    function getBooksFromGoogle(keyword) {
        bookService.getGoogleBooks(keyword)
            .then(setBooks)
            .catch(err => console.log('Error:', err))
    }

    function saveGoogleBook(book) {
        bookService.save(book)
            .then(eventBusService.showSuccessMsg(`Save book: ${book.title}`))
            .then(navigate('/book'))
    }

    function onChangeKeyword(ev) {
        let keyword = ev.target.value
        keyword = encodeURIComponent(keyword)
        getBooksFromGoogle(keyword)
    }

    if (!books) {
        return (
            <Fragment>
                <SearchBar onChangeKeyword={onChangeKeyword} />
                <span className="google-span">Search a book to begin..</span>
            </Fragment>
        )
    }
    return (
        <Fragment>
            <SearchBar onChangeKeyword={onChangeKeyword} />

            <ul className="google-books">
                {books.map(book => {
                    return (
                        <li key={book.thumbnail}>
                            <h3 className="google-book-title">{book.title}</h3>
                            <button onClick={() => { saveGoogleBook(book) }}>+</button>
                        </li>)
                })}
            </ul>
        </Fragment>
    )
}


function SearchBar({ onChangeKeyword }) {
    return (
        <input className="google-search" type="text" onChange={utilService.debounce(onChangeKeyword, 500)} placeholder="Search for a book.." />
    )
}