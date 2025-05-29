import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieSearch from './pages/MovieSearch'
import Trending from './pages/Trending'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'
import Genres from './pages/Genres'
import GenreDetails from './pages/GenreDetails'
import Navbar from './components/Navbar'
import { MovieContextProvider } from './contexts/MovieContext'
import './App.css'

const App = () => {
  return (
    <MovieContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie-search' element={<MovieSearch />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/movie' element={<MovieDetails />} />
          <Route path='/genre' element={<Genres />} />
          <Route path='/genre/:genreId' element={<GenreDetails />} />
        </Routes>
      </BrowserRouter>
    </MovieContextProvider>
  )
}

export default App
