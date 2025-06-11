import MovieCard from '../MovieCard'
import './index.css'

const SearchResults = ({ searchResults, onSearch }) => {
    const searchText = onSearch ? "No results found" : ""

    return (
        <div className="movies-container">
            {searchResults.length > 0
            ? searchResults.map(movie => <MovieCard key={movie.id} movie={movie} />)
            : <p style={{fontSize: "24px"}}>{searchText}</p>}
        </div>
    )
}

export default SearchResults