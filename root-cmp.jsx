const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { Header } from './cmps/Header.jsx'
import { HomePage } from './pages/homepage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from "./cmps/BookDetails.jsx"
import { Team } from './cmps/Team.jsx'
import { Vision } from './cmps/Vision.jsx'
import { BookEdit } from "./cmps/BookEdit.jsx"
import { AddReview } from './cmps/AddReview.jsx'
import { AddGoogleBook } from './cmps/AddGoogleBook.jsx'

export function App() {

    return (
        <Router>
            <section className="app">
                <Header />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route path="/about" element={<AboutUs />}>
                            <Route path="team" element={<Team />} />
                            <Route path="vision" element={<Vision />} />
                        </Route>

                        <Route path="/book/:bookId" element={<BookDetails />}>
                            <Route path="review" element={<AddReview />} />
                        </Route>
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/book/add-g-book" element={<AddGoogleBook />} />
                        <Route path="/book" element={<BookIndex />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )

}