import Header from '../../components/Header'
import UpcomingMovies from '../../components/UpcomingMovies'
import Banner from '../../components/Banner'
import Trending from '../../components/Trending'
import Genres from '../../components/Genres'
import './index.css'

const Home = () => {

    return (
        <>
            <Header />
            <main className="home-section">
                <Banner />
                <UpcomingMovies />
                <Trending />
                {/* <Genres /> */}
            </main>
        </>
    )
}

export default Home