import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import MovieCard from '../../components/MovieCard'
import { FadeLoader } from 'react-spinners'
import './index.css'

const Favorites = () => {
    const [favorites, setFavorites] = useState([])
    const [favoritesLoading, setFavoritesLoading] = useState(false)

    useEffect(() => {
        setFavoritesLoading(true)

        const fetchFavorites = async () => {
            const url = `http://localhost:5000/favorites`
            const token = Cookies.get('jwt_token')
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            try {
                const res = await fetch(url, options)
                const data = await res.json()
                setFavorites(data)
            } catch (err) {
                console.error(err)
            } finally {
                setFavoritesLoading(false)
            }
        }

        fetchFavorites()
    }, [])

    return (
        <>
            <Header />
            <section className='favorites-page'>
                <h1 className="heading">FAVORITES</h1>

                {favoritesLoading
                    ? <div className='favorites-loader'>
                        <FadeLoader
                            loading={favoritesLoading}
                            color="grey"
                            cssOverride={{
                                display: 'block',
                                margin: '100px auto',
                                borderColor: '#007bff',
                            }}
                            aria-label="Loading Spinner"
                            data-testid="loader" />
                    </div>
                    : <div className="favorites-container">
                        {favorites.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                    </div>
                }
            </section>
        </>
    )
}

export default Favorites 