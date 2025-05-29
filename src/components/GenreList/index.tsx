import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Genre } from '../../types'
import GenreCard from '../GenreCard'
import './index.css'

const GenreList = () => {
    const [genreList, setGenreList] = useState<Genre[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGenres = async () => {
            const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=ab2e9fcb961ed38190348436b4044af8&language=en-US`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const genres: Genre[] = data.genres
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
            }
        }

        fetchGenres()
    }, [])

    console.log(genreList)

    const onViewAll = () => {
        navigate('/genre', {
            state: { genreList }
        })
    }

    return (
        <div className="genres-container">
            {genreList
                .slice(0, 4)
                .map((genre: Genre) => <GenreCard key={genre.id} genre={genre} />)
            }

            <div className="genre-card" onClick={onViewAll}>
                <img src={`https://www.companyfolders.com/blog/media/2017/07/moon.jpg`} />

                <div className="overlay">
                    <h3 className="view-more">View more</h3>
                </div>
            </div>
        </div>
    )
}

export default GenreList