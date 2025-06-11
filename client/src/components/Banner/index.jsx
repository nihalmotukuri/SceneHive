import { useNavigate } from 'react-router-dom'
import './index.css'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <section className='banner'>
            <video
                className='banner-clip'
                autoPlay
                muted
                loop
                disablePictureInPicture >
                <source src='banner-clip.mp4' />
            </video>

            <div className='banner-overlay'>
                <h1>Dune<br />Part Two</h1>

                <p>
                    Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.
                </p>

                <button
                    className='view-more-btn'
                    onClick={() => navigate('/movie/693134')}
                >
                    VIEW MORE
                </button>
            </div>
        </section>
    )
}

export default Banner