const { useState, useEffect } = React;
const { useParams } = ReactRouterDOM
import { bookService } from "../services/books.service.js";
import { Review } from "./Review.jsx";

export function ReviewList({ reviews }) {

    if (!reviews) return 'No reviews yet'
    return (
        <section className="reviews">
            {reviews.map(review => <Review key={review.id} reviewContent={review} />)}
        </section>
    )
}