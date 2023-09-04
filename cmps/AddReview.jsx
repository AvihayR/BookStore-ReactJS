const { useState, useEffect } = React
import { bookService } from "../services/books.service.js"
import { ReviewList } from "./ReviewList.jsx"
const { useParams } = ReactRouterDOM

export function AddReview() {
    const [reviewToEdit, setReviewToEdit] = useState(null)
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        getReviewsFromStorage()
    }, [])
    const params = useParams()

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

        setReviewToEdit(prevReviewToEdit => ({ ...prevReviewToEdit, [field]: value }))
    }

    function getReviewsFromStorage() {
        bookService.get(params.bookId)
            .then(book => setReviews(book.reviews))
    }
    // console.log(reviewToEdit)

    function onSaveReview(ev) {
        ev.preventDefault()
        const bookId = params.bookId
        bookService.addReview(bookId, reviewToEdit)
            .then(getReviewsFromStorage)
            .then(eventBusService.showSuccessMsg('Review Sent!'))
            .catch(err => {
                console.log('Error:', err)
                eventBusService.showErrorMsg('Error - Couldn\'t send review')
            })
    }

    return (
        <section className="book-review">

            <ReviewList reviews={reviews} />

            <form onSubmit={onSaveReview} onChange={handleChange}>
                <label htmlFor="full-name">Your name:</label>
                <input type="text" name="fullName" id="full-name" required />
                <label htmlFor="rating">Rating:</label>
                <select defaultValue={1} id="rating" name="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">4</option>
                    <option value="5">5</option>
                </select>
                <label htmlFor="read-at">Read at:</label>
                <input type="date" name="readAt" id="read-at" required />
                <button>Save</button>
            </form>
        </section>
    )
}