import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../personDetails/Types.tsx';
import './PersonDetails.css';
import {getPersonDetails} from "./Service.tsx";

export function PersonDetails() {
    const { id } = useParams<{ id: string }>();
    const personId = Number(id);

    const [personDetails, setPerieDetails] = useState<Person | null>(null);

    useEffect(() => {
        getPersonDetails(personId)
            .then((data: Person | null) => {
                setPerieDetails(data);
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
                <img src={`https://image.tmdb.org/t/p/w300${personDetails.profile_path}`} />
                <h1>{personDetails.name}</h1>
                <p> <strong> place_of_birth:</strong> {personDetails.place_of_birth}</p>
                <p> <strong> birthday:</strong> {personDetails.birthday}</p>
                <p> <strong> known for:</strong> {personDetails.known_for_department}</p>

            </div>
        </div>
    );
}
