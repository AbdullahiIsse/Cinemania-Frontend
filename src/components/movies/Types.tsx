interface Movie {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
    vote_average: number;
}

interface MovieListResponse {
    page: number;
    results: Movie[];
}
