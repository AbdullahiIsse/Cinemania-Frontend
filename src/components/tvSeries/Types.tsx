interface TVShow {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
    vote_average: number;
}

interface TvserieResponse {
    page: number;
    results: TVShow[];
}

