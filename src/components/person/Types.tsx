interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

interface Person {
    id: number;
    name: string;
    known_for_department: string;
    profile_path: string;
    known_for: Movie[];
}
