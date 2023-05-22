import SearchBar from "../GenericSearch/Search.tsx";


const PersonsSearchBar = () => {
        return (
            <SearchBar
                placeholder="Search for Persons"
                searchUrl="https://api.themoviedb.org/3/search/person"
                navigateUrl={(id) => `/persondetails/${id}`}
            />)
    }

;

export default PersonsSearchBar;