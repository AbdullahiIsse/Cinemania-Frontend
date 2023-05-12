//import movie1Image from "../../assets/movie.jpeg";
//import movie2Image from "../../assets/movie.jpeg";
//import movie3Image from "../../assets/movie.jpeg";
import "./Home.css";
import Searchbar from "../../components/searchbar/Searchbar.tsx";
import Popular from "../../components/popular/Popular.tsx";

export default function Home() {
    return (
        <div>
            <Searchbar/>

            <Popular/>
        </div>

    )
}
