import Hero from "../../components/Hero/Hero.tsx";
import Movies from "../../components/movies/Movies.tsx";
import {Outlet} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Outlet/>
            <Hero/>
            <Movies/>
        </div>

    )
}
