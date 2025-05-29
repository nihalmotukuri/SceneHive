import { useLocation } from 'react-router-dom'
import GenreCard from '../../components/GenreCard'
import type { Genre } from '../../types'
import './index.css'

const Genres = () => {
    const locate = useLocation()
    const { genreList } = locate.state

  return (
    <section className="genre-section">
        <h1 className='heading' style={{ marginBottom: "20px" }}>GENRES</h1>
        
        <div className="genre-container">
            {genreList.map((genre: Genre) => <GenreCard key={genre.id} genre={genre} />)}
        </div>
    </section>
  )
}

export default Genres