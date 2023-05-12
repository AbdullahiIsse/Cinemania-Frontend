import "./Home.css";
import Searchbar from "../../components/searchbar/Searchbar.tsx";
import Popular from "../../components/popular/Popular.tsx";
import Toprated from "../../components/toprated/Toprated.tsx";

export default function Home() {
    return (
        <div>
            <Searchbar/>
            <Popular/>
            <Toprated/>
        </div>

    )
}
