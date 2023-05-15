import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TVShow } from '../serieDetails/Types.tsx';
import './SerieDetails.css';
import {getSerieDetails} from "./Service.tsx";

export function SerieDetails() {
    const { id } = useParams<{ id: string }>();
    const serieId = Number(id);

    const [serieDetails, setSerieDetails] = useState<TVShow | null>(null);

    useEffect(() => {
        getSerieDetails(serieId)
            .then((data: TVShow | null) => {
                setSerieDetails(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [serieId]);

    if (!serieDetails) {
        return <div>Loading serie details...</div>;
    }

    return (
        <div>
            <div className="seriedetails">
                <img src={`https://image.tmdb.org/t/p/w300${serieDetails.poster_path}`} />
                <h1>{serieDetails.name}</h1>
                <p> <strong> Movie Description: </strong> {serieDetails.overview}</p>
                <p> <strong> Release date:</strong> {serieDetails.first_air_date}</p>
                <p> <strong>Vote Average:</strong> {serieDetails.vote_average}</p>
                <p> <strong>Vote count: </strong>  {serieDetails.vote_count}</p>
            </div>
        </div>
    );
}
