import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../MovieCard'
import './index.css'

const Trending = () => {
    const [trending, setTrending] = useState([])

    useEffect(() => {
        // setTrendingLoading(true)

        const fetchTrailerVideos = async (movieId) => {
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
                    results.map(async (movie) => {
                        const videos = await fetchTrailerVideos(movie.id)
                        const trailer = videos.find((video) => video.site === "YouTube" && video.type === "Trailer")
                        const trailerKey = trailer ? trailer.key : null
                        if (!trailerKey) return null
                        return {
                            ...movie,
                            trailerKey
                        }
                    })
                )
                const validMovies = movieDetails.filter(movie => movie !== null).slice(0, 5)
                setTrending(validMovies)
            } catch (err) {
                console.error(err)
            } finally {
                // setTrendingLoading(false)
            }
        }

        fetchTrending()
    }, [])

  return (
    <section className='trending-section'>
        <div className='section-header'>
            <h1 className='heading'>TRENDING NOW</h1>

            <Link to="/trending">See More</Link>
        </div>

        <div className='trending-grid'>
            {trending.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
    </section>
  )
}

export default Trending