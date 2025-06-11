import { useState, useEffect } from 'react'
import GenreCard from '../GenreCard'
import './index.css'

const Genres = () => {
    const [genreList, setGenreList] = useState([])

    useEffect(() => {
        // setGenreListLoading(true)

        const fetchGenres = async () => {
            const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=ab2e9fcb961ed38190348436b4044af8&language=en-US`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const genres = data.genres
                const finalGenreList = await Promise.all(
                    genres.map(async (genre) => {
                        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=ab2e9fcb961ed38190348436b4044af8&with_genres=${genre.id}&sort_by=popularity.desc&page=1`)
                        const data = await res.json()
                        const results = data.results
                        const genrePoster = results[0].poster_path
                        return {
                            ...genre,
                            genrePoster
                        }
                    }))
                setGenreList(finalGenreList)
            } catch (err) {
                console.error(err)
            } finally {
                // setGenreListLoading(false)
            }
        }

        fetchGenres()
    }, [])

    return (
        <section className='genres-section'>
            <div className='section-header'>
                <h1 className='heading'>BROWSE BY GENRE</h1>

                <a>See All</a>
            </div>

            <div className='genres-grid'>
                {genreList
                    .slice(0, 5)
                    .map((genre) => <GenreCard key={genre.id} genre={genre} />)
                }
            </div>
        </section>
    )
}

export default Genres