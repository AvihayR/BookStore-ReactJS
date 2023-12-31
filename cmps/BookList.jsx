// import { CarPreview } from "./CarPreview.jsx";
import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {

    return (
        <ul className="book-list">
            {books.map(book =>
                <li className="book-preview-container" key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                        <button><Link to={`/book/${book.id}`}>Details</Link></button>
                        <button><Link className="remove-book" to={`/book/edit/${book.id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}