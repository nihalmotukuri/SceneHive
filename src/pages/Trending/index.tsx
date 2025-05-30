import { useState, useEffect } from 'react'
import type { Movie, Video } from '../../types'
import MovieCard from '../../components/MovieCard'
import './index.css'
import { FadeLoader } from 'react-spinners'

const Trending = () => {
    const [trending, setTrending] = useState<Movie[]>([])
    const [tredingLoading, setTrendingLoading] = useState<boolean>(false)

    useEffect(() => {
        setTrendingLoading(true)

        const fetchTrailerVideos = async (movieId: number) => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ab2e9fcb961ed38190348436b4044af8`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results
                return results
            } catch (err) {
                console.log(err)
            }
        }

        const fetchTrending = async () => {
            const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=ab2e9fcb961ed38190348436b4044af8`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results
                const movieDetails = await Promise.all(
                    results.map(async (movie: Movie) => {
                        const videos = await fetchTrailerVideos(movie.id)
                        const trailer = videos.find((video: Video) => video.site === "YouTube" && video.type === "Trailer")
                        const trailerKey = trailer ? trailer.key : null
                        if (!trailerKey) return null
                        return {
                            ...movie,
                            trailerKey
                        }
                    })
                )
                console.log(movieDetails)
                const validMovies: Movie[] = movieDetails.filter(movie => movie !== null)
                setTrending(validMovies)
            } catch (err) {
                console.error(err)
            } finally {
                setTrendingLoading(false)
            }
        }

        fetchTrending()
    }, [])

    return (
        <section>
            <h1 className="heading">TRENDING</h1>
            {tredingLoading
                ? <div className='trending-loader'>
                    <FadeLoader
                        loading={tredingLoading}
                        color="grey"
                        cssOverride={{
                            display: 'block',
                            margin: '100px auto',
                            borderColor: '#007bff',
                        }}
                        aria-label="Loading Spinner"
                        data-testid="loader" />
                </div>
                : <div className="trending-container">
                    {trending.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
            }

        </section>
    )
}

export default Trending