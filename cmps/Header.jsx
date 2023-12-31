const { NavLink } = ReactRouterDOM
import { UserMsg } from "./UserMsg.jsx"

export function Header({ onSetPage }) {

    return (
        <header className="app-header">
            <h1>My App</h1>
            <nav className="app-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book/add-g-book">Add a Google Book</NavLink>
                <NavLink to="/book">Books</NavLink>
            </nav>

            <UserMsg />
        </header>
    )
}