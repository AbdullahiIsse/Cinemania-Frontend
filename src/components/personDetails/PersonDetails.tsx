import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Person, PersonMovieKnownFor, PersonSeriesKnownFor} from '../personDetails/Types.tsx';
import './PersonDetails.css';
import {getPersonDetails, getPersonMovieDetails, getPersonSeriesDetails} from "./Service.tsx";
import defaultImages from "../../assets/images.png";
import CardList from "../card-list/card-list.tsx";

export function PersonDetails() {
    const {id} = useParams<{ id: string }>();
    const personId = Number(id);

    const [personDetails, setPersonsDetails] = useState<Person | null>(null);
    const [personMovieDetails, setPersonMovieDetails] = useState<PersonMovieKnownFor | null>(null);
    const [personSeriesDetails, setPersonSeriesDetails] = useState<PersonSeriesKnownFor | null>(null);

    useEffect(() => {
        getPersonDetails(personId)
            .then((data: Person | null) => {
                setPersonsDetails(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [personId]);

    useEffect(() => {
        getPersonMovieDetails(personId)
            .then((data: PersonMovieKnownFor | null) => {
                setPersonMovieDetails(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [personId]);


    useEffect(() => {
        getPersonSeriesDetails(personId)
            .then((data: PersonSeriesKnownFor | null) => {
                setPersonSeriesDetails(data);
            })
            .catch((error: any) => {
                console.error(error);
            });
    }, [personId]);

    if (!personDetails) {
        return <div>Loading person details...</div>;
    }

    return (
        <div>
            <div className="seriedetails">
                <img src={`https://image.tmdb.org/t/p/w300${personDetails.profile_path}`}/>
                <br/>
                <br/>
                <h1>{personDetails.name}</h1>
                <p><strong> Biography:</strong> <br/>{personDetails.biography}</p>
                <br/>
                <p><strong> Known for: </strong>{personDetails.known_for_department}</p>
                <br/>
                <p><strong> Gender:</strong> {personDetails.gender === 1 ? 'Female' : "Male"}</p>
                <br/>
                <p><strong> Birthday:</strong> {personDetails.birthday}</p>
                <br/>
                <p><strong> Place of Birth:</strong> {personDetails.place_of_birth}</p>

                <br/>
                <br/>
                <h2>Known For:</h2>
                <div className='person_details_credit_cast'>
                    {personMovieDetails?.cast.map((movie) => {
                        const images = movie.poster_path === null ? defaultImages : `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
                        return (
                            <Link to={`/moviedetails/${movie.id}`}>
                                <CardList category={movie.release_date} heading={movie.title} backgroundImage={images}/>
                            </Link>
                        )
                    })}
                    {personSeriesDetails?.cast.map((series) => {
                        const images = series.poster_path === null ? defaultImages : `https://image.tmdb.org/t/p/w300${series.poster_path}`;
                        return (
                            <Link to={`/seriedetails/${series.id}`}>
                                <CardList category={series.first_air_date} heading={series.name}
                                          backgroundImage={images}/>
                            </Link>

                        )
                    })}
                </div>

            </div>
        </div>
    );
}
