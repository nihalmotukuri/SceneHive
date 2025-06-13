import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchMovies from './pages/SearchMovies'
import Trending from './pages/Trending'
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import FavoritesContext from './contexts/FavoritesContext'
import './App.css'

function App() {
  const [favorites, setFavorites] = useState([])
  const [favoritesLoading, setFavoritesLoading] = useState(false)

  useEffect(() => {
    setFavoritesLoading(true)

    const fetchFavorites = async () => {
      const url = `https://scenehive.onrender.com/api/favorites`
      const token = Cookies.get('jwt_token')
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      try {
        const res = await fetch(url, options)
        const data = await res.json()
        console.log(data)
        setFavorites(data.favorites)
      } catch (err) {
        console.error(err)
      } finally {
        setFavoritesLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  console.log(favorites)

  const isFavorite = (movieId) => {
    if (favorites !== undefined) {
      return favorites.some(fav => fav.id === movieId)
    }
  }

  const addToFavorites = async (movie) => {
    const url = `https://scenehive.onrender.com/api/favorites`
    const token = Cookies.get('jwt_token')
    const alreadyFAv = isFavorite(movie.id) ? "DELETE" : "POST"

    const options = {
      method: alreadyFAv,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(movie)
    }
    try {
      const res = await fetch(url, options)
      const data = await res.json()
      setFavorites(data.favorites)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <BrowserRouter>
      <FavoritesContext value={{ favorites, favoritesLoading, addToFavorites, isFavorite }}>
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
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
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
      </FavoritesContext>
    </BrowserRouter>
  )
}

export default App
