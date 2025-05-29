import { useMovieContext } from '../../contexts/MovieContext'
import MovieCard from '../../components/MovieCard'
import './index.css'

const Favorites = () => {
    const movieContext = useMovieContext()
    const favorites = movieContext?.favorites ?? []

    return (
        <section>
            <h1 className="heading">FAVORITES</h1>
            <div className="favorites-container">
                {
                    favorites.length > 0
                    ? favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                    : <p style={{textAlign: "center"}} >Add your favorites</p>
                }
            </div>
        </section>
    )
}

export default Favorites