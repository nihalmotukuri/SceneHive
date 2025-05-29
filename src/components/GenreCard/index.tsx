import { useNavigate } from 'react-router-dom'
import type { GenreCardProps } from '../../types'
import './index.css'

const GenreCard = ({ genre }: GenreCardProps) => {
  const navigate = useNavigate()

  const onGenreCard = () => {
    navigate(`/genre/${genre.id}`, {state: {genre}})
  }

  return (
    <div className="genre-card" onClick={onGenreCard}>
      <img src={`https://image.tmdb.org/t/p/w300${genre.genrePoster}`} />

      <div className="overlay">
        <h3>{genre.name}</h3>
      </div>
    </div>
  )
}

export default GenreCard