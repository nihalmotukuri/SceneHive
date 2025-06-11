import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'
import './index.css'

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/" style={{width: "250px", fontFamily: "\"Cormorant Garamond\", serif", fontSize: '24px'}}>Scene Hive</Link>

                <ul>
                    <Link to="/">Home</Link>
                    {/* <Link to="/genres">Genres</Link> */}
                    <Link to="/trending">Trending</Link>
                    <Link to="/favorites">Favorites</Link>
                </ul>
                 
                 <ul>
                    <SearchBar />
                 </ul>
            </nav>
        </header>
    )
}

export default Header