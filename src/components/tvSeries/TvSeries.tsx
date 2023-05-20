import { useEffect, useState } from 'react';
import { getPopularTVseries} from './Service.tsx';
import './TvSeries.css';
import {Link} from "react-router-dom";
import CardList from "../card-list/card-list.tsx";
import AppPagination from "../pagination/AppPagination.tsx";

export default function TvSeries() {
    const [tvSeries, setTvSeries] = useState<TvSeries[]>([]);
    const [activePage, setActivePage] = useState(1);


    useEffect(() => {
        getPopularTVseries(`${activePage}`).then((series) => {
            setTvSeries(series);
        });
    }, [activePage]);

    return (
        <div>

            <h2>Popular Tv - Series:</h2>

            <div className="series">

                {tvSeries.map((tvShow: TvSeries) => (
                    <div key={tvShow.id} className="serieItems">
                        <Link to={`/seriedetails/${tvShow.id}`} key={tvShow.id}>
                            <CardList category={tvShow.first_air_date} heading={tvShow.name} backgroundImage={`https://image.tmdb.org/t/p/w300${tvShow.poster_path}`} />

                        </Link>
                    </div>
                ))}
            </div>

            <div className='pagination'>
                <AppPagination activePage={activePage} setPage={setActivePage} />
            </div>

        </div>
    );
}