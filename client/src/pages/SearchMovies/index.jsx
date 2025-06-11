import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchHeader from '../../components/SearchHeader'
import SearchRec from '../../components/SearchRec'
import SearchResults from '../../components/SearchResults'
import { FadeLoader } from 'react-spinners'
import ExploreSection from '../../components/ExploreSection'
import './index.css'

const SearchMovies = () => {
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [onSearch, setOnSearch] = useState(false)
    const [currentSearchResults, setCurrentSearchResults] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [isRecHovered, setIsRecHovered] = useState(false)
    const [displayExplore, setDisplayExplore] = useState(true)
    const [filteredResults, setFilteredResults] = useState([]);

    const [queryParams, setQueryParams] = useSearchParams()
    const query = queryParams.get('q')
    const genreQuery = queryParams.get('genre')

    useEffect(() => {
        const movieGenres = {
            action: 28,
            adventure: 12,
            animation: 16,
            comedy: 35,
            crime: 80,
            documentary: 99,
            drama: 18,
            family: 10751,
            fantasy: 14,
            history: 36,
            horror: 27,
            music: 10402,
            mystery: 9648,
            romance: 10749,
            'science fiction': 878,
            'tv movie': 10770,
            thriller: 53,
            war: 10752,
            western: 37
        }

        if (!genreQuery) {
            setFilteredResults(searchResults)
            return
        }

        const genreId = movieGenres[genreQuery.trim().toLocaleLowerCase()]

        // setQueryParams({ genre: genreQuery })

        const filteredMovies = searchResults.filter(
            m =>
                (m.genres && m.genres.some(g => g.id === genreId)) ||
                (m.genre_ids && m.genre_ids.includes(genreId))
        )

        setFilteredResults(filteredMovies)
    }, [genreQuery, searchResults])

    useEffect(() => {
        if (!query) return

        setDisplayExplore(false)
        setIsLoading(true)
        setOnSearch(true)
        setIsTyping(false)
        setQueryParams(prev => ({
            ...Object.fromEntries(prev.entries()),
            q: query
        }))

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
            const url = `https://api.themoviedb.org/3/search/movie?api_key=ab2e9fcb961ed38190348436b4044af8&query=${encodeURIComponent(query)}`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results.filter(m => m.poster_path)
                const movieDetails = await Promise.all(
                    results.map(async (movie) => {
                        const videos = await getVideos(movie.id)
                        const trailer = videos && videos.find(
                            (video) => video.type === "Trailer" && video.site === "YouTube"
                        )
                        const trailerKey = trailer ? trailer.key : null
                        if (!trailerKey) movie
                        return {
                            ...movie,
                            trailerKey
                        }
                    })
                )
                setSearchResults(movieDetails)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
                setSearchInput('')
            }
        }

        fetchMovies()
    }, [query, setQueryParams])

    const handleMovieSearch = (e) => {
        e.preventDefault()
        setDisplayExplore(false)
        setIsLoading(true)
        setOnSearch(true)
        setIsTyping(false)
        setQueryParams(prev => ({
            ...Object.fromEntries(prev.entries()),
            q: searchInput
        }))

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
            const url = `https://api.themoviedb.org/3/search/movie?api_key=ab2e9fcb961ed38190348436b4044af8&query=${searchInput}`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results.filter(m => m.poster_path)
                const movieDetails = await Promise.all(
                    results.map(async (movie) => {
                        const videos = await getVideos(movie.id)
                        const trailer = videos && videos.find(
                            (video) => video.type === "Trailer" && video.site === "YouTube"
                        )
                        const trailerKey = trailer ? trailer.key : null
                        if (!trailerKey) movie
                        return {
                            ...movie,
                            trailerKey
                        }
                    })
                )
                const validMovies = movieDetails
                setSearchResults(validMovies)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
                setSearchInput('')
            }
        }

        fetchMovies()
    }

    const getSearchRecommendations = (e) => {
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
                const results = data.results.filter(m => m.poster_path).slice(0, 5)
                setCurrentSearchResults(results)
            } catch (err) {
                console.error(err)
            }
        }

        fetchSearchRec()
    }

    return (
        <>
            <SearchHeader />

            <main>
                <section className="search-section">
                    <h1 className="heading">MOVIE SEARCH</h1>

                    <div className="search-part">
                        <form
                            className="search-component-sg"
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
                                }}
                                autoFocus />

                            <button type="submit">Search</button>
                        </form>

                        <SearchRec
                            currentSearchResults={currentSearchResults}
                            isTyping={isTyping}
                            setSearchInput={setSearchInput}
                            setIsRecHovered={setIsRecHovered}
                            setIsTyping={setIsTyping} />
                    </div>

                    {displayExplore
                        ? (<ExploreSection />)
                        : (isLoading
                            ? (<FadeLoader
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
                                data-testid="loader" />)
                            : (<SearchResults
                                searchResults={filteredResults}
                                onSearch={onSearch} />))
                    }
                </section>
            </main>
        </>
    )
}

export default SearchMovies