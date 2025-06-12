import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchMovies from './pages/SearchMovies'
import Trending from './pages/Trending'
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Favorites from './pages/Favorites'
import ProtectedRoute from './components/ProtectedRoute'
// import FavoritesContext from './contexts/FavoritesContext'
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      {/* <FavoritesContext value={}> */}
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/search" element={
            <ProtectedRoute>
              <SearchMovies />
            </ProtectedRoute>
          } />
          <Route path="/trending" element={
            <ProtectedRoute>
              <Trending />
            </ProtectedRoute>
          } />
          <Route path="/movie/:movieId" element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
          <Route path="/*" />
        </Routes>
      {/* </FavoritesContext> */}
    </BrowserRouter>
  )
}

export default App
