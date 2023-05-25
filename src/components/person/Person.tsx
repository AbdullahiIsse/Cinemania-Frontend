import { useEffect, useState } from 'react';
import { getPerson } from '../person/Service.tsx';
import {Link} from "react-router-dom";
import './Person.css';
import AppPagination from "../pagination/AppPagination.tsx";

export default function Person() {
    const [person, setPerson] = useState<Person[]>([]);
    const [activePage, setActivePage] = useState(1);


    useEffect(() => {
        getPerson(activePage).then((persons) => {
            setPerson(persons);
        });
    }, [activePage]);

    return (
        <div>
            <h1>Popular Persons</h1>

            <div className="personDetails">
                {person.map((person) => (
                    <div key={person.name}>
                        <Link to={`/persondetails/${person.id}`} key={person.id} >
                            <img src={`https://image.tmdb.org/t/p/w300${person.profile_path}`} />
                            <h2>{person.name}</h2>
                            <p>Known for: {person.known_for.map((movie: Movie) => movie.title)}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='pagination'>
                <AppPagination activePage={activePage} setPage={setActivePage} />
            </div>
        </div>
    );
}
