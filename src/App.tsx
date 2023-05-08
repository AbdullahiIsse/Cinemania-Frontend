import './App.css';
import './index.css';
import Movie from './components/Movie';

import movie1Image from './assets/movie.jpeg';
import movie2Image from './assets/movie.jpeg';
import movie3Image from './assets/movie.jpeg';

function App() {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Welcome to My Movie Website made by Lennarrtttt</h1>
            </header>
            <div className="app-content">
                <div className="movie-card-container">
                    <div className="movie-card">
                        <img className="movie-image" src={movie1Image} alt="Movie 1" />
                        <h2 className="movie-title">Movie 1</h2>
                        <p className="movie-description">Movie description blalbla</p>
                        <span className="movie-rating">Rating: 8.5/10</span>
                    </div>
                    <div className="movie-card">
                        <img className="movie-image" src={movie2Image} alt="Movie 2" />
                        <h2 className="movie-title">Movie 2</h2>
                        <p className="movie-description">Movie description blabla</p>
                        <span className="movie-rating">Rating: 7.9/10</span>
                    </div>
                    <div className="movie-card">
                        <img className="movie-image" src={movie3Image} alt="Movie 3" />
                        <h2 className="movie-title">Movie 3</h2>
                        <p className="movie-description">Movie description blabla</p>
                        <span className="movie-rating">Rating: 9.2/10</span>
                    </div>
                </div>
                <Movie />
            </div>
        </div>
    );
}

export default App;
