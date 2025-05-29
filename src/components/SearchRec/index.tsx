import type React from 'react'
import type { SearchRecProps } from '../../types'
import './index.css'

const SearchRec = ({ currentSearchResults, isTyping, setSearchInput, setIsRecHovered }: SearchRecProps) => {
  const onSearchRec = (e: React.MouseEvent<HTMLLIElement>) => {
    setSearchInput(e.currentTarget.innerText)
    console.log(e.currentTarget.innerText)
  }

  const display = isTyping ? "block" : "none"
  const results = currentSearchResults.length
    ? <ul 
        className='search-list'
        onMouseEnter={() => setIsRecHovered(true)}
        onMouseLeave={() => setIsRecHovered(false)} >
      {currentSearchResults.map(m => <li key={m.id} onMouseDown={onSearchRec}>{m.title}</li>)}
    </ul>
    : <p style={{ padding: "8px 0" }} >No search results found</p>

  return (
    <div className="search-rec" style={{ display: display }}>
      {results}
    </div>
  )
}

export default SearchRec