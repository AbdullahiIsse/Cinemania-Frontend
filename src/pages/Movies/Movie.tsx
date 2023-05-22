import Movies from "../../components/Movies/Movies.tsx";
import MovieSearchBar from "../../components/Search-bar/Movie/movie-search-bar.tsx";

const Movie = () => {

    return (
        <div>
            <MovieSearchBar/>
            <br/>
            <br/>
            <h2>Popular Movies</h2>
            <Movies/>
        </div>

    )
};

export default Movie;