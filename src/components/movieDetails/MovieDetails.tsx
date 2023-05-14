import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetail } from '../movieDetails/Types.tsx';
import { getMovieDetails } from '../movieDetails/Service.tsx';
import './MovieDetails.css';

export function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);

    const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);

    useEffect(() => {
        getMovieDetails(movieId)
            .then((data: MovieDetail | null) => {
                setMovieDetails(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [movieId]);

    if (!movieDetails) {
        return <div>Loading movie details...</div>;
    }

    return (
        <div>
            <div className="moviesdetails">
                <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} />
                <h1>{movieDetails.title}</h1>
                <p> <strong> Movie Description: </strong> {movieDetails.overview}</p>
                <p> <strong> Release date:</strong> {movieDetails.release_date}</p>
                <p> <strong>Vote Average:</strong> {movieDetails.vote_average}</p>
                <p> <strong>Vote count: </strong>  {movieDetails.vote_count}</p>
            </div>
        </div>
    );
}
