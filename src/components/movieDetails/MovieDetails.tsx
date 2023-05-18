import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetail } from '../movieDetails/Types.tsx';
import { getMovieDetails } from '../movieDetails/Service.tsx';
import './MovieDetails.css';
import {Button} from "@mantine/core";
import {FavoritesContext} from "../../Context/FavoritesContext.tsx";
import {UserContext} from "../../Context/UserContext.tsx";

export function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const{favoritesListItems,addFavoritesListItem,removeFavoritesListItem} = useContext(FavoritesContext);
    const {currentUser} = useContext(UserContext);
    const movieId = Number(id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const itemAddedToFavoriteList = favoritesListItems.find(({id}) => id === movieDetails?.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = currentUser.uid;

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

    const onAddToFavoritesHandler = () => {
        addFavoritesListItem({id:movieDetails.id,title:movieDetails.title,releaseDate:movieDetails.release_date,voteAverage:movieDetails.vote_average,userId})
    }

    const onRemoveFromFavoritesHandler = () => {
     removeFavoritesListItem(movieDetails.id)
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
                {
                    currentUser !== null ?  itemAddedToFavoriteList && <Button onClick={onRemoveFromFavoritesHandler}>Remove from favorites</Button> ||
                        <Button onClick={onAddToFavoritesHandler}>Add To favorites</Button>:""
                }

            </div>
        </div>
    );
}
