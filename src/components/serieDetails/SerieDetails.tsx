import {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { TVShow } from '../serieDetails/Types.tsx';
import './SerieDetails.css';
import {getSerieDetails} from "./Service.tsx";
import {FavoritesContext} from "../../Context/FavoritesContext.tsx";
import {UserContext} from "../../Context/UserContext.tsx";
import {Button} from "@mantine/core";

export function SerieDetails() {
    const { id } = useParams<{ id: string }>();
    const serieId = Number(id);
    const{favoritesListItems,addFavoritesListItem,removeFavoritesListItem} = useContext(FavoritesContext);
    const {currentUser} = useContext(UserContext);

    const [serieDetails, setSerieDetails] = useState<TVShow | null>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const itemAddedToFavoriteList = favoritesListItems.find(({id}) => id === serieDetails?.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = currentUser.uid;


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

    const onAddToFavoritesHandler = () => {
        addFavoritesListItem({id:serieDetails.id,title:serieDetails.name,releaseDate:serieDetails.first_air_date,voteAverage:serieDetails.vote_average,userId})
    }

    const onRemoveFromFavoritesHandler = () => {
        removeFavoritesListItem(serieDetails.id)
    }

    return (
        <div>
            <div className="seriedetails">
                <img src={`https://image.tmdb.org/t/p/w300${serieDetails.poster_path}`} />
                <h1>{serieDetails.name}</h1>
                <p> <strong> TV Description: </strong> {serieDetails.overview}</p>
                <p> <strong> Release date:</strong> {serieDetails.first_air_date}</p>
                <p> <strong>Vote Average:</strong> {serieDetails.vote_average}</p>
                <p> <strong>Vote count: </strong>  {serieDetails.vote_count}</p>
                {
                    currentUser !== null ?  itemAddedToFavoriteList && <Button onClick={onRemoveFromFavoritesHandler}>Remove from favorites</Button> ||
                        <Button onClick={onAddToFavoritesHandler}>Add To favorites</Button>:""
                }
            </div>
        </div>
    );
}
