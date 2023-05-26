import {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {MovieCastRecommendations, MovieCredits, MovieDetail} from '../movieDetails/Types.tsx';
import {getMovieDetails, getMovieDetailsCredits, getMovieRecommendations} from '../movieDetails/Service.tsx';
import './MovieDetails.css';
import {Button} from "@mantine/core";
import {FavoritesContext} from "../../Context/FavoritesContext.tsx";
import {UserContext} from "../../Context/UserContext.tsx";
import CardList from "../card-list/card-list.tsx";
import defaultImages from '../../assets/images.png'

export function MovieDetails() {
    const {id} = useParams<{ id: string }>();
    const {favoritesListItems, addFavoritesListItem, removeFavoritesListItem} = useContext(FavoritesContext);
    const {currentUser} = useContext(UserContext);
    const movieId = Number(id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
    const [movieDetailsCredits, setMovieDetailsCredits] = useState<MovieCredits | null>(null);
    const [movieRecommendations, setMovieRecommendations] = useState<MovieCastRecommendations | null>(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const itemAddedToFavoriteList = favoritesListItems.find(({id}) => id === movieDetails?.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = currentUser?.uid;

    useEffect(() => {
        getMovieDetails(movieId)
            .then((data: MovieDetail | null) => {
                setMovieDetails(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [movieId,currentUser]);


    useEffect(() => {
        getMovieDetailsCredits(movieId)
            .then((data: MovieCredits| null) => {
                setMovieDetailsCredits(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [movieId,currentUser]);

    useEffect(() => {
        getMovieRecommendations(movieId)
            .then((data: MovieCastRecommendations| null ) => {
                setMovieRecommendations(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [movieId,currentUser]);

    if (!movieDetails) {
        return <div>Loading movie details...</div>;
    }

    const onAddToFavoritesHandler = () => {
        addFavoritesListItem({
            id: movieDetails.id,
            title: movieDetails.title,
            releaseDate: movieDetails.release_date,
            voteAverage: movieDetails.vote_average,
            image:movieDetails.poster_path,
            userId
        })
    }

    const onRemoveFromFavoritesHandler = () => {
        removeFavoritesListItem(userId,movieDetails.id,)
    }

    const movieRunTimeHour = Math.floor(movieDetails.runtime / 60);
    const movieRunTimeMin = movieDetails.runtime % 60;


    return (
        <div>
            <div>
                {currentUser === null ? <h3> Sign in to add movie to favorite list</h3>:
                    <div>
                        {
                            currentUser !== null ? itemAddedToFavoriteList &&
                                <Button onClick={onRemoveFromFavoritesHandler}>Remove from favorites</Button> ||
                                <Button onClick={onAddToFavoritesHandler}>Add To favorites</Button> : ""
                        }
                    </div>
                }
            </div>
            <div className="moviesdetails">
                <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}/>
                <br/>
                <br/>
                <h1>{movieDetails.title}</h1>
                <p><strong> Movie Description: </strong> <br/> {movieDetails.overview}</p>
                <br/>
                <p><strong> Release date:</strong> {movieDetails.release_date}</p>
                <br/>
                <p><strong>Genres: </strong> {movieDetails.genres.map((genre:any) => {
                    return  ` ${genre.name} ,`
                })}</p>
                <br/>

                <p>
                    <strong>Director: </strong>
                    {movieDetailsCredits?.crew
                        .filter((m) => m.job === 'Director')
                        .map((director) => director.name)
                        .join(', ')}
                </p>
                <br/>
                <p><strong> Movie Runtime: </strong> {
                    `${movieRunTimeHour}h ${movieRunTimeMin}m`
                }</p>
                <br/>
                <p><strong>TMDB Average Rating:</strong> {movieDetails.vote_average}</p>
                <br/>
                <p><strong>TMDB Rating Vote count: </strong> {movieDetails.vote_count}</p>
                <br/>

                <br/>
                <h2>Cast & Crew:</h2>
                <div className='movies_details_credit_cast'>
                {movieDetailsCredits?.cast.map((movieDetailsCredit) => {
                    const images = movieDetailsCredit.profile_path === null ? defaultImages:`https://image.tmdb.org/t/p/w300${movieDetailsCredit.profile_path}`;
                    return (
                        <Link to={`/persondetails/${movieDetailsCredit.id}`}>
                        <CardList category={movieDetailsCredit.known_for_department} heading={movieDetailsCredit.name} backgroundImage={images}/>
                        </Link>
                            )
                })}
                    {movieDetailsCredits?.crew.map((movieDetailsCredit) => {
                        const images = movieDetailsCredit.profile_path === null ? defaultImages:`https://image.tmdb.org/t/p/w300${movieDetailsCredit.profile_path}`;
                        return (
                            <Link to={`/persondetails/${movieDetailsCredit.id}`}>
                                <CardList category={movieDetailsCredit.job} heading={movieDetailsCredit.name} backgroundImage={images}/>
                            </Link>

                        )
                    })}
                </div>
                <br/>
                <br/>

                <h2>Recommendations:</h2>
                <div className='movies_details_credit_cast'>
                    {movieRecommendations?.results.map((movieRecom:MovieDetail) => {
                        const images = movieRecom.poster_path === null ? defaultImages:`https://image.tmdb.org/t/p/w300${movieRecom.poster_path}`;

                        return (
                            <button onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }}>
                            <Link to={`/moviedetails/${movieRecom.id}`}>
                                <CardList category={movieRecom.release_date} heading={movieRecom.title} backgroundImage={images}/>
                            </Link>
                            </button>
                        )
                    }) }


                </div>


            </div>
        </div>
    );
}
