import { useEffect, useState } from 'react';
import { getPerson } from '../person/Service.tsx';
import {Link} from "react-router-dom";
import './Person.css';



export default function Person() {
    const [person, setPerson] = useState<Person[]>([]);

    useEffect(() => {
        getPerson().then((persons) => {
            setPerson(persons);
        });
    }, []);

    return (
        <div>
            <h1>People</h1>

            <div className="personDetails">
                {person.map((person) => (
                    <div key={person.name}>
                        <Link to={`/persondetails/${person.id}`} key={person.id}>
                            <img src={`https://image.tmdb.org/t/p/w300${person.profile_path}`} />
                            <h2>{person.name}</h2>
                            <p>Known for: {person.known_for.map((movie: Movie) => movie.title)}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
