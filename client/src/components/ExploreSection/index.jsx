import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import { useNavigate } from 'react-router-dom';

const ExploreSection = () => {
  const [trendingSearches, setTrendingSearches] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTrending = async () => {
      const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=ab2e9fcb961ed38190348436b4044af8`
      try {
        const res = await fetch(url)
        const data = await res.json()
        setTrendingSearches(data.results.slice(0, 5))
      } catch (err) {
        console.error(err)
      }
    }

    fetchTrending()
  }, [])

  useEffect(() => {
    const fetchPopular = async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=ab2e9fcb961ed38190348436b4044af8&language=en-US&page=1`
      try {
        const res = await fetch(url)
        const data = await res.json()
        setPopularMovies(data.results)
      } catch (err) {
        console.error(err)
      }
    }

    fetchPopular()
  }, [])

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  return (
    <section className='explore-section'>
      <div className='explore-trending'>
        <h3>TRENDING SEARCHES</h3>

        <ul>
          {/* <li>Sinners</li>
          <li>How to Train Your Dragon</li>
          <li>Mission: Impossible - The Final Reckoning</li>
          <li>Ballerina</li> */}
          {trendingSearches.map(t => <li key={t.id} onClick={() => navigate(`/search?q=${t.title}`)}>{t.title}</li>)}
        </ul>
      </div>

      <div className='explore-popular'>
        <h3>POPULAR RIGHT NOW</h3>

        <div className='popular-slider'>
          <Slider {...settings}>
            {popularMovies.map(m => (
              <div
                id={m.id}
                className='popular-movie-card'>
                <img
                  src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                  alt={m.title} />
              </div>))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default ExploreSection