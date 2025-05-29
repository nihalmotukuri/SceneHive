import { Link } from 'react-router-dom'
import './index.css'

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link to="/">Scene Hive</Link>
                 
                 <ul>
                    <Link to="/">Home</Link>
                    <Link to="/movie-search">Search</Link>
                    <Link to="/trending">Trending</Link>
                    <Link to="/favorites">Favorites</Link>
                 </ul>
            </nav>
        </header>
    )
}

export default Navbar