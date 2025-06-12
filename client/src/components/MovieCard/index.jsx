import { useNavigate } from 'react-router-dom'
import { IoIosHeart } from "react-icons/io";
import './index.css'


const MovieCard = ({ movie }) => {
    const navigate = useNavigate()
    // const movieContext = useMovieContext()
    // const addToFavorites = movieContext?.addToFavorites
    // const isFavorite = movieContext?.isFavorite
    // const favColor = isFavorite && isFavorite(movie.id) ? "red" : "white"

    // const onFavorite = (e) => {
    //     e.stopPropagation()
    //     return addToFavorites && addToFavorites(movie)
    // }

    const getMovieDetails = (movieId) => {
        navigate(`/movie/${movieId}`)
    }

    const releaseDate = movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ''
    const movieTitle = `${movie.title} ${releaseDate}`

    return (
        <div className="movie-card" >
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
            />

            <div className='mc-overlay'>
                {movie.vote_average? <p className='mc-rating'>{movie.vote_average.toFixed(1)}</p> : null}
                <h3 className='mc-title'>{movieTitle}</h3>
                <button 
                    className='movie-det-btn'  
                    onClick={() => getMovieDetails(movie.id)} >VIEW MORE</button>
            </div>
            
            <IoIosHeart 
                className="fav-icon" />
            {/* <div
                className="fav-icon"
                // onClick={onFavorite}
                // style={{color: favColor}}
                >
                ♥
            </div> */}
        </div>
    )
}

export default MovieCard