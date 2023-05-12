import { useEffect, useState } from 'react';
import {getPopularMovies, getTopRatedMovies} from './Service.tsx';
import "./Movies.css";

export default function Movies() {

    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getPopularMovies().then((movies) => {
            setPopularMovies(movies);
        });
    }, []);

    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

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
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h2>{movie.title}</h2>
                        <p>{movie.release_date}</p>
                        <p className="vote_average">{movie.vote_average}</p>
                    </div>
                ))}
            </div>

            <h1>Top Rated Movies</h1>
            <div className="movies">
                {topRatedMovies.map((movie: Movie) => (
                    <div key={movie.id} className="movieItems">
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h2>{movie.title}</h2>
                        <p>{movie.release_date}</p>
                        <p className="vote_average">{movie.vote_average}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}
