import { Link } from 'react-router-dom'
import './index.css'

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">Scene Hive</Link>
                 
                 <ul>
                    <Link to="/favorites">Favorites</Link>
                 </ul>
            </nav>
        </header>
    )
}

export default Header