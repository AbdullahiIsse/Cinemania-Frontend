import { useEffect, useState } from 'react';
import { getTrendingMovies, getTrendingSeries } from './Service.tsx';
import './MoviesAndSeries.css';
import { Link } from 'react-router-dom';
import {getMovieDetails} from "../movieDetails/Service.tsx";
import CardList from "../card-list/card-list.tsx";

export default function MoviesAndSeries() {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [trendigSeries, setTrendingSeries] = useState<TvSeries[]>([]);

    useEffect(() => {
        getTrendingMovies().then((movies) => {
            setTrendingMovies(movies);
        });
    }, []);

    useEffect(() => {
        getTrendingSeries().then((tvSeries) => {
            setTrendingSeries(tvSeries);
        });
    }, []);

    return (
        <div>
            <h1>Trending Movies in the last 7 Days:</h1>

            <div className="movies">
                {trendingMovies.map((movie: Movie) => (
                    <div key={movie.id} className="movieItems">
                        <Link to={`/moviedetails/${movie.id}`} className="movieLink" onClick={() => getMovieDetails(movie.id)}>
                            <CardList category={movie.release_date} heading={movie.title} backgroundImage={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                        </Link>
                    </div>
                ))}
            </div>
                <br/>
            <br/>
            <h1>Trending TV-Series in the last 7 Days: </h1>

            <br/>
            <br/>
            <div className="movies">
                {trendigSeries.map((tvSeries: TvSeries) => (
                    <div key={tvSeries.id} className="movieItems">
                    <Link to={`/seriedetails/${tvSeries.id}`} key={tvSeries.id} className="movieItems">
                        <CardList category={tvSeries.first_air_date} heading={tvSeries.name} backgroundImage={`https://image.tmdb.org/t/p/w300${tvSeries.poster_path}`} />
                    </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}