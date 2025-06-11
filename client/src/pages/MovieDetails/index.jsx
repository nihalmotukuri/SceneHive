import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import Header from '../../components/Header'
import { FadeLoader } from 'react-spinners'
import './index.css'

const MovieDetails = () => {
    const pathParam = useParams()
    const movieId = pathParam.movieId
    const [movie, setMovie] = useState(null)
    // const releaseYear = movie.release_date.slice(0, 4)
    // const genres = movie.genre_ids.map((id) => movieGenres[id]).join(' / ')
    const [provider, setProvider] = useState('')

    useEffect(() => {
        const getVideos = async (movieId) => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ab2e9fcb961ed38190348436b4044af8`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results
                return results
            } catch (err) {
                console.error(err)
            }
        }

        const fetchMovies = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=ab2e9fcb961ed38190348436b4044af8`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const videos = await getVideos(movieId)
                const trailer = videos.find(v => v.type === "Trailer" && v.site === "YouTube")
                const trailerKey = trailer ? trailer.key : null
                const movieDetails = trailerKey ? { ...data, trailerKey } : data
                setMovie(movieDetails)
            } catch (err) {
                console.error(err)
            }
        }

        fetchMovies()
    }, [movieId])

    useEffect(() => {
        const fetchProviders = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=ab2e9fcb961ed38190348436b4044af8`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const logoPath = data.results.IN.flatrate[0].logo_path
                setProvider(logoPath)
            } catch (err) {
                console.error(err)
            }
        }

        fetchProviders()
    }, [movieId])

    const streamOn = <div className='stream-on'>
        <p>Stream On: </p>
        <img
            src={`https://image.tmdb.org/t/p/w92${provider}`}
            alt="Provider Logo"
            width={36}
            height={36}
            style={{ borderRadius: "6px" }}
        />
    </div>

    console.log(movie)

    const pageContents = () => {
        if (!movie) return (
            <div>
                <FadeLoader
                    loading
                    height={15}
                    width={5}
                    color="grey"
                    cssOverride={{
                        display: 'block',
                        margin: '100px auto',
                        borderColor: '#007bff'
                    }}
                    aria-label="Loading Spinner"
                    data-testid="loader" />
            </div>
        )
        
        const movieRating = movie.vote_average.toFixed(1)

        return (
            <>
                <div className='backdrop-wrap'>
                    <div className='backdrop' >
                        <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} />
                    </div>
                </div>

                <div className="wrap">
                    <div className="movie-details">
                        <img
                            className="movie-poster"
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                        />

                        <div>
                            <h1><strong>{movie.title}</strong></h1>
                            <p className='overview'>{movie.overview}</p>
                            <p className="year">{movie.release_date.slice(0, 4)}</p>
                            <p className="genres">{movie.genres?.map(g => g.name).join(' / ') || ''}</p>
                            {movieRating > 0
                                ? <p className="rating"><span className='star'>★</span> {movieRating}</p>
                                : ''
                            }
                            {provider
                                ? streamOn
                                : ''
                            }
                        </div>
                    </div>

                    {movie.trailerKey
                        ? (<ReactPlayer
                            className='trailer-player'
                            url={`https://www.youtube.com/embed/${movie.trailerKey}`} />)
                        : ''
                    }
                </div>
            </>
        )
    }

    return (
        <>
            <Header />

            <main className="md-page">
                {pageContents()}
            </main>
        </>
    )
}

export default MovieDetails