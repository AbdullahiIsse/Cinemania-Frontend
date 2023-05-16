import { useEffect, useState } from 'react';
import { getTVseries} from './Service.tsx';
import './TvSeries.css';
import {Link} from "react-router-dom";

export default function TvSeries() {
    const [tvSeries, setTvSeries] = useState<TVShow[]>([]);

    useEffect(() => {
        getTVseries().then((series) => {
            setTvSeries(series);
        });
    }, []);

    return (
        <div>

            <h1>Tv - Series</h1>

            <div className="series">

                {tvSeries.map((tvShow: TVShow) => (
                    <div key={tvShow.id} className="serieItems">
                        <Link to={`/seriedetails/${tvShow.id}`} key={tvShow.id}>
                            <img src={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`} />
                            <h2>{tvShow.title}</h2>
                            <p>{tvShow.release_date}</p>
                            <p className="vote_average">{tvShow.vote_average}</p>
                           </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}