import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player';
import './index.css'

const movieGenres: Record<number, string> = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

const MovieDetails = () => {
    const location = useLocation()
    const { movie } = location.state
    const releaseYear = movie.release_date.slice(0, 4)
    const genres = movie.genre_ids.map((id: number) => movieGenres[id]).join(' / ')
    const [provider, setProvider] = useState<string>('')
    console.log(movie)

    useEffect(() => {
        const fetchProviders = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=ab2e9fcb961ed38190348436b4044af8`
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
    }, [])

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

    return (
        <section className="md-section">
            <div className="wrap">
                <div className="movie-details">
                    <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <div>
                        <h1><strong>{movie.title}</strong></h1>
                        <p className="year">{releaseYear}</p>
                        <p className="genres">{genres}</p>
                        <p className="rating"><span className='star'>★</span> {movie.vote_average.toFixed(1)}</p>
                        {provider
                            ? streamOn
                            : ''
                        }
                    </div>
                </div>

                <ReactPlayer className='trailer-player' url={`https://www.youtube.com/embed/${movie.trailerKey}`} />
            </div>
        </section>
    )
}

export default MovieDetails