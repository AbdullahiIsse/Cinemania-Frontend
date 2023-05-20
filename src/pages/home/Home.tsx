import Hero from "../../components/Hero/Hero.tsx";
import MoviesAndSeries from "../../components/moviesAndSeries/MoviesAndSeries.tsx";
import {Outlet} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Outlet/>
            <Hero/>
            <MoviesAndSeries/>
        </div>

    )
}
