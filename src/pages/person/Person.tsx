import Persons from "../../components/person/Person.tsx";
import PersonsSearchBar from "../../components/Search-bar/Persons/persons-search-bar.tsx";


export default function Person() {
    return (
        <div>
            <PersonsSearchBar/>
            <br/>
            <br/>
            <Persons/>
        </div>
    )
}
