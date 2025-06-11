import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import SearchRec from '../SearchRec'
import './index.css'

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('')
  // const [searchResults, setSearchResults] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [onSearch, setOnSearch] = useState(false)
  const [currentSearchResults, setCurrentSearchResults] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isRecHovered, setIsRecHovered] = useState(false)

  const location = useLocation()
  useEffect(() => {
    setIsTyping(false)
  }, [location])

  const navigate = useNavigate()

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

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${searchInput}`)
  }

  return (
    <div className="search-component">
      <form 
      className="search-bar"
      onSubmit={handleSearch} >
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

        <button className="submit-search">
          <CiSearch className="search-icon" />
        </button>
      </form>

      <SearchRec
        currentSearchResults={currentSearchResults}
        isTyping={isTyping}
        setSearchInput={setSearchInput}
        setIsRecHovered={setIsRecHovered}
        setIsTyping={setIsTyping} />
    </div>
  )
}

export default SearchBar