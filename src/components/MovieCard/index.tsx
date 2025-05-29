import { useNavigate } from 'react-router-dom'
import type { MovieCardProps } from '../../types'
import { useMovieContext } from '../../contexts/MovieContext'
import type { Movie } from '../../types'
import './index.css'
import type React from 'react'

const MovieCard = ({ movie }: MovieCardProps) => {
    const navigate = useNavigate()
    const movieContext = useMovieContext()
    const addToFavorites = movieContext?.addToFavorites
    const isFavorite = movieContext?.isFavorite
    const favColor = isFavorite && isFavorite(movie.id) ? "red" : "white"

    const onFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        return addToFavorites && addToFavorites(movie)
    }

    const getMovieDetails = (movie: Movie) => {
        navigate('/movie', {state: {movie}})
    }

    return (
        <div className="movie-card" onClick={() => getMovieDetails(movie)} >
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
            />

            <div
                className="fav-icon"
                onClick={onFavorite}
                style={{color: favColor}}
                >
                ♥
            </div>
        </div>
    )
}

export default MovieCard