import Header from '../../components/Header'
import MovieCard from '../../components/MovieCard'
import { FadeLoader } from 'react-spinners'
import FavoritesContext from '../../contexts/FavoritesContext'
import { use } from 'react'
import './index.css'

const Favorites = () => {
    const { favorites, favoritesLoading} = use(FavoritesContext)

    return (
        <>
            <Header />
            
            <section className='favorites-page'>
                <h1 className="heading">FAVORITES</h1>

                {favoritesLoading
                    ? <div className='favorites-loader'>
                        <FadeLoader
                            loading={favoritesLoading}
                            color="grey"
                            cssOverride={{
                                display: 'block',
                                margin: '100px auto',
                                borderColor: '#007bff',
                            }}
                            aria-label="Loading Spinner"
                            data-testid="loader" />
                    </div>
                    : <div className="favorites-container">
                        {favorites.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                    </div>
                }
            </section>
        </>
    )
}

export default Favorites 