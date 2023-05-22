import {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {SeriesRecommendations, TvSeriesCredit, TVShow} from '../serieDetails/Types.tsx';
import './SerieDetails.css';
import {getSeriesCredit, getSerieDetails, getSeriesRecommendation} from "./Service.tsx";
import {FavoritesContext} from "../../Context/FavoritesContext.tsx";
import {UserContext} from "../../Context/UserContext.tsx";
import {Button} from "@mantine/core";
import defaultImages from "../../assets/images.png";
import CardList from "../card-list/card-list.tsx";

export function SerieDetails() {
    const {id} = useParams<{ id: string }>();
    const serieId = Number(id);
    const {favoritesListItems, addFavoritesListItem, removeFavoritesListItem} = useContext(FavoritesContext);
    const {currentUser} = useContext(UserContext);

    const [serieDetails, setSerieDetails] = useState<TVShow | null>(null);
    const [serieCredits, setSerieCredits] = useState<TvSeriesCredit | null>(null);
    const [serieRecommendation, setSerieRecommendation] = useState<SeriesRecommendations | null>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const itemAddedToFavoriteList = favoritesListItems.find(({id}) => id === serieDetails?.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = currentUser?.uid;


    useEffect(() => {
        getSerieDetails(serieId)
            .then((data: TVShow | null) => {
                setSerieDetails(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [serieId]);

    useEffect(() => {
        getSeriesCredit(serieId)
            .then((data: TvSeriesCredit | null) => {
                setSerieCredits(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [serieId]);

    useEffect(() => {
        getSeriesRecommendation(serieId)
            .then((data: SeriesRecommendations | null) => {
                setSerieRecommendation(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [serieId]);

    if (!serieDetails) {
        return <div>Loading serie details...</div>;
    }

    const onAddToFavoritesHandler = () => {
        addFavoritesListItem({
            id: serieDetails.id,
            title: serieDetails.name,
            releaseDate: serieDetails.first_air_date,
            voteAverage: serieDetails.vote_average,
            userId
        })
    }

    const onRemoveFromFavoritesHandler = () => {
        removeFavoritesListItem(serieDetails.id)
    }

    return (
        <div>
            <div className="seriedetails">
                <img src={`https://image.tmdb.org/t/p/w300${serieDetails.poster_path}`}/>
                <br/>
                <br/>
                <h1>{serieDetails.name}</h1>

                <p><strong> TV-Series Description: </strong> <br/>{serieDetails.overview}</p>
                <br/>
                <p><strong> Release date:</strong> {serieDetails.first_air_date}</p>
                <br/>
                <p><strong>Genres:</strong> {serieDetails.genres.map((genre) => {
                    return (genre.name)
                }).join(", ")}</p>
                <br/>
                <p><strong>Creator:</strong> {serieDetails.created_by.map((creator) => {
                    return (creator.name)
                }).join(", ")}</p>
                <br/>
                <p><strong> Number of Seasons:</strong> {serieDetails.number_of_seasons}</p>
                <br/>
                <p><strong> Number of Episodes:</strong> {serieDetails.number_of_episodes}</p>
                <br/>
                <p><strong>TMDB Average Rating:</strong> {serieDetails.vote_average}</p>
                <br/>
                <p><strong>TMDB Rating Vote count: </strong> {serieDetails.vote_count}</p>
                <br/>
                <p><strong>CINEMANIA Average Rating:</strong></p>
                <br/>
                <p><strong>CINEMANIA Rating Vote count: </strong></p>
                <br/>
                <br/>

                <h2>Cast & Crew:</h2>
                <div className='series_details_credit_cast'>
                    {serieCredits?.cast.map((serieDetailsCredit) => {
                        const images = serieDetailsCredit.profile_path === null ? defaultImages:`https://image.tmdb.org/t/p/w300${serieDetailsCredit.profile_path}`;
                        return (
                            <Link to={`/persondetails/${serieDetailsCredit.id}`}>
                                <CardList category={serieDetailsCredit.known_for_department} heading={serieDetailsCredit.name} backgroundImage={images}/>
                            </Link>
                        )
                    })}
                    {serieCredits?.crew.map((serieDetailsCredit) => {
                        const images = serieDetailsCredit.profile_path === null ? defaultImages:`https://image.tmdb.org/t/p/w300${serieDetailsCredit.profile_path}`;
                        return (
                            <Link to={`/persondetails/${serieDetailsCredit.id}`}>
                                <CardList category={serieDetailsCredit.job} heading={serieDetailsCredit.name} backgroundImage={images}/>
                            </Link>

                        )
                    })}
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <h2>Recommendations:</h2>
                <div className='series_details_credit_cast'>
                    {serieRecommendation?.results.map((serieRecom:TVShow) => {
                        const images = serieRecom.poster_path === null ? defaultImages:`https://image.tmdb.org/t/p/w300${serieRecom.poster_path}`;

                        return (
                            <button onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }}>
                                <Link to={`/seriedetails/${serieRecom.id}`}>
                                    <CardList category={serieRecom.first_air_date} heading={serieRecom.name} backgroundImage={images}/>
                                </Link>
                            </button>
                        )
                    }) }

                <div>
                    {currentUser === null ? "" :
                        <div>
                            {
                                currentUser !== null ? itemAddedToFavoriteList &&
                                    <Button onClick={onRemoveFromFavoritesHandler}>Remove from favorites</Button> ||
                                    <Button onClick={onAddToFavoritesHandler}>Add To favorites</Button> : ""
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
        </div>
    );
}
