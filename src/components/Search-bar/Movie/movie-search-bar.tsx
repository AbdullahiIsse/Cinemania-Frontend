
import SearchBar from "../GenericSearch/Search.tsx";

const MovieSearchBar = () => {

    return (
        <SearchBar
            placeholder="Search for Movies"
            searchUrl="https://api.themoviedb.org/3/search/movie"
            navigateUrl={(id) => `/moviedetails/${id}`}
        />
    );
};
export default MovieSearchBar;