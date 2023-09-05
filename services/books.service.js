import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import demoBooks from '../books-demo-list.js'

const BOOKS_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    createBook,
    createListPrice,
    addReview,
    getGoogleBooks: getGoogleBooks
}

function query(filterBy = {}) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            return _setNextPrevBookId(book)
        })
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOKS_KEY, book)
    } else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = demoBooks
        // books = []
        // books.push(_createBook('The book EP.1', createListPrice(150, 'EUR', false)))
        // books.push(_createBook('Best book ever', createListPrice(55, 'NIS', true)))
        utilService.saveToStorage(BOOKS_KEY, books)
    }
}

function createBook(title, listPrice = {}, thumbnail = "http://coding-academy.org/books-photos/2.jpg") {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    book.thumbnail = thumbnail
}

function createListPrice(amount, currencyCode, isOnSale) {
    return { amount, currencyCode, isOnSale }
}

function getDefaultFilter() {
    return { txt: '', minPrice: 0 }
}

function addReview(bookId, review) {
    review.id = utilService.makeId()
    return get(bookId)
        .then(book => {
            if (book.reviews) book.reviews = [...book.reviews, review]
            else book.reviews = [review]
            return book
        })
        .then(save)
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOKS_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function getEmptyBook() {
    return {
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: 1900,
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '../assets/imgs/20.jpg',
        language: 'en',
        listPrice: {
            amount: 0,
            currencyCode: 'EUR',
            isOnSale: false,
        },
    }
}

function prepareData(book) {
    const { volumeInfo: { title, subtitle, authors, publishedDate, description, pageCount, categories, imageLinks, language } } = book
    const newBook = {
        title,
        subtitle: subtitle || title,
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        language,
        thumbnail: imageLinks.thumbnail
    }
    return newBook
}


function getGoogleBooks(keyword) {
    const cachedData = localStorage.getItem(`googleBooksCache_${keyword}`);

    if (cachedData) {
        console.log('from Cache')
        return Promise.resolve(JSON.parse(cachedData));
    } else {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`)
            .then(res => res.data.items)
            .then(books => {
                const booksToController = books.map(book => prepareData(book));

                localStorage.setItem(`googleBooksCache_${keyword}`, JSON.stringify(booksToController));
                console.log('from API')
                return booksToController;
            })
            .catch(err => eventBusService.showErrorMsg('Error - Couldn\'t  load book'))
    }
}