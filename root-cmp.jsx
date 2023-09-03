const { useState } = React

import { HomePage } from './pages/homepage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

export function App() {
    const [page, setPage] = useState('home')

    return <section className="app">
        <header className="app-header">
            <h1>My App</h1>
            <nav className="app-nav">
                <a onClick={() => setPage('home')} href="#">Home</a>
                <a onClick={() => setPage('about')} href="#">About</a>
                <a onClick={() => setPage('books')} href="#">Books</a>
            </nav>
        </header>

        <main className="container">
            {page === 'home' && <HomePage />}
            {page === 'about' && <AboutUs />}
            {page === 'books' && <BookIndex />}
        </main>
    </section>
}