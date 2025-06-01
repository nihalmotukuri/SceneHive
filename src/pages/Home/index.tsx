import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Movie, Video } from '../../types'
import MovieCard from '../../components/MovieCard'
import './index.css'

const Home = () => {
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])

    useEffect(() => {
        const getVideos = async (movieId: number): Promise<Video[] | undefined> => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ab2e9fcb961ed38190348436b4044af8`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results
                return results as Video[]
            } catch (err) {
                console.error(err)
            }
        }

        const fetchMovies = async (): Promise<void> => {
            const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=ab2e9fcb961ed38190348436b4044af8&language=en-US&page=1`
            try {
                const res = await fetch(url)
                const data = await res.json()
                const results = data.results
                const movieDetails = await Promise.all(
                    results.map(async (movie: Movie) => {
                        const videos: Video[] = await getVideos(movie.id) || []
                        const trailer: Video | undefined = videos.find(
                            (video: Video) => video.type === "Trailer" && video.site === "YouTube"
                        )
                        const trailerKey: string | null = trailer ? trailer.key : null
                        return {
                            ...movie,
                            trailerKey
                        }
                    })
                )
                const validMovies: Movie[] = movieDetails.filter(movie => movie.trailerKey)
                setUpcomingMovies(validMovies)
                // console.log(validMovies)
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

    console.log(upcomingMovies)

    return (
        <section className="home-section">
            <h1 className="heading">UPCOMING MOVIES</h1>

            <div className="slider-container">
                <Slider {...settings}>
                    {upcomingMovies.map(m => <MovieCard key={m.id} movie={m} />)}
                </Slider>
            </div>
        </section>
    )
}

export default Home