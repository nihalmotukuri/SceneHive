import type { SearchResultsProps } from '../../types.ts'
import './index.css'

const SearchResults = ({ searchResults }: SearchResultsProps) => {
    return (
        <div>
            {searchResults.map(movie => <div>{movie.title}</div>)}
        </div>
    )
}

export default SearchResults