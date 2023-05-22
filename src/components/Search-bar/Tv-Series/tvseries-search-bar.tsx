import SearchBar from "../GenericSearch/Search.tsx";


const TvseriesSearchBar = () => {
    return (
        <SearchBar
            placeholder="Search for Tv-Shows"
            searchUrl="https://api.themoviedb.org/3/search/tv"
            navigateUrl={(id) => `/seriedetails/${id}`}
        />
    )
};

export default TvseriesSearchBar;