export interface Person {

    birthday: string;
    id: number;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    profile_path: string | null;
    gender:number;
    biography:string;
}

interface Movie {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
    vote_average: number;
}

interface TvSeries {
    id: number;
    poster_path: string;
    name: string;
    first_air_date: string;
    vote_average: number;
}
export interface PersonMovieKnownFor {
    cast:[Movie]
}

export interface PersonSeriesKnownFor {
    cast:[TvSeries]
}






