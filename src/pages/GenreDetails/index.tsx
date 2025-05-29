import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { Movie, Video, Genre } from '../../types'
import MovieCard from '../../components/MovieCard'
import './index.css'

const GenreDetails = () => {
    const { genreId } = useParams()
    const [genreMovies, setGenreMovies] = useState<Movie[]>([])
    const [genreName, setGenreName] = useState('')

    useEffect(() => {
        const fetchGenreName = async () => {
            const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=ab2e9fcb961ed38190348436b4044af8&language=en-US`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const genres = data.genres
                const genreName = genres.find((g: Genre) => g.id === Number(genreId)).name
                setGenreName(genreName)
            } catch (err) {
                console.log(err)
            }
        }

        fetchGenreName()
    }, [])

    useEffect(() => {
        const fetchTrailerKey = async (movieId: number) => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ab2e9fcb961ed38190348436b4044af8`
            const res = await fetch(url)
            const data = await res.json()
            const results = data.results
            return results
        }

        const fetchGenreMovies = async () => {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=ab2e9fcb961ed38190348436b4044af8&with_genres=${genreId}&sort_by=popularity.desc&page=1`
            const res = await fetch(url)
            const data = await res.json()
            const results = data.results
            const movieDetails = await Promise.all(
                results.map((async (movie: Movie) => {
                    const videos: Video[] = await fetchTrailerKey(movie.id)
                    const trailer: Video | undefined = videos.find((video: Video) => video.type === "Trailer" && video.site === "YouTube")
                    const trailerKey = trailer ? trailer.key : null
                    if (!trailer) return null
                    return {
                        ...movie,
                        trailerKey
                    }
                })
                ))
            const validMovies = movieDetails.filter(movie => movie)
            setGenreMovies(validMovies)
        }

        fetchGenreMovies()
    }, [])

    return (
        <section>
            <h1 className="heading">GENRE: {genreName.toLocaleUpperCase()}</h1>

            <div className="movies-container">
                {genreMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </section>
    )
}

export default GenreDetails