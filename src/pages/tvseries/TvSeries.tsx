import Series from "../../components/tvSeries/TvSeries.tsx";
import TvseriesSearchBar from "../../components/Search-bar/Tv-Series/tvseries-search-bar.tsx";

export default function TvSeries() {
    return (
        <div>
            <TvseriesSearchBar/>
            <br/>
            <br/>
            <Series/>
        </div>

    )
}
