import { Link, NavLink } from 'react-router-dom'
import './index.css'

const Header = () => {
    return (
        <header>
            <nav>
                <Link
                    to="/"
                    style={{
                        width: "250px",
                        fontFamily: "\"Cormorant Garamond\", serif",
                        fontSize: '24px',
                        letterSpacing: "1.5px",
                        border: "none"
                    }}>
                    Scene Hive
                </Link>

                <ul>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                    {/* <NavLink to="/search" className={({ isActive }) => (isActive ? 'active-link' : '')}>Search</NavLink> */}
                    <NavLink to="/trending" className={({ isActive }) => (isActive ? 'active-link' : '')}>Trending</NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active-link' : '')}>Favorites</NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Header