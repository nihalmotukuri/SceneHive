import React, { useState } from 'react'
import type { Movie, Video } from '../../types'
import SearchResults from '../../components/SearchResults'
import GenreList from '../../components/GenreList'
import { FadeLoader } from 'react-spinners'
import SearchRec from '../../components/SearchRec'
import './index.css'

const MovieSearch = () => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [searchResults, setSearchResults] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [onSearch, setOnSearch] = useState<boolean>(false)
    const [currentSearchResults, setCurrentSearchResults] = useState<Movie[]>([])
    const [isTyping, setIsTyping] = useState<boolean>(false)
    // const [recommededSearchInput, setRecmmendedSearchInput] = useState<string | undefined>(undefined)
    const [isRecHovered, setIsRecHovered] = useState(false)

    const handleMovieSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        setIsLoading(true)
        setOnSearch(true)
        setIsTyping(false)

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
            } finally {
                setIsLoading(false)
            }
        }

        fetchMovies()
        setSearchInput('')
    }

    const getSearchRecommendations = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setSearchInput(value)
        setIsTyping(true)

        if (!value.trim()) {
            setCurrentSearchResults([])
            setIsTyping(false)
            return
        }

        const fetchSearchRec = async () => {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=ab2e9fcb961ed38190348436b4044af8&query=${value}`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results.slice(0, 5)
                setCurrentSearchResults(results)
            } catch (err) {
                console.error(err)
            }
        }

        fetchSearchRec()
    }

    return (
        <section className="search-section">
            <h1 className="heading">MOVIE SEARCH</h1>

            <div className="search-part">
                <form
                    className="search-component"
                    onSubmit={handleMovieSearch} >
                    <input
                        type="search"
                        value={searchInput}
                        onChange={getSearchRecommendations}
                        placeholder="Search movies.."
                        onBlur={() => {
                            if (!isRecHovered) setIsTyping(false)
                        }}
                        onFocus={() => {
                            if (currentSearchResults.length > 0) setIsTyping(true);
                        }} />

                    <button type="submit">Search</button>
                </form>

                <SearchRec
                    currentSearchResults={currentSearchResults}
                    isTyping={isTyping}
                    setSearchInput={setSearchInput}
                    setIsRecHovered={setIsRecHovered} />
            </div>

            {isLoading
                ? <FadeLoader
                    loading={isLoading}
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
                : <SearchResults
                    searchResults={searchResults}
                    onSearch={onSearch} />
            }

            {onSearch
                ? ""
                : <GenreList />
            }
        </section>
    )
}

export default MovieSearch