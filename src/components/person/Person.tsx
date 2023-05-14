import { useEffect, useState } from 'react';
import { getPerson } from '../person/Service.tsx';
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
                            <img src={`https://image.tmdb.org/t/p/w300${person.profile_path}`} />
                            <h2>{person.name}</h2>
                            <p>Known for: {person.known_for.map((movie: Movie) => movie.title)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
