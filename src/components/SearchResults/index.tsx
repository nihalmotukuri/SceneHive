import type { SearchResultsProps } from '../../types'
import MovieCard from '../MovieCard/index.tsx'
import './index.css'

const SearchResults = ({ searchResults, onSearch }: SearchResultsProps) => {
    const searchText = onSearch ? "No results found" : ""

    return (
        <div className="movies-container">
            {searchResults.length > 0
            ? searchResults.map(movie => <MovieCard key={movie.id} movie={movie} />)
            : <p>{searchText}</p>}
        </div>
    )
}

export default SearchResults