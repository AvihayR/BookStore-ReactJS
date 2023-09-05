// import { AddReview } from "./AddReview.jsx"
import { bookService } from "../services/books.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Outlet, useLocation, Link } = ReactRouterDOM

export function BookDetails({ }) {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => console.log('Error:', err))
    }, [params])

    function renderPageCount() {
        if (book.pageCount > 500) return <p>{book.pageCount}<span> - Serious reading</span></p>
        else if (book.pageCount > 200) return <p>{book.pageCount}<span> - Descent reading</span></p>
        else return <p>{book.pageCount}<span> - Light reading</span></p>
    }


    function renderPublishDate() {
        if (book.publishedDate)
            return (
                <React.Fragment>
                    <h2>Published at: </h2>
                    <p>{book.publishedDate} <span>{book.publishedDate > 10 ? '- Vintage' : '- New'}</span> </p>
                </React.Fragment>
            )
    }

    function getAmountClass() {
        if (!book.listPrice) return
        if (book.listPrice.amount > 150) return 'expensive'
        else if (book.listPrice.amount < 50) return 'cheap'
        else return ''
    }

    function renderPrice() {
        if (!book.listPrice) return
        else return (
            <h2 className={getAmountClass()}>
                {`${book.listPrice.amount} ${book.listPrice.currencyCode}`}
            </h2>)
    }

    function onOpenReview() {
        navigate(`${location.pathname}/review`)
    }

    function onBack() {
        navigate('/book')
    }

    if (!book) return <div>Loading book...</div>
    return (
        <section className="book-details">
            <h1>Book title:</h1>
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <img src={book.thumbnail} />
            {book.authors && <h2>By: {book.authors.join()}</h2>}
            <h3>Pages:</h3>
            {renderPageCount()}
            {renderPublishDate()}
            <h1>Description:</h1>
            <p>{book.description}</p>
            <h1>Book price: </h1>

            {renderPrice()}

            <h2>Categories: {book.categories && book.categories.join()}</h2>
            <p>Language: {book.language}</p>
            <small><span>Book id:</span> {book.id}</small>
            <button onClick={onOpenReview}>Add review</button>
            <Outlet />
            <button onClick={onBack}>Back</button>
            <div className="navigate-container">
                <Link className="prev-book navigate" to={`/book/${book.prevBookId}`}>Previous Book</Link>
                |
                <Link className="next-book navigate" to={`/book/${book.nextBookId}`}>Next Book</Link>
            </div>
            {book.listPrice && book.listPrice.isOnSale && <div className="sale">On sale!</div>}
        </section>
    )
}