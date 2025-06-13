import { Link, NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar'
import { CiUser } from "react-icons/ci";
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
                        letterSpacing: "1.5px"
                    }}>
                    SceneHive
                </Link>

                <ul>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
                    {/* <Link to="/genres">Genres</Link> */}
                    {/* <NavLink to="/search" className={({ isActive }) => (isActive ? 'active-link' : '')}>Search</NavLink> */}
                    <NavLink to="/trending" className={({ isActive }) => (isActive ? 'active-link' : '')}>Trending</NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'active-link' : '')}>Favorites</NavLink>
                </ul>

                <ul>
                    <SearchBar />
                    <NavLink 
                        to="/profile" 
                        className={({ isActive }) => (isActive ? 'user-icon-ac' : 'user-icon')}>
                        <CiUser />
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Header