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
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  const [token, setToken] = useState(Cookies.get('jwt_token'))
  const [favorites, setFavorites] = useState([])
  const [favoritesLoading, setFavoritesLoading] = useState(false)

  // useEffect(() => {
  //   const checkTokenInterval = setInterval(() => {
  //     const currentToken = Cookies.get('jwt_token')
  //     if (currentToken) {
  //       setToken(currentToken)
  //       clearInterval(checkTokenInterval)
  //     }
  //   }, 500)

  //   return () => clearInterval(checkTokenInterval)
  // }, [])

  useEffect(() => {
    const currentToken = Cookies.get('jwt_token');
    if (currentToken) {
      setToken(currentToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return setFavorites([])

    setFavoritesLoading(true)

    const fetchFavorites = async () => {
      const url = `https://scenehive.onrender.com/api/favorites`
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
  }, [token])

  console.log(favorites)

  const isFavorite = (movieId) => {
    if (favorites !== undefined) {
      return favorites.some(fav => fav.id === movieId)
    }
  }

  const addToFavorites = async (movie) => {
    const url = `https://scenehive.onrender.com/api/favorites`
    const token = Cookies.get('jwt_token')
    const alreadyFav = isFavorite(movie.id) ? "DELETE" : "POST"

    const options = {
      method: alreadyFav,
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

  const value = {
    favorites,
    setFavorites,
    favoritesLoading,
    addToFavorites,
    isFavorite,
    token,
    setToken
  }

  return (
    <BrowserRouter>
      <FavoritesContext value={ value }>
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
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={true}
          theme="dark"
          closeOnClick={true} />
      </FavoritesContext>
    </BrowserRouter>
  )
}

export default App
