import './index.css'

const Home = () => {
    return (
        <section className="home-section">
            <video 
                className="trailer" 
                autoPlay 
                muted 
                loop 
                disablePictureInPicture >
                <source src="/trailer1.mp4">
                </source>
            </video>
        </section>
    )
}

export default Home