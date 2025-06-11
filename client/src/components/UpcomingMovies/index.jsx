import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from '../../components/MovieCard'
import './index.css'

const UpcomingMovies = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([])

    useEffect(() => {
        const getVideos = async (movieId) => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ab2e9fcb961ed38190348436b4044af8`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results
                return results
            } catch (err) {
                console.error(err)
            }
        }

        const fetchMovies = async () => {
            const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=ab2e9fcb961ed38190348436b4044af8&language=en-US&page=1`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results
                const movieDetails = await Promise.all(
                    results.map(async (movie) => {
                        const videos = await getVideos(movie.id) || []
                        const trailer = videos.find(
                            (video) => video.type === "Trailer" && video.site === "YouTube"
                        )
                        const trailerKey = trailer ? trailer.key : null
                        return {
                            ...movie,
                            trailerKey
                        }
                    })
                )
                const validMovies = movieDetails.filter(movie => movie.trailerKey)
                setUpcomingMovies(validMovies)
            } catch (err) {
                console.error(err)
            }
        }

        fetchMovies()
    }, [])

    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1334,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1096,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 848,
                settings: {
                    slideToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    }

    return (
        <section style={{width: '100%'}}>
            <div className='section-header'>
                <h1 style={{paddingTop: "24px", paddingBottom: "36px"}}>UPCOMING MOVIES</h1>
            </div>

            <div className="slider-container">
                <Slider {...settings}>
                    {upcomingMovies.map(m => <MovieCard key={m.id} movie={m} />)}
                </Slider>
            </div>
        </section>
    )
}

export default UpcomingMovies