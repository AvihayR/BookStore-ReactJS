export function Review({ reviewContent }) {
    // console.log(reviewContent)

    return (
        <article className="review">
            <h1>By: {reviewContent.fullName}</h1>
            <h2>Rating: {reviewContent.rating}</h2>
            <h3>Read at: {reviewContent.readAt}</h3>
            <h5>Review ID: {reviewContent.id}</h5>
        </article>
    )
}