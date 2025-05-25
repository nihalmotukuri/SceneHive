import React, { useState } from 'react'
import type { Movie, Video } from '../../types.ts'
import SearchResults from '../../components/SearchResults'
import './index.css'

const MovieSearch = () => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [searchResults, setSearchResults] = useState<Movie []>([])

    const handleMovieSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const getVideos = async (movieId: number): Promise<Video[] | undefined> => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ab2e9fcb961ed38190348436b4044af8`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results
                return results as Video[]
            } catch (err) {
                console.error(err)
            }
        }
        
        const fetchMovies = async (): Promise<void> => {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=ab2e9fcb961ed38190348436b4044af8&query=${searchInput}`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results
                const movieDetails = await Promise.all(
                    results.map(async (movie: Movie) => {
                        const videos: Video[] | undefined = await getVideos(movie.id)
                        console.log(videos)
                        const trailer: Video | undefined = videos && videos.find(
                            (video: Video) => video.type === "Trailer" && video.site === "YouTube"
                        )
                        const trailerKey: string | null = trailer ? trailer.key : null 
                        if (!trailerKey) null 
                        return {
                            ...movie,
                            trailerKey
                        }
                    })
                )
                const validMovies: Movie[] = movieDetails.filter(movie => movie.trailerKey)
                setSearchResults(validMovies)
                console.log(validMovies)
            } catch (err) {
                console.error(err)
            }
        }

        fetchMovies()
        setSearchInput('')
    }

    return (
        <section>
            <h1 className="heading">MOVIE SEARCH</h1>

            <form
                onSubmit={handleMovieSearch} >
                <input 
                    type="search"
                     value={searchInput}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSearchInput(e.currentTarget.value)}} />

                <button type="submit">Search</button>
            </form>

            <SearchResults searchResults={searchResults} />
        </section>
    )
}

export default MovieSearch