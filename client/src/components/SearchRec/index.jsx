import { useNavigate, useLocation } from 'react-router-dom'
import './index.css'

const SearchRec = ({ currentSearchResults, isTyping, setIsRecHovered, setIsTyping }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchRecTop = location.pathname === "/search" ? "84px" : "42px"

  // const onSearchRec = (e) => {
  //   setSearchInput(e.currentTarget.innerText)
  //   console.log(e.currentTarget.innerText)
  // }

  const display = isTyping ? "block" : "none"
  const results = currentSearchResults.length
    ? (<ul
      className='search-list'
      onMouseEnter={() => setIsRecHovered(true)}
      onMouseLeave={() => setIsRecHovered(false)} >
      {currentSearchResults.map(m => {
        const isLastItem = currentSearchResults[currentSearchResults.length - 1] === m ? "" : "1px solid grey"
        return (
          <li 
            key={m.id} 
            style={{borderBottom: isLastItem}} 
            onMouseDown={() => navigate(`/movie/${m.id}`)}
            onClick={() => setIsTyping(false)} >
            <img
              style={{ width: "36px" }}
              src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
              alt={m.title} />

            <div>
              <h4>{m.title}</h4>
              <p>{m.release_date?.slice(0, 4)}</p>
            </div>
          </li>
        )
      })}
    </ul>)
    : (<p style={{ padding: "10px 0", textAlign: "center" }} >No search results found</p>)

  return (
    <div className="search-rec" style={{ display: display, top: searchRecTop }}>
      {results}
    </div>
  )
}

export default SearchRec