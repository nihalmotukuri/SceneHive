import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchMovies from './pages/SearchMovies'
import Trending from './pages/Trending'
import MovieDetails from './pages/MovieDetails'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        {/* <Route path="/favorites" />
        <Route path="/*" /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
