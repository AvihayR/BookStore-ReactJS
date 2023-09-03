
export function BookPreview({ book }) {
    const { title, listPrice, thumbnail: imgUrl } = book
    const { amount: price, currencyCode: currency } = listPrice

    return (
        <article>
            <h1>{title}</h1>
            <h2>{price} {currency}</h2>
            <img src={imgUrl} />
        </article>
    )
}