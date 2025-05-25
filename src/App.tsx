import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import MovieSearch from './pages/MovieSearch'
import Trending from './pages/Trending'
import Favorites from './pages/Favorites'
import MovieDetails from './pages/MovieDetails'
import Navbar from './components/Navbar'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie-search' element={<MovieSearch />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/movie' element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
