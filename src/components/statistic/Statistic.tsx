import { useEffect, useState } from "react";
import {getTopRatedMovies, getTopRatedTvSeries} from "./Service.tsx";
import './Statistic.css';
import {getMovieDetails} from "../movieDetails/Service.tsx";
import {Link} from "react-router-dom";

const Statistic = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
    const [topRatedTvSeries, setTopRatedTvSeries] = useState<TVShow[]>([]);

    useEffect(() => {
        getTopRatedMovies().then((movies) => {
            setTopRatedMovies(movies);
        });
        getTopRatedTvSeries().then((tvshows) => {
            setTopRatedTvSeries(tvshows);
        });
    }, []);

    const getMaxVoteCountMovies = () => {
        const voteCounts = topRatedMovies.map((movie) => movie.vote_count);
        return Math.max(...voteCounts);
    };

    const getMaxVoteCountTvSeries = () => {
        const voteCounts = topRatedTvSeries.map((tvshow) => tvshow.vote_count);
        return Math.max(...voteCounts);
    };

    return (
        <div>
            <div className="barChart">
                {topRatedMovies.map((movie: Movie) => (
                    <div key={movie.id} className="bar">
                        <h3>{movie.vote_average} </h3>

                        <Link to={`/moviedetails/${movie.id}`} onClick={() => getMovieDetails(movie.id)}>
                        <img
                            className="image"
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        />
                    </Link>
                        <h3> {movie.title}</h3>
                        <div className="voteCount">
                            <h3> Vote Count: {movie.vote_count} </h3>
                            <div
                                className="voteCountBar"
                                style={{ width: `${(movie.vote_count / getMaxVoteCountMovies()) * 100}%` }}
                            >
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h1> Top Rated TV Series</h1>
            <div className="barChart">
                {topRatedTvSeries.map((tvshow: TVShow) => (
                    <div key={tvshow.id} className="bar">
                        <h3>{tvshow.vote_average} </h3>

                        <Link to={`/seriedetails/${tvshow.id}`} key={tvshow.id} >
                            <img
                                className="image"
                                src={`https://image.tmdb.org/t/p/w300${tvshow.poster_path}`}
                            />
                        </Link>
                        <h3> {tvshow.name}</h3>
                        <div className="voteCount">
                            <h3> Vote Count: {tvshow.vote_count} </h3>
                            <div
                                className="voteCountBar"
                                style={{ width: `${(tvshow.vote_count / getMaxVoteCountTvSeries()) * 100}%` }}
                            >
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>




    );

};

export default Statistic;
