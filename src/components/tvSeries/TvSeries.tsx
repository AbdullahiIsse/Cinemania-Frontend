import { useEffect, useState } from 'react';
import { getTVseries} from './Service.tsx';
import './TvSeries.css';
import {Link} from "react-router-dom";
import CardList from "../card-list/card-list.tsx";
import {TVShow} from "../serieDetails/Types.tsx";

export default function TvSeries() {
    const [tvSeries, setTvSeries] = useState<TVShow[]>([]);

    useEffect(() => {
        getTVseries().then((series:TVShow) => {
            setTvSeries(series);
        });
    }, []);

    return (
        <div>

            <h2>Popular Tv - Series:</h2>

            <div className="series">

                {tvSeries.map((tvShow: TVShow) => (
                    <div key={tvShow.id} className="serieItems">
                        <Link to={`/seriedetails/${tvShow.id}`} key={tvShow.id}>
                            <CardList category={tvShow.first_air_date} heading={tvShow.name} backgroundImage={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`} />

                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}