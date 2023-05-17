import Searchbar from "../../components/searchbar/Searchbar.tsx";
import Movies from "../../components/movies/Movies.tsx";
import {Outlet} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Outlet/>
            <Searchbar/>
            <Movies/>
        </div>

    )
}
