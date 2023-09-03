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
    createBook
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

function getEmptyBook(title = '', listPrice = {}) {
    return { id: '', title, listPrice }
}

function createBook(title, listPrice = {}, thumbnail = "http://coding-academy.org/books-photos/2.jpg") {
    const book = getEmptyBook(title, listPrice)
    book.id = utilService.makeId()
    book.thumbnail = thumbnail

    query()
        .then(books => utilService.saveToStorage(BOOKS_KEY, [...books, book]))

    return Promise.resolve(book)
}

function createListPrice(amount, currencyCode, isOnSale) {
    return { amount, currencyCode, isOnSale }
}

function getDefaultFilter() {
    return { txt: '', minPrice: 0 }
}