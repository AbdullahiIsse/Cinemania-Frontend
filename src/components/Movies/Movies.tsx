import './movies.css'
import {useEffect, useState} from "react";
import {getPopularMovies} from "./Service.tsx";
import {Link} from "react-router-dom";
import {getMovieDetails} from "../movieDetails/Service.tsx";
import CardList from "../card-list/card-list.tsx";
import AppPagination from "../pagination/AppPagination.tsx";


const Movies = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [activePage, setActivePage] = useState(1);


    useEffect(() => {
        getPopularMovies(`${activePage}`).then((movies) => {
            setPopularMovies(movies);
        });
    }, [activePage]);


    return (
        <div>
            <div className="movies">
                {popularMovies.map((movie: Movie) => (
                    <div key={movie.id} className="movieItems">
                        <Link to={`/moviedetails/${movie.id}`} className="movieLink" onClick={() => getMovieDetails(movie.id)}>
                            <CardList category={movie.release_date} heading={movie.title} backgroundImage={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
                        </Link>
                    </div>
                ))}
            </div>

            <div className='pagination'>
                <AppPagination activePage={activePage} setPage={setActivePage} />
            </div>


        </div>
    )


};

export default Movies;