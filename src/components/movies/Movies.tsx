import { useEffect, useState } from 'react';
import { getPopularMovies, getTopRatedMovies } from './Service.tsx';
import './Movies.css';
import { Link } from 'react-router-dom';
import {getMovieDetails} from "../movieDetails/Service.tsx";

export default function Movies() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getPopularMovies().then((movies) => {
            setPopularMovies(movies);
        });
    }, []);

    useEffect(() => {
        getTopRatedMovies().then((movies) => {
            setTopRatedMovies(movies);
        });
    }, []);

    return (
        <div>
            <h1>Popular Movies</h1>

            <div className="movies">
                {popularMovies.map((movie: Movie) => (
                    <div key={movie.id} className="movieItems">
                        <Link to={`/moviedetails/${movie.id}`} className="movieLink" onClick={() => getMovieDetails(movie.id)}>
                            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                            <h2>{movie.title}</h2>
                            <p>{movie.release_date}</p>
                            <p className="vote_average">{movie.vote_average}</p>
                        </Link>
                    </div>
                ))}
            </div>

            <h1>Top Rated Movies</h1>
            <div className="movies">
                {topRatedMovies.map((movie: Movie) => (
                    <div key={movie.id} className="movieItems">
                    <Link to={`/moviedetails/${movie.id}`} key={movie.id} className="movieItems">
                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                        <h2>{movie.title}</h2>
                        <p>{movie.release_date}</p>
                        <p className="vote_average">{movie.vote_average}</p>
                    </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}